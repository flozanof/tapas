import '../../css/App.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CookerAvatar from '../cooker-avatar/cookerAvatar';
import Typography from '@mui/material/Typography';
import CookerLoading from '../cooker-loading/cookerLoading';
import Button from '@mui/material/Button';

const CookerCard = (props) => {
    const [cooker, setCooker] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    React.useEffect(() => {
        fetch('http://localhost:8081/cookers/' + props.cookerId)
            .then((response) => {
                return response.json()
            })
            .then((aCooker) => {
                console.info("cookerId" + props.loggedCookerId );
                console.info("response" + aCooker.name);
                setCooker(aCooker);
            })
    }, []);

    React.useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const listCourseImages = () => {
        if (cooker != null) {
            console.info('FOTOS: ' + cooker.name)
            return (
                cooker.coursePhotos.map((photo) =>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <Box>
                            <CookerAvatar
                                avatarImage={photo}
                            />
                        </Box>
                    </Grid>)
            )
        }
    };

    const getScoreEvent = (cookerId) => {
        console.log('cookerCar.js. cookerId:  ' + props.cookerId + '.  ' + props.loggedCookerId)
        return (props.cookerId !== props.loggedCookerId) && props.activePageEvent;
    }

    if (cooker != null) {
        return (
            <div>
                <Box sx={{ flexGrow: 1, p: "5px 15px 15px 15px" }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                            <CookerAvatar
                                avatarId={props.cookerId}
                                avatarImage={cooker.cookerPhoto}
                                avatarName={cooker.name}
                                scoreEvent={getScoreEvent()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={6} xl={6}>
                            <Typography gutterBottom variant="h5" component="div">
                                {cooker.course}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {cooker.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={8} sm={8} md={12} lg={12} xl={12} display="flex" justifyContent="start">
                                    <Box sx={{ p: 1 }} width="100px">
                                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" justifyContent="center">
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
                                </Grid>
                                <Grid item xs={3} sm={3} md={12} lg={12} xl={12} display="flex" justifyContent="start">
                                    <Box sx={{ p: 1}} width="100px">
                                        
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
                    </Grid>
                </Box>
                {/* Lista de imágenes del plato */}
                <Box sx={{ flexGrow: 1, p: "15px" }}>
                    <Grid container spacing={2}>
                        {listCourseImages()}
                    </Grid>
                </Box>
                <>
                <input 
                    accept="image/*" 
                    type="file" 
                    id="select-image" 
                    style={{ display: 'none' }}
                    onChange={e => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="select-image">
                <Button variant="contained" color="primary" component="span">
                    Upload Image
                    </Button>
                </label>
                {imageUrl && selectedImage && (
                    <Box mt={2} textAlign="center">
                        <div>Image Preview:</div>
                        <img src={imageUrl} alt={selectedImage.name} height="100px" />
                    </Box>
                )}
                </>
            </div>
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookerCard
