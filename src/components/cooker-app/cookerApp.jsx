import '../../css/App.css';
import * as React from 'react';
import CookerLogin from '../cooker-login/cookerLogin';
import CookerList from '../cooker-list/cookerList';
import CookerCard from '../cooker-card/cookerCard';
import CookersTable from '../cooker-table/cookersTable';
import CookersVoterTable from '../cooker-table/cookersVoterTable';
import CookersScoreForm from '../cooker-score/cookerScoreForm';
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

class CookerApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idPage: 0,
            cookerId: 0,
            loggedCookerId: 0,
            tournamentId: '02-2022'
        };
        this.handleLoggingClick = this.handleLoggingClick.bind(this);
        this.handleStatePageClick = this.handleStatePageClick.bind(this);
    }


    handleLoggingClick = (page, cookerId) => {
        console.log('cookerApp.js. **** LOGGING *****. cookerId: ' + cookerId + ' pageId: ' + page);
        this.setState({ idPage: page, loggedCookerId: cookerId });
    }

    handleStatePageClick = (page, cookerId) => {
        console.log('cookerApp.js. cookerId: ' + cookerId + ' pageId: ' + page);
        this.setState({ idPage: page, cookerId: cookerId });
    }

    getActualPage() {
        const pages = [
            <CookerList tournamentId={this.state.tournamentId} activePageEvent={this.handleStatePageClick} loggedCookerId={this.state.loggedCookerId} />,
            <CookerCard tournamentId={this.state.tournamentId} activePageEvent={this.handleStatePageClick} cookerId={this.state.cookerId} loggedCookerId={this.state.loggedCookerId} />,
            <CookersTable tournamentId={this.state.tournamentId} activePageEvent={this.handleStatePageClick} allScore={true} loggedCookerId={this.state.loggedCookerId} />,
            <CookersVoterTable activePageEvent={this.handleStatePageClick} loggedCookerId={this.state.loggedCookerId} />,
            <CookersScoreForm tournamentId={this.state.tournamentId} activePageEvent={this.handleStatePageClick} cookerId={this.state.cookerId} loggedCookerId={this.state.loggedCookerId} />
        ];
        console.info("pag: " + this.state.idPage);
        return pages[this.state.idPage];
    }

    render() {
        return (
            <div>
                <div>
                    <ToastContainer />
                </div>

                {this.state.loggedCookerId === 0
                    ? < CookerLogin activePageEvent={this.handleLoggingClick} />
                    :
                    <div>
                        <div>
                            <Box sx={{ flexGrow: 1, p: "15px 15px 15px 15px" }}>
                                {this.state.idPage !== 0 &&
                                    <Button
                                        variant="outlined"
                                        sx={{ flexGrow: 1, m: 2 }}
                                        startIcon={<HomeIcon />}
                                        onClick={() => this.handleStatePageClick(0, this.state.loggedCookerId)}
                                    >
                                        Home
                                    </Button>
                                }
                                {this.state.idPage !== 2 &&
                                    <Button
                                        variant="outlined"
                                        sx={{ flexGrow: 1, m: 1 }}
                                        onClick={() => this.handleStatePageClick(2, this.state.loggedCookerId)}
                                    >
                                        Resultados
                                    </Button>
                                }
                                {this.state.idPage !== 3 &&
                                    <Button
                                        variant="outlined"
                                        sx={{ flexGrow: 1, m: 1 }}
                                        onClick={() => this.handleStatePageClick(3, this.state.loggedCookerId)}
                                    >
                                        Mis Puntuaciones
                                    </Button>
                                }
                            </Box>
                        </div>
                        {this.getActualPage()}
                    </div>
                }
                <Copyright />
            </div>
        )
    }
}

export default CookerApp
