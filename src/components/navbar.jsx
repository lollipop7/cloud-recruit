import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NavBarComponents extends Component {

    onClick=()=>{
        NProgress.start();
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
                        <Link to='#/'><img src={`${prefix}home.png`} alt="首页"/></Link>
                    </div>
                    <ul>
                        {
                            navData.map((item,index)=>{
                                return (
                                    <li key={index} style={{backgroundColor: ('/'+pathname.split('/')[1]) === item.path ? '#00699f' : ''}}>
                                        <Link onClick={this.onClick} to={item.path}>{item.name}</Link>
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
                                <p className="email-address">alicewang@163.com</p>
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