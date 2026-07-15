import json
import os
import psycopg2

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Max-Age': '86400',
}

TABLE = 't_p27960186_language_studio_land.pricing_plans'


def _row_to_plan(row):
    features = [f for f in (row[10] or '').split('|') if f]
    return {
        'id': row[0],
        'name': row[2],
        'description': row[3],
        'price': row[4],
        'oldPrice': row[5],
        'priceByn': row[6],
        'oldPriceByn': row[7],
        'unit': row[8],
        'gradient': row[9],
        'features': features,
        'popular': row[11],
        'cta': row[12],
    }


def _get_plans(cur):
    cur.execute(
        f'SELECT id, sort_order, name, description, price, old_price, price_byn, '
        f'old_price_byn, unit, gradient, features, popular, cta '
        f'FROM {TABLE} ORDER BY sort_order, id'
    )
    return [_row_to_plan(r) for r in cur.fetchall()]


def handler(event: dict, context) -> dict:
    '''Управление ценами: GET — список тарифов, POST — сохранение (нужен пароль админа).'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        if method == 'GET':
            with conn.cursor() as cur:
                plans = _get_plans(cur)
            return {
                'statusCode': 200,
                'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                'body': json.dumps({'plans': plans}, ensure_ascii=False),
            }

        if method == 'POST':
            headers = event.get('headers') or {}
            password = headers.get('X-Admin-Password') or headers.get('x-admin-password')
            if not password or password != os.environ.get('ADMIN_PASSWORD'):
                return {
                    'statusCode': 401,
                    'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Неверный пароль'}, ensure_ascii=False),
                }

            body = json.loads(event.get('body') or '{}')
            plans = body.get('plans', [])

            with conn.cursor() as cur:
                cur.execute(f'DELETE FROM {TABLE}')
                for i, p in enumerate(plans):
                    features = '|'.join(p.get('features', []))
                    cur.execute(
                        f'INSERT INTO {TABLE} '
                        f'(sort_order, name, description, price, old_price, price_byn, '
                        f'old_price_byn, unit, gradient, features, popular, cta) '
                        f'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (
                            i + 1,
                            p.get('name', ''),
                            p.get('description', ''),
                            p.get('price', ''),
                            p.get('oldPrice', ''),
                            p.get('priceByn', ''),
                            p.get('oldPriceByn', ''),
                            p.get('unit', 'урок'),
                            p.get('gradient', 'gradient-card-blue'),
                            features,
                            bool(p.get('popular', False)),
                            p.get('cta', 'Выбрать'),
                        ),
                    )
                conn.commit()
                result = _get_plans(cur)

            return {
                'statusCode': 200,
                'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                'body': json.dumps({'plans': result}, ensure_ascii=False),
            }

        return {
            'statusCode': 405,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }
    finally:
        conn.close()
