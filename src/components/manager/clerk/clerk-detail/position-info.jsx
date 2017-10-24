import React, {Component} from 'react';
import moment from 'moment';
import {Input , Button ,DatePicker, Select} from 'antd';
const Option = Select.Option;

import isEmpty from 'lodash/isEmpty';

import clerkInfo from 'data/clerk/clerk';
import pickBy from 'lodash/pickBy';
import LoadingComponent from 'components/loading';

export default class PositionInfo extends Component {

    state = {
        isQualified: true,
        btnState:'none',
        borderState:"1px solid transparent",
        isdisabled:true,
        btnDynamicsState:'none',
        dateBorderState:"1px solid transparent",
        isDatedisabled:true,
        inthetime:'',              //入职时间
        positivedate:'',           //转正时间
        treeList: []
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.data)){
            const dateFormat = 'YYYY-MM-DD';
            const {getTreeList,departmentList} = nextProps;
            const {list} = departmentList;
            const treeList = getTreeList(list);
            const {
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                inthetime,              //入职时间
                positivedate,           //转正时间
                theleng,                //试用期
                rid
            } = nextProps.data;
            if(rid){
                this.setState({
                    isLoading:false
                })
            }
            this.setState({
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                inthetime:moment(inthetime).format('YYYY-MM-DD'),              //入职时间
                positivedate:moment(positivedate).format('YYYY-MM-DD'),           //转正时间
                theleng,
                rid:rid+'',
                treeList
            })
        }
    }


    setQualified = isQualified => {
        this.setState({isQualified});
    }
    handleSelectChange = (field,e) => {
        const {
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                inthetime,              //入职时间
                positivedate,           //转正时间
                theleng,                //试用期
                rid
            } = this.props.data;
        if(field=='cancelBtnState'){
            this.setState({
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })
        }else if(field=='cancelTimeBtnState'){
            this.setState({
                inthetime:moment(inthetime).format('YYYY-MM-DD'),               //入职时间
                positivedate:moment(positivedate).format('YYYY-MM-DD'),         //转正时间
                theleng,                                                        //试用期
                btnDynamicsState:'none',
                dateBorderState:"1px solid transparent",
                isDatedisabled:true
            })
        }else {
                this.setState({
                [field]:e.target.value
            })
        }
        
    }
    onChange = (field,value) => {
        this.setState({
            [field]:moment(value).format('YYYY-MM-DD')
        })
    }
    //编辑信息
    editInformation = () => {
        this.setState({
            btnState:'block',
            borderState:"1px solid #d9d9d9",
            isdisabled:false
        })
    }
    //编辑员工动态
    editEmployeeDynamics = () => {
        this.setState({
            btnDynamicsState:'block',
            dateBorderState:"1px solid #d9d9d9",
            isDatedisabled:false
        })
    }
    //保存信息
    saveInfomation = (value) => {
        if(value=='btnState'){
            const filterObj = pickBy(this.state,(val,key)=>{
                return val != undefined && val !=true && val !='block' ;
            });
            delete filterObj.inthetime;
            delete filterObj.borderState
            this.props.editEmployeeInformation({...filterObj})
            this.setState({
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })
        }else if (value=='btnDynamicsState'){
            const { 
                    inthetime,
                    positivedate,  
                    theleng, 
                    rid
                }= this.state;
           this.props.editEmployeeInformation({inthetime:inthetime,positivedate:positivedate,theleng:theleng,rid:rid})
            this.setState({
                btnDynamicsState:'none',
                dateBorderState:"1px solid transparent",
                isDatedisabled:true
            })
        }
        
    }
   
    

    //是否提前转正

    render() {
       const {
            isQualified , 
            btnState,
            worknumber,             //工号
            worknature,             //工作性质
            department,             //部门
            position,               //岗位
            positionclass,          //岗位职级
            workcity,               //工作地点
            workphone,              //工作电话
            ext,                    //分机号
            cemail,                 //企业邮箱
            contactname,            //紧急联系人
            inthetime,              //入职时间
            positivedate,           //转正时间
            theleng ,                //试用期
            borderState,
            isdisabled,
            btnDynamicsState,
            isDatedisabled,
            dateBorderState,
            treeList
        } = this.state;
        const dateFormat = 'YYYY-MM-DD';
        const {isLoading=true} = this.state;
        return (
            <div className="position-info clerk-tab-container">
                 {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
                        top: -30,
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#FFF',
                        zIndex: 2
                    }} />
                }
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                在职信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span onClick={this.editInformation}>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>工号 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={worknumber}
                                            onChange={this.handleSelectChange.bind(this,'worknumber')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>部门 : </span>
                                    <span>
                                        {/* <Input 
                                            style={{border:borderState}}
                                            disabled = {isdisabled}
                                            value={department}
                                            onChange={this.handleSelectChange.bind(this,'department')}
                                        /> */}
                                        <Select
                                            ref="departmentSelect"
                                            dropdownMatchSelectWidth={false}
                                            value={department}
                                            field="department"
                                            placeholder="请选择部门"
                                            onChange={this.handleChange}
                                            disabled = {isdisabled} 
                                            style={{
                                                width: 147
                                            }}
                                        >
                                            {
                                                treeList.map((item, index) => {
                                                    return <Option key={index} value={item.name ? item.name : item}>{item.name ? item.name : item}</Option>
                                                }) 
                                            }                   
                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>岗位职级 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={positionclass}
                                            onChange={this.handleSelectChange.bind(this,'positionclass')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>工作电话 : </span>
                                    <span>
                                        <Input 
                                            style={{border:borderState}}
                                            disabled = {isdisabled}
                                            value={workphone}
                                            onChange={this.handleSelectChange.bind(this,'workphone')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>企业邮箱 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={cemail}
                                            onChange={this.handleSelectChange.bind(this,'cemail')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>工作性质 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={worknature}
                                            onChange={this.handleSelectChange.bind(this,'worknature')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>岗位 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={position}
                                            onChange={this.handleSelectChange.bind(this,'position')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>工作地点 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={workcity}
                                            onChange={this.handleSelectChange.bind(this,'workcity')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>分机号 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={ext}
                                            onChange={this.handleSelectChange.bind(this,'ext')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>紧急联系人 : </span>
                                    <span style={{width:180}}>
                                        <Input
                                            style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={contactname}
                                            onChange={this.handleSelectChange.bind(this,'contactname')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <div style={{position:'absolute',bottom:20,left:'45%'}}>
                                <Button 
                                    type='primary' 
                                    style={{display:btnState,float:'left',marginRight:20}}
                                    onClick={this.saveInfomation.bind(this,'btnState')}
                                    >
                                    保存
                                 </Button>
                                 <Button  
                                    style={{display:btnState}}
                                    onClick={this.handleSelectChange.bind(this,'cancelBtnState')}
                                    >
                                    取消
                                 </Button>
                            </div>  
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                员工动态
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span onClick={this.editEmployeeDynamics}>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>入职时间 : </span>
                                    <span>
                                        <DatePicker
                                            disabled={isDatedisabled}
                                            value={inthetime?moment(moment(inthetime), dateFormat):''} 
                                            format={dateFormat}
                                            allowClear={false}
                                            onChange={this.onChange.bind(this,'inthetime')}
                                        />
                                        
                                    </span>
                                </li>
                                <li>
                                    <span>试用期 : </span>
                                    <span>
                                        <Input 
                                            style={{border:dateBorderState}}
                                            value={theleng}
                                            disabled={isDatedisabled}
                                            onChange={this.handleSelectChange.bind(this,'theleng')}
                                        />
                                    </span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>转正时间{ isQualified && <i>(提前转正)</i>} : </span>
                                    <span>
                                        <DatePicker
                                            format={dateFormat}
                                            disabled={isDatedisabled}
                                            value={positivedate?moment(moment(positivedate), dateFormat):''}
                                            allowClear={false}
                                            onChange={this.onChange.bind(this,'positivedate')}
                                        />
                                    </span>   
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                            <div style={{position:'absolute',bottom:20,left:'45%'}}>
                                <Button 
                                    type='primary' 
                                    style={{display:btnDynamicsState,float:'left',marginRight:20}}
                                    onClick={this.saveInfomation.bind(this,'btnDynamicsState')}
                                    >
                                    保存
                                 </Button>
                                 <Button  
                                    style={{display:btnDynamicsState}}
                                    onClick={this.handleSelectChange.bind(this,'cancelTimeBtnState')}
                                    >
                                    取消
                                 </Button>
                            </div>  
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}