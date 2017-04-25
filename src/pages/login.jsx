import React, {Component} from 'react';
import ListItem from '@/components/login/ListItem';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// layer
import customLayer from 'utils/layer';

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            companyName: '',
            userName: '',
            passwd: ''
        }
        // bind event
        this.toLogin = this._toLogin.bind(this);
        this.inputCompany = this._inputCompany.bind(this);
        this.inputUserName = this._inputUserName.bind(this);
        this.inputPasswd = this._inputPasswd.bind(this);
    }

    _inputCompany(event) {
        this.setState({
            companyName: event.target.value
        });
    }
    _inputUserName(event) {
        this.setState({
            userName: event.target.value
        });
    }
    _inputPasswd(event) {
        this.setState({
            passwd: event.target.value
        });
    }

    _toLogin() {
        const {companyName,userName,passwd} = this.state;
        if(companyName.length == 0){
            customLayer.msg('公司名不能为空！');
            return ;
        }else if(userName.length == 0) {
            customLayer.msg('用户名不能为空！');
            return ;
        }else if(passwd.length == 0) {
            customLayer.msg('密码不能为空！');
            return ;
        }
        const {userLogin}  = this.props;
        userLogin({
            companyname: companyName,
            loginname: userName,
            password: passwd
        });
    }

    render() {
        const {companyName,userName,passwd} = this.state;
        const prefix = "/static/images/login/";
        return (
            <div id="login-page">
                <div className="bg">
                    <div className="login-area">
                        <img className="logo" src={`${prefix}logo.png`} alt="51招聘云"/>
                        <p className="desc">先进的互联网金融招聘系统</p>
                        <ul>
                            <ListItem 
                                imgSrc={`${prefix}company-icon.png`}
                                title="公司名"
                                placeholder="请输入公司名"
                                onChange={this.inputCompany}
                                value={companyName}
                            />
                            <ListItem 
                                imgSrc={`${prefix}user-icon.png`}
                                title="用户名"
                                placeholder="请输入您的用户名"
                                onChange={this.inputUserName}
                                value={userName}
                            />
                            <ListItem 
                                imgSrc={`${prefix}passwd-icon.png`}
                                title="密码"
                                placeholder="请输入您的密码"
                                inputType="password"
                                onChange={this.inputPasswd}
                                value={passwd}
                            />
                        </ul>
                        <p className="forget-password">
                            <a href="javascript:void(0);">忘记密码？</a>
                        </p>
                        <a 
                            href="javascript:void(0);" 
                            className="button login"
                            onClick={this.toLogin}
                        >安全登陆</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
    userLogin: bindActionCreators(Actions.loginActions.userLogin, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);