import React, {Component} from 'react';

import LeftNav from 'components/job/nav';
import RightComponent from './right';

import merge from 'lodash/merge';
import omit from 'lodash/omit';

import BreadCrumbComponent from 'components/breadcrumb';

import navData from 'data/nav/job';

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
        // 获取职位分类统计
        this.props.getJobCategory();
        // 获取职位列表
        this.requestData();
    }

    onClick(type) {
        this.params.type = type;
        this.params.skip = 0;
        this.requestData();
    }

    requestData() {
        this.props.getJobList({...this.params});
    }

    searchJob = (params) => {
        const {starttime,endtime} = params;
        this.params = merge(this.params,params);
        if(starttime === 0 ){
            this.params = omit(this.params,['starttime']);
        }
        if(endtime === 0){
            this.params = omit(this.params,['endtime']);
        }
        this.requestData();
    }

    _getNavData(data) {
        let navArr =  Object.keys(data).map(item=>{
            navData[item].num = data[item]
            return navData[item];
        }); 
        navArr.sort((a,b)=>{
             return a.index - b.index;
        });
        return navArr;        
    }

    paginationChange = (p) => {
        this.params.skip = (p.current-1)*20;
        this.requestData();
    }   

    render() {
        const {routes,categoryData,isLoading} = this.props;
        return (
            <div className="page-content job-page">
                <BreadCrumbComponent routes={routes} />
                <div className="list-block">
                    <div className="pull-left">
                        <LeftNav 
                            title="职位分类" 
                            isLoading={isLoading}
                            data={this._getNavData(categoryData)}
                            onClick={this.onClick.bind(this)} 
                        />
                    </div>
                    <div className="pull-right">
                        <RightComponent searchJob={this.searchJob} paginationChange={this.paginationChange} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categoryData: state.Job.categoryData, // 统计列表数据
    isLoading: state.Job.isLoadingCategory
})
const mapDispatchToProps = dispatch => ({
    getJobCategory: bindActionCreators(Actions.jobActions.getJobCategory, dispatch),
    getJobList: bindActionCreators(Actions.jobActions.getJobList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);