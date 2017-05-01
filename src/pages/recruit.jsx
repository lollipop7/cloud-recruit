import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import BreadCrumbComponent from 'components/breadcrumb';

export default class RecruitPage extends Component {

    componentDidMount() {
        NProgress.done();
    }

     _getNavData(){
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
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}