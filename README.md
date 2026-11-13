# Family Discipline

Full stack PWA that helps a household track shared personal goals (quitting smoking, losing weight, keeping daily tasks) through a points and status system.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17, Tailwind CSS, service worker (PWA) |
| Backend | Laravel 12, PHP 8.2, REST API |
| Auth | Laravel Sanctum (token based) |
| Database | MySQL (Railway) |
| Deploy | Netlify (frontend), Render (backend) |

## Features

- Login only, no public registration: accounts are provisioned manually
- Three trackers (cigarettes, weight and daily tasks), each feeding a shared points balance
- Status levels unlocked by accumulated points
- Daily dashboard with self-assessment and points history
- Dark and light theme
- Installable PWA with offline support
- Responsive layout, designed mobile first

## Architecture

```
Angular PWA  <-->  Laravel API  <-->  MySQL
```

The API is stateless and token authenticated. Sensitive user data is encrypted in the browser before being sent, so the backend stores ciphertext.

## Security

- Key derivation with Argon2id (`@noble/hashes`), from the user password and a salt derived from the email
- Payload encryption with AES-256-GCM via the Web Crypto API
- Input validation and sanitisation on both the Angular and the Laravel side
- No rendering of user input as HTML or script
- On logout every temporary key is cleared

## Repository layout

```
backend/    Laravel API
frontend/   Angular PWA
```

## Local setup

Backend:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Frontend:

```bash
cd frontend
npm install
ng serve
```

Point the frontend to the local API through the environment configuration before starting it.
