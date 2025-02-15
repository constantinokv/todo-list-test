const { Task } = require('../models');

const taskController = {
    //Obtener todas las tareas
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.findAll({ 
                where: { user_id: req.user.id } 
            });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las tareas', 
                error: error.message 
            });
        }
    },

    //Obtener una tarea especifica
    getTask: async (req, res) => {
        try {
            const task = await Task.findOne({
                where: { 
                    id: req.params.id, 
                    user_id: req.user.id 
                }
            });

            if (!task) {
                return res.status(404).json({
                    message: 'Tarea no encontrada'
                });
            }

            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la tarea', 
                error: error.message 
            });
        }
    },

    //Crear una nueva tarea
    createTask: async (req, res) => {
        try {
            console.log('User:', req.user); // Verifica que el usuario esté en la request
            console.log('Body:', req.body); // Verifica los datos recibidos
          
            const { title, description, due_date } = req.body;
            const task = await Task.create({
                user_id: req.user.id,
                title, 
                description, 
                due_date 
            });

            console.log('Task created:', task); // Verifica la tarea creada
            res.status(201).json(task);
        } catch (error) {
            console.error('Error creating task:', error); // Verifica el error
            res.status(500).json({ 
                message: 'Error al crear la tarea', 
                error: error.message });
        }
    },

    //Actualizar una tarea existente
    updateTask: async (req, res) => {
       try{
         const task = await Task.findOne({
            where: { 
                id: req.params.id, 
                user_id: req.user.id 
            }
         });

         if(!task) {
            return res.status(404).json({
                message: 'Tarea no encontrada'
            });
         }

         await task.update(req.body);
         res.status(200).json(task);
       } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la tarea', 
            error: error.message 
        }); 
       }
    },

    //Eliminar una tarea
    deleteTask: async (req, res) => {
        try {
            const task = await Task.findOne({
                where: { 
                    id: req.params.id, 
                    user_id: req.user.id 
                }
            });

            if (!task) {
                return res.status(404).json({ 
                    message: 'Tarea no encontrada' });
            }
            await task.destroy();
            res.json({ message: 'Tarea eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al eliminar la tarea', 
                error: error.message });
        }
    }
};

module.exports = taskController;