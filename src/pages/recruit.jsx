import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import BreadCrumbComponent from 'components/breadcrumb';

import NavData from 'data/nav/recruit';

import FormComponents from 'components/recruit/form';
import TableComponents from 'components/recruit/table';

// lodash
import isEqual from 'lodash/isEqual';

// 招聘人员详细信息Modal页面
import ResumeModalComponent from 'components/resume-modal';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecruitPage extends Component {

    state = {
        paginationCurrent: 1
    }

    params = {
        stageid: '0',
        skip: 0
    };

    formData = {
    };

    componentDidMount() {
        const {resumeId,logId} = this.props.routeParams;
        NProgress.done();
        this.props.getRecruitCategory();
        this._requestData();
    }

    _requestData(){
        this.props.getRecruitList({...this.params,...this.formData});
    }

     _getNavData(){
        const {categoryData} = this.props;
        categoryData.forEach((item,index)=>{
            return NavData[item.stageid].num = item.cnt;
        });
        // 清空总数,防止叠加
        NavData[0].num = 0;
        // 求和获得总共的数量
        const total = NavData.reduce((prevObj,nextObj)=>{
            return {num:prevObj.num + nextObj.num}
        },{num:0});
        NavData[0].num = total.num;
        return NavData;
    }

    handleClickNav = (type) => {
        this.params.stageid = type;
        this.params.skip = 0;
        this.setState({
            paginationCurrent: 1
        });
        this._requestData();
    }

    handleFind = (params) => {
        console.log(params);
        // 点击开始查找按钮
        if(isEqual(this.formData,params)) return ;
        this.formData = params;
        this.params.skip = 0;
        this._requestData();
    }

    paginationChange = (page,pageSize) => {
        // 点击分页器
        this.params.skip = (page - 1) * 20;
        this._requestData();
        this.setState({
            paginationCurrent: page
        });
    }

    render() {
        const {paginationCurrent} = this.state;
        const {routes,isLoading} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content recruit-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <LeftNav 
                                title="招聘分类" 
                                isLoading={isLoading}
                                data={this._getNavData()}
                                onClick={this.handleClickNav} 
                            />
                        </div>
                        <div className="pull-right">
                            <div className="box-border right-panel">
                                <FormComponents findEvent={this.handleFind} />
                                <TableComponents
                                    paginationChange={this.paginationChange}
                                    paginationCurrent={paginationCurrent}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*招聘人员详细信息Modal页面*/}
                <ResumeModalComponent />
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Recruit.isCategoryLoading,
    categoryData: state.Recruit.categoryData, // 统计列表数据
})
const mapDispatchToProps = dispatch => ({
    getRecruitCategory: bindActionCreators(Actions.RecruitActions.getRecruitCategory, dispatch),
    getRecruitList: bindActionCreators(Actions.RecruitActions.getRecruitList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecruitPage);