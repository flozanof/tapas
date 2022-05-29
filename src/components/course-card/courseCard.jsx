import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from "@mui/material/styles";
import MenuOrder from './menuOrder';

const MyCardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);


const CourseCard = (props) => {

    const [imgVisible, setImgVisible] = React.useState({ ...props.visible });

    React.useEffect(() => {
        setImgVisible(props.visible);
    }, [props.visible])

    // Guardamos nombre del fichero que se ha subido al servidor en base de datos.
    const updateVisibility = (visible) => {
        console.log('http://localhost:8081/courses/images/' + props.imageId + '/visible/' + visible);
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'PUT',
        };
        fetch('http://localhost:8081/courses/images/' + props.imageId + '/visible/' + visible, requestOptions)
            .then((response) => {
                if (response.ok) {
                    setImgVisible(visible);
                    console.log('Visibilidad de imagen OK');
                    //                    toast.success('Image Save Success');
                } else {
                    console.log('Visibilidad de imagen ERROR');
                    //                    toast.error('Image Save Fail ' || response.status)
                }
            })
            .catch(err => {
                console.log('Visibilidad de imagen ERROR');
                //                toast.error('Image Save Fail')
            });
    };

    const deleteCourseImage = () => {
        console.log('http://localhost:8081/courses/images/' + props.imageId + ' (DELETE)');
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'DELETE',
        };
        fetch('http://localhost:8081/courses/images/' + props.imageId, requestOptions)
            .then((response) => {
                if (response.ok) {
                    console.log('Borrado imagen OK');
                    props.deleteEvent(props.imageId);
                    //                    toast.success('Image Save Success');
                } else {
                    console.log('Borrado imagen ERROR');
                    //                    toast.error('Image Save Fail ' || response.status)
                }
            })
            .catch(err => {
                console.log('borrado imagen ERROR', err);
                //                toast.error('Image Save Fail')
            });

    }

    return (
        <Card>
            {(props.avatarImage.indexOf("mp4") === -1) &&
                <div>
                    <CardMedia
                        component="img"
                        height="200"
                        image={`/img/${props.avatarImage}`}
                        alt={props.avatarName}
                    />
                </div>
            }
            {(props.avatarImage.indexOf("mp4") !== -1) &&
                <div>
                    <CardMedia
                        component="video"
                        height="200"
                        image={`/img/${props.avatarImage}`}
                        title='title'
                        controls
                    />
                </div>
            }
            {props.canEdit &&
                <MyCardContentNoPadding sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
                >
                    <IconButton aria-label="delete" size="small" onClick={deleteCourseImage} >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    {
                        imgVisible ?
                            <IconButton aria-label="visible on" size="small" color="primary" onClick={() => { updateVisibility(0) }} >
                                <VisibilityIcon fontSize="inherit" />
                            </IconButton>
                            :
                            <IconButton aria-label="visible off" size="small" onClick={() => { updateVisibility(1) }} >
                                <VisibilityOffIcon fontSize="inherit" />
                            </IconButton>
                    }
                    <MenuOrder
                        imageId={props.imageId}
                        order={props.order}
                        maxOrder={props.maxOrder}
                        updateOrderImageStatus={props.updateOrderImageStatus}
                    />
                </MyCardContentNoPadding>
            }
        </Card >
    );
}

export default CourseCard
