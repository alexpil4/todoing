'use server';

import { TaskItem } from '@/types/Task';

const API_URL = process.env.REACT_APP_API_URL;

export async function readTasks(): Promise<TaskItem[]> {
  const res = await fetch(`${API_URL}/tasks`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error fetching tasks');
  return res.json();
}
