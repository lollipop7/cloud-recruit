import React, {Component} from 'react';

import {Input,Button} from 'antd';

import {Link} from 'react-router';

import moment from 'moment';

import TimeComponent from '../time';

export default class FormComponent extends Component {

    state = {
    }

    handleChange = (field,e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    handlePositionName=(e) => {
        this.handleChange('positionname',e);
    }

    handleDepartMent=(e) => {
        this.handleChange('department',e);
    }

    clearInput=() => {
        const {onStartChange,onEndChange} = this.refs.TimeComponent;
        this.setState({
            positionname: '',
            department: ''
        });
        onStartChange(null);
        onEndChange(null);
    }

    searchJob = () => {
        const {searchJob} = this.props;
        if(searchJob){
            searchJob(this.state);
        }
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value ? moment(value).format('YYYY-MM-DD') : 0
        });
    }

    handleClick() {
        NProgress.start();
    }
   
    render() {
        const {department='',positionname=''} = this.state;
        return (
            <div className="form" style={{
                position: 'relative'
            }}>
                <div className="bottom16">
                    <Input placeholder="职位" onChange={this.handlePositionName} value={positionname} />
                    <Input placeholder="部门" onChange={this.handleDepartMent} value={department} />
                </div>
                <div>
                    <TimeComponent
                        ref="TimeComponent"
                        onChange={this.onTimeChange}
                        style={{width:'249px',marginRight:'16px'}} />
                        <Button type="primary" onClick={this.searchJob}>职位筛选</Button>
                        <Button className="grey" onClick={this.clearInput}>清空条件</Button>
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