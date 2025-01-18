import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import SelectTournament from "../tournament/selectTournament";
import CookerChangeUser from "./CookerChangeUser";

const CookerLogin = (props) => {
    // React States
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [user, setUser] = useState({});
    const [nextForm, setNextForm] = useState("");
    const [values, setValues] = React.useState({
        uname: '',
        pass: ''
    });

    React.useEffect(() => {
        if ((user.user !== undefined) || (user.txtError !== undefined)) {
            if (user.txtError) {
                toast.error(user.txtError);
                setNextForm("");
            } else {
                toast.success('Usuario válido.\nBienvenido al sistema.');
                console.log("USERNAME: " + user.user.username.toLowerCase());
                // Si no se ha cambiado nunca las credenciales hay que cambiarlas.
                if ((user.user.username.toLowerCase().startsWith("user")) || (user.user.password.toLowerCase().startsWith("pass"))) {
                    console.log("HAY QUE CAMBIAR CREDENCIALES");
                    setNextForm("CHGCRE");
                } else {
                    setNextForm("SELTOU");
                }
                // Ponemos los campos de login "readonly" para que el usuario seleccione el torneo si no tiene que cambiar las credenciales.
                setIsReadOnly(true);
            }
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const { uname, pass } = values

    // Validación de credenciales en servidor
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        const { uname, pass } = values

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: uname,
                password: pass
            })
        };

        console.log('SUBMIT FORMULARIO LOGIN - LANZA PETICIÓN FETCH: ' + process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_USERS + process.env.REACT_APP_API_VOTE_USERS_LOGIN);
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_USERS + process.env.REACT_APP_API_VOTE_USERS_LOGIN, requestOptions)
            .then(response => response.json())
            .then((aUser) => {
                if ((aUser.user !== undefined) && (aUser.txtError === undefined)) {
                    props.userEvent(aUser.user);
                    setUser(aUser);
                } else {
                    toast.error(aUser.txtError);
                }
            })
            .catch(e => {
                alert("Error conexión Servidor: " + e);
                console.log(e); 
                return e;
                });
    };

    // Formulario para introducir las credenciales.
    const renderForm = (
        <div>
            {(nextForm === "") &&
                <Grid container spacing={1} padding="50px" id="loginForm">
                    <Grid item xs={12}
                        display="flex"
                        justifyContent="center"
                    >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 },
                                boxShadow: 3,
                                maxWidth: 250,
                                p: 2,
                                opacity: isReadOnly ? 0.6 : 1
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <div>
                                <Typography variant="h6" gutterBottom component="div" display="flex" justifyContent="center">Inicia sesión</Typography>
                                <TextField
                                    id="outlined-number"
                                    label="Usuario"
                                    type="text"
                                    name="uname"
                                    value={uname}
                                    onChange={handleChange}
                                    disabled={isReadOnly}
                                />
                                <TextField
                                    id="outlined-number2"
                                    label="Contraseña"
                                    type="password"
                                    name="pass"
                                    value={pass}
                                    onChange={handleChange}
                                    disabled={isReadOnly}
                                />
                                <Box m={1}>
                                    <Button type="submit" variant="outlined" startIcon={<SendIcon />} disabled={isReadOnly}>
                                        Enviar
                                    </Button>
                                </Box>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            }
            {(nextForm === "CHGCRE") &&
                <CookerChangeUser user={user.user} changeStateUserEvent={props.userEvent} loginEvent={props.loginEvent} />
            }
            {((nextForm === "SELTOU") && (user.user !== undefined)) &&
                <SelectTournament user={user.user} loginEvent={props.loginEvent} />
            }
        </div >
    );

    return (
        <div>
            {renderForm}
        </div>
    );
}

export default CookerLogin