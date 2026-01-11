
# 🔐 Private Notes Vault

A private, distraction-free notes app using **Supabase Authentication** and **Row Level Security**.

## ✨ Features
- Email & Password Login
- Google OAuth Login
- Private Notes (per-user)
- Create / View / Delete Notes
- Clean, minimal UI
- Mobile-friendly
- Secure at DB level (RLS)

## 🧱 Tech Stack
- React + Vite
- Supabase (Auth + DB)
- CSS (no UI libraries)

## 🚀 Setup

1. Create a Supabase project
2. Enable Email + Google auth
3. Create table using `supabase.sql`
4. Copy `.env.example` → `.env`
5. Add Supabase URL & Anon Key
6. Run:

```bash
npm install
npm run dev
```

## 🌍 Deploy
- Netlify / Vercel
