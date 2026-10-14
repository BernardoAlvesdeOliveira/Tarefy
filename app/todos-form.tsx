'use client'

import { useActionState } from 'react'
import { createTodo, type TodoActionState } from './actions/todos'

const initialState: TodoActionState = {}

export function CreateTodoForm() {
  const [state, formAction, pending] = useActionState(createTodo, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex min-w-0 gap-2">
        <input
          name="name"
          required
          placeholder="Nova tarefa"
          className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {pending ? 'Criando...' : 'Criar'}
        </button>
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && <p className="text-sm text-green-700">{state.success}</p>}
    </form>
  )
}
