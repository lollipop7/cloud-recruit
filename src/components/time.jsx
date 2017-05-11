import React, {Component,PropTypes} from 'react';

import { DatePicker } from 'antd';

export default class TimeComponent extends Component {

    static propTypes = {
        style: PropTypes.object,
        showField: PropTypes.bool
    }

    state = {
    };

    disabledStartDate = (startValue) => {
        const {_endValue} = this.state;
        if (!startValue || !_endValue) {
            return false;
        }
        return startValue.valueOf() > _endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const {_startValue} = this.state;
        if (!endValue || !_startValue) {
            return false;
        }
        return endValue.valueOf() <= _startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        const {onChange} = this.props;
        if(onChange){
            onChange('starttime',value);
        }
        this.onChange('_startValue', value);
    }

    onEndChange = (value) => {
        const {onChange} = this.props;
        if(onChange){
            onChange('endtime',value);
        }
        this.onChange('_endValue', value);
    }

    handleStartOpenChange = (open) => {
        const {_endValue} = this.state;
        if (!open&&!_endValue) {
            this.setState({ _endOpen: true });
        }
    }  

    handleEndOpenChange = (open) => {
        this.setState({ _endOpen: open });
    }

    render() {
        const {style={},showField=false} = this.props;
        const { _startValue=null, _endValue=null, _endOpen=false  } = this.state;
        return (
            <div style={{
                display: "inline-block"
            }}>
                {showField&&<span className="calendar-field">开始时间</span>}
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={_startValue}
                    placeholder="开始时间"
                    style={style}
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                {showField&&<span className="calendar-field">结束时间</span>}
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={_endValue}
                    placeholder="结束时间"
                    style={style}
                    onChange={this.onEndChange}
                    open={_endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </div>
        );
    }
}