import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {Button} from 'antd';
import TimeComponent from 'components/time';

import TableComponent from 'components/task/table';

export default class TaskPage extends Component {
    componentDidMount() {
        NProgress.done();
    }
    render() {
        const {routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content task-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border">
                        <div className="form">
                            <TimeComponent
                                style={{width:'249px',marginRight:'16px'}}
                            />
                            <Button type="primary">查询</Button>
                        </div>
                        <TableComponent />
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}