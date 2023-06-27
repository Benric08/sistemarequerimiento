import React, { useState } from 'react'
import { TextField, Button, Grid, Typography, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'

export default function Login() {
    const navigate = useNavigate();
    const sigIn = useSignIn();
    const [formData, setFormData] = useState({ nombre_usuario: '', password: '' });
    const handleChangeFormData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('usuario/token', formData);
            const isloged = sigIn({
                token: response.data.token,
                expiresIn: 3000,
                tokenType: 'Bearer',
                authState: { usuario: formData.nombre_usuario }
            })
            if (isloged) {
                console.log('imprimimos locstio');
                navigate('/')
            } else {

            }

        } catch (error) {
            console.log('consoloLogacces', error.response.data.error);
            alert(error.response.data.error)
        }
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Iniciar sesión
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Usuario"
                        name='nombre_usuario'
                        variant="outlined"
                        onChange={handleChangeFormData}
                        value={formData.usuario}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Contraseña"
                        name='password'
                        type="password"
                        variant="outlined"
                        onChange={handleChangeFormData}
                        value={formData.password}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary">
                        <Link href="https://app.powerbi.com/links/CGUynGyqkF?ctid=29e51c24-6ce5-47aa-8260-0517205aee84&pbi_source=linkShare" underline="none">
                            Transparencia
                        </Link>
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
