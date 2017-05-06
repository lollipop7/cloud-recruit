import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import BreadCrumbComponent from 'components/breadcrumb';

import FormComponents from 'components/recruit/form';
import TableComponents from 'components/recruit/table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecruitPage extends Component {

    componentDidMount() {
        NProgress.done();
        this.props.getRecruitCategory();
    }

     _getNavData(){
        const {categoryData} = this.props;
        console.log(categoryData);
        return [
                {
                    title: '全部',
                    type: 'all',
                    num: 0
                },
                {
                    title: '申请中',
                    type: 'preparation',
                    num: 1
                },
                {
                    title: '预约中',
                    type: 'ongoing',
                    num: 2
                },
                {
                    title: '面试',
                    type: 'completed',
                    num: 3
                },
                {
                    title: '复试',
                    type: 'stop',
                    num: 4
                },
                {
                    title: '待入职人员',
                    type: 'stop',
                    num: 4
                },
                {
                    title: '已入职',
                    type: 'stop',
                    num: 4
                },
                {
                    title: '未通过',
                    type: 'stop',
                    num: 4
                },
            ];
    }

    onClick(type) {
    }

    render() {
        const {routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content recruit-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <LeftNav 
                                title="招聘分类" 
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
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    categoryData: state.Recruit.categoryData, // 统计列表数据
})
const mapDispatchToProps = dispatch => ({
    getRecruitCategory: bindActionCreators(Actions.RecruitACtions.getRecruitCategory, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecruitPage);