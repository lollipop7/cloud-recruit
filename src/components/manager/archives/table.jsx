import React , { Component } from 'react';
import { Table , Progress , Icon , Modal ,Select,Input } from 'antd';
const Option = Select.Option;
import moment from 'moment';
import resumeColumns from 'data/table-columns/archives-table';
import LeaveColumns from 'data/table-columns/archives-leaveTable';

export default class TableComponent extends Component{
    state = {

    };
    setPersonnelMaterials = (record) => {
        //console.log(record);
        const {showPersonalMaterialModal,hidePersonalMaterialModal} = this.props;
        showPersonalMaterialModal()
    }
    hidePersonalMaterilModal = () =>{
        this.props.hidePersonalMaterialModal()
    }
    getColumns = ()=> {
        const archivesTableData = this.props.archivesTableData;
        if (archivesTableData=='1'){
            resumeColumns[0].render = (text,record,index) => {
                return <a onClick={this.setPersonnelMaterials.bind(this,record)}>{text}</a>              
            };
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
            archivesTableData,
            personalMaterialVisible
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
                <Modal
                    className='grey-close-header'
                    title='员工重要信息'
                    okText='保存'
                    visible={personalMaterialVisible}
                    onCancel={this.hidePersonalMaterilModal}
                > 
                    <ul className="personalMaterial">
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">&nbsp;&nbsp;&nbsp;证件类型：</span>
                                <Select
                                    placeholder='请选择证件类型'
                                >
                                    {
                                        [
                                            '身份证件',
                                            '工作证件',
                                            '其他证件'
                                        ].map((item , index)=>{
                                            return <Option value={index}>{item}</Option>
                                        })
                                    }
                                    
                                </Select>
                            </div>
                            <div className="right-div">
                                <span>证件号：</span>
                                <Input placeholder='请输入证件号'/>
                            </div>  
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">&nbsp;&nbsp;&nbsp;居住地址：</span>
                                <Input placeholder='请输入居住地址'/>
                            </div>
                            <div className="right-div">
                                <span>社保账号：</span>
                                <Input placeholder='请输入社保账号'/>
                            </div>  
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">公积金账号：</span>
                                <Input placeholder='请输入公积金账号'/>
                            </div>
                            <div className="right-div">
                                <span>工资卡卡号：</span>
                                <Input placeholder='请输入工资卡号'/>
                            </div>  
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">紧急联系人：</span>
                                <Input placeholder='请输入紧急联系人'/>
                            </div>
                            <div className="right-div">
                                <span>紧急联系人电话：</span>
                                <Input placeholder='紧急联系人电话'/>
                            </div>  
                        </li>
                    </ul>     
                </Modal>
            </div>
        )
    }
}