import React, {Component} from 'react';

import {Table} from 'antd';

// 表格列数据
import columns from 'data/table-columns/manager-table';

export default class TableComponent extends Component {

    state = {
        data: [],
        selectedRowKeys: []
    }

    componentDidMount(){
        let data = [];
        for(let i=0;i<20;i++){
            data.push({
                username: '张三',
                num: 10001,
                department: '测试部',
                position: '软件工程师',
                phonenum: '13564030785',
                email: '13564030785@163.com',
                entrytime: '2017-06-08',
                status: '正式',
                property: '全职'
            });
        }
        this.setState({data});
    }

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    }

    render() {
        const {data,selectedRowKeys} = this.state;
        return (
            <Table 
                rowSelection={{
                    type:'checkbox',
                    selectedRowKeys,
                    onChange: this.onSelectChange
                }}
                bordered
                columns={columns} 
                dataSource={
                    data.map((item,index)=>{
                        item.key = index;
                        return item;
                    })
                }
                pagination={{
                    defaultPageSize:20 ,
                    total: 200
                }}
            />
        );
    }
}