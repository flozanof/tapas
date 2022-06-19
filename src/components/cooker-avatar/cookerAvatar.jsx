import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { toast } from 'react-toastify';
import { styled } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';

const MyCardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

const CookerAvatar = (props) => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [fileUploaded, setFileUploaded] = React.useState(null);

    // Subimos imagen del plato al servidor. Luego hay que guardar nombre del fichero en bbdd.
    React.useEffect(() => {
        if (selectedImage) {
            console.log('CookerAvatar 1: http://localhost:8000/upload/ ' + selectedImage);
            const data = new FormData()
            data.append('file', selectedImage)
            const requestOptions = {
                method: 'POST',
                //Si lo pongo no funciona.            headers: { 'Content-Type': 'multipart/form-data' },
                body: data
            };
            fetch('http://localhost:8000/upload/' + props.tournamentId, requestOptions)
                //                .then((res) => {
                //                    toast.success('upload success  '+ res.statusText +' ' + res.text);
                //                })
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
            console.log('**** CookerAvatar. Peticion: ' + process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COOKERS_PHOTO);
            // POST request using fetch with error handling
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'id': props.avatarId,
                    'cookerPhoto': fileUploaded,
                })
            };
            fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COOKERS_PHOTO, requestOptions)
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
    }, [fileUploaded, props.avatarId]);

    return (
        <div>
            <Card>
                {(props.avatarTitle) &&
                    <CardHeader
                        title={props.avatarTitle}
                        // subheader="September 14, 2016"
                        action={
                            <Avatar src={process.env.REACT_APP_PUBLIC_IMG +`${props.cookerImage}`} />
                        }
                    />
                }
                <CardMedia
                    component="img"
                    height={props.cardHeight}
                    image={process.env.REACT_APP_PUBLIC_IMG + `${props.avatarImage}`}
                    alt={props.avatarName}
                />
                <MyCardContentNoPadding sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                        {props.avatarName}
                    </Typography>
                    {props.cardEvent &&
                        <IconButton variant="contained" aria-label="visible off" size="small" color="primary" component="span"
                            onClick={() => props.cardEvent(1, props.avatarId)}
                        >
                            <PersonIcon fontSize="inherit" />
                        </IconButton>
                    }
                    {props.scoreEvent &&
                        <IconButton variant="contained" aria-label="visible off" size="small" color="primary" component="span"
                            onClick={() => props.scoreEvent(4, props.avatarId)}
                        >
                            <FormatListNumberedIcon fontSize="inherit" />
                        </IconButton>
                    }
                    {(props.canEdit > 0) &&
                        <div>
                            <input
                                accept="image/*"
                                type="file"
                                id="selectCooker-image"
                                style={{ display: 'none', margin: '20px' }}
                                onChange={e => setSelectedImage(e.target.files[0])}
                            />
                            <label htmlFor="selectCooker-image">
                                < IconButton variant="contained" aria-label="visible off" size="small" color="primary" component="span" >
                                    <CameraAltIcon fontSize="inherit" />
                                </IconButton>
                            </label>
                        </div>
                    }
                </MyCardContentNoPadding>
            </Card >
        </div >
    );
}

export default CookerAvatar
