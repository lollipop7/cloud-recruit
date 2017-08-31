import React, {Component} from 'react';

import {Input,Button,Select,Tabs} from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {ErrorInputComponents} from 'components/input';

import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class SettingEmailPage extends Component {
    state = {
        email: '',
        pwd: ''
    };

    componentDidMount() {
        NProgress.done();
        this.props.getUserEmail();
    }

    componentWillUpdate(nextProps,nextState) {
        const {userEmailInfo} = nextProps;
        if(!isEmpty(userEmailInfo.userMail) && ( userEmailInfo !== this.props.userEmailInfo)){
            setTimeout(()=>{
                this.resetForm();
            },0);
        }
    }

    handleChange=(field,e)=>{
        this.setState({
            [field]: e.target.value
        });
    }

    triggerError = (error) => {
        this.setState({error});
    }

    resetForm = () => {
        const {userEmailInfo} = this.props,
            {email,password,mailid} = userEmailInfo.userMail;
        const {emailInput,pwdInput} = this.refs;
        this.setState({
            mailid: mailid+'',
            email: email,
            pwd: password
        });
        // 设置邮箱名的值
        emailInput.resetVal(email);
        // 设置密码的值
        pwdInput.resetVal(password);
    }

    validate = () => {
        const {email='',pwd=''} = this.state,
            {emailInput,pwdInput} = this.refs;
        // if(mailid === undefined){
        //     this.triggerError(true);
        //     return false;
        // }
        if(email === '') {
            emailInput.refs.input.focus();
            return false;
        }
        if(pwd === ''){
            pwdInput.refs.input.focus();
            return false;
        }
        return true;
    }

    setEmail = () => {
        if(!this.validate()) return ;
        NProgress.start();
        this.props.changeEmailSetting(omit(this.state,['error']));
    }

    handleEnter = (field) => {
        if(typeof field === 'string'){
            this.refs[field].refs.input.focus();
        }else{
            this.setEmail();
        }
    }

    handleSelectChange = (value) => {
        this.setState({
            mailid: value
        });
    }

    handleSelectBlur = () => {
        if(this.state.mailid === undefined){
            this.triggerError(true);
        }else{
            this.triggerError(false);
        }
    }

    

    render() {
        const {error=false,mailid,errorMsg='必填'} = this.state,
            {routes,userEmailInfo} = this.props,
            {mailServersList,userMail} = userEmailInfo;
        const userMailId = userMail.mailid;
        const pane = (
            <div className="email-panel-wrap">
                <ul>
                    <li className="table">
                        <div className="table-cell">
                            邮箱服务器
                        </div>
                        <div className="table-cell">
                            <Select
                                style={{
                                    width: '100%'
                                }}
                                className={error ? 'error' : ''}
                                value={mailid}
                                placeholder="请选择邮箱服务器"
                                onChange={this.handleSelectChange}
                                onBlur={this.handleSelectBlur}
                            >
                            {
                                mailServersList.map( (item,index)=>{
                                    const {id,servername} = item;
                                    return (
                                        <Option key={index} value={id+''}>
                                            {servername}
                                            </Option>
                                    );
                                })
                            }
                            </Select>
                            {error&&
                                <div className="error-promote" style={{
                                    paddingLeft: 0
                                }}>
                                    <label className="error">{errorMsg}</label>
                                </div>
                            }
                        </div>
                    </li>
                    <li className="table">
                        <div className="table-cell">
                            邮箱名
                        </div>
                        <div className="table-cell">
                            <ErrorInputComponents 
                                ref="emailInput"
                                placeholder="请输入邮箱名"
                                onChange={this.handleChange.bind(this,'email')}
                                onEnter={this.handleEnter.bind(this,'pwdInput')}
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
                                ref="pwdInput"
                                placeholder="请输新密码"
                                onChange={this.handleChange.bind(this,'pwd')}
                                onEnter={this.handleEnter}
                            />
                        </div>
                    </li>
                    <li className="table form-btns">
                        <Button type="primary" onClick={this.setEmail}>配置</Button>
                        <Button className="grey" onClick={this.resetForm}>重填</Button>
                    </li>
                </ul>
            </div>
        )

        return (
            <ScrollPageContent>
                <div className="page-content setting-email-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="settings-block box-border table form">
                        <Tabs type="card">
                            <TabPane tab="发送邮箱" key="1">
                                {pane}
                            </TabPane>
                            <TabPane tab="简历邮箱" key="2">
                                {pane}
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    userEmailInfo: state.User.userEmailInfo
})
const mapDispatchToProps = dispatch => ({
    getUserEmail: bindActionCreators(Actions.UserActions.getUserEmail, dispatch),
    changeEmailSetting: bindActionCreators(Actions.UserActions.changeEmailSetting, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingEmailPage);