import React, {Component} from 'react';

import {Table,Button} from 'antd';

import columns from 'data/recruit-table';

export default class TableComponents extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        let data = [];
        for(let i=0;i<20;i++){
            data.push({
                key: `${i}`,
                username: '刘德华',
                title: '猎头顾问  助理顾问',
                department: '部门',
                workyears: '5-10年',
                telephone: '13564030785',
                email: '13564030785@163.com',
                expectJob: '完善',
                deliverytime: '2017-03-5',
                control: '进度'
            });
        }
        this.setState({
            data
        });
    }

    render() {
        return (
            <div>
                <div className="table-control">
                    <Button type="primary">删除</Button>
                </div>
                <Table 
                    rowSelection={{type:'checkbox'}}
                    bordered
                    columns={columns} 
                    dataSource={this.state.data}
                    pagination={{
                        defaultPageSize:20 ,
                        total: 1000
                    }}
                />
            </div>
        );
    }
}