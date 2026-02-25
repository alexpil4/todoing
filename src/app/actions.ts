'use server';
import { TaskItem } from '@/types/Task';

const API_URL = process.env.REACT_APP_API_URL;

export async function readTasks(): Promise<TaskItem[]> {
  try {
    const res = await fetch(`${API_URL}/tasks`, { cache: 'no-store' });
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
