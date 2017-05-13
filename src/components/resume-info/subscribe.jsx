import React, {Component} from 'react';

import {Radio,Input} from 'antd';
const RadioGroup = Radio.Group;

import radioData from 'data/resume-radio.json';

// lodash 
import chunk from 'lodash/chunk';

import TagsComponent from './tags';

export default class SubscribeComponents extends Component {

    state = {
        statusid: '1'
    }

    onChange = (e) => {
        this.setState({
            statusid: e.target.value
        });
    }

    getFormData = () => {
        const {tags,statusid} = this.state;
        if(tags.length > 0){
            const thelable = tags.join(',');
            return {thelable,statusid}
        }
        return {statusid};
    }

    render() {
        const {statusid} = this.state;
        let data = chunk(radioData,4);
        return (
            <div>
                <RadioGroup style={{display:'table'}} onChange={this.onChange} value={statusid}>
                    {
                        data.map((item,index)=>{
                            return (
                                <div key={index} className="table-row">
                                    {
                                        item.map((val,key)=>{
                                            return (
                                                <div key={key} className="table-cell">
                                                    <Radio 
                                                        value={val.value}
                                                    >{val.name}</Radio>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </RadioGroup>
                {(statusid === '10' || statusid === '11') && 
                    <div style={{
                        marginTop: 28
                    }}>
                        <Input 
                            placeholder={statusid === '10' ? '面试时间' : '预约时间'}
                            style={{
                                width: '209px',
                                margin: 0
                            }}
                        />
                        <Input 
                            placeholder={statusid === '10' ? '面试地点' : '预约地点'}
                            style={{
                                width: '209px',
                                marginLeft: 11
                            }}
                        />
                    </div>
                }
                <TagsComponent />
            </div>
        );
    }
}