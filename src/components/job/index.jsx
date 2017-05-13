import React, {Component} from 'react';

import LeftNav from 'components/job/nav';
import RightComponent from './right';

// lodash
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

import BreadCrumbComponent from 'components/breadcrumb';

import navData from 'data/nav/job';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class IndexPage extends Component {
    state = {
        paginationCurrent: 1
    }
    params = {
        type: 'all',
        skip: 0
    };

    // 表单数据
    formData = {
    };

    componentDidMount() {
        NProgress.done();
        // 获取职位分类统计
        this.props.getJobCategory();
        // 获取职位列表
        this._requestData();
    }

    _requestData() {
        this.props.getJobList({...this.params,...this.formData});
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

    clickNav(type) {
        // 点击侧边栏分类
        this.params.type = type;
        this.params.skip = 0;
        this.setPaginationCurrent(1);
        this._requestData();
    }

    handleSearch = (params) => {
        if(isEqual(this.formData,params)) return ;
        // 点击搜索按钮
        this.params.skip = 0;
        this.formData = params;
        this.setPaginationCurrent(1);
        this._requestData();
    }

    paginationChange = (page,pageSize) => {
        this.params.skip = (page-1)*20;
        this._requestData();
        this.setPaginationCurrent(page);
    }   

    setPaginationCurrent = paginationCurrent => {
        this.setState({paginationCurrent});
    }

    render() {
        const {paginationCurrent} = this.state;
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
                            onClick={this.clickNav.bind(this)} 
                        />
                    </div>
                    <div className="pull-right">
                        <RightComponent 
                            onSearch={this.handleSearch} 
                            paginationChange={this.paginationChange} 
                            paginationCurrent={paginationCurrent}
                        />
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