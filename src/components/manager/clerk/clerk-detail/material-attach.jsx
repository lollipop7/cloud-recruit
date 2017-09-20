import React, {Component} from 'react';

import {Icon} from 'antd';

export default class MaterialAttach extends Component {

    render() {
        return (
            <div className="material-attach clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">基本资料</h3>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>工资卡</p>
                            </div>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">档案附件</h3>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>劳动合同</p>
                            </div>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>入职登记表</p>
                            </div>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>入职体检报告</p>
                            </div>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>上家公司离职证明</p>
                            </div>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>其它</p>
                            </div>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">离职资料</h3>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>离职证明</p>
                            </div>
                            <div className="add-attactment">
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>离职交接表</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}