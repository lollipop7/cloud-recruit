import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader} from 'antd';
const SubMenu = Menu.SubMenu;

export default class CandidateResumePage extends Component {
    goBack = () => {
        this.props.showResumeDetail()
    }
    render() {
        return (
            <div className="candidateResume">
                <Button type="primary" onClick={this.goBack}>
                    <Icon type="left" />返回
                </Button>
                <p>联系人简历详情</p>   
            </div>
        );
    }
}