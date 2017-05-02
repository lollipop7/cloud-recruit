import React, {Component} from 'react';

import {Table,Button} from 'antd';

import columns from 'data/job-table';
columns[0].render=(text, record, index)=>{
    return text ? <i className="urgent-icon"></i> : null;
}
columns[columns.length -1].render=(text, record, index)=>{
    switch(text) {
        case 1:
            return <a href="javascript:void(0);" className="status-button plan">准备中</a>;
        case 2:
            return <a href="javascript:void(0);" className="status-button progress">进行中</a>;
        case 3:
            return <a href="javascript:void(0);" className="status-button complete">已完成</a>;
        case 4:
            return <a href="javascript:void(0);" className="status-button end">已终止</a>;
    }
}
export default class TableComponent extends Component {
    state = {
        dataSource:[]
    }

    randomNum() {
        return Math.random()*10;
    }

    getStatus= () => {
        let num = this.randomNum();
        if(num > 0 && num < 2.5){
            return 1;
        }else if (num>.25 && num < 5) {
            return 2;
        }else if(num>5 && num < 7.5) {
            return 3;
        }else if(num > 7.5 && num < 10) {
            return 4;
        }
    }

    componentDidMount() {
        let obj = [];
        for(let i=0;i<20;i++){
            obj.push({
                key: `${i}`,
                urgent: (parseInt(Math.random()*10)%2 === 0) ? true : false,
                num: 'cw14324',
                name: '市场营销专员',
                department: '运营部',
                pay: '薪资要求',
                reply: 100,
                interview: 30,
                sinterview: 10,
                off: 5,
                entry: 3,
                startTime: '2017-03-04',
                endTime: '2017-03-04',
                status: this.getStatus()
            });
        }
        this.setState({
            dataSource: obj
        });
    }

    render() {
        return (
           <Table 
                dataSource={this.state.dataSource} 
                bordered
                columns={columns}
                pagination={{
                    defaultPageSize:20 ,
                    total: 1000
                }}
            />
        );
    }
}