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
        const {isLoading} = this.state,
            {urgentTasks=[]} = this.props;
        return (
            <div className="mission">
                <div className="title">
                    紧急任务 
                </div>
                {!isLoading && urgentTasks.length > 0 &&
                    <ul>
                        {urgentTasks.map((item,index)=>{
                            // positionname 职位名称
                            // interview 面试人数
                            // sinterview 复试人数
                            // off offer数
                            // plan 任务进度
                            const {
                                positionname='',
                                interview=0,
                                sinterview=0,
                                off=0,
                                plan=0
                            } = item;
                            return (
                                <li key={index}>
                                    <div className="left">
                                        <div className="top">
                                            {positionname}
                                        </div>
                                        <div className="bottom">
                                            面试：{interview} 复试：{sinterview} offer: {off}
                                        </div>
                                    </div>
                                    <div className="right">
                                        <a href="javascript:void(0);">
                                            {plan}%
                                        </a>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                }
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