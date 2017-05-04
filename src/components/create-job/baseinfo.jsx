import React, {Component} from 'react';

import { Select } from 'antd';

import {ErrorInputComponents} from 'components/input';

import data from 'data/create-job';

const Option = Select.Option;
const children = [];

data.workYear.forEach( (item,index)=>{
    children.push(<Option key={item}>{item}</Option>);
});

class InputComponent extends Component {
    state = {}
    onChange = (field,event) => {
       this.props.onChange(field,event);
    }

    render() {
        const {title,field,value} = this.props;
        return (
            <div className="inline-block">
                <span>{title}</span>
                <ErrorInputComponents 
                    placeholder={`请输入${title}`} 
                    value={value}
                    onChange={this.onChange.bind(this,field)} 
                />
            </div>
        )
    }
}

class SelectComponent extends Component {
    handleChange= (field,value) => {
        this.setState({
            [field]: value ? value : ''
        });
    }

    componentDidMount() {
    }

    render() {
        const {title,placeholder} = this.props;
        return (
            <div className="inline-block">
                <span>{title}</span>
                <Select
                    placeholder={placeholder}
                    onChange={this.handleChange.bind(this,'major')}
                    allowClear
                    style={{ width: 155,height:40 }}
                >
                    {children}
                </Select>
            </div>
        )
    }
}


export default class BaseinfoComponent extends Component {

    state = {}

    onChange = (field,event) => {
        this.setState({
            [field]: event.target.value
        });
    }

    resetData() {
        this.setState({
            positionname:'',
            salary:'',
            department:'',
            recruitreason:'',
            headcount:'',
            workcity:''
        });
    }
    

    render() {
        const {
            positionname='', // 职位名称
            salary='', // 薪资待遇
            department='', // 用人部门
            recruitreason='', // 招聘理由
            headcount='', // 招聘人数
            workcity='' // 工作地点
        } = this.state;
        return (
            <li className="base-info">
                <h2 className="title">
                    基本信息
                </h2>
                <ul>
                    <li>
                        <InputComponent
                            title="职位名称"
                            field="positionname"
                            value={positionname}
                            onChange={this.onChange}
                        />
                        <InputComponent
                            title="薪资待遇"
                            field="salary"
                            value={salary}
                            onChange={this.onChange}
                        />
                    </li>
                    <li>
                        <InputComponent
                            title="用人部门"
                            field="department"
                            value={department}
                            onChange={this.onChange}
                        />
                        <InputComponent
                            title="招聘理由"
                            field="recruitreason"
                            value={recruitreason}
                            onChange={this.onChange}
                        />
                    </li>
                    <li>
                        <InputComponent
                            title="招聘人数"
                            field="headcount"
                            value={headcount}
                            onChange={this.onChange}
                        />
                        <InputComponent
                            title="工作地点"
                            field="workcity"
                            value={workcity}
                            onChange={this.onChange}
                        />
                        <SelectComponent 
                            title="工作年限"
                            placeholder="请选择工作年限"
                        />
                    </li>
                    <li>
                        <SelectComponent 
                            title="专业"
                            placeholder="选择/修改"
                        />
                        <SelectComponent 
                            title="学历"
                            placeholder="请选择学历"
                        />
                    </li>
                </ul>
            </li>
        );
    }
}