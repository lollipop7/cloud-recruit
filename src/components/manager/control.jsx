import React, {Component} from 'react';
import { Button } from 'antd';

export default class ControlComponent extends Component {
    render() {
        return (
            <div className="control">
                <div className="pull-left">
                    <h2>全部人员</h2>
                </div>
                <div className="pull-right">
                    <Button
                        type="primary"
                        style={{
                            width: 100,
                        }}
                    >
                        添加员工
                        <img src="static/images/manager/arrow-down.png" alt="选择"/>
                    </Button>
                    <Button
                        style={{
                            width: 170,
                        }}
                    >
                        按入职时间从早到晚
                        <img src="static/images/manager/arrow-up.png" alt="选择"/>
                    </Button>
                    <Button
                        style={{
                            width: 100
                        }}
                    >
                        导出
                    </Button>
                    <Button
                        style={{
                            width: 100
                        }}
                    >
                        删除
                    </Button>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}