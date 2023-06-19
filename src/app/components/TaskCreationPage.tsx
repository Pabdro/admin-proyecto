import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText } from '@mui/material';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  assignee: string;
  status: string;
}

const TaskCreationPage = memo(() => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
    assignee: ''
  });
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const newTask: Task = { ...task, id: Date.now(), status: getRandomStatus() };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setError('');
      clearFields();
    } else {
      setError('Por favor, completa todos los campos');
    }
  };

  const validateForm = () => {
    return task.title.trim() !== '' && task.description.trim() !== '' && task.deadline.trim() !== '' && task.assignee.trim() !== '';
  };

  const clearFields = () => {
    setTask({
      title: '',
      description: '',
      deadline: '',
      assignee: ''
    });
  };

  const getRandomStatus = () => {
    const statuses = ['Completado', 'En progreso'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  const completedTasks = useMemo(() => tasks.filter((task) => task.status === 'Completado'), [tasks]);
  const inProgressTasks = useMemo(() => tasks.filter((task) => task.status === 'En progreso'), [tasks]);

  return (
    <Container maxWidth="sm" color="secondary">
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Asignador de tareas
      </Typography>
      {error && (
        <Typography variant="body2" color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} color='secondary'>
        <TextField
          fullWidth
          label="Título"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          inputRef={taskInputRef}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Fecha límite"
          name="deadline"
          value={task.deadline}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Responsable asignado"
          name="assignee"
          value={task.assignee}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Asignar tarea
        </Button>
      </form>
      <br />
      <Typography variant="h6" component="h3" align="center" gutterBottom>
        Seguimiento de tareas
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primaryTypographyProps={{ variant: 'body1' }}
              secondaryTypographyProps={{ variant: 'body2' }}
              primary={task.title}
              secondary={
                <>
                  Descripción: {task.description}
                  <br />
                  Fecha límite: {task.deadline}
                  <br />
                  Responsable asignado: {task.assignee}
                  <br />
                  Estado: {task.status}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" align="left" gutterBottom>
        Tareas completadas: {completedTasks.length}
      </Typography>
      <Typography variant="subtitle1" align="left" gutterBottom>
        Tareas en progreso: {inProgressTasks.length}
      </Typography>
    </Container>
  );
});

export default TaskCreationPage;
