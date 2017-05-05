import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NavBarComponents extends Component {

    state = {
        showSetting: false
    }

    componentDidMount() {
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

    onMouseLeave = () => {
        this.setState({
            showSetting: false
        });
    }

    render() {
        const {location} = this.props,
            {pathname} = location,
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
                        <Link to='#/' onClick={this.showNprogress}><img src={`${prefix}home.png`} alt="首页"/></Link>
                    </div>
                    <ul className="nav-list">
                        {
                            navData.map((item,index)=>{
                                return (
                                    <li key={index} style={{backgroundColor: pathname === item.path ? '#00699f' : ''}}>
                                        <Link onClick={this.showNprogress} to={item.path}>{item.name}</Link>
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
                        <div className="table">
                            <div className="table-row">
                                <div className="email-address settings-wrapper" onMouseLeave={this.onMouseLeave} onMouseOver={this.showSettings}>alicewang@163.com
                                     <ul className="settings box-border" style={{
                                        transform: this.state.showSetting ? 'translateY(0px)' : ''
                                    }}>
                                        <li>
                                            <p className="email-address">alicewang@163.com</p>
                                        </li>
                                        <li>
                                            <Link to="/changePasswd" onClick={this.showNprogress.bind(this,'/changePasswd')}>
                                                修改密码
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/settingEmail" onClick={this.showNprogress.bind(this,'/settingEmail')}>
                                                配置邮箱
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="javascript:;">
                                                登出邮箱
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="table-row">
                                <p className="company-name">上海伊尔哈金融有限公司</p>
                            </div>
                        </div>
                       
                    </div>
                    <a href="javascript:void(0);" className="email">
                        <img src={`${prefix}email.png`} alt="邮箱" />
                    </a>
                    
                </div>
            </div>
        );
    }
}