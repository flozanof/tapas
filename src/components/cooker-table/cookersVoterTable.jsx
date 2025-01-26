import * as React from 'react';
import ScoreCookersTable from '../functions/functionsScoreTable';
import CookerLoading from '../cooker-loading/cookerLoading';

const CookersVoterTable = (props) => {
    const [scoresCookers, setScoresCookers] = React.useState([]);

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_TOURNAMENTS + '/' + props.tournamentId + process.env.REACT_APP_API_VOTE_VOTERS + '/' +  props.loggedUserId)
            .then((response) => {
                return response.json()
            })
            .then((scoresList) => {
                scoresList.scores.sort((a, b) => (b.totalWeighted) - (a.totalWeighted));
                setScoresCookers(scoresList)
            });
    }, [props.tournamentId, props.loggedUserId]);


    if ( (scoresCookers) && (scoresCookers.scores) && (scoresCookers.scores.length > 0) ) {
        return (
            <ScoreCookersTable title='MIS PUNTUACIONES' scoresInitial={scoresCookers} loggedCookerId={props.loggedCookerId} tournamentOpen={props.tournamentOpen} page={4} modified={true} activePageEvent={props.activePageEvent} />
            //            scoreCookersTable('MIS PUNTUACIONES', scoresCookers, props.loggedCookerId, props.activePageEvent, 4, true)
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookersVoterTable
