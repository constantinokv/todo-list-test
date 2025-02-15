import React, { useState, useEffect } from 'react';  // Agregamos useEffect
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { taskService } from '../../services/task.service';

function TaskForm({ open, handleClose, task = null, onTaskSaved }) {
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        due_date: ''
    });

    // Actualizar el formulario cuando cambia la tarea seleccionada
    useEffect(() => {
        console.log('Task recibida en TaskForm:', task); 

        if (task) {
            setFormData({
                id: task.id,
                title: task.title || '',
                description: task.description || '',
                due_date: task.due_date || ''
            });
        } else {
            // Limpiar el formulario si es nueva tarea
            setFormData({
                id: null,
                title: '',
                description: '',
                due_date: ''
            });
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Crear objeto de datos sin fecha si está vacía
            const taskData = {
                title: formData.title,
                description: formData.description,
                ...(formData.due_date && { due_date: formData.due_date }) // Solo incluye due_date si existe
            };

            if (formData.id) {
                // Editar tarea existente
                await taskService.updateTask(formData.id, taskData);
            } else {
                // Crear nueva tarea
                await taskService.createTask(taskData);
            }
            onTaskSaved();
            handleClose();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{formData.id ? 'Editar Tarea' : 'Nueva Tarea'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Título"
                    fullWidth
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <TextField
                    margin="dense"
                    label="Fecha límite"
                    type="date"
                    fullWidth
                    value={formData.due_date}
                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit} color="primary">
                    {formData.id ? 'Actualizar' : 'Crear'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskForm;