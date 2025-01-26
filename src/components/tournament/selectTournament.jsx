import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SelectTournament = (props) => {
    const [tournamentId, setTournamentId] = useState();
    const [tournament, setTournament] = useState();
    const userId = props.user.id;
    const loginEvent = props.loginEvent;

    //const handleSelectedTournament = (tournamentId) => {

    React.useEffect(() => {
        if (tournamentId !== undefined) {
            console.log("ENTRA EN PETICIÓN DE TORNEOS: " + tournamentId);
            fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COURSES_TOURNAMENTS + "/" + tournamentId)
                .then(response => response.json())
                .then((aTournament) => {
                    setTournament(aTournament);
                });
        }
    }, [tournamentId]);

    React.useEffect(() => {
        if (tournament !== undefined) {
            console.log("ENTRA EN PETICIÓN DE TORNEOS DE USUARIO DESPUÉS DE SELECCIONAR EL TORNEO: " + userId + '-' + tournament.id);
            fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_USERS + "/" + userId +
                process.env.REACT_APP_API_VOTE_COURSES_TOURNAMENTS + "/" + tournament.id)
                .then(response => response.json())
                .then((aUser) => {
                    loginEvent(aUser.id, aUser.cookerId, tournament, 0);
                });
        }
    }, [tournament, userId, loginEvent]);

    return (
        (props.user.tournaments.length < 2)
            ? setTournamentId(props.user.tournaments[0].id)
            :
            <Grid container spacing={1} padding="10px" id="tournametGrd">
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
                        //onSubmit={handleSubmit}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div>
                            <Typography minWidth="500px" variant="h6" gutterBottom component="div" display="flex" justifyContent="center">Seleccione Torneo</Typography>
                            <Autocomplete
                                disableClearable
                                options={props.user.tournaments} // Lista de opciones
                                getOptionLabel={(option) => option.titulo} // Muestra el campo `title` en la lista
                                renderInput={(params) => (
                                    <TextField {...params} label="Torneo" variant="outlined" />
                                )}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log("Selected Tournament:", value); // Objeto completo seleccionado
                                        setTournamentId(value.id)
                                    } else {
                                        console.log("No tournament selected");
                                    }
                                }}
                            />
                        </div>
                    </Box>
                </Grid>
            </Grid>
    );
}

export default SelectTournament