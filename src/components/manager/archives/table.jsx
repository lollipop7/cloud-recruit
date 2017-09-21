import React , { Component } from 'react';
import { Table , Progress , Icon } from 'antd';
import moment from 'moment';
import resumeColumns from 'data/table-columns/archives-table';
import LeaveColumns from 'data/table-columns/archives-leaveTable';

export default class TableComponent extends Component{
    state = {

    };
    getColumns = ()=> {
        const archivesTableData = this.props.archivesTableData;
        if (archivesTableData=='1'){
            resumeColumns[1].render = (text,record,index) => {
                return <Icon 
                            type='qrcode'
                            style={{fontSize:18}}
                       />  
            };
            resumeColumns[2].render = (text,record,index) => {
                return <Progress 
                            className="personnelMaterials "
                            percent={(text*100).toFixed(0)}
                            style={{color:'#f68f6b'}}
                       />
            };
            resumeColumns[3].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle'
                return <Icon 
                            type={type}
                            style={{color:'#b0b0b0'}}
                       /> 
            }
            resumeColumns[5].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle'
                return <Icon 
                            type={type}
                            style={{color:'#86e27c'}}
                       /> 
            }
            resumeColumns[6].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle'
                return <Icon 
                            type={type}
                            style={{color:'#86e27c'}}
                       /> 
            }
            resumeColumns[7].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle'
                return <Icon 
                            type={type}
                            style={{color:'#86e27c'}}
                       /> 
            }
            resumeColumns[8].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle'
                return <Icon 
                            type={type}
                            style={{color:'#86e27c'}}
                       /> 
            }
            resumeColumns[resumeColumns.length-1].render = (text,record,index) => {
                return moment(text).format('YYYY-MM-DD')
            };
            return resumeColumns
        }else if(archivesTableData=='2'){
            LeaveColumns[1].render = (text,record,index) => {
                return <Icon 
                            type='qrcode'
                            style={{fontSize:18}}
                       />  
            };
            LeaveColumns[2].render = (text,record,index) => {
                return <Progress 
                            className="personnelMaterials "
                            percent={(text*100).toFixed(0)}
                            style={{color:'#f68f6b'}}
                       />
            };
            LeaveColumns[3].render = (text,record,index) => {
                const type = text == '1'?'check-circle':'question-circle'
                return <Icon 
                    type={type}
                    style={{color:'#86e27c'}}
                />     
            };
            LeaveColumns[4].render = (text,record,index) => {
                const type = text == '1'?'check-circle':'question-circle'
                return <Icon 
                    type={type}
                    style={{color:'#86e27c'}}
                />     
            };
            LeaveColumns[5].render = (text,record,index) => {
                const type = text == '1'?'check-circle':'question-circle'
                return <Icon 
                    type={type}
                    style={{color:'#86e27c'}}
                />     
            };
            LeaveColumns[6].render = (text,record,index) => {
                return moment(text).format('YYYY-MM-DD')
            };
            return LeaveColumns
        }  
    }

    render(){
        const { 
            archivesList , 
            leaveArchivesList , 
            archivesTableData
        } = this.props;
        return (
            <div > 
                <Table
                    rowSelection={{
                            type:'checkbox',
                        }}
                    bordered
                    loading={archivesTableData=='1'?archivesList.isLoading:leaveArchivesList.isLoading}
                    columns={this.getColumns()} 
                    dataSource={
                        (archivesTableData=='1'?archivesList.list:leaveArchivesList.list).map((item , index)=>{
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