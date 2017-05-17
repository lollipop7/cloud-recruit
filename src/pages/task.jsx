import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {Button,message} from 'antd';
import TimeComponent from 'components/time';

import TableComponent from 'components/task/table';

export default class TaskPage extends Component {
    componentDidMount() {
        NProgress.done();
    }

    tableExport = () => {
        message.info('功能正在开发中...');
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
                        <Button className="download" onClick={this.tableExport} type="primary">下载</Button>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}