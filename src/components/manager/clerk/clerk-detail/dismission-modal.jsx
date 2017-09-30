import React, {Component} from 'react';
import { Modal, Tag , Button } from 'antd';
const { CheckableTag } = Tag;

// lodash 
import chunk from 'lodash/chunk';

import {DatePickerComponent} from '../input-select-time';
import DefinedTagsComponent from './defined-tags';

const quitFactors=[
    '家庭原因',' 身体原因','薪资原因','交通原因','工作原因',
    '管理问题','无晋升机会','职业规划','放弃续签合同','其他个人原因'
],
resignFactors=[
    '试用期内辞退',' 违反公司条例','公司调整/裁员','业绩不达标','退休',
    '合同到期不续签','其他被动离职原因'
];

export default class DismissionModal extends Component { 
    
    state = {
        departuretime: '',
        selectedTags: [],
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ?
                [...selectedTags, tag] :
                selectedTags.filter(item => item !== tag);
        console.log('dismiss factors : ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    render() {
        const {
            departuretime=null,
            selectedTags
        } = this.state,
        {
            dismissionModal,
            hideDismissionModal
        } = this.props,
        {visible} = dismissionModal;
        let quitData = chunk(quitFactors,5);
        let resignData = chunk(resignFactors,5);
      return (
        <Modal
            title="办理离职"
            wrapClassName="grey-close-header vertical-center-modal dismission-wrap"
            visible={visible}
            onCancel={hideDismissionModal}
            width={827}
        >
            <ul>
                <li className="time-field">
                    <DatePickerComponent
                        ref="departuretimeDatePicker"
                        name="离职日期："
                        field="departuretime"
                        value={departuretime}
                        placeholder="请选择离职日期"
                        style={{width: 224, height: 40}}
                        onChange={this.onTimeChange}
                        asterisk={true}
                    />
                </li>
                <li>
                   <p>主动离职：</p>
                </li>
                <li className="checked-factors">
                    {
                        quitData.map((item,index) => {
                            return(
                                <div key={index} className="table-row">
                                    {
                                        item.map((tag,key) => {
                                            return(
                                                <div className="table-cell">
                                                    <CheckableTag
                                                        key={tag}
                                                        checked={selectedTags.indexOf(tag) > -1}
                                                        onChange={checked => this.handleChange(tag, checked)}
                                                    >
                                                        {tag}
                                                    </CheckableTag>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </li>
                <li>
                    <p>被动离职：</p>
                </li>
                <li className="checked-factors">
                    {
                        resignData.map((item,index) => {
                            return(
                                <div key={index} className="table-row">
                                    {
                                        item.map((tag,key) => {
                                            return(
                                                <div className="table-cell">
                                                    <CheckableTag
                                                        key={tag}
                                                        checked={selectedTags.indexOf(tag) > -1}
                                                        onChange={checked => this.handleChange(tag, checked)}
                                                    >
                                                        {tag}
                                                    </CheckableTag>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    <DefinedTagsComponent/>
                </li>
            </ul>
        </Modal>
      )
    }
}