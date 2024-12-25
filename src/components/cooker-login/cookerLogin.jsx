import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import { red } from "@mui/material/colors";

const CookerLogin = (props) => {
    // React States
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [tournamentId, setTournamentId] = useState(-1);
    const [user, setUser] = useState({});
    const [values, setValues] = React.useState({
        uname: '',
        pass: ''
    });

    React.useEffect(() => {
        if ((user.user !== undefined) || (user.txtError !== undefined)) {
            if (user.txtError) {
                toast.error(user.txtError);
            } else {
                if (user.user.tournaments.length < 2) {
                    //todo: tiene que pasarse el id de cocinero, no el id de usuario.
                    if (tournamentId === -1) {
                        setIsReadOnly(true);

                    } else {
                        setIsSubmitted(true);
                        props.activePageEvent(0, user.id);
                    }
                }
                toast.success('Ususario válido.\nBienvenido al sistema.')
            }
        }
    }, [user, props]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const { uname, pass } = values

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
                setUser(aUser);
            });

    };

    const renderForm = (
        <div>
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
            {(user.user !== undefined) &&
                <Grid container spacing={1} padding="0px" id="tournametGrd">
                    <Grid item xs={12}
                        display="flex"
                        justifyContent="center"
                    >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 },
                                boxShadow: 3,
                                maxWidth: 900,
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
                                <Typography minWidth="500px" variant="h6" gutterBottom component="div" display="flex" justifyContent="center">Seleccione Torneo</Typography>
                                <Autocomplete
                                    disableClearable
                                    options={user.user.tournaments} // Lista de opciones
                                    getOptionLabel={(option) => option.titulo} // Muestra el campo `title` en la lista
                                    renderInput={(params) => (
                                        <TextField {...params} label="Torneo" variant="outlined" />
                                    )}
                                    onChange={(event, value) => {
                                        if (value) {
                                            console.log("Selected Tournament:", value); // Objeto completo seleccionado
                                        } else {
                                            console.log("No tournament selected");
                                        }
                                    }}
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            }
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

export default CookerLogin