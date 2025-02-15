import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';  // Agregar Link aquí
import { setCredentials } from '../store/slices/authSlice';
import { authService } from '../services/auth.service';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Intentando login con:', { email, password }); // Debug
            const data = await authService.login(email, password);
            console.log('Respuesta del servidor:', data); // Debug
            dispatch(setCredentials(data));
            navigate('/dashboard');
        } catch (err) {
            console.error('Error completo:', err); // Debug detallado
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Iniciar Sesión
                </Typography>
                {error && (
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                    <Button
                        component={Link}
                        to="/register"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        ¿No tienes cuenta? Regístrate
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default Login;