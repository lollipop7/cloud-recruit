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
        // document.getElementsByTagName('table')[0].id = 'table';
    }

    calcTotal(data,key) {
        return data.reduce((prevObj,currentObj)=>{
                    return {[key]:prevObj[key] + currentObj[key]};
                },{[key]:0})[key];
    }

    getDataSource = (data,starttime,endtime) => {
        let dataSource = [];
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
           dataSource.push(data[key]);
       });
       return dataSource;
    }

    render() {
        const {isLoading,data} = this.props;
        const {starttime,endtime} = data;
        const dataSource = !isLoading ? this.getDataSource(data.list,starttime,endtime) : [];
        return (
            <div>
                {isLoading ? 
                    <Table
                        columns={columns()} 
                        loading={isLoading}
                        dataSource={[]} 
                        bordered
                        pagination={false}
                    /> : null
                }
                {
                    !isLoading ? dataSource.map((item,index)=>{
                        const showHeader = index === 0 ? true : false;
                        const className = index === 0 ? '' : 'no-margin-border';
                        return (
                            <Table
                                key={index}
                                columns={columns(item&&item.length)} 
                                loading={isLoading}
                                dataSource={item} 
                                className={className}
                                bordered
                                showHeader={showHeader}
                                pagination={false}
                            />
                        )
                    }) : null
                }
            </div>
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