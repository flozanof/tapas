import * as React from 'react';
import ScoreCookersTable from '../functions/functionsScoreTable';
import CookerLoading from '../cooker-loading/cookerLoading';

const CookersTable = (props) => {
    const [scoresCookers, setScoresCookers] = React.useState([]);

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_TOURNAMENTS + '/' + props.tournamentId)
            .then((response) => {
                return response.json()
            })
            .then((scoresList) => {
                scoresList.scores.sort((a, b) => (b.totalWeighted) - (a.totalWeighted));
                setScoresCookers(scoresList);
            });
    }, [props.tournamentId]);


    if ( (scoresCookers) && (scoresCookers.scores) && (scoresCookers.scores.length > 0) ) {
        return (
            <ScoreCookersTable title='RESULTADOS' scoresInitial={scoresCookers} loggedCookerId={props.loggedCookerId} activePageEvent={props.activePageEvent} page={4} modified={false} />
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookersTable
