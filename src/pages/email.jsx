import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
// 面包屑导航
import BreadCrumbComponent from 'components/breadcrumb';

// 列表组件
import ListComponents from 'components/email/list';
import RightComponents from 'components/email/right';

export default class EmailPage extends Component {

    state = {
        addressee: {}
    }

    componentDidMount() {
        NProgress.done();
    }

    selectAddressee = addressee => {
        this.setState({addressee});
    }

    render() {
        const {routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content email-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <ListComponents selectAddressee={this.selectAddressee} />
                        </div>
                        <div className="pull-right">
                            <RightComponents addressee={this.state.addressee} />
                        </div>
                    </div>
                    <div className="list-block">
                        <div className="pull-right">
                            
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}