import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';

export default class DownloadResumePage extends Component {
    state = {
        switchContent:"详"
    }
    switch = (switchContent) => {
        this.setState({
            switchContent:switchContent=="简"?"详":"简"
        })
    }
    render() {
        const {switchContent} = this.state;
        return (
            <div className="mydownLoad">
                <div style={{marginLeft:20}}>
                    <Input
                        placeholder="请输入求职意向"
                    />
                    <Input
                        placeholder="请输入姓名"
                    />
                    <Input
                        placeholder="请输入手机号"
                    />
                    <Button type="primary" icon="search">搜索</Button>
                </div>
                <div className="queryResult">
                    <span>共找到1923份简历</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    <a 
                        onClick={this.switch.bind(this,switchContent)}
                    >
                        <Icon type="swap" />
                        切换至{switchContent}版
                    </a>
                    <div className="downLoadDetail">
                        <Icon type="frown-o">
                            <p style={{lineHeight:"50px"}}>您还没有下载任何简历~</p>
                        </Icon>
                    </div>
                </div>
            </div>
        );
    }
}