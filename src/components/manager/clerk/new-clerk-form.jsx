import React, {Component, PropTypes} from 'react';

import { Input , Select , Cascader , Button, DatePicker } from 'antd';
const Option = Select.Option;

import Sex from 'data/select/sex';
import city from 'data/city.json';
import salaryData from 'data/salary.json';
import thelengData from 'data/select/theleng.json';
import workstatusData from 'data/select/workstatus.json';

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
            <div className="inline-block" >
                <span className="required-span">{name}</span>
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

class InputComponent extends Component {
    state = {

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
        const {onChange} = this.props;
        if(onChange){
            onChange(field,event);
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.value !== this.props.value;
    }

    render() {
        const 
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
                        style={style}
                        onBlur={this.handleBlur}
                    />
                </div>
            </div>
        )
    }
}

class ErrorSelectComponent extends Component {

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
                <span className="required-span">{name}</span>
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
           
        }
    
        shouldComponentUpdate(nextProps,nextState){
            return nextProps.value !== this.props.value;
        }
    
        handleChange= (field,value) => {
            const {onChange} = this.props;
            if(onChange){
                onChange(field,value);
            }
        }
    
        render() {
            const 
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
                    </div>
                </div>
            )
        }
    }

export default class NewClerkForm extends Component {
    
    state={
        open: false,
        error:false
    }

    componentDidMount(){
        NProgress.done();
    }

    handleClick = () => {
        window.history.back(-1)
    }

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

    handleCityChange = (val) => {
        this.setState({
            workcity: val.length > 0 ?  val[0] + '-' + val[1] : ''
        });
    }

    handleOpenChange = open => {
    }

    handleDateChange = date => {
        
    }

    render(){
        const {
            name='',                    //姓名
            englishname='',             //英文名
            worknumber='',              //工号
            sex='男',                   //性别
            mobile='',                  //手机号
            workemail='',               //个人邮箱
            documenttype='身份证',       //证件类型
            card='',                    //card
            worknature='全职',           //工作性质
            inthetime='',               //入职日期
            workstatus='试用',          //员工状态
            theleng='选择试用期',       //试用期
            
            workcity=undefined,          //工作地点
            department='请选择部门',    //
            position='',
            salary='',                   //薪资
            cemail='',                   //企业邮箱
            contactname='',               //紧急联系人
            contactphone='' ,               //紧急联系人电话
            error
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
                            <ErrorInputComponent
                                ref="nameInput"
                                name="姓名："
                                field="positionname"
                                placeholder="请输姓名"
                                value={name}
                                onChange={this.handleChange}
                            />
                            <InputComponent
                                ref="englishnameInput"
                                name="英文名："
                                field="englishname"
                                placeholder="请输入职位名称"
                                value={englishname}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <InputComponent
                                ref="worknumberInput"
                                name="工号："
                                field="worknumber"
                                placeholder="请输入工号"
                                value={worknumber}
                                onChange={this.handleChange}
                            />
                            <SelectComponent 
                                ref="sexSelect"
                                name="性别："
                                data={Sex}
                                dropdownMatchSelectWidth={false}
                                value={sex}
                                field="sex"
                                placeholder="请选择性别"
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="mobileInput"
                                name="手机号码："
                                field="mobile"
                                placeholder="请输手机号"
                                value={mobile}
                                onChange={this.handleChange}
                            />
                            <InputComponent
                                ref="workemailInput"
                                name="个人邮箱："
                                field="workemail"
                                placeholder="请输入工号"
                                value={workemail}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <SelectComponent 
                                ref="documenttypeSelect"
                                name="证件类型："
                                data={['身份证件','工作证件']}
                                dropdownMatchSelectWidth={false}
                                value={documenttype}
                                field="documenttype"
                                placeholder="请选择证件类型"
                                onChange={this.handleChange}
                            />
                            <ErrorInputComponent
                                ref="cardInput"
                                name="证件号码："
                                field="card"
                                placeholder="请输入证件号码"
                                value={card}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorSelectComponent 
                                ref="worknatureSelect"
                                name="工作性质："
                                data={['全职','兼职']}
                                dropdownMatchSelectWidth={false}
                                value={worknature}
                                field="worknature"
                                placeholder="请选择工作性质"
                                onChange={this.handleChange}
                            />
                            <div className="inline-block">
                                <span>入职日期：</span>
                                <div className="inline-block" style={{
                                    position: 'relative',
                                    marginRight: 0
                                }}>
                                    <DatePicker
                                        showTime
                                        style={{
                                            width: 217
                                        }}
                                        onChange={this.handleDateChange}
                                    />
                                </div>    
                            </div>
                        </li>
                        <li>
                            <ErrorSelectComponent 
                                ref="workstatusSelect"
                                name="员工状态："
                                data={workstatusData}
                                dropdownMatchSelectWidth={false}
                                value={workstatus}
                                field="workstatus"
                                placeholder="请选择员工状态"
                                onChange={this.handleChange}
                            />
                            <ErrorSelectComponent 
                                ref="thelengSelect"
                                name="试用期："
                                data={thelengData}
                                dropdownMatchSelectWidth={false}
                                value={theleng}
                                field="theleng"
                                placeholder="请选择试用期"
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorSelectComponent 
                                ref="documenttypeSelect"
                                name="合同公司："
                                data={['身份证件','工作证件']}
                                dropdownMatchSelectWidth={false}
                                value={documenttype}
                                field="documenttype"
                                placeholder="请选择合同公司"
                                onChange={this.handleChange}
                            />
                            <div className="inline-block">
                                <span>工作地点：</span>
                                <div className="inline-block city-regions">
                                    <Cascader 
                                        options={city}
                                        value ={workcity ? workcity.split("-"):''}
                                        className={error ? "error" : ''}
                                        onChange={this.handleCityChange}
                                        displayRender={label => label.join(' - ')}
                                        placeholder="请选择工作地点" 
                                        style={{
                                            height: 40,
                                            width: 229
                                        }}
                                    />
                                    {error &&
                                        <div className="error-promote" style={{
                                            paddingLeft: 0
                                        }}>
                                            <label className="error">请选择工作地点</label>
                                        </div>
                                    }
                                </div>
                            </div>
                        </li>
                        <li>
                            <SelectComponent 
                                ref="departmentSelect"
                                name="部门："
                                data={['身份证件','工作证件']}
                                dropdownMatchSelectWidth={false}
                                value={department}
                                field="department"
                                placeholder="请选择部门"
                                onChange={this.handleChange}
                            />
                            <InputComponent
                                ref="positionInput"
                                name="岗位："
                                field="position"
                                placeholder="请输入岗位"
                                value={position}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <InputComponent
                                ref="salaryInput"
                                name="薪资："
                                field="salary"
                                placeholder="请输入薪资"
                                value={salary}
                                onChange={this.handleChange}
                            />
                            <InputComponent
                                ref="cemailInput"
                                name="企业邮箱："
                                field="cemail"
                                placeholder="请输入企业邮箱"
                                value={cemail}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <InputComponent
                                ref="contactnameInput"
                                name="紧急联系人："
                                field="contactname"
                                placeholder="紧急联系人"
                                value={contactname}
                                onChange={this.handleChange}
                            />
                            <InputComponent
                                ref="contactphoneInput"
                                name="紧急联系人电话："
                                field="contactphone"
                                placeholder="请输入紧急联系人电话"
                                value={contactphone}
                                onChange={this.handleChange}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}