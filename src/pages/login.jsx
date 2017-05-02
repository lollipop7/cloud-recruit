import React, {Component,PropTypes} from 'react';
import ListItem from '@/components/login/ListItem';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class LoginPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        companyName: '',
        userName: '',
        passwd: ''
    }

    // bind event
    toLogin = this._toLogin.bind(this);
    inputCompany = this._inputCompany.bind(this);
    inputUserName = this._inputUserName.bind(this);
    inputPasswd = this._inputPasswd.bind(this);
    companyKeyUp = this._companyKeyUp.bind(this);
    userNameKeyUp = this._userNameKeyUp.bind(this);
    passwdKeyUp = this._passwdKeyUp.bind(this);

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

    _companyKeyUp(event) {
        if(event.keyCode === 13){
            this.refs.username.refs.input.focus();
        }
    }

    _userNameKeyUp(event) {
        if(event.keyCode === 13){
            this.refs.passwd.refs.input.focus();
        }
    }

    _passwdKeyUp(event) {
        if(event.keyCode === 13){
            this._toLogin();
        }
    }

    _toLogin() {
        const {companyName,userName,passwd} = this.state;
        if(companyName.length == 0){
            // Message.error('公司名不能为空！');
            return ;
        }else if(userName.length == 0) {
            // Message.error('用户名不能为空！');
            return ;
        }else if(passwd.length == 0) {
            // Message.error('密码不能为空！');
            return ;
        }
        const {userLogin}  = this.props;
        userLogin({
            companyname: companyName,
            loginname: userName,
            password: passwd
        });
    }

    componentWillUpdate(nextProps,nextState) {
        const {token} = nextProps.token || {};
        if(token){
            this.context.router.push({
                pathname: '/'
            });
        }
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
                                onKeyUp = {this.companyKeyUp}
                                value={companyName}
                            />
                            <ListItem 
                                ref="username"
                                imgSrc={`${prefix}user-icon.png`}
                                title="用户名"
                                placeholder="请输入您的用户名"
                                onChange={this.inputUserName}
                                onKeyUp={this.userNameKeyUp}
                                value={userName}
                            />
                            <ListItem 
                                ref="passwd"
                                imgSrc={`${prefix}passwd-icon.png`}
                                title="密码"
                                placeholder="请输入您的密码"
                                inputType="password"
                                onChange={this.inputPasswd}
                                onKeyUp={this.passwdKeyUp}
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
    token: state.Login.token
})
const mapDispatchToProps = dispatch => ({
    userLogin: bindActionCreators(Actions.loginActions.userLogin, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);