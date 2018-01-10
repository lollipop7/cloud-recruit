import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader} from 'antd';
const SubMenu = Menu.SubMenu;

export default class ResumeSimplePage extends Component {
    checkResumeDetail = () => {
        this.props.checkCandidate()
    }
    render() {
        return (
            <div className="resumeSimple">
                <table className="resumeSimpleTable">
                    <thead>
                        <tr>
                            <th>求职意向</th>
                            <th>姓名</th>
                            <th>学历</th>
                            <th>最近职位</th>
                            <th>最近工作公司名称</th>
                            <th>期望薪资</th>
                            <th>工作年限</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span>Web前端开发</span></td>
                            <td><a onClick={this.checkResumeDetail}>催先生</a></td>
                            <td><span>本科</span></td>
                            <td><span>Web前端开发</span></td>
                            <td><span>武汉博怀科技有限责任公司</span></td>
                            <td><span>10000-14999</span></td>
                            <td><span>7年</span></td>
                            <td><a onClick={this.checkResumeDetail}>查看</a></td>
                        </tr>
                    </tbody>
                </table>     
            </div>
        );
    }
}