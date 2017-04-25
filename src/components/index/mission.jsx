import React, {Component} from 'react';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import LoadingComponent from 'components/loading';

class MissionComponent extends Component {

    state = {
        isLoading: false
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.getUrgentTasks({count:"4"});
    }

    componentWillUpdate(nextProps,nextState) {
        const {urgentTasks=[]} = nextProps;
        if(this.state.isLoading && urgentTasks.length > 0){
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const {isLoading} = this.state;
        return (
            <div className="mission">
                <div className="title">
                    紧急任务 
                </div>
                {isLoading && <LoadingComponent />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    urgentTasks: state.Home.urgentTasks
})
const mapDispatchToProps = dispatch => ({
    getUrgentTasks: bindActionCreators(Actions.homeActions.getUrgentTasks, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MissionComponent);