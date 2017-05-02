import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

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
                </div>
            </ScrollPageContent>
        );
    }
}