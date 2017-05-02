import React, {Component} from 'react';

import {Input} from 'antd';

export class ErrorInputComponents extends Component {

    handleChange = (event) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(event);
        }
    }

    handleEnter = (event) => {
        const {onEnter} = this.props;
        if(onEnter){
            onEnter(event);
        }
    }

    render() {
        const {error=false,errorMsg='',placeholder='',value='',type='text',className=''} = this.props;
        return (
            <div style={{
                position: 'relative'
            }}>
                <Input
                    ref="input"
                    className={`${error ? 'error' : ''} ${className}`} 
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={this.handleChange}
                    onPressEnter={this.handleEnter}
                />
                {error && 
                    <div className="error-promote">
                        <label className="error">{errorMsg}</label>
                    </div>
                }
            </div>
        );
    }
}