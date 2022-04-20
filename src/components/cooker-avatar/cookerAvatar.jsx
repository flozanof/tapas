import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const CookerAvatar = (props) => {

    return (
        <Card>
            <CardHeader
                title={props.avatarTitle}
            // subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="190"
                image={`/img/${props.avatarImage}`}
                alt={props.avatarName}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.avatarName}
                </Typography>
            </CardContent>
            <CardActions>
                {props.cardEvent && <Button size="small" onClick={() => props.cardEvent(1, props.avatarId)}>Ficha</Button>}
                {props.scoreEvent && <Button size="small" onClick={() => props.scoreEvent(4, props.avatarId)}>Puntuar</Button>}
            </CardActions>
        </Card >
    );
}

export default CookerAvatar
