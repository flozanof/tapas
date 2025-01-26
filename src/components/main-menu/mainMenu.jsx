import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
//import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ChangeCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function MainMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tournamentOpen, setTournamentOpen] = useState(props.tournamentOpen);
  const initialized = useRef(false); // Bandera para evitar la ejecución inicial
  const open = Boolean(anchorEl);
  const handleTournament = useRef(null);

  useEffect(() => {
    handleTournament.current = props.handleTournament;
  }, [props.handleTournament]);

  useEffect(() => {
    // En entorno de desarrollo puede ser que se llame al patch porque se lanza dos veces algunas peticiones.
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    if (!handleTournament.current) {
      console.log('ERROR: función handleTournament no definida.');
      return;
    }
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votar: tournamentOpen
      })
    };
    fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COURSES_TOURNAMENTS + '/' + props.tournamentId, requestOptions)
      .then(response => response.json())
      .then((aTournament) => {
        if (aTournament.id !== undefined) {
          toast.success((aTournament.votar === 'S') ? 'Votación abierta' : 'Votación cerrada');
          handleTournament.current(aTournament)
        } else {
          toast.error("Error al actualizar el estado del torneo.");
        }
      })
      .catch(e => {
        alert("Error en el cierre/apertura de la votación del torneo: " + e);
        console.log(e);
        return e;
      });
  }, [initialized, tournamentOpen, props.tournamentId]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'inline-flex', align: 'right' }} >
      <Box>
        <Tooltip title="Configuración">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ flexGrow: 1, m: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotprops={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 16,
                height: 16,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
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
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {(props.userType === 'ADMIN') && (tournamentOpen === 'S') &&
          <MenuItem onClick={() => setTournamentOpen('N')} >
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            Cerrar Votación
          </MenuItem>
        }
        {(props.userType === 'ADMIN') && (tournamentOpen === 'N') &&
          <MenuItem onClick={() => setTournamentOpen('S')} >
            <ListItemIcon>
              <LockOpenIcon fontSize="small" />
            </ListItemIcon>
            Abrir Votación
          </MenuItem>
        }
        {(props.loggedCookerId !== -1) && (props.loggedCookerId !== 0) &&
          <MenuItem onClick={() => props.activePageEvent(1, props.loggedCookerId)} >
            <ListItemIcon>
              <Avatar fontSize="small" sx={{ width: 20, height: 20 }} />
            </ListItemIcon>
            Usuario
          </MenuItem>
        }
        {/**<MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>*/}
        {props.tournamentVisible &&
          <MenuItem onClick={() => props.activePageEvent(5, props.loggedCookerId)}>
            <ListItemIcon>
              <ChangeCircle fontSize="small" />
            </ListItemIcon>
            Torneos
          </MenuItem>
        }
        <MenuItem onClick={() => props.activePageEvent(6, props.loggedCookerId)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Credenciales
        </MenuItem>
        <Divider />
        {/**<MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>*/}
        <MenuItem onClick={() => props.activePageEvent(0, -1)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}