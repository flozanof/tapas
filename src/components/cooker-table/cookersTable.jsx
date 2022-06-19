import * as React from 'react';
import { scoreCookersTable } from '../functions/functionsScoreTable';
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
            scoreCookersTable('RESULTADOS', scoresCookers, props.loggedCookerId, props.activePageEvent, 4, false)
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookersTable
