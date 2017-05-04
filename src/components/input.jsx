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

    handleBlur = (event) => {
        const {onBlur} = this.props;
        if(onBlur){
            onBlur(event);
        }
    }

    render() {
        const {
            error=false,
            errorMsg='',
            placeholder='',
            value='',
            type='text',
            className='',
            style={}
        } = this.props;
        return (
            <div style={{
                position: 'relative',...style
            }}>
                <Input
                    ref="input"
                    className={`${error ? 'error' : ''} ${className}`} 
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={this.handleChange}
                    onPressEnter={this.handleEnter}
                    onBlur={this.handleBlur}
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