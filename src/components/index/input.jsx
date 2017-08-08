import React, {Component} from 'React';

import moment from 'moment';

import {Input, DatePicker} from 'antd';

export default class InputComponent extends Component {

    state = {
        eventtime: null,
        eventmemo: '',
        open: false,
        error: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    disabledDate = current => {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    }

    handleOpenChange = open => {
        this.setState({open});
    }

    handleDateChange = date => {
        this.setState({
            eventtime: date
        });
    }

    setError = error => {
        this.setState({error});
    }

    handleTextChange = e => {
        const {error} = this.state;
        if(error) {
            this.setError(false);
        }
        this.setState({
            eventmemo: e.target.value
        });
    }

    getFormDate = () => {
        const {eventtime, eventmemo} = this.state;
        //没有选择时间打开弹层
        if(!eventtime){
            this.handleOpenChange(true);
            return false;
        }
        if(eventmemo === ''){
            // this.refs.Textrea.focus();
            this.setError(true);
            return false;
        }
        const formatTime = moment(eventtime).format('YYYY-MM-DD h:mm');
        return {...{eventtime: formatTime}, eventmemo};
    }

    render() {
        const {timePlaceholder='', memoPlaceholder=''} = this.props;
        const {eventtime, open, eventmemo, error} = this.state;
        return (
            <ul>
                <li className="table">
                    <div className="table-cell" style={{marginBottom: 17}}>
                        <span  className="memo-field">预处理时间</span>
                    </div>
                    <div className="table-cell">
                        <DatePicker
                            showTime
                            value={eventtime}
                            className="eventtime"
                            format='YYYY-MM-DD h:mm:ss'
                            showToday={false}
                            disabledDate={this.disabledDate}
                            placeholder={timePlaceholder}
                            open={open}
                            onOpenChange={this.handleOpenChange}
                            style={{
                                width: 263,
                                marginLeft: 14
                            }}
                            onChange={this.handleDateChange}
                        />
                    </div>
                </li>
                <li className="table"
                    style={{marginTop: 17}}
                >
                    <div className="table-cell"
                         style={{verticalAlign: "top"}}
                    >
                        <span className="memo-field">添加备忘录</span>
                    </div>
                    <div className="table-cell">  
                        <Input 
                            type="textarea"
                            className={error ? 'error' : ''}
                            placeholder={memoPlaceholder}
                            style={{
                                width: 263, 
                                height: 85,
                                resize: "none", 
                                marginLeft: 14
                            }}
                            value={eventmemo}
                            onChange={this.handleTextChange}
                        />
                        {error && 
                            <div className="error-promote">
                                <label className="error">请输入{memoplaceholder}</label>
                            </div>
                        }
                    </div>
                </li>
            </ul>
        );
    }

}