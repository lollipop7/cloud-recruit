import React, {Component} from 'react';

import { DatePicker } from 'antd';

export default class TimeComponent extends Component {

     state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
        return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
        [field]: value,
        });
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
        return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
        this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    render() {
        const {style={},showField=false} = this.props;
        const { startValue, endValue, endOpen  } = this.state;
        return (
            <div style={{
                display: "inline-block"
            }}>
                {showField&&<span className="calendar-field">开始时间</span>}
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="开始时间"
                    style={style}
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                {showField&&<span className="calendar-field">结束时间</span>}
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="结束时间"
                    style={style}
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </div>
        );
    }
}