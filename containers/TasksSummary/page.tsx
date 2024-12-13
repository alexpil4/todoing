'use client';
import { useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Fab, CircularProgress, Backdrop, Tooltip, Box } from '@mui/material';

import { createTask, updateTask, deleteTask } from './actions';
import { TaskItem, TaskItemToAdd, TaskItemToEdit } from '../../types/Task';
import TasksTable from '@/components/TasksTable';
import TaskSection from '@/components/TaskSection';

interface Props {
  initialTasks: TaskItem[];
}
interface ShowTask {
  show: boolean;
  task?: TaskItem;
}

const showTaskInitialState = {
  show: false,
};

export default function TasksSummary({ initialTasks }: Props) {
  // Internal state
  const [taskList, setTaskList] = useState<TaskItem[]>(initialTasks);
  const [showTask, setShowTask] = useState<ShowTask>(showTaskInitialState);
  const [loading, setLoading] = useState<boolean>(false);

  // CREATE task
  const handleSubmit = async (task: TaskItemToAdd) => {
    setLoading(true);
    try {
      const newTask = await createTask(task);
      setTaskList((prevList) => [...prevList, newTask]);
      setShowTask(showTaskInitialState);
    } catch (error) {
      console.error('Error adding task:', error);
    }
    setLoading(false);
  };

  // UPDATE task
  const handleUpdateTask = async (task: TaskItemToEdit) => {
    setLoading(true);
    try {
      const updatedTask = await updateTask(task);
      setTaskList((prevList) =>
        prevList.map((prevTask) => (prevTask._id === updatedTask._id ? updatedTask : prevTask)),
      );
      setShowTask(showTaskInitialState);
    } catch (error) {
      console.error('Error editing task:', error);
    }
    setLoading(false);
  };

  // DELETE task
  const handleDeleteTask = async (id: string) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setLoading(false);
  };

  const handleCancel = () => setShowTask(showTaskInitialState);

  const showTaskSection = (task?: TaskItem) => {
    // UPDATE TASK
    if (task) setShowTask({ task, show: true });
    // CREATE TASK
    else setShowTask({ show: true });
  };

  if (loading && !taskList)
    return (
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      {taskList.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          Ops, still not task here!
        </Box>
      )}
      <TaskSection
        submit={handleSubmit}
        editTask={handleUpdateTask}
        isOpen={showTask.show}
        task={showTask.task}
        handleClose={handleCancel}
      />

      {taskList.length > 0 && (
        <TasksTable
          tasks={taskList}
          handleDone={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={(task) => showTaskSection(task)}
        />
      )}

      {!showTask.show && (
        <Tooltip title="Write a new task">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => showTaskSection()}
            style={{
              position: 'fixed',
              bottom: '40px',
              right: '40px',
              zIndex: 1000,
            }}
          >
            <PlaylistAddIcon />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}
