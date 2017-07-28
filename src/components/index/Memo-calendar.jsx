import React, {Component} from 'react';
import {Calendar} from 'antd';

export default class CalendarComponent extends Component {
    onPanelChange(value, mode) {
        console.log(value, mode);
    }
    render(){
        return(
           <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4,height:378 }}>
                <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
           </div>
        )
    }
}