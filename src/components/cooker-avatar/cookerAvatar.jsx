import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
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


    // Subimos fichero con la imagen del cocinero.
    React.useEffect(() => {
        if (selectedImage) {
            console.log('**** CookerAvatar. Peticion: ' + process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COOKERS_PHOTO);
            // PUT request using fetch with error handling
            const data = new FormData()
            data.append('image', selectedImage);
            data.append('cooker', JSON.stringify({
                "id": props.avatarId,
                "tournamentId": props.tournamentId,
                "name": props.avatarName
            }));
            const requestOptions = {
                method: 'PUT',
                body: data
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
    }, [selectedImage, props.avatarId, props.tournamentId, props.avatarName]);

    return (
        <div>
            <Card>
                {(props.avatarTitle) &&
                    <CardHeader
                        title={props.avatarTitle}
                        // subheader="September 14, 2016"
                        //todo: Ver que no da error si avatar no tiene imagen.
                        action={
                            <Avatar
                                src={`${props.cookerImage}`}
                            />
                        }
                    />
                }
                <CardMedia
                    component="img"
                    height={props.cardHeight}
                    image={(props.avatarImage === null) && process.env.REACT_APP_PUBLIC_IMG + 'noImage.jpeg'}
                    src={`${props.avatarImage}`}
                    alt={props.avatarName}
                    sx={(props.avatarImage === null) && { objectFit: "contain" }}
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
                        <Tooltip title={`Datos de ${props.avatarTitle}`} arrow>
                            <IconButton variant="contained" aria-label="visible off" size="small" color="primary" component="span"
                                onClick={() => props.cardEvent(1, props.avatarId)}
                            >
                                <PersonIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    }
                    {props.scoreEvent && props.tournamentOpen &&
                        <Tooltip title={`Puntuar a ${props.avatarTitle || props.avatarName}`} arrow>
                            <IconButton variant="contained" aria-label="visible off" size="small" color="primary" component="span"
                                onClick={() => props.scoreEvent(4, props.avatarId)}
                            >
                                <FormatListNumberedIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
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
                                <Tooltip title="Cambiar foto" arrow>
                                    <IconButton variant="contained" aria-label="visible off" size="small" color="primary" component="span" >
                                        <CameraAltIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </label>
                        </div>
                    }
                </MyCardContentNoPadding>
            </Card >
        </div >
    );
}

export default CookerAvatar
