import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';

const CookerChangeUser = (props) => {
    const [values, setValues] = React.useState({
        uname: '',
        username: '',
        pass: ''
    })

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_USERS + '/' + props.userId)
            .then(response => response.json())
            .then((aScoreCooker) => {
                setScoreCooker(aScoreCooker);
                setValues(aScoreCooker.score);
            });
    }, [props.userId]);
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const { uname, username, pass } = values

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('***** ENTRA EN HANDLE SUBMIT **********');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: props.Cooker.id,
                username: event.username,
                password: event.password,
                name: event.name
            })
        };
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_COOKERS + '/' + props.loggedCookerId, requestOptions)
            .then(response => {
                const data = response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                toast.success('Modificación datos usuario correcto.');
            })
            .catch(error => {
                toast.error('Error en la modificación de los datos de usuario.', error);
            });
        //Prevent page reload
//        event.preventDefault();

//        const { username, pass } = values

//        const userData = database.find((user) => user.username === username);
//        if (userData) {
//            if (userData.password !== pass) {
//                setErrorMessages({ name: "pass", message: errors.pass });
//            } else {
//                setIsSubmitted(true);
//                props.activePageEvent(0, userData.cookerId);
//            }
//        } else {
//            setErrorMessages({ name: "username", message: errors.username });
//        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <Typography variant="caption" display="block" gutterBottom padding="0px 0px 0px 13px">
                {errorMessages.message}
            </Typography>
        );

    const renderForm = (
        <div>
            <Grid container spacing={1} padding="50px">
                <Grid item xs={12}
                    display="flex"
                    justifyContent="center"
                >
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1},
                            boxShadow: 3,
                            maxWidth: 250,
                            p: 2
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div>
                            <Typography variant="h6" gutterBottom component="div" display="flex" justifyContent="center">Cambio usuario y/o contraseña</Typography>
                            <TextField
                                id="outlined-number"
                                label="Nuevo Nombre"
                                type="text"
                                name="uname"
                                value={uname}
                                onChange={handleChange}
                            />
                            {renderErrorMessage("uname")}
                            <TextField
                                id="outlined-number"
                                label="Nuevo Usuario"
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                            {renderErrorMessage("username")}
                            <TextField
                                id="outlined-number"
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
        </div >
    );

    return (
        <div>
                {isSubmitted
                    ? <div>User is successfully logged in</div>
                    : renderForm}
        </div>
    );
}

export default CookerChangeUser