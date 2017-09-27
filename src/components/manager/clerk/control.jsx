import React, {Component} from 'react';
import { Button, Select  } from 'antd';

export default class ControlComponent extends Component {

    handleAddClerk = (value) => {
        console.log(value);
    }

    render() {
        const { title } = this.props;
        return (
            <div className="control">
                <div className="pull-left">
                    <h2>{title}</h2>
                </div>
                <div className="pull-right">
                    <Select defaultValue="添加员工"  
                            style={{ width: 100}}
                            dropdownMatchSelectWidth={false}
                            onChange = {this.handleAddClerk}
                    >          
                        {
                            ["导入Excel人员信息",
                            "办理离职",
                            ].map((item,index)=>{
                                return (
                                    <Option  key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                      
                    </Select>    
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