-- The `people` table behind /changemakers.
--
-- Apply in the Supabase SQL editor (project `dd-collective`). The table carries
-- no leadership demographics, faith alignment, giving level or amount: the
-- public data layer does not have those fields, and that is the surest way to
-- keep internal screening taxonomy off a public site.
--
-- Consent is enforced here, not just in app code. A row is readable by the
-- public only when it is published AND carries a real consent date, so a
-- profile cannot reach the page because a query forgot to filter.

create table if not exists public.people (
  slug              text primary key,
  name              text not null,
  role              text,
  bio               text not null default '',
  affiliation       text,
  affiliation_url   text,
  photo_url         text,
  photo_alt         text,
  sort_order        integer not null default 0,
  is_published      boolean not null default false,
  consent_received_at date,
  created_at        timestamptz not null default now()
);

alter table public.people enable row level security;

-- Visitors: published and consented only.
drop policy if exists people_public_read on public.people;
create policy people_public_read on public.people
  for select
  to anon, authenticated
  using (is_published and consent_received_at is not null);

-- Staff: every row, so a profile can be reviewed and sent to the person for
-- approval before any consent date exists. Mirrors the partners policy.
drop policy if exists people_staff_read on public.people;
create policy people_staff_read on public.people
  for select
  to authenticated
  using (auth.uid() is not null);

drop policy if exists people_staff_write on public.people;
create policy people_staff_write on public.people
  for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
