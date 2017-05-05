import React, {Component} from 'react';

import {Input} from 'antd';

export class InputComponent extends Component {
    state = {}
    onChange = (field,event) => {
       this.props.onChange(field,event);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value
    }

    render() {
        const {title,field='',value,style={},className='',disabled=false} = this.props;
        return (
            <div className="inline-block">
                <span>{title}</span>
                <ErrorInputComponents 
                    placeholder={`请输入${title}`} 
                    value={value}
                    style={{
                        display: 'inline-block',
                        ...style
                    }}
                    disabled={disabled}
                    className={className}
                    onChange={this.onChange.bind(this,field)} 
                />
            </div>
        )
    }
}

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
            style={},
            disabled
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
                    disabled={disabled}
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