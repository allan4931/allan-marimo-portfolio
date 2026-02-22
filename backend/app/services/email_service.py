import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "allanmarimo455@gmail.com")


def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Send contact form email to Allan's inbox.
    Uses Gmail SMTP with App Password.
    """
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact: {subject or 'New Enquiry'} — from {name}"
        msg["From"] = SMTP_USER
        msg["To"] = OWNER_EMAIL
        msg["Reply-To"] = email

        # Plain text body
        text_body = f"""
New contact form submission from your portfolio.

Name:    {name}
Email:   {email}
Subject: {subject or 'Not specified'}

Message:
{message}

---
Sent via allanmarimo portfolio contact form.
        """.strip()

        # HTML body
        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 20px; }}
    .container {{ max-width: 600px; margin: 0 auto; background: #111; border: 1px solid rgba(0,212,255,0.2); padding: 32px; }}
    .header {{ border-bottom: 1px solid rgba(0,212,255,0.15); padding-bottom: 20px; margin-bottom: 24px; }}
    .label {{ font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: rgba(0,212,255,0.6); margin-bottom: 4px; font-family: monospace; }}
    .value {{ font-size: 15px; color: #fff; margin-bottom: 16px; }}
    .message-box {{ background: rgba(0,212,255,0.03); border: 1px solid rgba(0,212,255,0.1); padding: 16px; margin-top: 8px; line-height: 1.6; color: rgba(255,255,255,0.7); }}
    .logo {{ font-size: 22px; font-weight: 700; color: #00d4ff; letter-spacing: -0.5px; }}
    .sub {{ font-size: 11px; color: rgba(255,255,255,0.3); font-family: monospace; letter-spacing: 2px; }}
    .footer {{ margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; color: rgba(255,255,255,0.2); font-family: monospace; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Allan Marimo</div>
      <div class="sub">PORTFOLIO CONTACT NOTIFICATION</div>
    </div>

    <div class="label">From</div>
    <div class="value">{name} &lt;{email}&gt;</div>

    <div class="label">Subject</div>
    <div class="value">{subject or 'Not specified'}</div>

    <div class="label">Message</div>
    <div class="message-box">{message.replace(chr(10), '<br>')}</div>

    <div class="footer">
      Sent via portfolio contact form — allanmarimo.dev<br>
      Reply directly to this email to respond to {name}.
    </div>
  </div>
</body>
</html>
        """

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, OWNER_EMAIL, msg.as_string())

        return True

    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send email: {e}")
        return False
