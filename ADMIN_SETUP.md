# ZUR Construction Admin Dashboard — Setup Guide (Phase 1)

The admin dashboard lives at **`/admin`** and is powered by **Supabase**
(Postgres + Auth + Storage). Follow these steps once to bring it online.

## 1. Create a Supabase project
1. Go to <https://supabase.com> → **New project** (the free tier is fine).
2. Wait for it to provision, then open **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key

## 2. Configure environment variables
1. Copy `.env.example` to `.env.local` in the project root.
2. Fill in your values:
   ```
   VITE_SUPABASE_URL=https://YOUR-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   VITE_ADMIN_IDLE_MINUTES=20
   ```
   > `.env.local` is git-ignored. The anon key is safe in the browser — Row-Level
   > Security enforces who can read/write.

## 3. Create the database schema
1. In Supabase, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and **Run**.
   This creates all tables, Row-Level Security policies, storage buckets and helpers.
   It is safe to re-run.

## 4. Create your first Super Admin
1. Supabase → **Authentication → Users → Add user**.
   - Enter an email + password, keep **Auto Confirm User** on.
2. Copy the new user's **UID**, then in **SQL Editor** run:
   ```sql
   update public.profiles
   set role = 'super_admin', name = 'Your Name'
   where id = '<PASTE-UID-HERE>';
   ```

## 5. Configure auth redirects (for password reset)
- Supabase → **Authentication → URL Configuration** → set **Site URL** to your
  origin (e.g. `http://localhost:5173` in dev, your domain in production).

## 6. Run the app
```bash
npm install      # if you haven't already
npm run dev
```
- Visit **`http://localhost:5173/admin`** → you'll be redirected to the login page.
- Sign in with the Super Admin credentials from step 4.
- On first load the dashboard shows an **"Import content"** banner — click it to
  seed the database with the existing website content (projects, services,
  testimonials, partners). After that, the public site reads from the database.

## What's included in Phase 1
- **Secure auth**: email/password (bcrypt via Supabase), sessions, forgot/reset
  password, auto-logout after inactivity, Super Admin / Admin roles, protected
  routes (client guards + RLS).
- **Dashboard**: analytics cards + charts (projects by category, service
  distribution, traffic*, contact requests), recent activity, last login.
- **Project management**: full CRUD, drag-and-drop image upload with auto
  compression + cover selection, search/filter/sort/pagination, row actions
  (view/edit/duplicate/archive/delete) and bulk actions.
- **Live site sync**: the public Projects pages and homepage carousel read from
  the database. `src/data/site.js` remains the fallback when the DB is empty.
- **UX**: responsive sidebar, light/dark mode, toasts, confirm dialogs,
  breadcrumbs, notifications.

\* Website traffic is a clearly-labeled placeholder until a real analytics source
is wired in.

## Coming in later phases
Services · Homepage CMS · Contact Center · Testimonials · Partners · Gallery ·
File Manager · Website Settings · full Notifications & Activity Log.
These modules appear in the sidebar now with a "Soon" tag.

## Security notes
- **Password hashing / sessions / login rate-limiting**: handled by Supabase Auth.
- **Authorization**: enforced twice — client route guards *and* Postgres RLS.
- **CSRF**: not applicable — Supabase uses bearer tokens in the `Authorization`
  header, not cookies.
- **XSS**: React escapes by default; image uploads are type/size validated on the
  client and by storage policies.
