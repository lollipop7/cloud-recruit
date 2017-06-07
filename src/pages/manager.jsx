import React, {Component} from 'react';
import BasicPage from './basic';
import ScrollPageContent from 'components/scroll-page-content';

//面包屑导航
import BreadCrumbComponent from 'components/breadcrumb';

// 左侧导航栏
import LeftNavComponent from 'components/manager/left-nav';
// 右边控制面板
import RightComponent from 'components/manager/right';

export default class ManagerPage extends BasicPage {

    componentDidMount() {
        this.hideNProgress();
    }

    render() {
        const {routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content manager-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border list-block">
                        <div className="pull-left">
                            <LeftNavComponent />
                        </div>
                        <div className="pull-right">
                            <RightComponent />
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}