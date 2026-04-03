create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'pro', 'admin')),
  draft_profile jsonb not null default '{}'::jsonb,
  published_profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "Owners can read own profile rows" on public.profiles;
create policy "Owners can read own profile rows"
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Owners can insert own profile rows" on public.profiles;
create policy "Owners can insert own profile rows"
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Owners can update own profile rows" on public.profiles;
create policy "Owners can update own profile rows"
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.get_public_profile(requested_user_id uuid)
returns table (
  user_id uuid,
  plan text,
  published_profile jsonb
)
language sql
security definer
set search_path = public
as $$
  select profiles.user_id, profiles.plan, profiles.published_profile
  from public.profiles as profiles
  where profiles.user_id = requested_user_id
  limit 1;
$$;

grant execute on function public.get_public_profile(uuid) to anon, authenticated;
