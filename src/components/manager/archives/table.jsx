import React , { Component } from 'react';
import { Table } from 'antd';
import columns from 'data/table-columns/archives-table';

export default class TableComponent extends Component{
    state = {

    };
    getColumns = ()=> {
        return columns
    }

    render(){
        const { archivesList } = this.props,
            {count , isLoading , list } = archivesList;
        return (
            <div > 
                <Table
                    rowSelection={{
                            type:'checkbox',
                        }}
                    bordered
                    columns={this.getColumns()} 
                    dataSource={
                        list.map((item , index)=>{
                            item.key=index;
                            return item
                        })
                    }
                    pagination={false}
                />
            </div>
        )
    }
}