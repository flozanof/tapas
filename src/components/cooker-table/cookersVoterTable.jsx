import * as React from 'react';
import { scoreCookersTable } from '../functions/functionsScoreTable';
import CookerLoading from '../cooker-loading/cookerLoading';

const CookersVoterTable = (props) => {
    const [scoresCookers, setScoresCookers] = React.useState([]);

    React.useEffect(() => {
        console.log("aaaaaaa "+ process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_VOTERS + '/' +  props.loggedCookerId);
        fetch(process.env.REACT_APP_API_VOTE + process.env.REACT_APP_API_VOTE_SCORES_VOTERS + '/' +  props.loggedCookerId)
            .then((response) => {
                return response.json()
            })
            .then((scoresList) => {
                scoresList.scores.sort((a, b) => (b.totalWeighted) - (a.totalWeighted));
                setScoresCookers(scoresList)
            });
    }, [props.loggedCookerId]);


    if ( (scoresCookers) && (scoresCookers.scores) && (scoresCookers.scores.length > 0) ) {
        return (
            scoreCookersTable('MIS PUNTUACIONES', scoresCookers, props.loggedCookerId, props.activePageEvent, 4, true)
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookersVoterTable
