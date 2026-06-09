"""
Allan Marimo Portfolio — FastAPI Backend
Handles contact form submissions via Gmail SMTP
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, field_validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# ─── Rate limiter ───────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Allan Marimo Portfolio API", version="2.0.0")
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore

# ─── CORS ───────────────────────────────────────────────────────
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
if "http://localhost:3000" not in ALLOWED_ORIGINS:
    ALLOWED_ORIGINS.append("http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# ─── Schema ─────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name:    str
    email:   EmailStr
    subject: str = "Portfolio Contact"
    message: str

    @field_validator("name", "message")
    @classmethod
    def not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field cannot be empty")
        return v.strip()

    @field_validator("name")
    @classmethod
    def name_length(cls, v: str) -> str:
        if len(v) > 120:
            raise ValueError("Name too long")
        return v

    @field_validator("message")
    @classmethod
    def message_length(cls, v: str) -> str:
        if len(v) > 4000:
            raise ValueError("Message too long (max 4000 chars)")
        return v

# ─── SMTP helper ────────────────────────────────────────────────
def send_email(form: ContactForm) -> None:
    smtp_user = os.environ["GMAIL_USER"]
    smtp_pass = os.environ["GMAIL_PASS"]
    to_email  = os.getenv("CONTACT_EMAIL", smtp_user)

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio] {form.subject} — from {form.name}"
    msg["From"]    = smtp_user
    msg["To"]      = to_email
    msg["Reply-To"] = form.email

    html = f"""
    <html><body style="font-family:sans-serif;background:#050505;color:#e8e8e8;padding:2rem;">
      <div style="max-width:560px;margin:0 auto;border:1px solid rgba(212,175,55,.25);padding:2rem;">
        <h2 style="color:#D4AF37;font-size:1.4rem;margin-bottom:1rem;">
          New Portfolio Message
        </h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:.5rem 0;color:#888;width:100px;">Name</td>
              <td style="padding:.5rem 0;">{form.name}</td></tr>
          <tr><td style="padding:.5rem 0;color:#888;">Email</td>
              <td style="padding:.5rem 0;">
                <a href="mailto:{form.email}" style="color:#D4AF37;">{form.email}</a>
              </td></tr>
          <tr><td style="padding:.5rem 0;color:#888;">Subject</td>
              <td style="padding:.5rem 0;">{form.subject}</td></tr>
        </table>
        <hr style="border-color:rgba(212,175,55,.15);margin:1.5rem 0;"/>
        <p style="line-height:1.8;white-space:pre-wrap;">{form.message}</p>
      </div>
    </body></html>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as s:
        s.login(smtp_user, smtp_pass)
        s.sendmail(smtp_user, to_email, msg.as_string())

# ─── Routes ─────────────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok", "service": "allan-marimo-portfolio"}

@app.post("/api/contact")
@limiter.limit("5/hour")
async def contact(request: Request, form: ContactForm):
    try:
        send_email(form)
        return {"success": True, "message": "Message received — Allan will respond within 24h."}
    except KeyError:
        # SMTP env vars not set — accept silently in dev/demo
        return {"success": True, "message": "Message received (demo mode)."}
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to send email") from exc

# ─── Serve frontend when a built app exists ───────────────────────
backend_dir = os.path.dirname(__file__)
static_dir = os.path.join(backend_dir, "static")
if not os.path.isdir(static_dir):
    static_dir = os.path.join(backend_dir, "..", "frontend", "dist")
if os.path.isdir(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
