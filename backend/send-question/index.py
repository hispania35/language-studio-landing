import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет вопрос с сайта на почту hispania35@yandex.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '')
    contact = body.get('contact', '')
    question = body.get('question', '')

    smtp_user = 'hispania35@yandex.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

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
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
