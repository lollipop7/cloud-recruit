import React, {Component} from 'react';

import LeftNav from 'components/job/nav';
import RightComponent from './right';

import merge from 'lodash/merge';
import omit from 'lodash/omit';

import BreadCrumbComponent from 'components/breadcrumb';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class IndexPage extends Component {

    params = {
        type: 'all'
    };

    componentDidMount() {
        NProgress.done();
        this.props.getJobStatistics();
        this.props.getJobList({
            type: this.params.type
        });
    }

    onClick(type) {
        this.params.type = type;
        this.requestData();
    }

    requestData() {
        this.props.getJobList({...this.params});
    }

    searchJob = (params) => {
        const {starttime,endtime} = params;
        if(starttime === 0 ){
            this.params = omit(params,['starttime']);
        }
        if(endtime === 0){
            this.params = omit(params,['endtime']);
        }
        this.requestData();
    }

    _getNavData() {
        const {
            all=0,
            completed=0,
            ongoing=0,
            preparation=0,
            stop=0
        } = this.props.statisticsData;
        return [
                    {
                        title: '全部',
                        type: 'all',
                        num: all
                    },
                    {
                        title: '准备中',
                        type: 'preparation',
                        num: preparation
                    },
                    {
                        title: '进行中',
                        type: 'ongoing',
                        num: ongoing
                    },
                    {
                        title: '已完成',
                        type: 'completed',
                        num: completed
                    },
                    {
                        title: '已终止',
                        type: 'stop',
                        num: stop
                    }
                ];
    }

    componentWillUpdate(nextProps,nextState) {
    }

    render() {
        const {routes} = this.props;
        return (
            <div className="page-content job-page">
                <BreadCrumbComponent routes={routes} />
                <div className="list-block">
                    <div className="pull-left">
                        <LeftNav 
                            title="职位分类" 
                            data={this._getNavData()}
                            onClick={this.onClick.bind(this)} 
                        />
                    </div>
                    <div className="pull-right">
                        <RightComponent searchJob={this.searchJob} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    statisticsData: state.Job.statisticsData, // 统计列表数据
    isLoading : state.Job.isLoading
})
const mapDispatchToProps = dispatch => ({
    getJobStatistics: bindActionCreators(Actions.jobActions.getJobStatistics, dispatch),
    getJobList: bindActionCreators(Actions.jobActions.getJobList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);