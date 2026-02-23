import os

# Environment variables (still read for consistency)
SMTP_USER = os.getenv("SMTP_USER", "")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "allanmarimo455@gmail.com")

def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Temporary version – prints the contact form details to the console
    instead of sending an actual email. Use this for deployment while
    you resolve Gmail authentication or switch to a dedicated email service.
    """
    print("\n" + "="*60)
    print("📧 CONTACT FORM SUBMISSION")
    print("="*60)
    print(f"From:    {name} <{email}>")
    print(f"To:      {OWNER_EMAIL}")
    print(f"Subject: {subject or 'New Enquiry'}")
    print("-"*60)
    print("Message:")
    print(message)
    print("="*60 + "\n")
    return True