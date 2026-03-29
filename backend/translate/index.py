import json
import os
import urllib.request
import urllib.parse
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p27960186_language_studio_land')

IP_TO_LANG = {
    'BY': 'RU',
    'KZ': 'RU',
    'RU': 'RU',
    'CN': 'ZH',
    'ES': 'ES',
    'US': 'EN-US',
    'DE': 'DE',
}

DEEPL_LANG_CODES = {
    'ZH': 'ZH-HANS',
}

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def get_country_by_ip(ip: str) -> str:
    try:
        url = f"http://ip-api.com/json/{ip}?fields=countryCode"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read())
            return data.get('countryCode', 'RU')
    except Exception:
        return 'RU'


def translate_texts(texts: list, target_lang: str) -> list:
    """Переводит список текстов через DeepL API."""
    api_key = os.environ.get('DEEPL_API_KEY', '')
    deepl_lang = DEEPL_LANG_CODES.get(target_lang, target_lang)

    parts = [f"text={urllib.parse.quote(t)}" for t in texts]
    parts.append(f"target_lang={deepl_lang}")
    parts.append("source_lang=RU")
    payload = '&'.join(parts)

    base_url = "https://api-free.deepl.com" if api_key.endswith(':fx') else "https://api.deepl.com"
    url = f"{base_url}/v2/translate"

    req = urllib.request.Request(
        url,
        data=payload.encode(),
        headers={
            'Authorization': f'DeepL-Auth-Key {api_key}',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method='POST'
    )

    with urllib.request.urlopen(req, timeout=15) as resp:
        result = json.loads(resp.read())
        return [t['text'] for t in result['translations']]


def get_db_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Определяет язык по IP пользователя и переводит тексты через DeepL с кешированием в БД."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    texts: dict = body.get('texts', {})
    force_lang: str = body.get('lang', '')

    if not texts:
        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'No texts provided'})}

    if force_lang:
        lang = force_lang.upper()
    else:
        ip = ((event.get('requestContext') or {}).get('identity') or {}).get('sourceIp', '')
        country = get_country_by_ip(ip) if ip else 'RU'
        lang = IP_TO_LANG.get(country, 'RU')

    if lang == 'RU':
        return {
            'statusCode': 200,
            'headers': CORS_HEADERS,
            'body': json.dumps({'lang': 'RU', 'translations': texts}, ensure_ascii=False)
        }

    conn = get_db_conn()
    cur = conn.cursor()

    keys = list(texts.keys())
    result = dict(texts)
    to_translate_keys = []
    to_translate_texts = []

    placeholders = ','.join(['%s'] * len(keys))
    cur.execute(
        f"SELECT text_key, translated_text FROM {SCHEMA}.translation_cache WHERE lang_code = %s AND text_key IN ({placeholders})",
        [lang] + keys
    )
    cached = {row[0]: row[1] for row in cur.fetchall()}

    for key in keys:
        if key in cached:
            result[key] = cached[key]
        else:
            to_translate_keys.append(key)
            to_translate_texts.append(texts[key])

    if to_translate_texts:
        translated = translate_texts(to_translate_texts, lang)
        for i, key in enumerate(to_translate_keys):
            result[key] = translated[i]
            cur.execute(
                f"INSERT INTO {SCHEMA}.translation_cache (text_key, lang_code, translated_text) "
                f"VALUES (%s, %s, %s) ON CONFLICT (text_key, lang_code) DO UPDATE SET translated_text = EXCLUDED.translated_text",
                (key, lang, translated[i])
            )
        conn.commit()

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps({'lang': lang, 'translations': result}, ensure_ascii=False)
    }
