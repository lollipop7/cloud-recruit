import React, {Component} from 'react';

import {Table} from 'antd';

// 表格列数据
import columns from 'data/table-columns/manager-table';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponent extends Component {

    state = {
        // data: [],
        selectedRowKeys: []
    }

    getColumns = () => {
        columns[columns.length-2].render = this.renderWithWorkstatus;
        return columns;
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
        const {selectedRowKeys} = this.state,
        {paginationCurrent, crewList} = this.props,
        {list, count} = crewList;
        return (
            <Table 
                rowSelection={{
                    type:'checkbox',
                    selectedRowKeys,
                    onChange: this.onSelectChange
                }}
                bordered
                columns={this.getColumns()} 
                dataSource={
                    list.map((item,index)=>{
                        item.key = index;
                        return item;
                    })
                }
                pagination={{
                    defaultPageSize:20 ,
                    total: count
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