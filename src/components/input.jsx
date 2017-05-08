import React, {Component} from 'react';

import {Input} from 'antd';

export class InputComponent extends Component {
    state = {}

    handleChange = (field,event) => {
       this.props.onChange(field,event);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value
    }

    render() {
        const {
            title,
            field='',
            value,
            style={},
            className='',
            disabled=false
        } = this.props;
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
                    onChange={this.handleChange.bind(this,field)} 
                />
            </div>
        )
    }
}

export class ErrorInputComponents extends Component {

    state = {
        value: undefined
    }

    _handleChange = (event) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(event);
        }
        this.setState({
            value: event.target.value,
            error: false // 输入字符后,隐藏错误信息
        });
    }

    _handleEnter = (event) => {
        const {onEnter} = this.props;
        if(onEnter){
            onEnter(event);
        }
    }

    setErrorAndMsg = (bool=false,msg='必填') => {
        // 设置error是否隐藏和错误信息
        this.setState({
            error: bool,
            errorMsg: msg
        });
    }

    resetVal = (val) => {
        // 提供给外部的方法,重置值
        this.setState({
            value: val,
            error: false
        });
    }

    _handleBlur = (event) => {
        // const {onBlur} = this.props;
        // if(onBlur){
        //     onBlur(event);
        // }
        if(this.state.value === ''){
            this.setErrorAndMsg(true); // 显示错误信息
        }
    }

    render() {
        const {error=false,errorMsg='必填',value} = this.state,
            {
            placeholder='',
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
                    value={value || this.props.value}
                    disabled={disabled}
                    onChange={this._handleChange}
                    onPressEnter={this._handleEnter}
                    onBlur={this._handleBlur}
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