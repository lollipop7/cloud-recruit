import React, {Component,PropTypes} from 'react';
import {Link} from 'react-router';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class NavBarComponents extends Component {

    state = {
        isLoading: false,
        showSetting: false
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.getUserEmail();
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.userEmailInfo.mailServersList && nextState.isLoading ){
            this.setState({
                isLoading: false
            });
        }
    }

    showNprogress=(uri)=>{
        const {location} = this.props,
            {pathname} = location;
        if(uri === pathname) return ;
        NProgress.start();
    }

    showSettings = () => {
        this.setState({
            showSetting: true
        });
    }

    hideSettings = () => {
        this.setState({
            showSetting: false
        });
    }

    logout = () => {
        this.hideSettings();
        NProgress.start();
        this.props.userLoginout(this.context);
    }

    handleClickSetting = (uri) => {
        const {location} = this.props,
            {pathname} = location;
        if(uri === pathname) return ;
        this.showNprogress();
        this.hideSettings();
    }

    render() {
        const {isLoading} = this.state,
        {location,userEmailInfo} = this.props,
            {pathname} = location,
            {email='',servername=''} = userEmailInfo.userMail,
            prefix = '/static/images/navbar/',
            navData = [
                {name: '职位管理',path:'/job/index'},
                {name: '招聘流程',path:'/recruit'},
                {name: '人才库',path:'/talent'},
                {name: '任务报表',path:'/task'}
            ];
        return (
            <div className="navbar">
                <div className="navbar-inner">
                    <div className="logo">
                        <img src={`${prefix}logo.png`} alt="51云招聘"/>
                    </div>
                    <div className="home" style={{backgroundColor: pathname === '/' ? '#00699f' : ''}}>
                        <Link to='#/' onClick={this.showNprogress.bind(this,'/')}><img src={`${prefix}home.png`} alt="首页"/></Link>
                    </div>
                    <ul className="nav-list">
                        {
                            navData.map((item,index)=>{
                                return (
                                    <li key={index} style={{backgroundColor: pathname === item.path ? '#00699f' : ''}}>
                                        <Link onClick={this.showNprogress.bind(this,item.path)} to={item.path}>{item.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="search">
                        <input type="text" placeholder="人才搜索" />
                        <a href="javascript:void(0);" className="search-button"></a>
                    </div>
                    <div className="user">
                        {!isLoading &&
                            <div className="table">
                                <div className="table-row">
                                    <div 
                                        className="email-address dropdown-wrapper" 
                                        onMouseLeave={this.hideSettings} 
                                        onMouseOver={this.showSettings}
                                    >
                                        {email}
                                        <ul className="dropdown-menu box-border" style={{
                                            transform: this.state.showSetting ? 'translateY(10px)' : ''
                                        }}>
                                            <li>
                                                <p className="email-address">{email}</p>
                                            </li>
                                            <li>
                                                <Link to="/changePasswd" onClick={this.handleClickSetting.bind(this,'/changePasswd')}>
                                                    修改密码
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/settingEmail" onClick={this.handleClickSetting.bind(this,'/settingEmail')}>
                                                    配置邮箱
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="javascript:;" onClick={this.logout}>
                                                    登出系统
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="table-row">
                                    <p className="company-name">{servername}</p>
                                </div>
                            </div>
                        }
                        {isLoading &&
                            <div className="preloader-white absolute-center" style={{
                                width: 25,
                                height: 25
                            }}>
                            </div>
                        }
                    </div>
                    <a href="javascript:void(0);" className="email">
                        <img src={`${prefix}email.png`} alt="邮箱" />
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userEmailInfo: state.User.userEmailInfo
})
const mapDispatchToProps = dispatch => ({
    getUserEmail: bindActionCreators(Actions.UserActions.getUserEmail, dispatch),
    userLoginout:bindActionCreators(Actions.logoutActions.userLoginout, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBarComponents);