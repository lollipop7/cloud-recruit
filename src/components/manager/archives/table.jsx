import React , { Component } from 'react';
import { Table , Select , Button } from 'antd';
import archivesData from 'data/select/archives'
import columns from 'data/table-columns/archives-table'

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
            <div>
                <div className="archives-title" style={{height:50}}>
                    <div style={{float:'left',marginTop:10}}>
                        <b style={{fontSize:16,fontWeight:'bold',color:'#000'}}>在职人员</b>&nbsp;&nbsp;（点击员工姓名上传
                        <b style={{color:'#f68f6b'}}>人事材料</b>;点击员工的每一项信息
                        <b style={{color:'#6b88f6'}}>快速补充人员信息</b>）
                    </div>
                    <div 
                        className="archives-select" 
                    >
                        <Select
                            defaultValue="人事材料存档率升序" 
                            style={{width: 180,height:35,lineHeight:35}}
                            onChange={this.handleSelectChange}
                        >
                            {
                                archivesData.map((item , index)=> {
                                    return(
                                        <Option key={index} value={item}>{item}</Option>
                                        )
                                })
                           
                            }
                            
                        </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button>下载材料附件</Button>
                    </div>
                </div>
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