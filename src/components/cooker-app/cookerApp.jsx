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
import SelectTournament from '../tournament/selectTournament';
import CookerChangeUser from '../cooker-login/CookerChangeUser';

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
    const [user, setUser] = useState({});
    const [tournament, setTournament] = useState({});
    const [idPage, setIdPage] = useState(0);
    const [cookerId, setCookerId] = useState(0);
    const [loggedCookerId, setLoggedCookerId] = useState(-1);
    const [loggedUserId, setLoggedUserId] = useState(-1);

    const handleUser = (aUser) => {
        console.log('cookerApp.handleUser: ' + aUser.name + ' - ' + aUser.userType);
        setUser(aUser);
    }

    const handleTournament = (aTournament) => {
        console.log('cookerApp.handleTournament: ' + aTournament.id + ' - ' + aTournament.votar);
        setTournament(aTournament);
    }

    const handleLoggingClick = (userId, cookerId, tournament, pageId) => {
        console.log('cookerApp.js. **** LOGGING *****. userId: ' + userId + ' cookerId: ' + cookerId + ' tournamentId: ' + (tournament === undefined) ? 'undefined' : tournament.id);
        setIdPage(pageId);
        if (userId !== -1) {
            setLoggedUserId(userId);
        }
        if (cookerId !== -1) {
            setLoggedCookerId(cookerId);
        }
        if (tournament !== undefined) {
            setTournament(tournament);
        }
    }

    const handleStatePageClick = (page, cookerId) => {
        console.log('cookerApp.js. cookerId: ' + cookerId + ' pageId: ' + page);
        if (cookerId === -1) {
            setIdPage(0);
            setCookerId(0);
            setLoggedCookerId(-1);
            setLoggedUserId(-1);
        } else {
            setIdPage(page);
            setCookerId(cookerId);
        }
    }

    const getActualPage = () => {
        const pages = [
            <CookerList loggedCookerId={loggedCookerId} tournamentId={tournament.id} tournamentOpen={tournament.votar === 'S'} activePageEvent={handleStatePageClick} />,
            <CookerCard cookerId={cookerId} loggedCookerId={loggedCookerId} tournamentId={tournament.id} activePageEvent={handleStatePageClick} />,
            <CookersTable loggedCookerId={loggedCookerId} tournamentId={tournament.id} allScore={true} activePageEvent={handleStatePageClick} />,
            <CookersVoterTable loggedCookerId={loggedCookerId} loggedUserId={loggedUserId} tournamentId={tournament.id} tournamentOpen={tournament.votar === 'S'} activePageEvent={handleStatePageClick} />,
            <CookerScoreForm cookerId={cookerId} loggedCookerId={loggedCookerId} loggedUserId={loggedUserId} tournamentId={tournament.id} activePageEvent={handleStatePageClick} />,
            <SelectTournament user={user} loginEvent={handleLoggingClick} />,
            <CookerChangeUser user={user} pageReturn={0} changeStateUserEvent={handleUser} loginEvent={handleLoggingClick} />
        ];
        return pages[idPage];
    }

    return (
        <div>
            <div>
                <ToastContainer style={{ whiteSpace: "pre-line" }} />
            </div>

            {((loggedCookerId === -1) || (idPage === -1))
                ? < CookerLogin loginEvent={handleLoggingClick} userEvent={handleUser} />
                :
                <div>
                    <div>
                        <Box sx={{ flexGrow: 1, p: "15px 15px 15px 15px" }}>
                            {
                                <MainMenu
                                    userType={user.userType}
                                    tournamentId={tournament.id}
                                    tournamentOpen={tournament.votar}
                                    loggedCookerId={loggedCookerId}
                                    tournamentVisible={user.tournaments.length > 1}
                                    handleTournament={handleTournament}
                                    activePageEvent={handleStatePageClick}
                                />
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
