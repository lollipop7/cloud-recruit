import React, {Component} from 'react';

import {Input,Button} from 'antd';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {ErrorInputComponents} from 'components/input';

export default class SettingEmailPage extends Component {
    state = {
        oldPwd: '',
        newPwd: '',
        reNewPwd: ''
    };

    onChange=(field,e)=>{
        const {oldError=false,newError=false,reNewError=false} = this.state;
        if(field === 'oldPwd' && oldError){
            this.triggerError('oldError',false);
        }
        if(field === 'newPwd' && newError){
            this.triggerError('newError',false);
        }
        if(field === 'reNewPwd' && reNewError){
            this.triggerError('reNewError',false);
        }
        this.setState({
            [field]: e.target.value
        });
    }

    resetForm = () => {
        this.setState({
            oldPwd: '',
            newPwd: '',
            reNewPwd: ''
        });
    }

    triggerError = (field,bool) => {
        this.setState({
            [field]: bool
        });
    }

    validate = () => {
        const {oldPwd='',newPwd='',reNewPwd=''} = this.state;
        if(oldPwd === ''){
            this.triggerError('oldError',true);
        }
        if(newPwd === '') {
            this.triggerError('newError',true);
        }
        if(reNewPwd === ''){
            this.triggerError('reNewError',true);
        }
    }

    handChange = () => {
        const {oldPwd='',newPwd='',reNewPwd=''} = this.state;
        this.validate();
        if(oldPwd === ''){
            this.refs.oldPwdInput.refs.input.focus();
            return;
        }else if(newPwd === '') {
            this.refs.newPwdInput.refs.input.focus();
            return;
        }else if(reNewPwd === ''){
            this.refs.reNewPwdInput.refs.input.focus();
            return;
        }
        console.log('submit form');
    }

    handleOldEnter = () => {
        this.refs.newPwdInput.refs.input.focus();
    }

    handleNewEnter = () => {
        this.refs.reNewPwdInput.refs.input.focus();
    }

    handleReNewEnter = () => {
        this.handChange();
    }

    render() {
        const {routes} = this.props;
        const {oldPwd='',newPwd='',reNewPwd='',oldError=false,newError=false,reNewError=false} = this.state;
        return (
            <ScrollPageContent>
                <div className="page-content setting-email-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="settings-block box-border table form">
                        <div className="table-cell">
                            <ul>
                                <li className="table">
                                    <div className="table-cell">
                                        邮箱服务器
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="oldPwdInput"
                                            error={oldError}
                                            errorMsg="必填"
                                            placeholder="请输入旧密码"
                                            value={oldPwd}
                                            onChange={this.onChange.bind(this,'oldPwd')}
                                            onEnter={this.handleOldEnter}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <div className="table-cell">
                                        邮箱名
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="newPwdInput"
                                            error={newError}
                                            errorMsg="必填"
                                            placeholder="请输入邮箱名"
                                            value={newPwd}
                                            onChange={this.onChange.bind(this,'newPwd')}
                                            onEnter={this.handleNewEnter}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <div className="table-cell">
                                        密码
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="reNewPwdInput"
                                            error={reNewError}
                                            errorMsg="必填"
                                            placeholder="请输入新密码"
                                            value={reNewPwd}
                                            onChange={this.onChange.bind(this,'reNewPwd')}
                                            onEnter={this.handleReNewEnter}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <Button type="primary" onClick={this.handChange}>配置</Button>
                                    <Button onClick={this.resetForm}>重填</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}