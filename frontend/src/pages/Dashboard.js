import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { 
    Delete as DeleteIcon, 
    Edit as EditIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as UncheckedIcon 
} from '@mui/icons-material';
import { taskService } from '../services/task.service';
import TaskForm from '../components/TaskForm/TaskForm';
import Navbar from '../components/Layout/Navbar';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await taskService.getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        console.log('Editando tarea:', task);
        setSelectedTask(task);
        setOpenTaskForm(true);
    };

    const handleCloseForm = () => {
        setOpenTaskForm(false);
        setSelectedTask(null);
    };

    const handleNewTask = () => {
        setSelectedTask(null);
        setOpenTaskForm(true);
    };

    const handleToggleStatus = async (task) => {
        try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            await taskService.updateTaskStatus(task.id, newStatus);
            loadTasks(); // Recargar la lista
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Mis Tareas
            </Typography>
            
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 3 }}
                onClick={handleNewTask}
            >
                Nueva Tarea
            </Button>

            <List>
                {tasks.map((task) => (
                    <ListItem
                        key={task.id}
                        sx={{ 
                            mb: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            boxShadow: 1
                        }}
                    >   
                        <IconButton onClick={() => handleToggleStatus(task)}>
                            {task.status === 'completed' ? 
                                <CheckCircleIcon color="success" /> : 
                                <UncheckedIcon />
                            }
                        </IconButton>
                        <ListItemText
                                primary={
                                    <Typography
                                        sx={{
                                            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                            color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                                        }}
                                    >
                                        {task.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography 
                                            component="span" 
                                            variant="body2"
                                            sx={{
                                                textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                                            }}
                                        >
                                            {task.description}
                                        </Typography>
                                        {task.due_date && (
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ display: 'block', color: 'text.secondary' }}
                                            >
                                                Fecha límite: {new Date(task.due_date).toLocaleDateString()}
                                            </Typography>
                                        )}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                            <IconButton 
                                    edge="end" 
                                    aria-label="edit" 
                                    sx={{ mr: 1 }}
                                    onClick={() => handleEdit(task)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    edge="end" 
                                    aria-label="delete"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <TaskForm 
                open={openTaskForm}
                handleClose={handleCloseForm}
                task={selectedTask}
                onTaskSaved={loadTasks}
            />
        </Container>
        </>
    );
}

export default Dashboard;