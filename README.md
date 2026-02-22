# 🚀 Allan Marimo — Professional Portfolio

> *"We build simplicity for users. Complexity is our responsibility."*

A full-stack, production-ready professional portfolio and system showcase for **Allan Marimo** — Independent Software Engineer, System Architect & Cloud Specialist.

---

## 📁 Project Structure

```
allan-marimo-portfolio/
├── frontend/               # React + TypeScript + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/     # Navbar, Footer, LoadingScreen, CustomCursor, PageTransition
│   │   ├── pages/          # Home, Skills, Contact
│   │   └── index.css       # Global styles + glass morphism utilities
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                # FastAPI Python backend
│   ├── app/
│   │   ├── main.py         # FastAPI app + CORS + router registration
│   │   ├── routers/
│   │   │   └── contact.py  # POST /api/contact endpoint
│   │   ├── services/
│   │   │   └── email_service.py  # Gmail SMTP email sender
│   │   └── models/
│   │       └── contact.py  # Pydantic request model
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
├── nginx/
│   └── portfolio.conf      # VPS Nginx reverse proxy config
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### 1. Clone & setup

```bash
git clone https://github.com/allan4931/allan-marimo-portfolio.git
cd allan-marimo-portfolio
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# → Runs on http://localhost:3000
```

### 3. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your Gmail App Password

uvicorn app.main:app --reload --port 8000
# → Runs on http://localhost:8000
```

### 4. Visit
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

---

## 🔑 Email Setup (Gmail App Password)

To enable the contact form to send emails:

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification**
3. Go to **App Passwords** → Generate one for "Mail"
4. Copy the 16-character password
5. Add to `backend/.env`:

```env
SMTP_USER=allanmarimo455@gmail.com
SMTP_PASS=your_16_char_app_password
OWNER_EMAIL=allanmarimo455@gmail.com
```

---

## 🐳 Docker Deployment

```bash
# Build and run everything
cd allan-marimo-portfolio

# Copy and fill your .env
cp backend/.env.example backend/.env
# → Edit backend/.env

# Launch
docker compose up -d --build

# Check logs
docker compose logs -f
```

---

## ☁️ VPS Deployment (Ubuntu 24.04)

### Step 1: Server setup

```bash
# SSH into your server
ssh your_user@your_vps_ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Nginx & Certbot
sudo apt install nginx certbot python3-certbot-nginx -y
```

### Step 2: Clone your repo

```bash
cd /opt
git clone https://github.com/allan4931/allan-marimo-portfolio.git
cd allan-marimo-portfolio
cp backend/.env.example backend/.env
nano backend/.env   # Fill in your values
```

### Step 3: Configure Nginx

```bash
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Get SSL certificates

```bash
sudo certbot --nginx -d allan.zivo.cloud -d www.allan.zivo.cloud
sudo certbot --nginx -d sandbox.allan.zivo.cloud
```

### Step 5: Launch with Docker

```bash
docker compose up -d --build
```

### Step 6: Auto-restart on reboot

```bash
sudo systemctl enable docker
# Docker compose already uses restart: unless-stopped
```

---

## 🔐 Security Hardening

```bash
# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Set up SSH key auth
ssh-copy-id -i ~/.ssh/id_ed25519.pub your_user@your_vps_ip

# UFW firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, about, tech stack, CTA |
| `/skills` | Skills grid (16 skills) + Project case studies |
| `/contact` | Contact info + email form |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Framer Motion, Tailwind CSS, React Router |
| Backend | FastAPI, Python 3.12, Pydantic v2 |
| Email | Gmail SMTP with App Password |
| Container | Docker, Docker Compose |
| Proxy | Nginx |
| SSL | Let's Encrypt (Certbot) |
| VPS | Ubuntu 24.04 |

---

## 📞 Contact

**Allan Marimo**
- 📧 allanmarimo455@gmail.com
- 🐙 [github.com/allan4931](https://github.com/allan4931)
- 💼 [linkedin.com/in/allanmarimo](https://linkedin.com/in/allanmarimo)
- 📱 +263 788 447 689

---

*Built with precision. Deployed with confidence.*
