import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';

import { Breadcrumb } from 'antd';

export default class JobPage extends Component {

    render() {
        const {routes,params,location} = this.props;
        const {pathname = ''}  = location;
        return (
            <ScrollPageContent>
                <div className={`page-content ${pathname === '/job/index' ? 'job-page' : 'new-job-page'}`}>
                    <Breadcrumb routes={routes} params={params} separator="&gt;" />
                    {this.props.children}
                </div>
            </ScrollPageContent>
        );
    }
}