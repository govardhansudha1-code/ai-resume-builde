-- Create the resumes table
create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  personal_info jsonb default '{}'::jsonb,
  professional_summary text default '',
  experience jsonb default '[]'::jsonb,
  education jsonb default '[]'::jsonb,
  skills jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.resumes enable row level security;

-- Create policies
create policy "Users can view their own resumes"
  on public.resumes for select
  using ( auth.uid() = user_id );

create policy "Users can create their own resumes"
  on public.resumes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own resumes"
  on public.resumes for update
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

create policy "Users can delete their own resumes"
  on public.resumes for delete
  using ( auth.uid() = user_id );

-- Create trigger to automatically update the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
  before update on public.resumes
  for each row
  execute procedure public.handle_updated_at();
