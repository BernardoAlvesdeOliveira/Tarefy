'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '../utils/supabase/server'

export type TodoActionState = {
  error?: string
  success?: string
}

async function getSupabase() {
  return createClient(await cookies())
}

function getTodoName(formData: FormData) {
  const name = formData.get('name')

  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Informe um nome para a tarefa.')
  }

  return name.trim()
}

function getTodoId(formData: FormData) {
  const id = Number(formData.get('id'))

  if (!Number.isInteger(id) || id < 1) {
    throw new Error('Tarefa inválida.')
  }

  return id
}

export async function createTodo(
  _previousState: TodoActionState,
  formData: FormData,
): Promise<TodoActionState> {
  try {
    const supabase = await getSupabase()
    const { error } = await supabase.from('todos').insert({ name: getTodoName(formData) })

    if (error) throw error

    revalidatePath('/')
    return { success: 'Tarefa criada.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Não foi possível criar a tarefa.' }
  }
}

export async function updateTodo(
  _previousState: TodoActionState,
  formData: FormData,
): Promise<TodoActionState> {
  try {
    const supabase = await getSupabase()
    const { error } = await supabase
      .from('todos')
      .update({ name: getTodoName(formData) })
      .eq('id', getTodoId(formData))

    if (error) throw error

    revalidatePath('/')
    return { success: 'Tarefa atualizada.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Não foi possível atualizar a tarefa.' }
  }
}

export async function deleteTodo(
  _previousState: TodoActionState,
  formData: FormData,
): Promise<TodoActionState> {
  try {
    const supabase = await getSupabase()
    const { error } = await supabase.from('todos').delete().eq('id', getTodoId(formData))

    if (error) throw error

    revalidatePath('/')
    return { success: 'Tarefa excluída.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Não foi possível excluir a tarefa.' }
  }
}
