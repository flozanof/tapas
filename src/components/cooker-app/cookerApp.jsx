import '../../css/App.css';
import React, { useState } from "react";
import MainMenu from '../main-menu/mainMenu';
import CookerLogin from '../cooker-login/cookerLogin';
import CookerList from '../cooker-list/cookerList';
import CookerCard from '../cooker-card/cookerCard';
import CookersTable from '../cooker-table/cookersTable';
import CookersVoterTable from '../cooker-table/cookersVoterTable';
import CookerScoreForm from '../cooker-score/cookerScoreForm';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//if (process.env.NODE_ENV === 'development') {
//}

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 2 }}>
            {'Copyright © '}
            Francisco Lozano
            {' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const CookerApp = () => {
    const [idPage, setIdPage] = useState(0);
    const [cookerId, setCookerId] = useState(0);
    const [loggedCookerId, setLoggedCookerId] = useState(0);
    const [tournamentId, setTournamentId] = useState(-1);

    const handleLoggingClick = (cookerId, idTournament) => {
        console.log('cookerApp.js. **** LOGGING *****. cookerId: ' + cookerId + ' tournamentId: ' + idTournament);
        setIdPage(0);
        setLoggedCookerId(cookerId);
        setTournamentId(idTournament);
    }

    const handleStatePageClick = (page, cookerId) => {
        console.log('cookerApp.js. cookerId: ' + cookerId + ' pageId: ' + page);
        if (cookerId === 0) {
            setIdPage(0);
            setCookerId(0);
            setLoggedCookerId(0);
        } else {
            setIdPage(page);
            setCookerId(cookerId);
        }
    }

    const getActualPage = () => {
        const pages = [
            <CookerList tournamentId={tournamentId} activePageEvent={handleStatePageClick} loggedCookerId={loggedCookerId} />,
            <CookerCard tournamentId={tournamentId} activePageEvent={handleStatePageClick} cookerId={cookerId} loggedCookerId={loggedCookerId} />,
            <CookersTable tournamentId={tournamentId} activePageEvent={handleStatePageClick} allScore={true} loggedCookerId={loggedCookerId} />,
            <CookersVoterTable activePageEvent={handleStatePageClick} loggedCookerId={loggedCookerId} />,
            <CookerScoreForm tournamentId={tournamentId} activePageEvent={handleStatePageClick} cookerId={cookerId} loggedCookerId={loggedCookerId} />
        ];
        console.info("pag: " + idPage);
        return pages[idPage];
    }

    return (
        <div>
            <div>
                <ToastContainer />
            </div>

            {((loggedCookerId === 0) || (idPage === -1))
                ? < CookerLogin loginEvent={handleLoggingClick} />
                :
                <div>
                    <div>
                        <Box sx={{ flexGrow: 1, p: "15px 15px 15px 15px" }}>
                            {
                                <MainMenu activePageEvent={handleStatePageClick} loggedCookerId={loggedCookerId} />
                            }
                            {idPage !== 0 &&
                                <Button
                                    variant="outlined"
                                    sx={{ flexGrow: 1, m: 2 }}
                                    startIcon={<HomeIcon />}
                                    onClick={() => handleStatePageClick(0, loggedCookerId)}
                                >
                                    Home
                                </Button>
                            }
                            {idPage !== 2 &&
                                <Button
                                    variant="outlined"
                                    sx={{ flexGrow: 1, m: 1 }}
                                    onClick={() => handleStatePageClick(2, loggedCookerId)}
                                >
                                    Resultados
                                </Button>
                            }
                            {idPage !== 3 &&
                                <Button
                                    variant="outlined"
                                    sx={{ flexGrow: 1, m: 1 }}
                                    onClick={() => handleStatePageClick(3, loggedCookerId)}
                                >
                                    Mis Puntuaciones
                                </Button>
                            }
                        </Box>
                    </div>
                    {getActualPage()}
                </div>
            }
            <Copyright />
        </div>
    )
}

export default CookerApp
