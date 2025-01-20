import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SelectTournament = (props) => {

    const handleSelectedTournament = (tournamentId) => {
        console.log("ENTRA EN SELECCIÓN DE TORNEOS");
        let tournamentBdd;
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COURSES_TOURNAMENTS + "/" + tournamentId)
            .then(response => response.json())
            .then((aTournament) => {
                tournamentBdd = aTournament;
            });

        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_USERS + "/" + props.user.id +
            process.env.REACT_APP_API_VOTE_COURSES_TOURNAMENTS + "/" + tournamentId)
            .then(response => response.json())
            .then((aUser) => {
                console.log("aUser = " + aUser.id + " aCooker = " + aUser.cookerId);
                props.loginEvent(aUser.id, aUser.cookerId, tournamentBdd, 0);
            });
    };

    return (
        (props.user.tournaments.length < 2)
            ? handleSelectedTournament(props.user.tournaments[0].id)
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
                                        handleSelectedTournament(value.id)
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