import '../../css/App.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CookerAvatar from '../cooker-avatar/cookerAvatar';
import CourseCard from '../course-card/courseCard';
import Typography from '@mui/material/Typography';
import CookerLoading from '../cooker-loading/cookerLoading';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const CookerCard = (props) => {
    const [editCourse, setEditCourse] = React.useState(false);
    const [cooker, setCooker] = React.useState(null);
    const [cookerEdit, setCookerEdit] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [fileUploaded, setFileUploaded] = React.useState(null);

    // Recuperamos información del cocinero de la API.
    React.useEffect(() => {
        fetch('http://localhost:8081/cookers/' + props.cookerId)
            .then((response) => {
                return response.json()
            })
            .then((aCooker) => {
                setCooker(aCooker);
            });
    }, [props.cookerId]);

    // Subimos imagen del plato al servidor. Luego hay que guardar nombre del fichero en bbdd.
    React.useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            const data = new FormData()
            data.append('file', selectedImage)
            const requestOptions = {
                method: 'POST',
                //Si lo pongo no funciona.            headers: { 'Content-Type': 'multipart/form-data' },
                body: data
            };
            fetch('http://localhost:8000/upload/' + props.tournamentId + '/', requestOptions)
                .then((res) => res.text())
                .then((res) => {
                    toast.success('Upload Success');
                    setFileUploaded(res);
                })
                .catch(err => {
                    toast.error('Upload Fail')
                });
        }
    }, [selectedImage, props.tournamentId]);

    // Guardamos nombre del fichero que se ha subido al servidor en base de datos.
    React.useEffect(() => {
        if (fileUploaded != null) {
//            console.log('**** CookerCard. Peticion: http://localhost:8081/courses/' + cooker.id + '/images');
            // POST request using fetch with error handling
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'imageNames': [fileUploaded] })
            };
            fetch('http://localhost:8081/courses/' + cooker.id + '/images', requestOptions)
                .then((response) => {
                    if (response.ok) {
                        toast.success('Image Save Success');
                    } else {
                        toast.error('Image Save Fail ' || response.status)
                    }
                })
                .catch(err => {
                    toast.error('Image Save Fail')
                });
        }
    }, [fileUploaded, cooker]);

    const handleDeleteImgClick = (photoId) => {
        setCooker(oldCooker => ({ ...oldCooker, coursePhotos: [...cooker.coursePhotos.filter(p => p.id !== photoId)] }));
    }

    const listCourseImages = () => {
        if (cooker != null) {
            return (
                cooker.coursePhotos != null &&
                cooker.coursePhotos.filter(p => (props.loggedCookerId === props.cookerId) || p.visible).map((photo) =>
                    <Grid key={photo.id} item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <Box>
                            <CourseCard
                                imageId={photo.id}
                                avatarImage={props.tournamentId + '/' + photo.uriImage}
                                visible={photo.visible}
                                canEdit={(props.loggedCookerId === props.cookerId)}
                                deleteEvent={handleDeleteImgClick}
                                order={photo.order}
                                maxOrder={cooker.coursePhotos.length}
                                updateOrderImageStatus={updateOrderImageStatus}
                            />
                        </Box>
                    </Grid>)
            )
        }
    };

    const getScoreEvent = () => {
        return (props.cookerId !== props.loggedCookerId) && props.activePageEvent;
    }

    const editCourseNameAndDescription = (edit, refreshCooker) => {
        setEditCourse(edit);
        if (edit) {
            const newCookerEdit = {
                "course": cooker.course,
                "description": cooker.description
            };
            setCookerEdit(newCookerEdit);
        }
        if (refreshCooker) {
            cooker.course = cookerEdit.course;
            cooker.description = cookerEdit.description;
        }
    }

    // Guardamos visiblidad de todas las imágenes de un plato.
    const saveAllVisibility = (allVisible) => {
        if (cooker !== null) {
        console.log('http://localhost:8081/courses/' + cooker.courseId + '/images/visibles/' + (allVisible ? '1' : '0'));
            const requestOptions = {
                method: 'PUT',
            };
            fetch('http://localhost:8081/courses/' + cooker.courseId + '/images/visibles/' + (allVisible ? '1' : '0'), requestOptions)
                .then((response) => {
                    if (response.ok) {
                        updateCookerAllVisibleState(allVisible)
                    } else {
                        throw new Error('API Error.');
                    }
                }).then ( () => { 
                    toast.success('Visibilidad de imágenes OK');
                }).catch(err => {
                    toast.error('Visibilidad de imagen ERROR', err);
                });
        }
    };

    const handleImgVisibility = (event) => {
        event.preventDefault();
        saveAllVisibility(event.target.checked);
    };

    const updateOrderImageStatus = (imageId, order) => {
        const newCoursePhotos = [...cooker.coursePhotos];
        newCoursePhotos.filter(img => img.id === imageId)[0].order = order;
        newCoursePhotos.sort((a,b) => a.order - b.order);
        setCooker(oldCooker => ({ ...oldCooker, coursePhotos: newCoursePhotos }));
    }

    const updateCookerAllVisibleState = (visible) => {
        const newCoursePhotos = [...cooker.coursePhotos];
        for (let i = 0; i < newCoursePhotos.length; i++) {
            newCoursePhotos[i] = {
                ...newCoursePhotos[i],
                visible: visible ? 1 : 0
            };
        }
        setCooker(oldCooker => ({ ...oldCooker, coursePhotos: newCoursePhotos }));
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === 'titulo') {
            cookerEdit.course = value;
        } else {
            cookerEdit.description = value;
        }
        setCookerEdit(cookerEdit);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: (cooker.courseId > 0) ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': cooker.courseId,
                'cookerId': cooker.id,
                'name': cookerEdit.course,
                'description': cookerEdit.description,
            })
        };
        fetch('http://localhost:8081/courses', requestOptions)
            .then(response => {
                const data =response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                //                alert('Puntuación asignada correctamente: ' + response.status + '. status Text: ' + response.statusText)
                editCourseNameAndDescription(false, true);
                toast.success('Nombre y descripción actualizadas correctamente ');
            })
            .catch(error => {
                toast.error('Error en la actualización del nombre y/o descripción', error);
            });
    }

    const isAllImgVisible = () => {
        return !cooker.coursePhotos.filter(p => !p.visible).length;
    };

    const boxUploadImageVideo = type => {
        return (
            <div>
                <input
                    accept={"IMG" === type ? "image/*" : "video/*"}
                    type="file"
                    id={`selectCourse-${type}`}
                    style={{ display: 'none', margin: '20px' }}
                    onChange={e => setSelectedImage(e.target.files[0])}
                />
                {(props.loggedCookerId === props.cookerId) &&
                    <label htmlFor={`selectCourse-${type}`}>
                        <Button variant="outlined" color="primary" component="span" sx={{ flexGrow: 1, m: 1 }}>
                            {"IMG" === type ? "Upload Image" : "Upload Video"}
                        </Button>
                    </label>
                }
                {imageUrl && selectedImage && (
                    <Box mt={2} textAlign="center">
                        <div>Image Preview:</div>
                        <img src={imageUrl} alt={selectedImage.name} height="100px" />
                    </Box>
                )}
            </div>
        )
    }

    if (cooker != null) {
        return (
            <div>
                <Box sx={{ flexGrow: 1, p: "5px 15px 15px 15px" }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                            {/** Ficha del cocinero*/}
                            <CookerAvatar
                                tournamentId={props.tournamentId}
                                avatarId={props.cookerId}
                                avatarImage={props.tournamentId + '/' + cooker.cookerPhoto}
                                avatarName={cooker.name}
                                scoreEvent={getScoreEvent()}
                                canEdit={(props.loggedCookerId === props.cookerId)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={6} xl={6} container direction="column" justifyContent="space-between">
                            {/** Título y descripción del plato. Dos modos: Normal y Edición*/}
                            {!editCourse ?
                                <Grid item>
                                    <div>
                                        <Grid container display="flex" flex-direction="row" gap="15px">
                                            <Typography gutterBottom variant="h5" component="div">
                                                {(cooker.course == null) ? 'Sin título' : cooker.course}
                                            </Typography>
                                            {(props.loggedCookerId === props.cookerId) &&
                                                < IconButton aria-label="visible off" size="small" color="primary" onClick={() => { editCourseNameAndDescription(true, false) }} >
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                        </Grid>
                                        <Typography  variant="body2" color="text.secondary" style={{ whiteSpace: "pre-wrap"  }}>
                                            {(cooker.description == null) ? 'Sin descripción' : cooker.description}
                                        </Typography>
                                    </div>
                                </Grid>
                                :
                                <Grid item>
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                        display="flex"
                                        justifyContent="left"
                                        flex-direction="column"

                                    >
                                        <Stack direction="column" spacing={3}>
                                            <TextField
                                                required
                                                id="standard-required"
                                                name="titulo"
                                                label="Título"
                                                defaultValue={cookerEdit.course}
                                                onChange={handleChange}
                                                variant="standard"
                                            />
                                            <TextField
                                                required
                                                id="standard-multiline-flexible"
                                                name="descripcion"
                                                label="Descripción"
                                                multiline
                                                maxRows={10}
                                                defaultValue={cookerEdit.description}
                                                onChange={handleChange}
                                                variant="standard"
                                            />
                                            <Grid container display="flex" gap="20px">
                                                <Button type="submit" variant="outlined" startIcon={<SendIcon />}>
                                                    Enviar
                                                </Button>
                                                <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => { editCourseNameAndDescription(false, false); }}>
                                                    Cancelar
                                                </Button>
                                            </Grid>
                                        </Stack>
                                    </Box>
                                </Grid>
                            }
                            {/** Posición y puntuación*/}
                            <Grid item container direction="row">
                                <Box sx={{ p: 1 }} width="100px">
                                    <Typography variant="body2" color="text.secondary" display="flex" justifyContent="center">
                                        Posición
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Avatar sx={{ width: 35, height: 35, bgcolor: blueGrey[400] }}>
                                            {cooker.position}
                                        </Avatar>
                                    </Box>
                                </Box>
                                <Box sx={{ p: 1 }} width="100px">

                                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" justifyContent="center">
                                        Puntuación
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Avatar sx={{ width: 90, bgcolor: blueGrey[400] }} variant="rounded">
                                            {cooker.score}
                                        </Avatar>
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                {/* Lista de imágenes del plato */}
                <Box sx={{ flexGrow: 1, p: "15px" }}>
                    {(props.loggedCookerId === props.cookerId) &&
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={isAllImgVisible()} onChange={handleImgVisibility} size="small" />} label="Visualizar Todas" />
                        </FormGroup>
                    }
                    <Grid container spacing={2}>
                        {listCourseImages()}
                    </Grid>
                </Box>
                <Box display="flex" sx={{ p: "10px" }}>
                    {boxUploadImageVideo("IMG")}
                    {boxUploadImageVideo("VIDEO")}
                </Box>
            </div >
        )
    } else {
        return <CookerLoading />
    }
}
export default CookerCard
