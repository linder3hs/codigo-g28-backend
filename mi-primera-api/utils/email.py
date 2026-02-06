import resend
from flask import current_app

def enviar_correo_verificacion(email, nombre, codigo):
    try:
        # configurar resend con su api key
        resend.api_key = current_app.config['RESEND_API_KEY']
        # crear el contenido del correo
        html_content = f"""
          <!Doctype html>
          <html>
          <head>
            <style>
              body {{
                font-family: Arial, sans-serif;
                color: #333;
              }}
              .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }}
              .header {{
                background-color: #4f46e5;
                color: #fff;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }}
              .content {{
                background-color: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 5px 5px;
              }}
              .code {{
                background-color: #4f46e5;
                color: #fff;
                font-size: 32px;
                font-weight: bold;
                padding: 15px;
                text-align: center;
                border-radius: 5px;
                margin: 20px 0;
              }}
              .footer {{
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 12px
              }}
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Verificación de cuenta</h1>
              </div>
              <div class="content">
                <p>Hola, {nombre}</>
                <p>Gracias por registrarse en TODO App, para completar tu registro, usa el siguiente codigo</p>
                <div class="code">
                  {codigo}
                </div>
                <p>Este codigo, expira en 15 minutos</p>
              </div>
              <div class="footer">
                <p>Este es un email automatico, por favor no respondas este mensaje.</p>
              </div>
            </div>
          </body>
        """
        params = {
            "from": current_app.config['EMAIL_FROM'],
            "to": ["linderhassingerwotdev@gmail.com"],
            "subject": f"Codigo de verificacion",
            "html": html_content
        }

        email_enviado = resend.Emails.send(params)
        print(email_enviado)
        return True
    except Exception as e:
        print(e)
        return False

def enviar_email_bienvenido(nombre):
    try:
        resend.api_key = current_app.config['RESEND_API_KEY']
        html_content = f"""
          <h1>Bienvenido!! {nombre}</h1>
        """
        params = {
            "from": current_app.config['EMAIL_FROM'],
            "to": ["linderhassingerwotdev@gmail.com"],
            "subject": "Welcome!",
            "html": html_content
        }

        email_enviado = resend.Emails.send(params)
        print(email_enviado)
        return True
    except Exception as e:
        print(e)
        return False
