const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const authController = {
    //Registro de usuario
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await User.create({ 
                username, 
                email, 
                password 
            });

            //Generar token
            const token = jwt.sign(
                { id: user.id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );

            res.status(201).json({ 
                message: 'Usuario registrado exitosamente', 
                token 
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al registrar el usuario', 
                error: error.message 
            });
        }
    },

    login: async (req, res) => {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({
                    message: 'Usuario no encontrado' 
                });
            }

            const isValidPassword = await user.validPassword(password);
            if (!isValidPassword) {
                return res.status(401).json({
                    message: 'Contraseña incorrecta'
                });
            }

            const token = jwt.sign(
                { id: user.id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );

            res.status(200).json({ 
                message: 'Inicio de sesión exitoso', 
                token 
            });

        } catch (error) {
            res.status(500).json({ 
                message: 'Error al iniciar sesión', 
                error: error.message 
            });
        }
    }
};

module.exports = authController;