import React, {Component,PropTypes} from 'react';

import { Input , Select , Cascader } from 'antd';

import WorkYears from 'data/select/workyears';
import Industry from 'data/select/industry';
import Education from 'data/select/education';

import {InputComponent} from 'components/input';

import city from 'data/city.json';
import salaryData from 'data/salary.json';

const Option = Select.Option;

export class ErrorInputComponent extends Component {
    state = {}
    static propTypes = {
        name: PropTypes.string,
        field: PropTypes.string,
        value: PropTypes.oneOfType([ // 输入框的值
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool, //是否禁用输入框
        className: PropTypes.string, // 输入框类名
        style: PropTypes.object // 输入框内联样式
    }

    handleChange = (field,event) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(field,event);
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value
    }

    render() {
        const {
            name='',
            field='',
            value,
            placeholder,
            disabled=false,
            className='',
            style={}
        } = this.props;
        return (
            <div className="inline-block">
                <span>{name}</span>
                <div className="inline-block" style={{
                    position: 'relative',
                    marginRight: 0
                }}>
                    <Input 
                        placeholder={placeholder} 
                        value={value}
                        onChange={this.handleChange.bind(this,field)} 
                        disabled={disabled}
                        className={className}
                        className="error"
                        style={style}
                    />
                    <div className="error-promote">
                        <label className="error">必填</label>
                    </div>
                </div>
            </div>
        )
    }
}

class SelectComponent extends Component {

    static PropTypes = {
        name: PropTypes.string,
        field: PropTypes.string,
        value: PropTypes.string,
        data: PropTypes.array,
        placeholder: PropTypes.string,
        dropdownMatchSelectWidth: PropTypes.bool,
        onChange: PropTypes.func
    }

    handleChange= (field,value) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(field,value);
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value
    }

    render() {
        const {
            name,
            field,
            placeholder,
            data=[],
            value,
            dropdownMatchSelectWidth,
            style={width: 155,height:40 }
        } = this.props;
        return (
            <div className="inline-block">
                <span>{name}</span>
                <Select
                    value={value}
                    placeholder={placeholder}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange.bind(this,field)}
                    allowClear
                    dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                    style={style}
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

    handleChange = (filed,e) => {
        if(typeof e === 'string' || typeof e === 'undefined'){
            this.setState({
                [filed]: e
            });
        }else{
            this.setState({
                [filed]: e.target.value
            });
        }
    }

    resetForm() {
        this.setState({
            positionname:'',
            salary:undefined,
            department:'',
            recruitreason:'',
            headcount:'',
            workcity:'',
            workyears: undefined,
            specialty: undefined,
            educationbackground: undefined
        });
    }

    handleCityChange = (val) => {
        this.setState({
            workcity: val.length > 0 ?  val[0] + '-' + val[1] : ''
        });
    }

    handleNumChange = (field,e) => {
        const pattern = /[^\d]/ig;
        this.setState({
            [field]: e.target.value.replace(pattern,'')
        });
    }

    render() {
        const {
            positionname='', // 职位名称
            salary=undefined, // 薪资待遇
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
                        <ErrorInputComponent
                            name="职位名称"
                            field="positionname"
                            placeholder="请输入职位名称"
                            value={positionname}
                            onChange={this.handleChange}
                        />
                        <div className="inline-block">
                            <span>工作地点</span>
                            <Cascader 
                                options={city}
                                onChange={this.handleCityChange}
                                displayRender={label => label.join(' - ')}
                                placeholder="请输入工作地点" 
                                style={{
                                    height: 40,
                                    width: 279
                                }}
                            />
                        </div>
                        
                        {/*<InputComponent
                            name="薪资待遇"
                            placeholder="请输入薪资待遇"
                            field="salary"
                            value={salary}
                            onChange={this.handleChange}
                        />*/}
                    </li>
                    <li>
                        <InputComponent
                            name="用人部门"
                            placeholder="请输入用人部门"
                            field="department"
                            value={department}
                            onChange={this.handleChange}
                        />
                        <InputComponent
                            name="招聘理由"
                            placeholder="请输入招聘理由"
                            field="recruitreason"
                            value={recruitreason}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <InputComponent
                            name="招聘人数"
                            placeholder="请输入招聘人数"
                            field="headcount"
                            value={headcount}
                            onChange={this.handleNumChange}
                        />
                        <SelectComponent 
                            name="薪资待遇"
                            data={salaryData}
                            dropdownMatchSelectWidth={false}
                            value={salary}
                            field="salary"
                            placeholder="请选择薪资待遇"
                            onChange={this.handleChange}
                        />
                        {/*<InputComponent
                            name="工作地点"
                            placeholder="请输入工作地点"
                            field="workcity"
                            value={workcity}
                            onChange={this.handleChange}
                        />*/}
                        <SelectComponent 
                            name="工作年限"
                            value={workyears}
                            data={WorkYears}
                            field="workyears"
                            placeholder="请选择工作年限"
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <SelectComponent 
                            name="专业"
                            data={Industry}
                            dropdownMatchSelectWidth={false}
                            value={specialty}
                            field="specialty"
                            placeholder="选择/修改"
                            onChange={this.handleChange}
                        />
                        <SelectComponent 
                            name="学历"
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