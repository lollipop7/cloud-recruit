import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import BreadCrumbComponent from 'components/breadcrumb';

import NavData from 'data/nav/recruit';

import FormComponents from 'components/recruit/form';
import TableComponents from 'components/recruit/table';

// 招聘人员详细信息Modal页面
import ResumeModalComponent from 'components/resume-modal';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecruitPage extends Component {

    params = {
        stageid: '0'
    };

    componentDidMount() {
        const {resumeId,logId} = this.props.routeParams;
        NProgress.done();
        this.props.getRecruitCategory();
        this.requestData();
    }

    componentWillUnmount() {
    }

    requestData(){
        this.props.getRecruitList(this.params);
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
        this.requestData();
    }

    render() {
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
                                <FormComponents />
                                <TableComponents />
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