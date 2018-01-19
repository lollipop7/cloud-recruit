import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input ,Icon} from 'antd';
const SubMenu = Menu.SubMenu;

import ResumeDetailComponent from 'components/resumeSearch/resumeDetail';
import ResumeSimpleComponent from 'components/resumeSearch/resumeSimple';
import CandidateResumeComponent from 'components/resumeSearch/candidateResume'

export default class CollectResumePage extends Component {

    state = {
        switchContent:"详",
        detail:true
    }
    switch = (switchContent) => {
        this.setState({
            switchContent:switchContent=="简"?"详":"简",
            detail:!this.state.detail
        })
    }
    //显示查看联系人内容
    checkCandidate = () => {
        this.setState({
            isCheckResume:true
        })
    }
    //隐藏联系人内容，显示简历详情
    showResumeDetail = () => {
        this.setState({
            isCheckResume:false
        })
    }
    render() {
        const {
            switchContent,
            detail,
            isCheckResume,//查看联系人状态
        } = this.state;
        const {route} = this.props;
        const {path} = route;
        return (
            <div className="collectResume">
                <div style={{marginLeft:20,marginBottom:20}}>
                    <Input
                        placeholder="请输入求职意向"
                    />
                    <Input
                        placeholder="请输入姓名"
                    />
                    <Button type="primary" icon="search">搜索</Button>
                </div>
            </div>
        );
    }
}