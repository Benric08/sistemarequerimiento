import React, { useState } from 'react'
import { TextField, Button, Grid, Typography, Link, FormControl, Container } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
export default function Login() {
    const navigate = useNavigate();
    const sigIn = useSignIn();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ nombre_usuario: '', password: '' });
    const handleChangeFormData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
        <Container maxWidth="xs">
            <form onSubmit={handleOnSubmit}>

                <Grid container spacing={2} sx={{alignItems:"center" , justifyContent:"center"}}>
                    <Grid item xs={12} align='center' >
                        <Typography variant="h4" component="h3" gutterBottom>
                            Iniciar sesión
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align='center'  >
                        <FormControl sx={{ m: 1, width: '25ch' }}>
                            <TextField
                                label="Usuario"
                                name='nombre_usuario'
                                variant="outlined"
                                onChange={handleChangeFormData}
                                value={formData.usuario}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <FormControl sx={{ m: 1, width: '25ch' }}>
                            <OutlinedInput
                                label="Contraseña"
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }

                                onChange={handleChangeFormData}
                                value={formData.password}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Button variant="contained" color="primary" type="submit">
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Button variant="contained" color="secondary">
                            <Link color='inherit' href="https://app.powerbi.com/links/CGUynGyqkF?ctid=29e51c24-6ce5-47aa-8260-0517205aee84&pbi_source=linkShare" underline="none">
                                Transparencia
                            </Link>
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Container>

    )
}
