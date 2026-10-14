'use client'

import { useActionState } from 'react'
import { deleteTodo, updateTodo, type TodoActionState } from './actions/todos'

type TodoItemProps = {
  id: number
  name: string
}

const initialState: TodoActionState = {}

export function TodoItem({ id, name }: TodoItemProps) {
  const [updateState, updateAction, updating] = useActionState(updateTodo, initialState)
  const [deleteState, deleteAction, deleting] = useActionState(deleteTodo, initialState)

  return (
    <li className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <form action={updateAction} className="flex min-w-0 flex-1 gap-2">
          <input type="hidden" name="id" value={id} />
          <input
            name="name"
            required
            defaultValue={name}
            className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2"
          />
          <button
            type="submit"
            disabled={updating || deleting}
            className="rounded-md border border-border px-3 py-2 disabled:opacity-50"
          >
            {updating ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            disabled={updating || deleting}
            className="w-full rounded-md bg-destructive px-3 py-2 text-destructive-foreground disabled:opacity-50 sm:w-auto"
          >
            {deleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </form>
      </div>
      {(updateState.error || deleteState.error) && (
        <p className="mt-2 text-sm text-destructive">
          {updateState.error || deleteState.error}
        </p>
      )}
      {(updateState.success || deleteState.success) && (
        <p className="mt-2 text-sm text-green-700">
          {updateState.success || deleteState.success}
        </p>
      )}
    </li>
  )
}
