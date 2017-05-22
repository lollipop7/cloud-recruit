import React, {Component} from 'react';

import moment from 'moment';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {Button,message} from 'antd';
import TimeComponent from 'components/time';

import TableComponent from 'components/task/table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TaskPage extends Component {

    state = {
        startDate: '',
        endDate: ''
    }

    componentDidMount() {
        NProgress.done();
    }

    downloadTaskReport = () => {
        window.location = '/hrmanage/report/progress_report_down';
        // this.props.downloadTaskReport();
    }

    onTimeChange = (field,val) => {
        if(field === 'starttime'){
            field = 'startDate';
        }
        if(field === 'endtime'){
            field = 'endDate';
        }
        this.setState({
            [field]: moment(val).format('YYYY-MM-DD')
        });
    }

    search = () => {
        const {startDate,endDate} = this.state,
        {TimeComponent} = this.refs;
        if(startDate === ''){
            TimeComponent.handleStartOpen(true);
            return ;
        }
        if(endDate === ''){
            TimeComponent.handleEndOpenChange(true);
            return ;
        }
        this.props.getTaskReport(this.state,startDate,endDate);
    }

    render() {
        const {routes,downLoading} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content task-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border">
                        <div className="form">
                            <TimeComponent
                                ref="TimeComponent"
                                style={{width:'249px',marginRight:'16px'}}
                                onChange={this.onTimeChange}
                            />
                            <Button type="primary" onClick={
                                this.search
                            }>查询</Button>
                        </div>
                        <TableComponent />
                        <Button 
                            className="download" 
                            onClick={this.downloadTaskReport} 
                            type="primary"
                            loading={downLoading}
                        >下载</Button>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    downLoading: state.Task.downLoading
})
const mapDispatchToProps = dispatch => ({
    getTaskReport: bindActionCreators(Actions.TaskActions.getTaskReport, dispatch),
    downloadTaskReport: bindActionCreators(Actions.TaskActions.downloadTaskReport, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskPage);