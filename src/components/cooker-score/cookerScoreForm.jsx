import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CookerAvatar from '../cooker-avatar/cookerAvatar';
import SendIcon from '@mui/icons-material/Send';
import CookerLoading from '../cooker-loading/cookerLoading';
import { toast } from 'react-toastify';

const CookerScoreForm = (props) => {
    const [scoreCooker, setScoreCooker] = React.useState({});
    const [values, setValues] = React.useState({
        taste: '',
        presentation: '',
        elaboration: '',
        product: ''
    })

    const [validations, setValidations] = React.useState({
        taste: '',
        presentation: '',
        elaboration: '',
        product: ''
    })

    const isUpdateAction = (aScore) => {
        return (aScore.taste > 0) || (aScore.presentation > 0) || (aScore.elaboration > 0) || (aScore.product > 0);
    }

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_COOKERS + '/' + props.cookerId + process.env.REACT_APP_API_VOTE_VOTERS + '/' + props.loggedCookerId)
            .then(response => response.json())
            .then((aScoreCooker) => {
                setScoreCooker(aScoreCooker);
                setValues(aScoreCooker.score);
            });
    }, [props.cookerId, props.loggedCookerId]);

    const validateScore = (score, name, validation, valName) => {
        let isValid = true;
        console.log('Entra en validateScore ' + score);
        // Si el valor no está definido es que no se usa este tipo de puntuación en este torneo.
        if (score === undefined) {
            return true;
        }
        if (!score) {
            console.log('********** error validacionn null');
            validation[valName] = `Hay que informar la puntuación de "${name}".`
            isValid = false
        }

        if (score && isNaN(score)) {
            validation[valName] = `La puntuación de "${name}" tiene que ser un número entero ente 1 y 10.`
            isValid = false;
        } else {
            if (!(score && score % 1 === 0)) {
                validation[valName] = `La puntuación de "${name}" tiene que ser un número entero entre 1 y 10.`
                isValid = false;
            }
        }

        if (score && ((score < 1) || (score > 10))) {
            validation[valName] = `La puntuación de "${name}" debe estar entre 1 y 10.`
            isValid = false
        }
        return isValid;
    }

    const validateAll = () => {
        const { taste, presentation, elaboration, product } = values
        const validations = { taste: '', presentation: '', elaboration: '', product: '' }
        let isValid = true
        if (!validateScore(taste, 'Sabor', validations, 'taste')) {
            isValid = false
        }

        if (!validateScore(presentation, 'Presentación', validations, 'presentation')) {
            isValid = false
        }

        if (!validateScore(elaboration, 'Elaboración', validations, 'elaboration')) {
            isValid = false
        }

        if (!validateScore(product, 'Producto', validations, 'product')) {
            isValid = false
        }

        if (!isValid) {
            setValidations(validations)
        }
        return isValid
    }

    const validateOne = (e) => {
        const { name } = e.target
        const value = values[name]
        let message = ''

        if (!value) {
            message = `El campo "${name}" is obligatorio`
        }

        if (!(value && value % 1 === 0)) {
            console.log('**** validateOne: error validación número decimal');
            message = `La puntuación de "${name}" tiene que ser un número entero entre 1 y 10.`
        }

        if (value && ((value < 0) || (value > 10))) {
            console.log('******** validateOne: error validación número fuera rango ' + value);
            message = `La puntuación de "${name}" debe estar entre 1 y 10.`
        }

        setValidations({ ...validations, [name]: message })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('***** ENTRA EN HANDLE SUBMIT **********');
        const isValid = validateAll()

        if (!isValid) {
            return false
        }
        const requestOptions = {
            method: isUpdateAction(scoreCooker.score) ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: scoreCooker.id,
                name: scoreCooker.name,
                score: values
            })
        };
        console.log(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_VOTERS + '/' + props.loggedCookerId);
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_VOTERS + '/' + props.loggedCookerId, requestOptions)
            .then(response => {

                if (!response.ok) {
                    const error = response.status;
                    return Promise.reject(error);
                }

                toast.success('Puntuación asignada correctamente');
            })
            .catch(error => {
                toast.error('Error en la asignación de puntuaciones! \n Revise sus puntuaciones.', error);
            });
    }

    const { taste, presentation, elaboration, product } = values

    const {
        taste: saborVal,
        presentation: presentacionVal,
        elaboration: elaboracionVal,
        product: productoVal
    } = validations

    if (scoreCooker.name) {
        console.log("cookerScoreForm.js: " + scoreCooker.cookerPhoto);
        return (
            <div>
                <Grid container spacing={1} margin="20px" style={{ maxWidth: 1500 }} >

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <CookerAvatar
                            avatarImage={(scoreCooker.cookerBase64Image == null) ? null : `data:image/jpg;base64,${scoreCooker.cookerBase64Image}`}
                            avatarName={scoreCooker.name}
                            cardHeight="400"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}
                        display="flex"
                        justifyContent="center"
                    >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                boxShadow: 3,
                                maxWidth: 500,
                                minWidth: 300,
                                p: 1
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            display="flex"
                            justifyContent="center"
                        >
                            <div>
                                <Typography variant="h6" gutterBottom component="div" display="flex" justifyContent="center">PUNTUACIÓN</Typography>
                                {taste !== undefined &&
                                    <TextField
                                        id="outlined-number"
                                        label="Sabor"
                                        type="number"
                                        name="taste"
                                        value={taste}
                                        onChange={handleChange}
                                        onBlur={validateOne}
                                    />}
                                {taste !== undefined &&
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {saborVal}
                                    </Typography>}
                                {presentation !== undefined &&
                                    <TextField
                                        id="outlined-number"
                                        label="Presentación"
                                        type="number"
                                        name="presentation"
                                        value={presentation}
                                        onChange={handleChange}
                                        onBlur={validateOne}
                                    />}
                                {presentation !== undefined &&
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {presentacionVal}
                                    </Typography>}
                                {elaboration !== undefined &&
                                    <TextField
                                        id="outlined-number"
                                        label="Elaboración"
                                        type="number"
                                        name="elaboration"
                                        value={elaboration}
                                        onChange={handleChange}
                                        onBlur={validateOne}
                                    />}
                                {elaboration !== undefined &&
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {elaboracionVal}
                                    </Typography>}
                                {product !== undefined &&
                                    <TextField
                                        id="outlined-number"
                                        label="Producto"
                                        type="number"
                                        name="product"
                                        value={product}
                                        onChange={handleChange}
                                        onBlur={validateOne}
                                    />}
                                {product !== undefined &&
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {productoVal}
                                    </Typography>}

                                <Button type="submit" variant="outlined" startIcon={<SendIcon />}>
                                    Enviar
                                </Button>

                            </div>

                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <CookerAvatar
                            avatarImage={(scoreCooker.courseBase64Image == null) ? null : `data:image/jpg;base64,${scoreCooker.courseBase64Image}`}
                            avatarName={scoreCooker.courseName}
                            cardHeight="400"
                        />
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return <CookerLoading />
    }
}
export default CookerScoreForm