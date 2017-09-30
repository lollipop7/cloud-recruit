import React, {Component} from 'react';
import { Modal, Tag , Button, Input, Radio, Cascader } from 'antd';
const { CheckableTag } = Tag;
const RadioGroup = Radio.Group;

import {ErrorInputComponent,SelectComponent,DatePickerComponent} from '../input-select-time';

// lodash 
import chunk from 'lodash/chunk';
import moment from 'moment';

import clerkInfo from 'data/clerk/clerk';
import transferType from 'data/transfer-personnel-radio.json';
import city from 'data/city.json';

//**1.57 员工人事调动 */

export default class TransferPersonnelModal extends Component {

    state = {
        selectedTags: [] 
    }

    componentDidMount(){
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    onRadioChange = (e) => {
        this.setState({
            statusid: e.target.value
        });
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
    }

    handleTagChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ?
                [...selectedTags, tag] :
                selectedTags.filter(item => item !== tag);
        console.log('dismiss factors : ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    handleCityChange = (val) => {
        this.setState({
            workcity: val.length > 0 ? val[0] + '-' + val[1] : ''
        });
    }

    render(){
        const {
            transferPersonnelModal,
            hideTransferPersonnelModal
        } = this.props,
        {visible} = transferPersonnelModal,
        {
            type='',                //调用类型
            departmentid='',        //原部门id
            department='',          //原部门name
            new_departmentid='',    //新部门id
            new_department=undefined,      //新部门name
            postid='',              //原岗位id
            post='',                //原岗位名称
            new_postid='',          //新岗位id
            new_post=undefined,            //新岗位名称
            worksite='',            //原工作地点
            new_worksite='',        //新工作地点
            company='',             //原合同公司name
            new_company=undefined,         //新合同公司name
            eventdate='',           //生效日期
            joblevel='',            //岗位级别
            new_joblevel='',        //新岗位级别
            selectedTags
        }=this.state;

        return(
            <Modal
                title="人事调动"
                wrapClassName="grey-close-header vertical-center-modal transfer-personnel-wrap"
                visible={visible}
                onCancel={hideTransferPersonnelModal}
                width={827}
            >
                <ul>
                    <li>
                        <div className="inline-block">
                            <span>调动类型：</span>
                            <RadioGroup  onChange={this.onRadioChange}>
                                {
                                    transferType.map((item,index)=>{
                                        const {name, value} = item;
                                        return (
                                            <div key={index} className="inline-block">
                                                <Radio 
                                                    value={value}
                                                >{name}</Radio>
                                            </div>
                                        )}    
                                    )
                                }
                            </RadioGroup>
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原部门：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>市场部</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <SelectComponent
                                ref="departmentSelect"
                                name="现部门："
                                data={["男","女"]}
                                dropdownMatchSelectWidth={false}
                                value={new_department}
                                field="new_department"
                                placeholder="请选择部门"
                                onChange={this.handleChange}
                            />
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原岗位：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>平面设计师</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <SelectComponent
                                ref="positionSelect"
                                name="现岗位："
                                data={["男","女"]}
                                dropdownMatchSelectWidth={false}
                                value={new_post}
                                field="new_post"
                                placeholder="请选择岗位"
                                onChange={this.handleChange}
                            />
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block">
                            <span>原岗位职级：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>3</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <ErrorInputComponent
                                ref="worknumberInput"
                                name="现职位职级："
                                field="new_joblevel"
                                placeholder="请输入职级"
                                value={new_joblevel}
                                onChange={this.handleChange}
                            />
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block">
                            <span>原工作地点：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>3</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <div className="inline-block">
                                <span>现工作地点：</span>
                                <div className="inline-block city-regions">
                                    <Cascader
                                        options={city}
                                        value={new_worksite ? new_worksite.split("-") : ''}
                                        onChange={this.handleCityChange}
                                        displayRender={label => label.join(' - ')}
                                        placeholder="请选择工作地点"
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原合同公司：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>上海伊尔哈金融有限公司</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <SelectComponent
                                ref="positionSelect"
                                name="现合同公司："
                                data={["男","女"]}
                                dropdownMatchSelectWidth={false}
                                value={new_company}
                                field="new_company"
                                placeholder="请选择岗位"
                                onChange={this.handleChange}
                            />
                        </div>
                    </li>
                    <li className="clearfix">
                        <DatePickerComponent
                            ref="datePickerInput"
                            name="生效时间："
                            field="eventdate"
                            value={eventdate}
                            placeholder="请选择生效日期"
                            style={{width: 224, height: 40}}
                            asterisk={true}
                            onChange={this.onTimeChange}
                        />               
                    </li>
                    <li className="checked-factors">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>备注：</span>
                            <div className="inline-block">
                                {
                                    [
                                        '工作安排',
                                        '个人申请',
                                        '其他'
                                    ].map((tag,key) => {
                                        return(
                                            <div className="inline-block">
                                                <CheckableTag
                                                    key={tag}
                                                    checked={selectedTags.indexOf(tag) > -1}
                                                    onChange={checked => this.handleTagChange(tag, checked)}
                                                >
                                                    {tag}
                                                </CheckableTag>
                                            </div>
                                        )
                                    })
                                }
                            </div>    
                        </div>    
                    </li>
                </ul>
                
            </Modal>
        )
    }
}