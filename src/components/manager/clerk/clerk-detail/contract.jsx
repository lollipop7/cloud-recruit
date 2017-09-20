import React, {Component} from 'react';

import {Icon} from 'antd';

import clerkInfo from 'data/clerk/clerk';

export default class Contract extends Component {

    handleAdd = () => {
        console.log("点此上传合同附件");
    }

    render() {
        const {
            starttime,          //合同开始日期
            yearnumber,         //合同年限
            endtime,            //合同结束日期
        } = clerkInfo.contract;
        return (
            <div className="contract clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                合同信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 60}}>
                                <li>
                                    <span>合同开始日期 : </span>
                                    <span>{endtime}</span>
                                </li>
                                <li>
                                    <span>合同年限 : </span>
                                    <span>{yearnumber}</span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>合同结束日期 : </span>
                                    <span>{endtime}</span>
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                合同附件
                            </h3>
                            <div className="add-attactment"
                                 onClick={this.handleAdd}
                            >
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>劳动合同</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}