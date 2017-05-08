import React, {Component} from 'react';

import {Table} from 'antd';
import extend from 'lodash/extend';

import columns from 'data/table-columns/task-table';

export default class TableComponents extends Component {

    state = {
      data: []
    }

    reduce(list,key){
        const obj = list.reduce((prevVal,curVal)=>{
          return {[key]:prevVal[key]+curVal[key]}
       },{[key]:0});
       return obj[key];
    }

    generateRandom() {
        return Math.floor(Math.random()*100)+10;
    }

    componentDidMount() {
        let list = [];
        for(let i=0;i<7;i++){
            list.push({
                key: Math.random(),
                organization: '51金融圈',
                name: '刘德华',
                loginnum: this.generateRandom(),
                resumenum: this.generateRandom(),
                "51job": this.generateRandom(),
                zhilian: this.generateRandom(),
                focus: this.generateRandom(),
                pending: this.generateRandom(),
                cnt: this.generateRandom(),
                subscribe: this.generateRandom(),
                interview: this.generateRandom(),
                sinterview: this.generateRandom(),
                induction: this.generateRandom(),
                complete: this.generateRandom()
            });
        }
        list.push({
            key: Math.random(),
            name: '合计',
            loginnum: this.reduce(list,'loginnum'),
            resumenum: this.reduce(list,'resumenum'),
            "51job": this.reduce(list,'51job'),
            zhilian: this.reduce(list,'zhilian'),
            focus: this.reduce(list,'focus'),
            pending: this.reduce(list,'pending'),
            cnt: this.reduce(list,'cnt'),
            subscribe: this.reduce(list,'subscribe'),
            interview: this.reduce(list,'interview'),
            sinterview: this.reduce(list,'sinterview'),
            induction: this.reduce(list,'induction'),
            complete: this.reduce(list,'complete')
        });
        list.push({
            key: Math.random(),
            complete: '注：用户名为空的人，显示该用户的编号 ［数据来源日期 2014-05-23 至 2015-04-04］'
        });
        this.setState({
            data: list
        });
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.data} bordered />
        );
    }
}