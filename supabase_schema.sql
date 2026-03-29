-- =============================================
-- EA-B.R MED Platform — Database Schema v2
-- Сначала удаляем старые политики, потом создаём
-- =============================================

-- Таблицы (if not exists — безопасно)
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  contract_signed_at timestamptz,
  contract_ip text,
  created_at timestamptz default now()
);

create table if not exists module_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  module_id text not null,
  completed_at timestamptz default now(),
  unique(user_id, module_id)
);

create table if not exists quiz_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  module_id text not null,
  score integer not null,
  passed boolean not null,
  attempt_number integer not null default 1,
  created_at timestamptz default now()
);

create table if not exists access_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  action text not null,
  module_id text,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

-- RLS включаем
alter table profiles enable row level security;
alter table module_progress enable row level security;
alter table quiz_results enable row level security;
alter table access_log enable row level security;

-- Удаляем старые политики (если есть)
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Admin can view all profiles" on profiles;
drop policy if exists "Users can manage own progress" on module_progress;
drop policy if exists "Users can manage own quiz results" on quiz_results;
drop policy if exists "Users can insert own logs" on access_log;
drop policy if exists "Admin can view all logs" on access_log;

-- Создаём политики заново
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Admin can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Users can manage own progress"
  on module_progress for all
  using (auth.uid() = user_id);

create policy "Users can manage own quiz results"
  on quiz_results for all
  using (auth.uid() = user_id);

create policy "Users can insert own logs"
  on access_log for insert
  with check (auth.uid() = user_id);

create policy "Admin can view all logs"
  on access_log for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Триггер: создать профиль при регистрации
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
