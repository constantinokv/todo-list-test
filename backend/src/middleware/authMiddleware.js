const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        // Verificar si existe el token en los headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'No token proporcionado'
            });
        }

        // Obtener el token
        const token = authHeader.split(' ')[1];

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Buscar el usuario
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: 'Usuario no encontrado'
            });
        }

        // Agregar el usuario a la request
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token inválido',
            error: error.message
        });
    }
};

module.exports = authMiddleware;