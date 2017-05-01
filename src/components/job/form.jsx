import React, {Component} from 'react';
import { Input , Button } from 'antd';

import {Link} from 'react-router';

import moment from 'moment';

import TimeComponent from '../time';

export default class FormComponent extends Component {

    state = {
        positionname: '',
        department: '',
    }

    handlePositionName=(event) => {
        this.setState({
            positionname: event.target.value
        });
    }

    handleDepartMent=(event) => {
        this.setState({
            department: event.target.value
        });
    }

    clearInput=() => {
        const {onStartChange,onEndChange} = this.refs.TimeComponent;
        this.setState({
            department: '',
            positionname: ''
        });
        onStartChange(null);
        onEndChange(null);
    }

    searchJob = () => {
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: moment(value).format('YYYY-MM-DD')
        });
    }

    handleClick() {
        NProgress.start();
    }
   
    render() {
        const {department,positionname} = this.state;
        return (
            <div className="form" style={{
                position: 'relative'
            }}>
                <div className="bottom16">
                    <Input placeholder="职位" onChange={this.handleDepartMent} value={department} />
                    <Input placeholder="部门" onChange={this.handlePositionName} value={positionname} />
                </div>
                <div>
                    <TimeComponent
                        ref="TimeComponent"
                        onChange={this.onTimeChange}
                        style={{width:'249px',marginRight:'16px'}} />
                        <Button type="primary" onClick={this.searchJob}>职位筛选</Button>
                        <Button onClick={this.clearInput}>清空条件</Button>
                </div>
                <div className="float-button">
                    <Link to="/job/newJob" onClick={this.handleClick}>
                        <Button type="primary"></Button>
                        <span>新建职位</span>
                    </Link>
                </div>
            </div>
        );
    }
}