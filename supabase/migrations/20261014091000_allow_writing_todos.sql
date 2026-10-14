create policy "Allow public insert access to todos"
on public.todos
for insert
to anon, authenticated
with check (true);

create policy "Allow public update access to todos"
on public.todos
for update
to anon, authenticated
using (true)
with check (true);

create policy "Allow public delete access to todos"
on public.todos
for delete
to anon, authenticated
using (true);
