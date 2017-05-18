import React, {Component} from 'react';

import {Table} from 'antd';

// moment
import moment from 'moment';

// lodash
import omit from 'lodash/omit';

import columns from 'data/table-columns/task-table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponents extends Component {

    keies = [
        'loginNum',
        'resumeCount',
        'hand51Num',
        'handZLNum',
        'positionNum',
        'applicationNum_todo',
        'applicationNum',
        'reservationNum',
        'interviewNum',
        'reexaminationNum',
        'entryNum',
        'processedNum'
    ]

    state = {
    }

    componentDidMount() {
        this.props.getTaskReport();
        document.getElementsByTagName('table')[0].id = 'table';
    }

    calcTotal(data,key) {
        return data.reduce((prevObj,currentObj)=>{
                    return {[key]:prevObj[key] + currentObj[key]};
                },{[key]:0})[key];
    }

    getDataSource = data => {
        let dataSource = [];
        let endtime = new Date().getTime(),
            steptime = 7*24*60*60*1000,
            starttime = endtime - steptime;
        Object.keys(data).forEach((key,index)=>{
           // 添加机构名称
           data[key][0].organization = key;
           let totalObj = {userName:'合计'};
           this.keies.map(item=>{
                totalObj[item] = this.calcTotal(data[key],item);
           });    
           data[key].push(totalObj);
           data[key].push({processedNum:`注：用户名为空的人，显示该用户的编号 
           ［数据来源日期 ${moment(starttime).format('YYYY-MM-DD')} 至 
           ${moment(endtime).format('YYYY-MM-DD')}］`});
           if(index === 0){
                dataSource = data[key];
           }
       });
       dataSource.forEach((item,index)=>{
           item.key = index;
       });
       return dataSource;
    }

    render() {
        const {isLoading,data} = this.props;
        const dataSource = this.getDataSource(data);
        return (
            <Table
                columns={columns(dataSource&&dataSource.length)} 
                loading={isLoading}
                dataSource={dataSource} 
                bordered
                pagination={false}
            />
        );
    }
}

const mapStateToProps = state => ({
    data: state.Task.data, // 统计列表数据
    isLoading: state.Task.isLoading
})
const mapDispatchToProps = dispatch => ({
    getTaskReport: bindActionCreators(Actions.TaskActions.getTaskReport, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponents);