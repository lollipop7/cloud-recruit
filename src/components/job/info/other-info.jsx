import React, {Component} from 'react';

import moment from 'moment';

import {InputComponent} from 'components/input';
import {Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class OtherInfoComponent extends Component {
    render() {
        const {starttime=0,endtime=0,urgent=true} = this.props.jobInfo;
        return (
            <li className="other-info" style={{
                paddingBottom: 0
            }}>
                <h2 className="title">
                    其他信息
                </h2>
                <ul>
                    <li>
                        <InputComponent 
                            name="开始时间"
                            value={moment(starttime).format('YYYY-MM-DD')}
                            disabled={true}
                        />
                        <InputComponent 
                            name="结束时间"
                            value={moment(endtime).format('YYYY-MM-DD')}
                            disabled={true}
                        />
                    </li>
                    <li>
                        <span>是否紧急</span>
                        <RadioGroup value={urgent ? 1 : 0}>
                            <Radio disabled={urgent ? false : true} value={1}>是</Radio>
                            <Radio disabled={urgent ? true : false} value={0}>否</Radio>
                        </RadioGroup>
                    </li>
                </ul>
            </li>
        );
    }
}