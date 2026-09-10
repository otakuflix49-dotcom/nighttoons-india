create extension if not exists pgcrypto;

create table if not exists profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'user',
 created_at timestamptz not null default now()
);

create table if not exists anime(
 id uuid primary key default gen_random_uuid(),
 name text not null,
 slug text not null unique,
 image_url text,
 description text not null default 'AVAILABLE IN HINDI DUBBED',
 published boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists anime_links(
 id uuid primary key default gen_random_uuid(),
 anime_id uuid not null references anime(id) on delete cascade,
 label text not null,
 url text not null,
 sort_order integer not null default 0,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists telegram_channels(
 id uuid primary key default gen_random_uuid(),
 slot integer not null unique check(slot between 1 and 3),
 title text not null,
 description text,
 button_text text not null default 'JOIN CHANNEL',
 channel_url text not null,
 active boolean not null default true,
 updated_at timestamptz not null default now()
);

create table if not exists site_visits(
 id uuid primary key default gen_random_uuid(),
 visited_at timestamptz not null default now(),
 path text,
 session_hash text
);

create index if not exists anime_slug_idx on anime(slug);
create index if not exists anime_created_idx on anime(created_at desc);
create index if not exists anime_links_anime_idx on anime_links(anime_id);
create index if not exists visits_time_idx on site_visits(visited_at);

alter table anime enable row level security;
alter table anime_links enable row level security;
alter table telegram_channels enable row level security;
alter table site_visits enable row level security;

drop policy if exists "public read published anime" on anime;
create policy "public read published anime" on anime for select using (published=true);

drop policy if exists "public read links of published anime" on anime_links;
create policy "public read links of published anime" on anime_links for select using (
 exists(select 1 from anime a where a.id=anime_id and a.published=true)
);

drop policy if exists "public read active telegram" on telegram_channels;
create policy "public read active telegram" on telegram_channels for select using (active=true);

-- Create a Storage bucket named anime-posters and make it public.
insert into storage.buckets(id,name,public)
values('anime-posters','anime-posters',true)
on conflict(id) do update set public=true;

-- IMPORTANT:
-- All admin writes in this starter are performed server-side with the service-role key
-- after requireOwner() checks the authenticated user's email.
-- Never expose SUPABASE_SERVICE_ROLE_KEY to browser code.
