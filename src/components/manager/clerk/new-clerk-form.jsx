import React, {Component, PropTypes} from 'react';

import { Input , Select , Cascader , Button } from 'antd';
const Option = Select.Option;

import city from 'data/city.json';
import salaryData from 'data/salary.json';

export class ErrorInputComponent extends Component {
    state = {
        error: false
    }
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
        const {error} = this.state;
        const {onChange} = this.props;
        if(error){
           this.triggerError(false);
        }
        if(onChange){
            onChange(field,event);
        }
    }

    triggerError = (error) => {
        this.setState({error});
    }

    handleBlur = () => {
        const {value} = this.props;
        if(value === ''){
            this.triggerError(true);
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.value !== this.props.value || nextState.error !== this.state.error;
    }

    render() {
        const {error} = this.state,
            {
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
                        ref='input'
                        placeholder={placeholder} 
                        value={value}
                        onChange={this.handleChange.bind(this,field)} 
                        disabled={disabled}
                        className={className}
                        className={error ? 'error' : ''}
                        style={style}
                        onBlur={this.handleBlur}
                    />
                    {error &&
                        <div className="error-promote" style={{
                            paddingLeft: 0
                        }}>
                            <label className="error">必填</label>
                        </div>
                    }
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

    state = {
        error: false
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value || nextState.error !== this.state.error;
    }

    handleChange= (field,value) => {
        const {error} = this.state;
        const {onChange} = this.props;
        if(onChange){
            onChange(field,value);
        }
        if(error){
            this.triggerError(false);
        }
    }

    handleBlur = value => {
        if(!value){
            this.triggerError(true);
        }
    }

    triggerError = error => {
        this.setState({error});
    }

    render() {
        const {error} = this.state,
            {
                name,
                field,
                placeholder,
                data=[],
                value,
                dropdownMatchSelectWidth,
                style={width: 229,height:40 }
            } = this.props;
        return (
            <div className="inline-block inline-block-select">
                <span>{name}</span>
                <div className="inline-block" style={{
                    margin: 0
                }}>
                    <Select
                        className={error ? 'error' : ''}
                        value={value}
                        placeholder={placeholder}
                        onFocus={this.handleFocus}
                        onChange={this.handleChange.bind(this,field)}
                        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                        style={style}
                        onBlur={this.handleBlur}
                    >
                        {
                            data.map( (item,index)=>{
                                return <Option key={index} value={item}>{item}</Option>
                            })
                        }
                    </Select>
                    {error &&
                        <div className="error-promote" style={{
                            paddingLeft: 0
                        }}>
                            <label className="error">{placeholder}</label>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default class NewClerkForm extends Component {

    componentDidMount(){
        NProgress.done();
    }

    handleClick = () => {
        window.history.back(-1)
    }

    render(){
        const {
            name,                   //姓名
            englishname,            //英文名
            worknumber,             //工号
            sex,                    //性别
            mobile,                 //手机号
            workemail,              //个人邮箱
            documenttype,           //证件类型
            card,                   //card
            worknature,             //工作性质
            inthetime,              //入职日期
            workstatus,             //员工状态
            theleng,                //试用期

            workcity,               //工作地点
            departmentid,           //部门
        } = this.state;
        return(
            <div className="right-panel new-clerk-form">
                <div className="control">
                    <Button
                        style={{
                            width: 70,
                        }}
                        onClick={ this.handleClick}
                    >&lt;&nbsp;返回</Button>
                    <span className="breadName">添加员工</span>
                </div>
                <div className="form-field">
                    <ul>
                        <li>

                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}