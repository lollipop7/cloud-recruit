import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import FormComponent from 'components/talent/form';
import TableComponent from 'components/talent/table';
import BreadCrumbComponent from 'components/breadcrumb';

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

    componentDidMount() {
        NProgress.done();
    }

    onClick(type) {
    }

    render() {
        const {routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content talent-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <LeftNav 
                                title="人才分类" 
                                data={this._getNavData()}
                                onClick={this.onClick.bind(this)} 
                            />
                        </div>
                        <div className="pull-right">
                            <div className="box-border right-panel">
                                <FormComponent />
                                <TableComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}