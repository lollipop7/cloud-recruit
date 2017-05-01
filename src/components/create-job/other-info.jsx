import React, {Component} from 'react';
import moment from 'moment';
import { Input , Tag , Radio } from 'antd';
const RadioGroup = Radio.Group;
import TimeComponent from 'components/time';

class TextAreaComponent extends Component {

    handleChange = (event) => {
        this.props.onChange(event);
    }

    render() {
        const {title,value=''} = this.props;
        return (
            <li>
                <span>{title}</span>
                <Input 
                    type="textarea"
                    value={value} 
                    style={{
                        width: 494,
                        height: 130,
                        verticalAlign: 'text-top'
                    }} 
                    onChange={this.handleChange}
                />
            </li>
        )
    }
}

export default class OtherInfoComponent extends Component {

    state = {
        workType: 1,
        isUrgent: 1
    }

    onChange=(field,e)=>{
        this.setState({
            [field]: e.target.value,
        });
    }

    resetData() {
        const {onStartChange,onEndChange} = this.refs.TimeComponent;
        this.setState({
            workType: 1,
            isUrgent: 1,
            workDuty: '',
            dictate: ''
        });
        onStartChange(null);
        onEndChange(null);
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: moment(value).format('YYYY-MM-DD')
        });
    }

    render() {
        // workType 工作类型
        // workDuty 工作职责
        // dicatate 工作资格
        // isUrgent 是否紧急
        const {workType,workDuty,dictate,isUrgent} = this.state;
        return (
            <li className="other-info">
                <h2 className="title">
                    其他信息
                </h2>
                <ul>
                    <li>
                        <span>工作类型</span>
                        <RadioGroup onChange={this.onChange.bind(this,'workType')} value={workType}>
                            <Radio value={1}>全职</Radio>
                            <Radio value={2}>兼职</Radio>
                            <Radio value={3}>实习</Radio>
                        </RadioGroup>
                    </li>
                    <TextAreaComponent 
                        title="工作职责"
                        value={workDuty}
                        onChange={this.onChange.bind(this,'workDuty')}
                    />
                    <TextAreaComponent 
                        title="任职资格"
                        value={dictate}
                        onChange={this.onChange.bind(this,'dictate')}
                    />
                    <li>
                        <TimeComponent 
                            showField={true} 
                            style={{width:185}}
                            onChange={this.onTimeChange}
                            ref="TimeComponent"
                        />
                    </li>
                    <li>
                        <span>是否紧急</span>
                        <RadioGroup onChange={this.onChange.bind(this,'isUrgent')} value={isUrgent}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </RadioGroup>
                    </li>
                </ul>
            </li>
        );
    }
}