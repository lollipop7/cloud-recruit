import React, {Component} from 'react';

import {Radio,Input,DatePicker} from 'antd';
const RadioGroup = Radio.Group;

import TagsComponent from './tags';
import InputComponents from './input';

export default class InterViewComponents extends Component {

    state = {
        statusid: '4'
    }

    onChange = (e) => {
        this.setState({
            statusid: e.target.value
        });
    }

    getFormData = () => {
        let data = {} ,
        thelable = '';
        const {tags} = this.refs.Tags.state,
            {statusid} = this.state;
        if(statusid === '3' || statusid === '4'){
            data = this.refs.Event.getFormData();
        }
        if(data === false){
            return false;
        }
        if(tags.length > 0){
             thelable = tags.join(',');
        }
        return {statusid,thelable,...data};
    }
    

    render() {
        const {statusid} = this.state;
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={statusid}>
                    <Radio value='1'>未去面试</Radio>
                    <Radio value='2'>淘汰</Radio>
                    <Radio value='3'>安排复试</Radio>
                    <Radio value='4'>建议入职</Radio>
                </RadioGroup>
                {statusid !== '1' && statusid !== '2' && 
                    <InputComponents 
                        ref="Event"
                        timePlaceholder={statusid === '3' ? '复试时间' : '入职时间'}
                        addressPlaceholder={statusid === '3' ? '复试地点' : '入职地点'}
                    />
                }
                <TagsComponent ref='Tags' />
            </div>
        );
    }
}