import React, {Component} from 'react';

import {Table} from 'antd';
import moment from 'moment';
import trim from 'lodash/trim';

import {Link, Router} from 'react-router';

// 表格列数据
import columns from 'data/table-columns/manager-table';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class TableComponent extends Component {

    state = {
        selectedRowKeys: [],
        data: []
    }

    componentDidMount(){
        const {data} = this.state;
        for(let i=0; i<200; i++){
            data.push({
                "name": "name",
                "worknumber": "worknumber",
                "department": "department",
                "position": "position",
                "mobile": "13000000000",
                "workemail": "766077827@qq.com",
                "inthetime": Date.now(),
                "workstatus": "0",
                "worknature": "全职"
            })
        }
    }

    getColumns = () => {
        columns[0].render = this.renderWithClerkDetail;
        columns[columns.length-3].render = this.renderWithInthetime;
        columns[columns.length-2].render = this.renderWithWorkstatus;
        return columns;
    }

    renderWithClerkDetail = (text,record,index) => {
        const {rid} = record;
        return (
            <Link to={`/manager/clerkDetail/${rid}`} onClick={()=>NProgress.start()}>
                {trim(text)}
            </Link>
        )
    }

    renderWithInthetime = (text,record,index) => {
        return (
            <span>{moment(text).format('YYYY-MM-DD')}</span>
        )
    }

    renderWithWorkstatus = (text,record,index) => {
            switch(parseInt(text)){
                case 0:
                    return <span className="work-status trial">试用期</span>
                case 1:
                    return <span className="work-status formal">正式员工</span>  
                case 2:
                    return <span className="work-status depature">离职员工</span>  
                default:
                    return <span className="work-status hired">待入职</span>        
            }
        }

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    }

    render() {
        const {selectedRowKeys,data} = this.state,
        {
            paginationCurrent,
            paginationChange,
            crewList
        } = this.props,
        {list, count, isLoading} = crewList;
        return (
            <Table 
                rowSelection={{
                    type:'checkbox',
                    selectedRowKeys,
                    onChange: this.onSelectChange
                }}
                bordered
                loading={isLoading}
                columns={this.getColumns()} 
                dataSource={
                    list.map((item,index)=>{ 
                        delete item.children;
                        item.key = index;
                        delete item.children;
                        return item;
                    })
                }
                pagination={{
                    defaultPageSize:20 ,
                    total: count,
                    current: paginationCurrent,
                    onChange:(page,pageSize)=> paginationChange(page,pageSize)
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    crewList: state.Manage.crewList
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent)