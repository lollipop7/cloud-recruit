import React, {Component} from 'react';
import { Modal, Tag , Button, Input } from 'antd';

import {DatePickerComponent} from '../input-select-time';
import trim from 'lodash/trim';
import moment from 'moment';

import clerkInfo from 'data/clerk/clerk';

export default class PermanentModal extends Component {

    state = {
        positivedate: '',
        comment: '',
        errorComment: false
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    onTextareaChange= (field,value) => {
        if(field==="comment"){
            this.setState({
                comment: value
            });
            this.triggerError(false);
        }
    }

    handleBlur = value => {
        if(!value){
            commentInput.refs.input.focus();
            this.triggerError(true);
        }
    }

    triggerError = errorComment => {
        this.setState({errorComment});
    }

    render(){
        const {   
            positivedate=null,
            errorComment=false,
            comment=''
        }=this.state,  
        {
            data,
            permanentModal,
            hidePermanentModal
        } = this.props,
        {visible} = permanentModal,
              
        {resumeoff={},constellation} = data,
        {
            name,           //姓名
            englishname,    //英文名      
            department,     //部门
            position,       //职位
            sex,            //性别
            birthday,       //出生日期
            inthetime       //入职时间
        } = resumeoff;

        return(
            <Modal
                title="办理离职"
                wrapClassName="grey-close-header vertical-center-modal permanent-wrap"
                visible={visible}
                onCancel={hidePermanentModal}
                width={827}
            >
                <div className="base-info">
                <ul>
                    <li>
                        <div className="inline-block">
                            {trim(name)}
                        </div>
                        {englishname && <div className="inline-block en-name">
                            {englishname}
                        </div>}
                    </li>
                    <li>
                            <span style={{
                                marginRight: 6
                            }}>{department}</span>
                            {position && <span>|</span>}
                            {position && <span style={{
                                marginLeft: 6
                            }}>{position}</span>}
                    </li>
                    <li>
                        <span style={{
                            marginRight: 6
                        }}>{sex}</span>
                        {birthday && <span>|</span>}
                        {birthday && <span style={{
                                marginLeft: 6,
                                marginRight: 6
                        }}>{parseInt(moment(birthday,"YYYYMMDD").fromNow())}岁</span>}
                        {constellation && <span>|</span>}
                        {constellation &&  <span style={{
                                marginLeft: 6,
                                marginRight: 6
                        }}>{constellation}</span>}
                        {inthetime && <span>|</span>}
                        {inthetime && <span style={{ 
                                marginLeft: 6,
                                marginRight: 6
                        }}>入职时长：{moment(inthetime).startOf('day').fromNow()}</span>}
                    </li> 
                </ul>
                </div>
                <div className="regular-field clearfix">
                    <div className="pull-left">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span className="required-asterisk">预计转正日期：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>2017-06-06</span>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right"> 
                        <DatePickerComponent
                            name="正式入职日期："
                            ref="positivedateDatePicker"
                            field="positivedate"
                            value={positivedate}
                            placeholder="请选择转正日期"
                            style={{width: 224, height: 40, lineHeight: "40px"}}
                            onChange={this.onTimeChange}
                            asterisk={true}
                        />
                    </div>
                </div>
                <div className="inline-block table" style={{marginTop: 30}}>
                    <div className="table-cell"
                            style={{
                                verticalAlign: "top",
                                paddingRight: 9
                            }}
                    >
                        <span style={{fontSize: 14}}>评语：</span>
                    </div>
                    <div className="table-cell">
                        <Input type="textarea" rows="3"
                            ref = "commentInput" 
                            onChange={this.onTextareaChange.bind(this,"comment")}
                            onBlur={this.handleBlur}
                            style={{
                                minWidth: 707,
                                maxWidth: 707,
                                height: 130,
                                borderRadius: 10,
                                resize: "horizontal"
                        }}/>
                        {errorComment && 
                        <div className="error-promote">
                            <label className="error">&nbsp;&nbsp;请输入评语</label>
                        </div>
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}