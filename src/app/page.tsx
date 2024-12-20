import TasksSummary from '@/containers/TasksSummary/page';
import { readTasks } from './actions';

export default async function TaskSummary() {
  const tasks = await readTasks();
  return (
    <main>
      <TasksSummary initialTasks={tasks} />
    </main>
  );
}
