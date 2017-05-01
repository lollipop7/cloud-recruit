import React, {Component} from 'react';

import { Button } from 'antd';
import BaseInfoComponent from 'components/create-job/baseinfo';
import TagsComponent from 'components/create-job/tags';
import OtherInfoComponent from 'components/create-job/other-info';

export default class CreateJobPage extends Component {
    
    resetForm = () => {
        const {BaseInfoComponent,OtherInfoComponent} = this.refs;
        BaseInfoComponent.resetData();
        OtherInfoComponent.resetData();
    }

    render() {
        return (
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
        );
    }
}