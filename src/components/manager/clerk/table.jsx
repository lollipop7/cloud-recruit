import React, {Component} from 'react';

import {Table} from 'antd';
import moment from 'moment';
import trim from 'lodash/trim';
import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';
import get from 'lodash/get';

import {Link, Router} from 'react-router';

// 表格列数据
import sumColumns from 'data/table-columns/clerk-sum-table';
import formalColumns from 'data/table-columns/clerk-formal-table';
import trialColumns from 'data/table-columns/clerk-trial-table';
import hiredColumns from 'data/table-columns/clerk-hired-table';
import departureColumns from 'data/table-columns/clerk-departure-table';

export default  class TableComponent extends Component {

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
        const {
            type
        } = this.props;
        switch(type) {
            case 'sum':  return this.getSumColumns();break;
            case 'formal': return this.getFormalColumns(); break;
            case 'trial': return this.getTrialColumns(); break;
            case 'hired': return this.getHiredColumns(); break;
            case 'departure': return this.getDepartureColumns(); break;
            default : return this.getSumColumns() ;break;
        }
    }

    getSumColumns = () => {
        sumColumns[0].render = (text,record,index) => {
            const {rid} = record;
            return (
                <Link to={`/manager/clerkDetail/${rid}`} onClick={()=>NProgress.start()}>
                    {trim(text)}
                </Link>
            )
        }
        sumColumns[sumColumns.length-3].render = (text,record,index) => {
            return (
                <span>{moment(text).format('YYYY-MM-DD')}</span>
            )
        };
        sumColumns[sumColumns.length-2].render = (text,record,index) => {
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
        };
        return sumColumns;
    }

    getFormalColumns = () => {
        formalColumns[0].render = (text,record,index) => {
            const {rid} = record;
            return (
                <Link to={`/manager/clerkDetail/${rid}`} onClick={()=>NProgress.start()}>
                    {trim(text)}
                </Link>
            )
        }
        formalColumns[formalColumns.length-3].render = (text,record,index) => {
            return (
                <span>{moment(text).format('YYYY-MM-DD')}</span>
            )
        };
        formalColumns[formalColumns.length-2].render = (text,record,index) => {
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
        return formalColumns;
    }

    getTrialColumns = () => {
        trialColumns[0].render = (text,record,index) => {
            const {rid} = record;
            return (
                <Link to={`/manager/clerkDetail/${rid}`} onClick={()=>NProgress.start()}>
                    {trim(text)}
                </Link>
            )
        }
        trialColumns[trialColumns.length-3].render = (text,record,index) => {
            return (
                <span>{moment(text).format('YYYY-MM-DD')}</span>
            )
        };
        //跳转到弹出办理转正弹框
        trialColumns[trialColumns.length-2].render = (text,record,index) => {
            const {rid} = record;
            return (
                   <Link 
                        to={`/manager/clerkDetail/${rid}`}
                        style={{color: "#ffa200",textDecoration:"underline"}}
                   >
                        办理转正
                   </Link>
            )
                   
        };
        return trialColumns;
    }

    getHiredColumns = () => {
        hiredColumns[0].render = (text,record,index) => {
            const {rid} = record;
            return (
                <Link to={`/manager/clerkDetail/${rid}`} onClick={()=>NProgress.start()}>
                    {trim(text)}
                </Link>
            )
        }
        hiredColumns[hiredColumns.length-3].render = (text,record,index) => {
            return (
                <span>{moment(text).format('YYYY-MM-DD')}</span>
            )
        };
        hiredColumns[hiredColumns.length-2].render = (text,record,index) => {
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
        };
        return hiredColumns;
    }

    getDepartureColumns = () => {
        departureColumns[0].render = (text,record,index) => {
            const {rid} = record;
            return (
                <Link to={`/manager/clerkDetail/${rid}`} onClick={()=>NProgress.start()}>
                    {trim(text)}
                </Link>
            )
        }
        departureColumns[departureColumns.length-3].render = (text,record,index) => {
            return (
                <span>{moment(text).format('YYYY-MM-DD')}</span>
            )
        };
        departureColumns[departureColumns.length-2].render = (text,record,index) => {
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
        };
        return departureColumns;
    }

    onSelectChange = (selectedRowKeys,selectedRows) => {
        const {
            crewList,
            getRidStr
        } = this.props,
        {list} = crewList;
        let filterArr = filter(list,(item,index)=>{
            return indexOf(selectedRowKeys,index) !== -1;
        });
        let str = filterArr.map(item=>{
            return get(item,['rid']);
        }).join(',');
        console.log(str);
        getRidStr(str);
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
