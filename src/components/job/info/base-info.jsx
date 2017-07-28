import React, {Component} from 'react';

import {InputComponent} from 'components/input';

export default class BaseInfoComponent extends Component {
    render() {
        const {jobInfo={}} = this.props,
            {
                positionname='',
                salary='',
                department='',
                recruitreason='',
                headcount=0,
                workcity='',
                workyears='',
                specialty='',
                educationbackground=''
            } = jobInfo;
        return (
            <li className="base-info">
                <h2 className="title">
                    基本信息
                </h2>
                
                <ul>
                    <li>
                        <InputComponent
                            name="职位名称"
                            value={positionname}
                            disabled={true}
                            placeholder=''
                        />
                        <InputComponent
                            name="薪资待遇"
                            value={salary}
                            disabled={true}
                            placeholder=''
                        />
                    </li>
                    <li>
                        <InputComponent
                            name="用人部门"
                            value={department}
                            disabled={true}
                            placeholder=''
                        />
                        <InputComponent
                            name="招聘理由"
                            value={recruitreason}
                            disabled={true}
                            placeholder=''
                        />
                    </li>
                    <li>
                        <InputComponent
                            name="招聘人数"
                            value={headcount+'人'}
                            disabled={true}
                            
                        />
                        <InputComponent
                            name="工作地点"
                            value={workcity}
                            disabled={true}
                            placeholder=''
                        />
                        <InputComponent 
                            name="工作年限"
                            value={workyears}
                            disabled={true}
                            placeholder=''
                        />
                    </li>
                    <li>
                        <InputComponent 
                            name="专业"
                            style={{
                                left: -32
                            }}
                            className="wth155"
                            value={specialty}
                            disabled={true}
                            placeholder=''
                        />
                        <InputComponent 
                            name="学历"
                            style={{
                                left: -32
                            }}
                            className="wth155"
                            value={educationbackground}
                            disabled={true}
                            placeholder=''
                        />
                    </li>
                </ul>
            </li>
        );
    }
}