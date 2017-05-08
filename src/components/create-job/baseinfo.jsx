import React, {Component} from 'react';

import { Select } from 'antd';

import WorkYears from 'data/select/workyears';
import Industry from 'data/select/industry';
import Education from 'data/select/education';

import {InputComponent} from 'components/input';

const Option = Select.Option;


class SelectComponent extends Component {

    handleChange= (field,value) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(field,value);
        }
    }

    handleFocus = () => {
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value
    }

    render() {
        const {data=[],value,title,placeholder,field,dropdownMatchSelectWidth} = this.props;
        return (
            <div className="inline-block">
                <span>{title}</span>
                <Select
                    value={value}
                    placeholder={placeholder}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange.bind(this,field)}
                    allowClear
                    dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                    style={{ width: 155,height:40 }}
                >
                    {
                        data.map( (item,index)=>{
                            return <Option key={index} value={item}>{item}</Option>
                        })
                    }
                </Select>
            </div>
        )
    }
}


export default class BaseinfoComponent extends Component {

    state = {}

    handleChange = (field,e) => {
        if(typeof e === 'string' || typeof e === 'undefined'){
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
            educationbackground=undefined //学历,
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
                            onChange={this.handleChange}
                        />
                        <InputComponent
                            title="薪资待遇"
                            field="salary"
                            value={salary}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <InputComponent
                            title="用人部门"
                            field="department"
                            value={department}
                            onChange={this.handleChange}
                        />
                        <InputComponent
                            title="招聘理由"
                            field="recruitreason"
                            value={recruitreason}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <InputComponent
                            title="招聘人数"
                            field="headcount"
                            value={headcount}
                            onChange={this.handleChange}
                        />
                        <InputComponent
                            title="工作地点"
                            field="workcity"
                            value={workcity}
                            onChange={this.handleChange}
                        />
                        <SelectComponent 
                            title="工作年限"
                            value={workyears}
                            data={WorkYears}
                            field="workyears"
                            placeholder="请选择工作年限"
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <SelectComponent 
                            title="专业"
                            data={Industry}
                            dropdownMatchSelectWidth={false}
                            value={specialty}
                            field="specialty"
                            placeholder="选择/修改"
                            onChange={this.handleChange}
                        />
                        <SelectComponent 
                            title="学历"
                            data={Education}
                            value={educationbackground}
                            field="educationbackground"
                            placeholder="请选择学历"
                            onChange={this.handleChange}
                        />
                    </li>
                </ul>
            </li>
        );
    }
}