# Allan Marimo — Portfolio v2.0

> **"We build simplicity for users. Complexity is our responsibility."**

A commercial-grade, animated personal portfolio — React 18 + TypeScript frontend,
FastAPI backend, Docker Compose deployment, Nginx with SSL, and fully separate file
structure ready for production.

---

## 📁 Folder Structure

```
allan-portfolio/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── assets/svg/          # 3D SVG illustrations
│   │   │   ├── coder-3d.svg     # Side-lit developer at workstation
│   │   │   ├── laptop-3d.svg    # Floating 3D laptop
│   │   │   ├── server-3d.svg    # Server rack with live LEDs
│   │   │   └── skill-globe.svg  # Tech skill globe
│   │   ├── components/
│   │   │   ├── Cursor.tsx       # Custom magnetic cursor
│   │   │   ├── Cursor.css
│   │   │   ├── Navbar.tsx       # Animated sticky header
│   │   │   ├── Navbar.css
│   │   │   ├── ParticleCanvas.tsx  # Gold particle network
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.css
│   │   ├── hooks/
│   │   │   ├── useScrollReveal.ts  # IntersectionObserver reveal
│   │   │   └── useCounter.ts       # Animated number counter
│   │   ├── pages/
│   │   │   ├── Home.tsx + Home.css
│   │   │   ├── Skills.tsx + Skills.css
│   │   │   └── Contact.tsx + Contact.css
│   │   ├── styles/
│   │   │   ├── global.css       # Design tokens, reset, buttons
│   │   │   └── animations.css   # Keyframes, scroll reveal classes
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── nginx-spa.conf
│
├── backend/                     # FastAPI Python
│   ├── main.py                  # API + contact form endpoint
│   ├── requirements.txt
│   └── Dockerfile
│
├── nginx/
│   └── nginx.conf               # Reverse proxy + SSL config
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example ../.env      # fill in your values
uvicorn main:app --reload --port 8000
# → http://localhost:8000/docs
```

---

## 🐳 Production Deployment (VPS)

### 1. Server setup
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose certbot nginx
sudo usermod -aG docker $USER
```

### 2. SSL Certificate
```bash
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com
```

### 3. Environment
```bash
cp .env.example .env
nano .env   # Add your Gmail App Password and domain
```

### 4. Update nginx.conf
Replace `your-domain.com` with your actual domain in `nginx/nginx.conf`.

### 5. Deploy
```bash
docker-compose up -d --build
docker-compose ps    # check all containers running
```

### 6. Auto-renew SSL
```bash
sudo crontab -e
# Add:
0 3 1 * * certbot renew --quiet && docker-compose restart nginx
```

---

## ✨ Features

| Feature                         | Detail |
|----------------------------------|--------|
| 3D SVG Illustrations            | Side-lit coder, laptop, server rack, skill globe |
| Gold particle network           | 100+ particles with mouse repulsion + connections |
| Custom magnetic cursor          | Dot + lagging ring, enlarges on hover |
| Scroll reveal system            | `fadeUp`, `fadeLeft`, `fadeRight`, `scaleIn` |
| Counter animations              | Eased count-up on scroll into view |
| Skill bar animations            | Width transition on IntersectionObserver |
| Parallax hero ghost-number      | CSS transform on scroll event |
| Floating 3D SVG animations      | `floatY`, `floatRotate` keyframes |
| Animated timeline               | Staggered left-side gold timeline |
| React Router SPA                | `/`, `/skills`, `/contact` |
| FastAPI contact endpoint        | Rate-limited (5/hour), Pydantic v2 validated |
| Gmail SMTP mailer               | HTML email template |
| Docker + Nginx + SSL            | Production-grade deployment |
| CORS + rate limiting            | Security hardened |
| Responsive design               | Mobile-first breakpoints |

---

## 📬 Contact

**Allan Marimo** · allanmarimo455@gmail.com · +263 788 447 689  
GitHub: [github.com/allan4931](https://github.com/allan4931) · Zimbabwe 🇿🇼
