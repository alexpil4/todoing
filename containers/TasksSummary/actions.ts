// app/actions/taskActions.ts
'use server';

import { TaskItem, TaskItemToAdd, TaskItemToEdit } from '@/types/Task';

const API_URL = process.env.REACT_APP_API_URL;

export async function createTask(task: TaskItemToAdd): Promise<TaskItem> {
  const res = await fetch(`${API_URL}/add-task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Error adding task');
  return res.json();
}

export async function updateTask(task: TaskItemToEdit): Promise<TaskItem> {
  const res = await fetch(`${API_URL}/edit-task`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Error editing task');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/delete-task`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id: id }),
  });
  if (!res.ok) throw new Error('Error deleting task');
}
