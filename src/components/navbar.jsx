import React, {Component} from 'react';

export default class NavBarComponents extends Component {
    render() {
        const {location} = this.props,
            {pathname} = location,
            prefix = '/static/images/navbar/',
            navData = [
                {name: '职位管理'},
                {name: '招聘流程'},
                {name: '人才库'},
                {name: '任务报表'}
            ];
        return (
            <div className="navbar">
                <div className="navbar-inner">
                    <div className="logo">
                        <img src={`${prefix}logo.png`} alt="51云招聘"/>
                    </div>
                    <div className="home" style={{backgroundColor: pathname === '/' ? '#00699f' : ''}}>
                        <img src={`${prefix}home.png`} alt="首页"/>
                    </div>
                    <ul>
                        {
                            navData.map((item,index)=>{
                                return (
                                    <li key={index}>
                                        <a href="javascript:void(0);">{item.name}</a>
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