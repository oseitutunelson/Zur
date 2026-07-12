-- =============================================================================
-- ZUR Construction Admin Dashboard — Supabase schema, RLS, storage & seed
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query → Run).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE / idempotent policies.
-- =============================================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Roles enum & profiles (RBAC lives here; auth.users holds the hashed password)
-- -----------------------------------------------------------------------------
do $$ begin
  create type public.admin_role as enum ('super_admin', 'admin');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  email       text,
  role        public.admin_role not null default 'admin',
  last_login  timestamptz,
  created_at  timestamptz not null default now()
);

-- Helper: is the current JWT an admin? SECURITY DEFINER so RLS on profiles
-- does not recurse. Used by every write policy below (server-side authz).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('super_admin', 'admin')
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'super_admin'
  );
$$;

-- -----------------------------------------------------------------------------
-- Content tables
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text unique not null,
  category        text,
  location        text,
  completion_date date,
  client_name     text,
  short_desc      text,
  full_desc       text,
  cover_url       text,
  status          text not null default 'Completed',  -- Completed | Ongoing | Upcoming
  -- Supplementary display fields for the public detail page (scope, size,
  -- duration, budget, challenge, solution). Optional; admin form manages the
  -- core brief fields above, seeded projects keep their richer detail here.
  details         jsonb not null default '{}'::jsonb,
  featured        boolean not null default false,
  archived        boolean not null default false,
  display_order   int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists projects_order_idx on public.projects (display_order);

create table if not exists public.project_images (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  url         text not null,
  sort        int not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists project_images_project_idx on public.project_images (project_id);

create table if not exists public.services (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique,
  icon          text,
  short_desc    text,
  full_desc     text,
  image_url     text,
  featured      boolean not null default false,
  archived      boolean not null default false,
  display_order int not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  quote         text not null,
  name          text not null,
  role          text,
  company       text,
  rating        int not null default 5,
  photo_url     text,
  featured      boolean not null default false,
  display_order int not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists public.partners (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  logo_url      text,
  website       text,
  featured      boolean not null default false,
  display_order int not null default 0,
  created_at    timestamptz not null default now()
);

-- Homepage sections stored as key -> JSON blob (hero, stats, about, why_us, cta, footer...)
create table if not exists public.homepage_content (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Global site settings as a single-row JSON document (id = 1)
create table if not exists public.site_settings (
  id          int primary key default 1,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

create table if not exists public.gallery_albums (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text,
  display_order int not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id            uuid primary key default gen_random_uuid(),
  album_id      uuid references public.gallery_albums(id) on delete set null,
  url           text not null,
  caption       text,
  tags          text[] default '{}',
  featured      boolean not null default false,
  display_order int not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists public.media_files (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  url         text not null,
  path        text not null,
  mime        text,
  size        bigint,
  created_at  timestamptz not null default now()
);

-- Public contact form submissions
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  is_read     boolean not null default false,
  archived    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Audit trail
create table if not exists public.activity_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users(id) on delete set null,
  actor_name  text,
  action      text not null,          -- e.g. 'created', 'updated', 'deleted', 'login'
  entity      text,                   -- e.g. 'project', 'service'
  entity_id   text,
  meta        jsonb default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists activity_log_created_idx on public.activity_log (created_at desc);

-- In-dashboard notifications
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  body        text,
  type        text default 'info',
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Lightweight placeholder traffic metric (until a real analytics source exists)
create table if not exists public.traffic_metrics (
  id          uuid primary key default gen_random_uuid(),
  day         date not null default current_date,
  visitors    int not null default 0,
  pageviews   int not null default 0,
  created_at  timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- updated_at trigger
-- -----------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

-- Auto-create a profile row when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', new.email))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- Row-Level Security
-- =============================================================================
alter table public.profiles          enable row level security;
alter table public.projects          enable row level security;
alter table public.project_images    enable row level security;
alter table public.services          enable row level security;
alter table public.testimonials      enable row level security;
alter table public.partners          enable row level security;
alter table public.homepage_content  enable row level security;
alter table public.site_settings     enable row level security;
alter table public.gallery_albums    enable row level security;
alter table public.gallery_images    enable row level security;
alter table public.media_files       enable row level security;
alter table public.contact_messages  enable row level security;
alter table public.activity_log      enable row level security;
alter table public.notifications     enable row level security;
alter table public.traffic_metrics   enable row level security;

-- Profiles: a user can read/update their own row; admins can read all.
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Only super admins may manage (insert/delete/role-change) other admin accounts.
drop policy if exists profiles_super_manage on public.profiles;
create policy profiles_super_manage on public.profiles
  for all using (public.is_super_admin()) with check (public.is_super_admin());

-- Public content: anyone can SELECT; only admins can write.
-- (Reusable pattern applied per table.)
do $$
declare t text;
begin
  foreach t in array array[
    'projects','project_images','services','testimonials','partners',
    'homepage_content','site_settings','gallery_albums','gallery_images'
  ] loop
    execute format('drop policy if exists %I_public_read on public.%I;', t, t);
    execute format('create policy %I_public_read on public.%I for select using (true);', t, t);
    execute format('drop policy if exists %I_admin_write on public.%I;', t, t);
    execute format('create policy %I_admin_write on public.%I for all using (public.is_admin()) with check (public.is_admin());', t, t);
  end loop;
end $$;

-- traffic_metrics: public read (dashboard/site), admin write.
drop policy if exists traffic_public_read on public.traffic_metrics;
create policy traffic_public_read on public.traffic_metrics for select using (true);
drop policy if exists traffic_admin_write on public.traffic_metrics;
create policy traffic_admin_write on public.traffic_metrics for all using (public.is_admin()) with check (public.is_admin());

-- media_files, activity_log, notifications: admin-only (no public read).
do $$
declare t text;
begin
  foreach t in array array['media_files','activity_log','notifications'] loop
    execute format('drop policy if exists %I_admin_all on public.%I;', t, t);
    execute format('create policy %I_admin_all on public.%I for all using (public.is_admin()) with check (public.is_admin());', t, t);
  end loop;
end $$;

-- contact_messages: the public form may INSERT; only admins may read/update/delete.
drop policy if exists contact_public_insert on public.contact_messages;
create policy contact_public_insert on public.contact_messages
  for insert with check (true);
drop policy if exists contact_admin_read on public.contact_messages;
create policy contact_admin_read on public.contact_messages
  for select using (public.is_admin());
drop policy if exists contact_admin_modify on public.contact_messages;
create policy contact_admin_modify on public.contact_messages
  for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists contact_admin_delete on public.contact_messages;
create policy contact_admin_delete on public.contact_messages
  for delete using (public.is_admin());

-- =============================================================================
-- Storage buckets (public read; writes restricted to admins by policy)
-- =============================================================================
insert into storage.buckets (id, name, public) values ('projects', 'projects', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('services', 'services', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('media', 'media', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('branding', 'branding', true)
  on conflict (id) do nothing;

drop policy if exists storage_public_read on storage.objects;
create policy storage_public_read on storage.objects
  for select using (bucket_id in ('projects','services','gallery','media','branding'));

drop policy if exists storage_admin_write on storage.objects;
create policy storage_admin_write on storage.objects
  for insert with check (
    bucket_id in ('projects','services','gallery','media','branding') and public.is_admin()
  );

drop policy if exists storage_admin_update on storage.objects;
create policy storage_admin_update on storage.objects
  for update using (
    bucket_id in ('projects','services','gallery','media','branding') and public.is_admin()
  );

drop policy if exists storage_admin_delete on storage.objects;
create policy storage_admin_delete on storage.objects
  for delete using (
    bucket_id in ('projects','services','gallery','media','branding') and public.is_admin()
  );

-- =============================================================================
-- NEXT STEP — create your first Super Admin (run AFTER this script):
--   1. Dashboard → Authentication → Users → "Add user" → enter email + password
--      (leave "Auto Confirm User" ON).
--   2. Copy that user's UID, then run:
--        update public.profiles set role = 'super_admin', name = 'Your Name'
--        where id = '<PASTE-UID-HERE>';
--   3. Dashboard → Authentication → URL Configuration → set Site URL to your
--      dev/prod origin (e.g. http://localhost:5173) so password-reset links work.
-- Seed content (projects/services/etc.) is loaded from the app the first time an
-- admin opens the dashboard, or run supabase/seed.sql if you prefer SQL seeding.
-- =============================================================================
