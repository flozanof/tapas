import '../../css/App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CookerAvatar from '../cooker-avatar/cookerAvatar';
import CookerLoading from '../cooker-loading/cookerLoading';

const CookerList = (props) => {
    const [cookers, setCookers] = React.useState([]);

    React.useEffect(() => {
        console.log('**CookerList:' + process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COOKERS_TOURNAMENTS + '/' + props.tournamentId);
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_COOKERS_TOURNAMENTS + '/' + props.tournamentId)
            .then(response => {return response.json()})
            .then((cookersList) => 
                setCookers(cookersList.cookers))
            .catch(e => {
                alert(e);
                console.log(e); 
                return e;
                });
    }, [props.tournamentId]);

    const getScoreEvent= (cookerId) => {
        return (cookerId !== props.loggedCookerId) && props.activePageEvent;
    }

    const listCookers = () => {
        return (
            cookers.map((cooker) =>
                <Grid key={cooker.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <CookerAvatar
                        tournamentId={props.tournamentId}
                        avatarId={cooker.id}
                        avatarTitle={cooker.name}
                        cookerImage={(props.tournamentId + '/' + cooker.cookerPhoto)}
                        avatarImage={((cooker.coursePhotos == null) || (!cooker.coursePhotos[0].visible) ) ? null : `data:image/jpg;base64,${cooker.coursePhotos[0].base64Image}`}
                        avatarName={cooker.course}
                        cardEvent={props.activePageEvent}
                        scoreEvent={getScoreEvent(cooker.id)}
                        canEdit={false}
                        cardHeight="200"
                    />
                </Grid>)
        )
    };

    if (cookers.length > 0) {
        return (
            <div>
                <Box sx={{ flexGrow: 1, p: "15px" }} >
                    <Grid container spacing={2}>
                        {listCookers()}
                    </Grid>
                </Box>
            </div>
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookerList
