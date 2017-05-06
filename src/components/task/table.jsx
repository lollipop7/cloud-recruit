import React, {Component} from 'react';

import {Table} from 'antd';

import columns from 'data/table-columns/task-table';

export default class TableComponents extends Component {

    state = {
      data: []
    }

    componentDidMount() {
      let data = {
        organization: '51金融圈',
        name: '刘德华',
        loginnum: 100,
        resumenum: 100,
        "51job": 100,
        zhilian: 100,
        focus: 100,
        pending: 100,
        cnt: 100,
        subscribe: 100,
        interview: 100,
        sinterview: 100,
        induction: 100,
        complete: 100
       }
       for(let i=0;i<7;i++){
          this.state.data.push(data);
       }
       this.state.data.push({
          key: Math.random(),
          organization: '51金融圈',
          name: '合计'
       });
       this.state.data.push({
          key: Math.random(),
          complete: '注：用户名为空的人，显示该用户的编号 ［数据来源日期 2014-05-23 至 2015-04-04］'
       });
       this.setState({
         data: this.state.data
       });
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.data} bordered />
        );
    }
}