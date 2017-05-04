import React, {Component} from 'react';

import { Button } from 'antd';
import BaseInfoComponent from 'components/create-job/baseinfo';
import TagsComponent from 'components/create-job/tags';
import OtherInfoComponent from 'components/create-job/other-info';

import BreadCrumbComponent from 'components/breadcrumb';

import each from 'lodash/each';
import pick from 'lodash/pick';


export default class CreateJobPage extends Component {
    
    componentDidMount() {
        NProgress.done();
    }

    resetForm = () => {
        const {BaseInfoComponent,OtherInfoComponent} = this.refs;
        BaseInfoComponent.resetData();
        OtherInfoComponent.resetData();
    }

    render() {
        let routesCopy = [];
        const {routes} = this.props;
        each(routes,item=>{
            routesCopy.push(pick(item,['breadcrumbName','path']));
        });
        routesCopy[1].path = '/job/index';
        return (
            <div className="page-content new-job-page">
                <BreadCrumbComponent routes={routesCopy} />
                <ul>
                    <BaseInfoComponent ref="BaseInfoComponent" />
                    <TagsComponent />
                    <OtherInfoComponent ref="OtherInfoComponent" />
                    <li className="control">
                        <ul>
                            <li>
                                <Button type="primary">发布</Button>
                                <Button onClick={this.resetForm}>重置</Button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}