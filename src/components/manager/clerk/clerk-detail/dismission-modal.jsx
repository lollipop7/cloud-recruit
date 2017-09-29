import React, {Component} from 'react';
import { Modal, Tag , Button, notification } from 'antd';
const { CheckableTag } = Tag;

import {DatePickerComponent} from '../input-select-time';

class FactorsTags extends Component {
    state = { 
        checked: true 
    }

    handleChange = (checked) => {
      this.setState({ checked });
    }

    render(){
        const {checked} = this.state;
        return(
            <CheckableTag {...this.props} checked onChange={this.handleChange} />
        )
    }
}

export default class DismissionModal extends Component { 
    
    state = {
        departuretime: ''
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    render() {
        const {
            departuretime=null
        } = this.state,
        {
            dismissionModal,
            hideDismissionModal
        } = this.props,
        {visible} = dismissionModal;
      return (
        <Modal
            title="办理离职"
            wrapClassName="grey-close-header vertical-center-modal dismission-wrap"
            visible={visible}
            onCancel={hideDismissionModal}
        >
            <ul>
                <li>
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
                    <div clasName="inline-block">
                        <span>主动离职：</span>
                    </div>
                </li>
                <li>
                    
                </li>
            </ul>
        </Modal>
      )
    }
}