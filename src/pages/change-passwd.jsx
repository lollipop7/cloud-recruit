import React, {Component} from 'react';
import md5 from 'blueimp-md5';

import {Input,Button} from 'antd';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {ErrorInputComponents} from 'components/input';

import { notification } from 'utils/antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ChangePasswdPage extends Component {

    state = {
        oldPwd: '',
        newPwd: '',
        reNewPwd: '',
        oldPwdError: false,
        newPwdError: false,
        reNewPwdError: false
    };

    onChange=(field,e)=>{
        const val = e.target.value,
        pattern = /[0-9a-zA-Z]/;
        if(this.state[field+'Error']){
            this.triggerError(field,false);
        }
        this.setState({
            [field]: val
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
            [field+'Error']: bool
        });
    }

    validate = () => {
        const {oldPwd,newPwd,reNewPwd} = this.state;
        if(isEmpty(oldPwd)){
            this.refs.oldPwdInput.refs.input.focus();
            return false;
        }
        if(isEmpty(newPwd)) {
            this.refs.newPwdInput.refs.input.focus();
            return false;
        }
        if(isEmpty(reNewPwd)){
            this.refs.reNewPwdInput.refs.input.focus();
            return false;
        }
        return true;
    }

    handChange = () => {
        const {oldPwd='',newPwd='',reNewPwd=''} = this.state;
        if(!this.validate()) return;
        if(newPwd !== reNewPwd)
        {
            notification.error('输入的两次密码不一致！');
            return;
        }
        this.props.changePassWd({
            oldpasswd: md5(oldPwd),
            newpasswd: md5(newPwd)
        });
    }

    onEnter = (field) => {
        if(isString(field)){
            this.refs[field+'Input'].refs.input.focus();
        }else{
        }
    }

    onBlur = (field,event) => {
        if(this.state[field] === ''){
            this.triggerError(field,true);
        }
    }

    render() {
        const {routes} = this.props;
        const {
            oldPwd,
            newPwd,
            reNewPwd,
            oldPwdError,
            newPwdError,
            reNewPwdError,
            oldPwdErrorMsg= '必填',
            errorMsg = '必填'
        } = this.state;
        return (
            <ScrollPageContent>
                <div className="page-content change-passwd-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="settings-block box-border table form">
                        <div className="table-cell">
                            <ul>
                                <li className="table">
                                    <div className="table-cell">
                                        旧密码
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="oldPwdInput"
                                            error={oldPwdError}
                                            errorMsg={oldPwdErrorMsg}
                                            placeholder="请输入旧密码"
                                            value={oldPwd}
                                            onChange={this.onChange.bind(this,'oldPwd')}
                                            onEnter={this.onEnter.bind(this,'newPwd')}
                                            onBlur={this.onBlur.bind(this,'oldPwd')}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <div className="table-cell">
                                        新密码
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="newPwdInput"
                                            error={newPwdError}
                                            errorMsg={errorMsg}
                                            placeholder="请输入新密码"
                                            value={newPwd}
                                            onChange={this.onChange.bind(this,'newPwd')}
                                            onEnter={this.onEnter.bind(this,'reNewPwd')}
                                            onBlur={this.onBlur.bind(this,'newPwd')}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <div className="table-cell">
                                        确认密码
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="reNewPwdInput"
                                            error={reNewPwdError}
                                            errorMsg={errorMsg}
                                            placeholder="请再次输入新密码"
                                            value={reNewPwd}
                                            onChange={this.onChange.bind(this,'reNewPwd')}
                                            onEnter={this.onEnter}
                                            onBlur={this.onBlur.bind(this,'reNewPwd')}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <Button type="primary" onClick={this.handChange}>保存</Button>
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

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
    changePassWd: bindActionCreators(Actions.UserActions.changePassWd, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswdPage);