import React, {Component} from 'react';
import { Input } from 'antd';

import {Link} from 'react-router';

import TimeComponent from '../time';

export default class FormComponent extends Component {
   
    render() {
        return (
            <div style={{
                position: 'relative'
            }}>
                <div className="bottom16">
                    <Input placeholder="职位" />
                    <Input placeholder="部门" />
                </div>
                <div>
                    <TimeComponent style={{width:'249px',marginRight:'16px'}} />
                    <a href="javascript:void(0);" className="button active" style={{
                        marginRight: 16,
                    }}>
                        职位筛选
                    </a>
                    <a href="javascript:void(0);" className="button" style={{
                        marginRight: 16,
                    }}>
                        清空条件
                    </a>
                </div>
                <div className="float-button">
                    <Link to="/job/newJob" />
                    <span>新建职位</span>
                </div>
            </div>
        );
    }
}