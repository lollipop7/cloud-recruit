import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import BreadCrumbComponent from 'components/breadcrumb';

import NavData from 'data/nav/recruit';

import FormComponents from 'components/recruit/form';
import TableComponents from 'components/recruit/table';

import RecruitInfoModalComponent from 'components/recruit-info';

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
        if(resumeId && logId){
            this.props.showResumeModal();
            // this.props.getResumeInfo({resumeId,logId});
        }
    }

    componentWillUnmount() {
        // 清空总数,防止叠加
        NavData[0].num = 0;
    }

    requestData(){
        this.props.getRecruitList(this.params);
    }

     _getNavData(){
        const {categoryData} = this.props;
        categoryData.forEach((item,index)=>{
            return NavData[item.stageid].num = item.cnt;
        });
        // 求和获得总共的数量
        
        const total = NavData.reduce((prevObj,nextObj)=>{
            return {num:prevObj.num + nextObj.num}
        },{num:0});
        NavData[0].num = total.num;
        return NavData;
    }

    onClick(type) {
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
                                onClick={this.onClick.bind(this)} 
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
                <RecruitInfoModalComponent />
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Recruit.isCategoryLoading,
    categoryData: state.Recruit.categoryData, // 统计列表数据
})
const mapDispatchToProps = dispatch => ({
    getRecruitCategory: bindActionCreators(Actions.RecruitACtions.getRecruitCategory, dispatch),
    getRecruitList: bindActionCreators(Actions.RecruitACtions.getRecruitList, dispatch),
    showResumeModal: bindActionCreators(Actions.RecruitACtions.showResumeModal, dispatch),
    // getResumeInfo: bindActionCreators(Actions.RecruitACtions.getResumeInfo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecruitPage);