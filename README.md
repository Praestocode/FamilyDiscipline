# Family Discipline ™

**Family Discipline** è una web app PWA full stack progettata per aiutare utenti e nuclei familiari a raggiungere obiettivi personali attraverso un sistema di tracciamento, premi e disciplina condivisa.
È pensata per sostenere obiettivi come smettere di fumare, perdere peso o rispettare task quotidiani, in un contesto motivazionale.

---

## 🔧 Stack Tecnologico

| Componente | Tecnologie utilizzate |
|-----------|------------------------|
| **Frontend** | Angular 17, PWA, SCSS |
| **Backend** | Laravel 10 (API REST) |
| **Database** | MySQL (Railway) |
| **Deploy** | Netlify (frontend), Render (backend) |
| **Sicurezza** | AES-256-GCM, Argon2id |

---

## 📱 Caratteristiche principali

- ✅ **Login sicuro** (senza registrazione pubblica)
- ✅ **Crittografia client-side** di tutti i dati utente
- ✅ **Sistema a punti e status** per ciascun obiettivo (fumo, peso, task)
- ✅ **Dashboard giornaliera** per il monitoraggio e l’auto-valutazione
- ✅ **Dark/light mode**
- ✅ **Responsive design** per uso mobile
- ✅ **PWA** con supporto offline, splash screen e installazione su dispositivi

---

## 🧠 Architettura

[ Angular PWA ] ←→ [ Laravel API ] ←→ [ MySQL DB ]

---

📦 Deploy online:

🌐 Frontend: https://familydiscipline.it

🧠 Backend API: Render.com - Laravel API (privato)

🗃️ Database: Railway (privato)

🔑 Dominio: familydiscipline.it (OVH)

---

🧪 Sicurezza: 

- AES-256-GCM con derivazione via Argon2id

- Validazione e sanificazione input lato Angular e Laravel

- Nessuna esecuzione JavaScript da input utente (anti-XSS)

- Nessuna esposizione di credenziali

- Logout sicuro: tutte le chiavi temporanee vengono rimosse

---

🧑‍💻 Autore

Virgilio Polini – Full stack web developer

Esperienza concreta in:

- Angular
- Laravel / PHP
- Docker
- Deploy (Netlify, Render, Railway)
- Sicurezza Web
- Sviluppo PWA
