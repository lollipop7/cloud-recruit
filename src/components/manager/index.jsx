import React, {Component} from 'react';

//面包屑导航
import BreadCrumbComponent from 'components/breadcrumb';

// 左侧导航栏
import LeftNavComponent from './left-nav';
// 右边控制面板
import RightComponent from './right';

export default class IndexPage extends Component {

    componentDidMount() {
        NProgress.done();
    }

    render() {
        const {routes} = this.props;
        return (
            <div className="page-content manager-page">
                <BreadCrumbComponent routes={routes} />
                <div className="box-border list-block">
                    <div className="pull-left">
                        <LeftNavComponent />
                    </div>
                    <div className="pull-right">
                        <RightComponent {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
}