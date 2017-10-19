import React, { Component, PropTypes } from 'react';

import { Input, Select, Cascader, Button, Icon, notification, Modal } from 'antd';
const Option = Select.Option;
import moment from 'moment';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import city from 'data/city.json';
import salaryData from 'data/salary.json';

import {ErrorInputComponent,SelectComponent,DatePickerComponent} from './input-select-time'; 

class NewClerkForm extends Component {

    state = {
        visible: false,
        resultTree:[]
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        NProgress.done();
        this.props.getDepartMentList()
    }

    componentDidUpdate(){
        const { departmentList:{list} } = this.props;
        if(flag){
            this.makeResult(list);
        }
    }

    // 部门下拉菜单数据
    makeResult = (ss) => {
        let pp = []
        function recursion(data){
        data.forEach(function(item, index){
            var x = item.list
            if (x) {
              pp.push({name:item.name, uid:item.uid, sup_id:item.supDepartmentId});
                recursion(x);
            } else {
              pp.push({name:item.name, uid:item.uid, sup_id:item.supDepartmentId});
            }
        })
      }
      recursion(ss);
      this.setState({resultTree:pp})
    }

    handleClick = () => {
        window.history.back(-1)
    }

    handleChange = (filed, e) => {
        if (typeof e === 'string' || typeof e === 'undefined') {
            this.setState({
                [filed]: e
            });
        } else {
            this.setState({
                [filed]: e.target.value
            });
        }
        console.log(filed)
        console.log(e.target.value)
    }

    handleCityChange = (val) => {
        this.setState({
            workcity: val.length > 0 ? val[0] + '-' + val[1] : ''
        });
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    showAddModal = () => {
        this.setState({
            visible: true,
        });
    }

    saveEmployeeInfo = () => {
        const {name,englishname,worknumber,sex,mobile,workemail,documenttype,card,worknature,inthetime,workstatus,
                theleng,workcity,department,position,salary,cemail,contactname,contactphone
            } = this.state;
        console.log(moment(inthetime).format("YYYY-MM-DD"));  
    }

    render() {
        const {departmentList} = this.props;
        console.log(1111, departmentList)
        const {
            name = '',                   //姓名
            englishname = '',            //英文名
            worknumber = '',             //工号
            sex = undefined,                  //性别
            mobile = '',                 //手机号
            workemail = '',              //个人邮箱
            documenttype = undefined,     //证件类型
            card = '',                   //card
            worknature = undefined,         //工作性质
            inthetime = null,              //入职日期
            workstatus = undefined,         //员工状态
            theleng = undefined,       //试用期

            workcity = undefined,        //工作地点
            department = undefined,    //部门
            position = '',
            salary = '',                 //薪资
            cemail = '',                 //企业邮箱
            contactname = '',            //紧急联系人
            contactphone = '',           //紧急联系人电话
        } = this.state;
        return (
            <div className="right-panel new-clerk-form">
                <div className="control">
                    <Button
                        style={{
                            width: 70,
                        }}
                        onClick={this.handleClick}
                    >&lt;&nbsp;返回</Button>
                    <span className="breadName">添加员工</span>
                </div>
                <div className="form-field">
                    <ul>
                        <li>
                            <ErrorInputComponent
                                ref="nameInput"
                                name="姓名："
                                field="name"
                                placeholder="请输姓名"
                                value={name}
                                onChange={this.handleChange}
                                asterisk={true}
                            />
                            <ErrorInputComponent
                                ref="englishnameInput"
                                name="英文名："
                                field="englishname"
                                placeholder="请输入职位名称"
                                value={englishname}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
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
                                data={["男","女"]}
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
                                asterisk={true}
                            />
                            <ErrorInputComponent
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
                                data={['身份证件', '工作证件']}
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
                                asterisk={true}
                            />
                        </li>
                        <li>
                            <SelectComponent
                                ref="worknatureSelect"
                                name="工作性质："
                                data={[ "兼职","全职"]}
                                dropdownMatchSelectWidth={false}
                                value={worknature}
                                field="worknature"
                                placeholder="请选择工作性质"
                                onChange={this.handleChange}
                                asterisk={true}
                            />
                            <DatePickerComponent
                                ref="datePickerInput"
                                name="入职日期："
                                field="inthetime"
                                value={inthetime}
                                placeholder="请选择入职日期"
                                style={{width: 224, height: 40}}
                                asterisk={true}
                                onChange={this.onTimeChange}
                            />
                        </li>
                        <li>
                            <SelectComponent
                                ref="workstatusSelect"
                                name="员工状态："
                                data={["试用", "正式"]}
                                dropdownMatchSelectWidth={false}
                                value={workstatus}
                                field="workstatus"
                                placeholder="请选择员工状态"
                                onChange={this.handleChange}
                                asterisk={true}
                            />
                            <SelectComponent
                                ref="thelengSelect"
                                name="试用期："
                                data={["三个月","六个月"]}
                                dropdownMatchSelectWidth={false}
                                value={theleng}
                                field="theleng"
                                placeholder="请选择试用期"
                                onChange={this.handleChange}
                                asterisk={true}
                            />
                        </li>
                        <li>
                            <SelectComponent
                                ref="documenttypeSelect"
                                name="合同公司："
                                data={['身份证件', '工作证件']}
                                dropdownMatchSelectWidth={false}
                                value={documenttype}
                                field="documenttype"
                                placeholder="请选择合同公司"
                                onChange={this.handleChange}
                                asterisk={true}
                            />
                            <div className="inline-block">
                                <span>工作地点：</span>
                                <div className="inline-block city-regions">
                                    <Cascader
                                        options={city}
                                        value={workcity ? workcity.split("-") : ''}
                                        onChange={this.handleCityChange}
                                        displayRender={label => label.join(' - ')}
                                        placeholder="请选择工作地点"
                                        style={{
                                            height: 40,
                                            width: 224
                                        }}
                                    />
                                    
                                </div>
                            </div>
                        </li>
                        <li style={{ position: "relative" }}>
                            <SelectComponent
                                ref="departmentSelect"
                                name="部门："
                                data={['身份证件', '工作证件']}
                                dropdownMatchSelectWidth={false}
                                value={department}
                                field="department"
                                placeholder="请选择部门"
                                onChange={this.handleChange}
                            />
                                <Icon type="plus-circle-o" 
                                      style={{
                                        position: "absolute",
                                        left: 510,
                                        top: 14,
                                        color: "#0086c9",
                                        fontSize: 16,
                                      }} 
                                      onClick={this.showAddModal}
                                />   
                            <ErrorInputComponent
                                ref="positionInput"
                                name="岗位："
                                field="position"
                                placeholder="请输入岗位"
                                value={position}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="salaryInput"
                                name="薪资："
                                field="salary"
                                placeholder="请输入薪资"
                                value={salary}
                                onChange={this.handleChange}
                            />
                            <ErrorInputComponent
                                ref="cemailInput"
                                name="企业邮箱："
                                field="cemail"
                                placeholder="请输入企业邮箱"
                                value={cemail}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="contactnameInput"
                                name="紧急联系人："
                                field="contactname"
                                placeholder="紧急联系人"
                                value={contactname}
                                onChange={this.handleChange}
                            />
                            <ErrorInputComponent
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
                {/* 添加部门弹出框 */}
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <div className="consequense-field">
                    <Button>取消</Button>
                    <Button type="primary" onClick={this.saveEmployeeInfo}>保存</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    departmentList: state.Manage.departmentList
  })
  const mapDispatchToProps = dispatch => ({
    getDepartMentList: bindActionCreators(Actions.ManageActions.getDepartMentList, dispatch)
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewClerkForm);