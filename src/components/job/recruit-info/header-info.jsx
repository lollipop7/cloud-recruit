import React, {Component} from 'react';

import {Button} from 'antd';

import trim from 'lodash/trim';

export default class HeaderInfoComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    printResume = () => {
        window.print();
    }

    render() {
        const {
            resumeInfo={},
            currentPName='', // 申请职位名称
            currentPworkcity='', // 申请区域
            positions=[], // 当前简历同时申请的
        } = this.props.data;
        const {
            // headimg, // 头像
            username, //姓名
            telephone, //电话
            email, //邮箱
            workyears, //工作年限
            educationbg, //学历
            channel, // 简历来源
        } = resumeInfo;
        return (
            <div className="header-info">
                <div>
                    <div className="inline-block">
                        <img src="./static/images/head.jpg" alt="默认头像" />
                    </div>
                    <div className="info-right inline-block">
                        <ul>
                            <li style={{
                                overflow: 'hidden'
                            }}>
                                <div className="pull-left">
                                    <span>{trim(username)}</span>
                                    <span style={{
                                        marginLeft: 30,
                                        marginRight: 17
                                    }}>{telephone}</span>
                                    <span>|</span>
                                    <span style={{
                                        marginLeft: 17
                                    }}>{email}</span>
                                </div>
                                <div className="pull-right">
                                    <Button type="primary">
                                        简历下载
                                    </Button>
                                    <Button type="primary" onClick={this.printResume} >
                                        打印简历
                                    </Button>
                                </div>
                            </li>
                            <li>
                                <span style={{
                                    marginRight: 6
                                }}>{workyears}</span>
                                <span>|</span>
                                <span style={{
                                    marginLeft: 6
                                }}>{educationbg}</span>
                            </li>
                            <li style={{
                                marginTop: 14
                            }}>
                                简历来源 : {channel}
                            </li>
                            <li style={{
                                marginTop: 15
                            }}>
                                申请职位 : {currentPName}
                            </li>
                            <li style={{
                                marginTop: 15
                            }}>
                                职位区域 : {currentPworkcity}
                            </li>
                        </ul>
                    </div>
                    <div className="info-bottom">
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0
                        }}>
                            <span>同时申请职位 :</span>
                            <ul className="inline-block" style={{
                                listStyleType: 'none'
                            }}>
                                {
                                    positions.map((item,index)=>{
                                        return (
                                            <li key={index} className="inline-block">
                                                &nbsp;{index+1}.{item.positionname}{index !== positions.length - 1 ? ' ;' : ''}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div style={{
                            position: 'absolute',
                            right: 0
                        }}>
                            <img src="./static/images/left-arrow.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}