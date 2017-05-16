import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
// 面包屑导航
import BreadCrumbComponent from 'components/breadcrumb';

// 列表组件
import ListComponents from 'components/email/list';
import RightComponents from 'components/email/right';

export default class EmailPage extends Component {

    componentDidMount() {
        NProgress.done();
    }

    render() {
        const {routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content email-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <ListComponents />
                        </div>
                        <div className="pull-right">
                            <RightComponents />
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}