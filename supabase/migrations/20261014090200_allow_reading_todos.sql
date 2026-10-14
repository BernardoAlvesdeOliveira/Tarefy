alter table public.todos enable row level security;

create policy "Allow public read access to todos"
on public.todos
for select
to anon, authenticated
using (true);
