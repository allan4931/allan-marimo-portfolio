from fastapi import APIRouter, HTTPException
from app.models.contact import ContactMessage
from app.services.email_service import send_contact_email

router = APIRouter()


@router.post("/contact")
async def submit_contact(data: ContactMessage):
    """
    Handle contact form submission.
    Sends an email to allanmarimo455@gmail.com.
    """
    if not data.name.strip() or not data.message.strip():
        raise HTTPException(status_code=422, detail="Name and message are required.")

    success = send_contact_email(
        name=data.name.strip(),
        email=data.email,
        subject=data.subject or "",
        message=data.message.strip(),
    )

    if not success:
        raise HTTPException(
            status_code=500,
            detail="Failed to send email. Please try again or contact me directly."
        )

    return {
        "success": True,
        "message": "Your message has been sent. Allan will get back to you within 24 hours.",
    }
