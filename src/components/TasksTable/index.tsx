import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

import { TaskItem } from '../../types/Task';
import SearchBar from './../SearchBar';

interface Props {
  tasks: TaskItem[];
  handleDone: (task: TaskItem) => void;
  handleEditTask: (task: TaskItem) => void;
  handleDeleteTask: (id: string) => void;
}

export default function TasksTable(props: Props) {
  const { tasks, handleDeleteTask, handleEditTask, handleDone } = props;

  const handlePriority = (value: string) => {
    let color: 'error' | 'warning' | 'success' | 'primary' = 'primary';

    switch (value) {
      case 'high':
        color = 'error';
        break;
      case 'medium':
        color = 'warning';
        break;
      case 'low':
        color = 'primary';
        break;
      default:
        color = 'primary';
    }

    return (
      <Tooltip title={`${value} priority `}>
        <RocketLaunchIcon color={color} />
      </Tooltip>
    );
  };

  return (
    <TableContainer component={Paper}>
      <SearchBar tasks={tasks} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {tasks.map((task: TaskItem) => (
            <TableRow key={task._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <Tooltip title="username">
                <TableCell>
                  <Avatar src="https://i.ytimg.com/vi/iCQ0dJ6nJXo/maxresdefault.jpg">LP</Avatar>
                </TableCell>
              </Tooltip>
              <Tooltip title="time slot">
                <TableCell>
                  <Typography color="primary">
                    {task.fromTime}
                    {task.toTime && ` - ${task.toTime}`}
                  </Typography>
                </TableCell>
              </Tooltip>
              <Tooltip title="task description">
                <TableCell>{task.description}</TableCell>
              </Tooltip>
              <TableCell>{handlePriority(task.priority)}</TableCell>
              <Tooltip title="status">
                <TableCell>
                  {task.completed ? (
                    <Chip label="COMPLETED" color="success" />
                  ) : (
                    <Chip
                      label="PENDING"
                      onClick={() => handleDone({ ...task, completed: true })}
                      variant="outlined"
                      color="primary"
                    />
                  )}
                </TableCell>
              </Tooltip>

              <TableCell align="right">
                <IconButton onClick={() => handleEditTask(task)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task._id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
