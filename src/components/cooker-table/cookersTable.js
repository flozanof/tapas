import * as React from 'react';
import { scoreCookersTable } from '../functions/functionsScoreTable';
import CookerLoading from '../cooker-loading/cookerLoading';

const CookersTable = (props) => {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8081/scores/tournaments/04-2022')
            .then((response) => {
                return response.json()
            })
            .then((scoresList) => {
                setScores(scoresList.scores)
            });
    }, []);


    if (scores.length > 0) {
        return (
            scoreCookersTable('RESULTADOS', scores, props.loggedCookerId, props.activePageEvent, 4, false)
        )
    } else {
        return <CookerLoading/>
    }
}
export default CookersTable
