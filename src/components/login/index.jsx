import React, {Component} from 'react';

import ListItem from 'components/login/ListItem';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class IndexComponent extends Component {

    state = {
        companyName: '',
        userName: '',
        passwd: ''
    }

    handleChange = (field,e) => {
        this.setState({
            [field]: event.target.value
        });
    }

    handleKeyUp = (field,e) => {
        if(e.keyCode === 13){
            this.refs[field].refs.input.focus();
        }
    }

    passwdKeyUp = (e) => {
        if(e.keyCode === 13){
            this.toLogin();
        }
    }

    toLogin = () => {
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

    render() {
        const {companyName,userName,passwd} = this.state;
        const prefix = "./static/images/login/";
        return (
            <div className="bg">
                <div id="common-loader" className="common-loader page-loader">
                    <div className="spinner">
                        <div className="dot1"></div>
                        <div className="dot2"></div>
                    </div>
                </div>
                <div className="login-area">
                    <img className="logo" src={`${prefix}logo.png`} alt="51招聘云"/>
                    <p className="desc">先进的互联网金融招聘系统</p>
                    <ul>
                        <ListItem
                            imgSrc={`${prefix}company-icon.png`}
                            title="公司名"
                            placeholder="请输入公司名"
                            onChange={this.handleChange.bind(this,'companyName')}
                            onKeyUp = {this.handleKeyUp.bind(this,'username')}
                            value={companyName}
                        />
                        <ListItem 
                            ref="username"
                            imgSrc={`${prefix}user-icon.png`}
                            title="用户名"
                            placeholder="请输入您的用户名"
                            onChange={this.handleChange.bind(this,'userName')}
                            onKeyUp={this.handleKeyUp.bind(this,'passwd')}
                            value={userName}
                        />
                        <ListItem 
                            ref="passwd"
                            imgSrc={`${prefix}passwd-icon.png`}
                            title="密码"
                            placeholder="请输入您的密码"
                            inputType="password"
                            onChange={this.handleChange.bind(this,'passwd')}
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
)(IndexComponent);