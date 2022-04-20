import '../../css/App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CookerAvatar from '../cooker-avatar/cookerAvatar';
import CookerLoading from '../cooker-loading/cookerLoading';

class CookerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cookers: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8081/cookers/tournamets/04-2022')
            .then(response => response.json())
            .then((cookersList) => 
                this.setState({ cookers: cookersList.cookers }))
            .catch(e => {
                alert(e);
                console.log(e);
                return e;
                });
    }

    getScoreEvent(cookerId) {
        return (cookerId !== this.props.loggedCookerId) && this.props.activePageEvent;
    }

    listCookers() {
        return (
            this.state.cookers.map((cooker) =>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <CookerAvatar
                        avatarId={cooker.id}
                        avatarTitle={cooker.name}
                        avatarImage={cooker.coursePhotos[0]}
                        avatarName={cooker.course}
                        cardEvent={this.props.activePageEvent}
                        scoreEvent={this.getScoreEvent(cooker.id)}
                    />
                </Grid>)
        )
    };

    render() {
        if (this.state.cookers.length > 0) {
            return (
                <div>
                    <Box sx={{ flexGrow: 1, p: "15px" }} >
                        <Grid container spacing={2}>
                            {this.listCookers()}
                        </Grid>
                    </Box>
                </div>
            )
        } else {
            return <CookerLoading/>
        }
    }
}
export default CookerList
