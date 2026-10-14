import { Suspense } from 'react'
import { createClient } from './utils/supabase/server'
import { cookies } from 'next/headers'
import { CreateTodoForm } from './todos-form'
import { TodoItem } from './todo-item'

async function Todos() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase
    .from('todos')
    .select('id, name')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(`Não foi possível carregar tarefas: ${error.message}`)
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
      <header>
        <h1 className="text-3xl font-bold">Tarefas</h1>
        <p className="mt-1 text-muted-foreground">Crie, edite e exclua tarefas.</p>
      </header>
      <CreateTodoForm />
      {todos.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} id={todo.id} name={todo.name} />
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">
          Nenhuma tarefa cadastrada.
        </p>
      )}
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<ul />}>
      <Todos />
    </Suspense>
  )
}