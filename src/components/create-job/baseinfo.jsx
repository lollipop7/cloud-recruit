import React, {Component} from 'react';

import { Select } from 'antd';

import {ErrorInputComponents,InputComponent} from 'components/input';

const Option = Select.Option;


class SelectComponent extends Component {

    state = {
        data: []
    }

    handleChange= (field,value) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(field,value);
        }
    }

    handleFocus = () => {
        console.log('handleFocus');
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value
    }

    render() {
        const {data} = this.state,
            {value,title,placeholder,field} = this.props;
        return (
            <div className="inline-block">
                <span>{title}</span>
                <Select
                    value={value}
                    placeholder={placeholder}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange.bind(this,field)}
                    allowClear
                    notFoundContent='加载中...'
                    style={{ width: 155,height:40 }}
                >
                    {
                        data.map(item=>{
                            return <Option value={item}>{item}</Option>
                        })
                    }
                </Select>
            </div>
        )
    }
}


export default class BaseinfoComponent extends Component {

    state = {}

    onChange = (field,e) => {
        if(typeof e === 'string'){
            this.setState({
                [field]: e
            });
        }else{
            this.setState({
                [field]: e.target.value
            });
        }
    }

    resetData() {
        this.setState({
            positionname:'',
            salary:'',
            department:'',
            recruitreason:'',
            headcount:'',
            workcity:'',
            workyears: undefined,
            specialty: undefined,
            educationbackground: undefined
        });
    }
    

    render() {
        const {
            positionname='', // 职位名称
            salary='', // 薪资待遇
            department='', // 用人部门
            recruitreason='', // 招聘理由
            headcount='', // 招聘人数
            workcity='', // 工作地点
            workyears=undefined, // 工作年限
            specialty=undefined, // 专业
            educationbackground=undefined //学历
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
                            value={workyears}
                            field="workyears"
                            placeholder="请选择工作年限"
                            onChange={this.onChange}
                        />
                    </li>
                    <li>
                        <SelectComponent 
                            title="专业"
                            value={specialty}
                            field="specialty"
                            placeholder="选择/修改"
                            onChange={this.onChange}
                        />
                        <SelectComponent 
                            title="学历"
                            value={educationbackground}
                            field="educationbackground"
                            placeholder="请选择学历"
                            onChange={this.onChange}
                        />
                    </li>
                </ul>
            </li>
        );
    }
}