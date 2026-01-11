create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

alter table public.notes enable row level security;

create policy "Users can view own notes"
on public.notes for select
using (auth.uid() = user_id);

create policy "Users can insert own notes"
on public.notes for insert
with check (auth.uid() = user_id);

create policy "Users can delete own notes"
on public.notes for delete
using (auth.uid() = user_id);
