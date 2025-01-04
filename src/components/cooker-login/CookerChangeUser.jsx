import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import SelectTournament from "../tournament/selectTournament";

const CookerChangeUser = (props) => {
    const [isChanged, setIsChanged] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [values, setValues] = React.useState({
        username: '',
        pass: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const { username, pass } = values

    //todo: Hay que enviar las credenciales al servidor.
    // Modificar de credenciales en servidor
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var error = false;

        const { username, pass } = values

        if (pass.toLowerCase().startsWith("pass")) {
            console.log("ERROR PASSWORD");
            setErrorMessages({ name: "pass", message: errors.pass });
            error = true;
        }

        if ((username.toLowerCase().startsWith("user")) || (username === pass)) {
            setErrorMessages({ name: "username", message: errors.username });
            error = true;
        }

        if (!error) {
            setErrorMessages({});

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: props.user.id,
                    name: props.user.name,
                    username: username,
                    password: pass
                })
            };
            console.log("USER JSON " + requestOptions.body);

            console.log('SUBMIT FORMULARIO CHANGE CREDENTIALS USER - LANZA PETICIÓN FETCH: ' + process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_USERS + process.env.REACT_APP_API_VOTE_USERS_LOGIN);
            fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_USERS, requestOptions)
                .then(response => response.json())
                .then((aUser) => {
                    if ((aUser.user !== undefined) && (aUser.txtError === undefined)) {
                        toast.success("Cambio de usuario/password correcto.");
                        props.changeStateUserEvent(aUser.user)
                        if (props.pageReturn !== undefined) {
                            props.loginEvent(-1, -1, props.pageReturn);
                        }
                        setIsChanged(true);
                    } else {
                        toast.error((aUser.txtError === undefined) ? "Error actualización credenciales" :  "Error: " + aUser.txtError);
                    }
                });
        }
    };

    const errors = {
        username: `Usuario invalido.\n No puede empezar por 'user' ni ser igual al password.`,
        pass: "Password invalido.\n No puede empezar por 'pass' ni ser igual al username."
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <Typography variant="caption" display="block" gutterBottom padding="0px 0px 0px 13px" style={{ whiteSpace: "pre-line" }}>
                {errorMessages.message}
            </Typography>
        );

    const renderForm = (
        <div>
            {(!isChanged)
                ?
                <Grid container spacing={1} padding="50px">
                    <Grid item xs={12}
                        display="flex"
                        justifyContent="center"
                    >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 },
                                boxShadow: 3,
                                maxWidth: 350,
                                p: 2
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            display="block"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <div>
                                <Typography variant="h6" gutterBottom component="div" display="flex" justifyContent="center">Cambio credenciales</Typography>
                                <TextField
                                    id="username"
                                    label="Nuevo Usuario"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                                {renderErrorMessage("username")}
                                <TextField
                                    id="pass"
                                    label="Nueva Contraseña"
                                    type="password"
                                    name="pass"
                                    value={pass}
                                    onChange={handleChange}
                                />
                                {renderErrorMessage("pass")}
                                <Box m={1}>
                                    <Button type="submit" variant="outlined" startIcon={<SendIcon />}>
                                        Enviar
                                    </Button>
                                </Box>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                :
                <SelectTournament user={props.user} loginEvent={props.loginEvent} />
            }
        </div >
    );

    return (
        <div>
            {renderForm}
        </div>
    );
}

export default CookerChangeUser