import json
import smtplib
import os
import re
import random
import string
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

PROMO_TABLE = 't_p27960186_language_studio_land.promo_codes'


def _generate_promo() -> str:
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f'Hispania{suffix}'


def handler(event: dict, context) -> dict:
    """Отправляет вопрос с сайта или выдаёт промокод за подписку на ВК"""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    mode = body.get('mode', 'question')

    smtp_user = 'hispania35@yandex.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    if mode == 'promo':
        name = body.get('name', '')
        email = body.get('email', '').strip()

        if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email):
            return {
                'statusCode': 400,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'ok': False, 'error': 'invalid_email'}, ensure_ascii=False)
            }

        email_norm = email.lower()
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        conn.autocommit = True
        try:
            with conn.cursor() as cur:
                email_sql = email_norm.replace("'", "''")
                cur.execute(f"SELECT promo FROM {PROMO_TABLE} WHERE email = '{email_sql}'")
                existing = cur.fetchone()

                if existing:
                    return {
                        'statusCode': 200,
                        'headers': {**cors, 'Content-Type': 'application/json'},
                        'body': json.dumps(
                            {'ok': False, 'error': 'already_issued', 'promo': existing[0]},
                            ensure_ascii=False
                        )
                    }

                promo = _generate_promo()
                name_sql = name.replace("'", "''")
                promo_sql = promo.replace("'", "''")
                cur.execute(
                    f"INSERT INTO {PROMO_TABLE} (email, promo, name) "
                    f"VALUES ('{email_sql}', '{promo_sql}', '{name_sql}')"
                )
        finally:
            conn.close()

        # письмо клиенту с промокодом
        client_msg = MIMEMultipart()
        client_msg['From'] = smtp_user
        client_msg['To'] = email
        client_msg['Subject'] = 'Ваш промокод на скидку — Hispania'
        client_html = f"""
        <h2>Спасибо за подписку!</h2>
        <p>Привет{', ' + name if name else ''}! Спасибо, что подписались на нашу группу ВКонтакте.</p>
        <p>Ваш персональный промокод на скидку:</p>
        <p style="font-size:24px;font-weight:bold;letter-spacing:2px;color:#7c3aed;">{promo}</p>
        <p>Назовите его при записи на занятие, чтобы получить скидку. Промокод действует один раз.</p>
        <p>До встречи на занятиях!<br/>Языковая студия Hispania</p>
        """
        client_msg.attach(MIMEText(client_html, 'html'))

        # копия владельцу
        owner_msg = MIMEMultipart()
        owner_msg['From'] = smtp_user
        owner_msg['To'] = smtp_user
        owner_msg['Subject'] = f'Выдан промокод {promo} — {email}'
        owner_html = f"""
        <h2>Запрос промокода за подписку</h2>
        <table>
            <tr><td><b>Имя:</b></td><td>{name}</td></tr>
            <tr><td><b>Email:</b></td><td>{email}</td></tr>
            <tr><td><b>Промокод:</b></td><td>{promo}</td></tr>
        </table>
        """
        owner_msg.attach(MIMEText(owner_html, 'html'))

        with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
            server.login(smtp_user, smtp_password)
            server.send_message(client_msg)
            server.send_message(owner_msg)

        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True, 'promo': promo}, ensure_ascii=False)
        }

    name = body.get('name', '')
    contact = body.get('contact', '')
    question = body.get('question', '')

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    msg['Subject'] = f'Новый вопрос с сайта — {name}'

    html = f"""
    <h2>Новый вопрос с сайта</h2>
    <table>
        <tr><td><b>Имя:</b></td><td>{name}</td></tr>
        <tr><td><b>Контакт:</b></td><td>{contact}</td></tr>
        <tr><td><b>Вопрос:</b></td><td>{question}</td></tr>
    </table>
    """
    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(msg)

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True})
    }