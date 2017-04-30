import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import { Breadcrumb } from 'antd';

export default class TaskPage extends Component {
    render() {
        const {routes,params} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content task-page">
                    <Breadcrumb routes={routes} params={params} separator="&gt;" />
                </div>
            </ScrollPageContent>
        );
    }
}