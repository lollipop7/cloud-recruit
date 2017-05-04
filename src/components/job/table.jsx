import React, {Component} from 'react';

import {Table,Button,Tooltip} from 'antd';
import pick from 'lodash/pick';
import assign from 'lodash/assign';

import columns from 'data/job-table';
import LoadingComponent from 'components/loading';
import moment from 'moment';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

const renderTime = (text,record,index) => {
    return moment(text).format('YYYY-MM-DD');
}

const renderTextWithATag = (text, record, index) => {
    return <a href="javascript:;" title={text}>{text}</a>
}

// 渲染紧急
columns[0].render=(text, record, index)=>{
    return text ? <i className="urgent-icon"></i> : null;
}
// 渲染职位名
columns[2].render = renderTextWithATag;
// 渲染部门
columns[3].render = renderTextWithATag;
// 渲染薪资要求
columns[4].render = renderTextWithATag;
// 渲染开始时间
columns[10].render = renderTime;
// 渲染结束时间
columns[11].render= renderTime;
// 渲染状态
columns[12].render=(text, record, index)=>{
    switch(parseInt(text)) {
        case 0:
            return <button className="status-button plan">准备中</button>;
        case 1:
            return <button className="status-button progress">进行中</button>;
        case 2:
            return <button className="status-button complete">已完成</button>;
        case 3:
            return <button className="status-button end">已终止</button>;
    }
}

class TableComponent extends Component {
    state = {
        dataSource:[]
    }

    _getDataSource(list) {
        const keys = columns.map(item=>{
            return item.key;
        })
        let dataSource = list.map((item,index)=>{
            return assign(pick(item,keys),{key:index});
        });
        return dataSource;
    }

    handleChange = (p) => {
        const {paginationChange} = this.props;
        if(paginationChange){
            paginationChange(p);
        }
    }
    render() {
        const {JobList,isLoading} = this.props;
        return (
            <div style={{
                position: 'relative',
                width: 950,
                height: 780
            }}>
                <Table 
                    dataSource={this._getDataSource(JobList.list)} 
                    bordered
                    columns={columns}
                    pagination={{
                        defaultPageSize:20 ,
                        total: JobList.count
                    }}
                    onChange={this.handleChange}
                />
                {isLoading &&
                    <LoadingComponent style={{
                        position: 'absolute',
                        zIndex: 3,
                        width: 950,
                        top: 34,
                        height: 746,
                    }} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    JobList: state.Job.JobList, // 统计列表数据
    isLoading: state.Job.isLoading
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);