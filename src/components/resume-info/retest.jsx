import React, {Component} from 'react';

import {Radio,Input,DatePicker} from 'antd';
const RadioGroup = Radio.Group;

import TooltipComponents from './tooltip';
import TagsComponent from './tags';
import InputComponents from './input';

export default class RetestComponents extends Component {

    state = {
        statusid: '3'
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
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
        if(statusid === '3'){
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
                    <TooltipComponents>
                        <Radio value='1'>未去复试</Radio>
                    </TooltipComponents>
                    <TooltipComponents>
                        <Radio value='2'>淘汰</Radio>
                    </TooltipComponents>
                    <Radio value='3'>建议入职</Radio>
                </RadioGroup>
                {statusid === '3' &&
                    <InputComponents 
                        ref="Event"
                        timePlaceholder='入职时间'
                        addressPlaceholder='入职地点'
                    />
                }
                <TagsComponent ref='Tags' currentStage={this.props.currentStage} />
            </div>
        );
    }
}