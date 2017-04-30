import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import { Breadcrumb } from 'antd';

export default class TalentPage extends Component {

     _getNavData(){
        return [
                {
                    title: '全部',
                    type: 'all',
                    num: 0
                },
                {
                    title: '在职人员',
                    type: 'preparation',
                    num: 1
                },
                {
                    title: '离职人员',
                    type: 'ongoing',
                    num: 2
                },
                {
                    title: '社会人才',
                    type: 'completed',
                    num: 3
                },
                {
                    title: '收藏',
                    type: 'stop',
                    num: 4
                },
                {
                    title: '理财师',
                    type: 'stop',
                    num: 4
                }
            ];
    }

    onClick(type) {
    }

    render() {
        const {routes,params} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content talent-page">
                    <Breadcrumb routes={routes} params={params} separator="&gt;" />
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