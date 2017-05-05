import React, {Component} from 'react';

import {Table,Button,Tooltip} from 'antd';
import pick from 'lodash/pick';
import assign from 'lodash/assign';

import columns from 'data/table-columns/job-table';
import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

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