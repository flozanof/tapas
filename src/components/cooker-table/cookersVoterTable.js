import * as React from 'react';
import { scoreCookersTable } from '../functions/functionsScoreTable';
import CookerLoading from '../cooker-loading/cookerLoading';

const CookersVoterTable = (props) => {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8081/scores/voters/' +  props.loggedCookerId)
            .then((response) => {
                return response.json()
            })
            .then((scoresList) => {
                setScores(scoresList.scores)
            });
    }, []);


    if (scores.length > 0) {
        return (
            scoreCookersTable('MIS PUNTUACIONES', scores, props.loggedCookerId, props.activePageEvent, 4, true)
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookersVoterTable
