import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const MenuOrder = (props) => {
    const [imgOrder, setImgOrder] = React.useState(props.order);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Actualizamos orden de la foto en el servidor.
    const handleItemClick = (event) => {
        event.preventDefault();
        console.log(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COURSES + process.env.REACT_APP_API_VOTE_COURSES_IMG + '/' + props.imageId + '/order/' + event.target.value);
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'PUT',
        };
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COURSES + process.env.REACT_APP_API_VOTE_COURSES_IMG + '/' + props.imageId + '/order/' + event.target.value, requestOptions)
            .then((response) => {
                if (response.ok) {
                    setImgOrder(event.target.value);
                    console.log('Orden de imagen OK');
                    props.updateOrderImageStatus(props.imageId, event.target.value)
                    //                    toast.success('Image Save Success');
                } else {
                    console.log('Orden de imagen ERROR');
                    //                    toast.error('Image Save Fail ' || response.status)
                }
            })
            .catch(err => {
                console.log('Orden de imagen ERROR');
                //                toast.error('Image Save Fail')
            });
    };

    const listMenu = () => {
        return (
            [...Array(props.maxOrder).keys()].map((order) =>
                <MenuItem
                    key={order}
                    onClick={handleItemClick}
                    value={order + 1}
                >
                    {order + 1}
                </MenuItem>))
    }

    return (
        //React.Fragemet es lo mismo que <>
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Orden de la imagen">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 17, height: 17 }} variant="rounded">
                            <Typography variant="caption" >
                                {imgOrder}
                            </Typography>
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {listMenu()}

            </Menu>
        </>
    );
}
export default MenuOrder;