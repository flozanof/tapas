import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const CookerLogin = (props) => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = React.useState({
        uname: '',
        pass: ''
    })

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1",
            cookerId: 1
        },
        {
            username: "user2",
            password: "pass2",
            cookerId: 2
        },
        {
            username: "user3",
            password: "pass3",
            cookerId: 3
        },
        {
            username: "user4",
            password: "pass4",
            cookerId: 4
        },
        {
            username: "user5",
            password: "pass5",
            cookerId: 5
        },
        {
            username: "user6",
            password: "pass6",
            cookerId: 6
        },
        {
            username: "user7",
            password: "pass7",
            cookerId: 7
        },
        {
            username: "user8",
            password: "pass8",
            cookerId: 8
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const { uname, pass } = values

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        const { uname, pass } = values

        // Find user login info
        const userData = database.find((user) => user.username === uname);
        // Compare user info
        if (userData) {
            if (userData.password !== pass) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
                props.activePageEvent(0, userData.cookerId);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <Typography variant="caption" display="block" gutterBottom padding="0px 0px 0px 13px">
                {errorMessages.message}
            </Typography>
        );

    // JSX code for login form
    /**
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
        */
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
                            <Typography variant="h6" gutterBottom component="div" display="flex" justifyContent="center">Inicia sesión</Typography>
                            <TextField
                                id="outlined-number"
                                label="Usuario"
                                type="text"
                                name="uname"
                                value={uname}
                                onChange={handleChange}
                            />
                            {renderErrorMessage("uname")}
                            <TextField
                                id="outlined-number"
                                label="Contraseña"
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

export default CookerLogin