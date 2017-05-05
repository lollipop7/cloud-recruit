import React, {Component} from 'react';

import isEmpty from 'lodash/isEmpty';
import {InputComponent} from 'components/input';

export default class BaseInfoComponent extends Component {
    render() {
        const {
            positionname='',
            salary='',
            department='',
            recruitreason='暂无',
            headcount=0,
            workcity='',
            workyears='',
            specialty='暂无',
            educationbackground=''
        } = this.props.jobInfo;
        return (
            <li className="base-info">
                <h2 className="title">
                    基本信息
                </h2>
                
                <ul>
                    <li>
                        <InputComponent
                            title="职位名称"
                            value={positionname}
                            disabled={true}
                        />
                        <InputComponent
                            title="薪资待遇"
                            value={salary}
                            disabled={true}
                        />
                    </li>
                    <li>
                        <InputComponent
                            title="用人部门"
                            value={department}
                            disabled={true}
                        />
                        <InputComponent
                            title="招聘理由"
                            value={recruitreason}
                            disabled={true}
                        />
                    </li>
                    <li>
                        <InputComponent
                            title="招聘人数"
                            value={headcount+'人'}
                            disabled={true}
                        />
                        <InputComponent
                            title="工作地点"
                            value={workcity}
                            disabled={true}
                        />
                        <InputComponent 
                            title="工作年限"
                            value={isEmpty(workyears) ? '暂无' : workyears}
                            disabled={true}
                        />
                    </li>
                    <li>
                        <InputComponent 
                            title="专业"
                            style={{
                                left: -32
                            }}
                            className="wth155"
                            value={
                                isEmpty(specialty) ? '暂无' : specialty
                            }
                            disabled={true}
                        />
                        <InputComponent 
                            title="学历"
                            style={{
                                left: -32
                            }}
                            className="wth155"
                            value={
                                isEmpty(educationbackground) ? '暂无' : educationbackground
                            }
                            disabled={true}
                        />
                    </li>
                </ul>
            </li>
        );
    }
}