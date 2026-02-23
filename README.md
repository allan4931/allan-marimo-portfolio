# Allan Marimo — Professional Portfolio

> **"We build simplicity for users. Complexity is our responsibility."**

🌐 **Live Site:** [https://www.allanmarimo.co.zw](https://www.allanmarimo.co.zw)

---

## 👤 About

**Allan Marimo** is an independent software engineer and system architect based in Zimbabwe, available for remote freelance and contract work globally. This portfolio showcases his technical capabilities, production projects and philosophy of building resilient, scalable digital systems.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Routing | React Router v6 |
| Backend | FastAPI (Python 3.12) |
| Database | PostgreSQL |
| Email | Gmail SMTP via Python |
| Containerisation | Docker + Docker Compose |
| Web Server | Nginx (reverse proxy + static serving) |
| SSL | Let's Encrypt via Certbot |
| Server OS | Ubuntu 24.04 LTS |
| Deployment | GitHub → VPS (SSH + Docker Compose) |

---

## 📁 Project Structure

```
allan-marimo-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Split HUD dual-island navbar
│   │   │   ├── Footer.tsx          # Giant animated footer
│   │   │   ├── LoadingScreen.tsx   # Boot-up loading animation
│   │   │   ├── CustomCursor.tsx    # Electric blue custom cursor
│   │   │   └── PageTransition.tsx  # Framer Motion page wrapper
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Hero, services, philosophy, CTA
│   │   │   ├── Skills.tsx          # 16 skills, 2 case studies, ERP spotlight
│   │   │   └── Contact.tsx         # Form, FAQ, process steps
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app + CORS
│   │   ├── routers/
│   │   │   └── contact.py          # POST /api/contact
│   │   ├── services/
│   │   │   └── email_service.py    # Gmail SMTP
│   │   └── models/
│   │       └── contact.py          # Pydantic ContactMessage
│   ├── .env.example
│   ├── Dockerfile
│   └── requirements.txt
├── nginx/
│   └── portfolio.conf              # VPS Nginx config (HTTPS + proxy)
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start — Local Development

### Prerequisites
- Node.js 20+
- Python 3.12+
- Git

### 1. Clone the repository
```bash
git clone https://github.com/allan4931/portfolio.git
cd allan-marimo-portfolio
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at → **http://localhost:3000**

### 3. Start the Backend
```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate        # Linux / macOS
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and fill in your Gmail App Password

# Start the API server
uvicorn app.main:app --reload --port 8000
```
Backend runs at → **http://localhost:8000**
API docs at → **http://localhost:8000/docs**

---

## ⚙️ Environment Configuration

Copy `backend/.env.example` to `backend/.env` and fill in your values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=allanmarimo455@gmail.com
SMTP_PASS=your_gmail_app_password_here
OWNER_EMAIL=allanmarimo455@gmail.com
ENVIRONMENT=production
```

### Getting a Gmail App Password
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Search for **"App Passwords"**
4. Generate a new App Password for "Mail"
5. Copy the 16-character password into `SMTP_PASS`

---

## 🐳 Docker Deployment (All-in-One)

```bash
# From project root
cp backend/.env.example backend/.env
# Edit backend/.env and fill in Gmail credentials

docker compose up -d --build
```

This starts:
- **Frontend** on port `80` (Nginx serving React build)
- **Backend** on port `8000` (FastAPI with 2 workers)
- Both connected via the `portfolio-net` bridge network

---

## ☁️ VPS Production Deployment

### Target: Ubuntu 24.04 LTS

### Step 1 — Update the server
```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2 — Install Docker
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in
```

### Step 3 — Install Nginx + Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Step 4 — Clone the repository
```bash
cd /opt
git clone https://github.com/allan4931/portfolio.git
cd portfolio
```

### Step 5 — Configure environment
```bash
cp backend/.env.example backend/.env
nano backend/.env    # Fill in your Gmail App Password
```

### Step 6 — Configure Nginx
```bash
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/allanmarimo
sudo ln -s /etc/nginx/sites-available/allanmarimo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7 — Obtain SSL Certificates
```bash
# Make sure DNS A records point to this server first
sudo certbot --nginx -d allanmarimo.co.zw -d www.allanmarimo.co.zw
```

### Step 8 — Launch with Docker
```bash
docker compose up -d --build
```

### Step 9 — Verify
```bash
docker compose ps
curl https://www.allanmarimo.co.zw/api/health
```

---

## 🔐 Server Security Hardening

Run these after first deployment:

```bash
# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Set up UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP (redirects to HTTPS)
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable

# Confirm it's running
sudo ufw status
```

### SSH Key Authentication (Recommended)
```bash
# On your LOCAL machine — generate a key
ssh-keygen -t ed25519 -C "allan-vps"

# Copy public key to the server
ssh-copy-id user@your-server-ip

# Then disable password login on server
sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

---

## 🔄 Updating the Live Site

```bash
# On the VPS
cd /opt/portfolio
git pull origin main
docker compose up -d --build
```

That's it. Zero manual file copying.

---

## 🗂️ Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, particle field, services, philosophy, stats |
| `/skills` | Skills & Projects | 16 skill cards, 2 case studies, School ERP spotlight |
| `/contact` | Contact | Form with service selector, FAQ accordion, process steps |

---

## 🌐 Domains

| Domain | Purpose |
|---|---|
| `https://www.allanmarimo.co.zw` | Production portfolio |
| `https://allanmarimo.co.zw` | Redirects to www |

---

## 📬 Contact

| Channel | Details |
|---|---|
| 🌐 Website | [https://www.allanmarimo.co.zw](https://www.allanmarimo.co.zw) |
| 📧 Email | [allanmarimo455@gmail.com](mailto:allanmarimo455@gmail.com) |
| 🐙 GitHub | [github.com/allan4931](https://github.com/allan4931) |
| 💼 LinkedIn | [linkedin.com/in/allanmarimo](https://linkedin.com/in/allanmarimo) |
| 📱 WhatsApp | +263 788 447 689 |

---

## 📄 License

© 2025 Allan Marimo. All rights reserved.

This codebase is private. Do not copy, distribute or use without explicit written permission from the author.

---

<div align="center">
  <strong>Built by Allan Marimo</strong><br/>
  <a href="https://www.allanmarimo.co.zw">www.allanmarimo.co.zw</a>
</div>