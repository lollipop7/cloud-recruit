import React , { Component } from 'react';
import { Table , Progress , Icon , Modal ,Select,Input } from 'antd';
const Option = Select.Option;
import moment from 'moment';
import resumeColumns from 'data/table-columns/archives-table';
import LeaveColumns from 'data/table-columns/archives-leaveTable';

export default class TableComponent extends Component{
    state = {
        name:'',//姓名
        documenttype:'',//证件类型
        card:'',//证件号
        tolive:'',//居住地址
        soci_card:'',//社保账号
        fund_card:'',//公积金账号
        wage_card:'',//工资卡账号
        contactname:'',//紧急联系人
        mobile:'',//紧急联系人电话
    };
    setPersonnelMaterials = (record) => {
        const {showPersonalMaterialModal,hidePersonalMaterialModal, personalMaterialData} = this.props;
        showPersonalMaterialModal(record);
        
    }
    hidePersonalMaterilModal = () =>{
        this.props.hidePersonalMaterialModal()
    }
    componentWillReceiveProps(){
        setTimeout(()=>{
            const {personalMaterialData} = this.props,
                {name,documenttype,card,tolive,soci_card,fund_card,wage_card,contactname,mobile} = personalMaterialData;
            this.setState({
                name:name,//姓名
                documenttype:documenttype,//证件类型
                card:card,//证件号
                tolive:tolive,//居住地址
                soci_card:soci_card,//社保账号
                fund_card:fund_card,//公积金账号
                wage_card:wage_card,//工资卡账号
                contactname:contactname,//紧急联系人
                mobile:mobile,//紧急联系人电话
            })
        })
       
    }
    handleSelectChange =(field,e)=> {
        this.setState({
            [field]:e.target.value
        })
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
            LeaveColumns[0].render = (text,record,index) => {
                return <a onClick={this.setPersonnelMaterials.bind(this,record)}>{text}</a> 
            };
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
    onSelectChange = (selectedRowKeys, selectedRows) => {
        const ridArr = [];
        if (selectedRows){
            for (let i=0;i<selectedRows.length;i++){
                const rid = selectedRows[i].rid;
                ridArr.push(rid);
            }
        }
        this.props.getRid(ridArr)   
    }
    onChangPage = (page, pageSize) => {
        const archivesTableData = this.props.archivesTableData;
        if (archivesTableData=='1'){
            this.props.getArchivesList({sort:'1',pageNo:(page-1)*18+1+''})
        }else if(archivesTableData=='2'){
            this.props.getLeaveArchivesList({sort:'1',pageNo:(page-1)*18+1+''})
        }
    }

    render(){
        const { 
            archivesList , 
            leaveArchivesList , 
            archivesTableData,
            personalMaterialVisible,
            personalMaterialData
        } = this.props;
        const {
            name,
            documenttype,
            card,
            tolive,
            soci_card,
            fund_card,
            wage_card,
            contactname,
            mobile
        } = this.state;
        const rowSelection = {
            type:'radio',
            onChange: this.onSelectChange 
          };
        return (
            <div > 
                <Table
                    rowSelection={rowSelection}
                    bordered
                    loading={archivesTableData=='1'?archivesList.isLoading:leaveArchivesList.isLoading}
                    columns={this.getColumns()} 
                    dataSource={
                        (archivesTableData=='1'?archivesList.list:leaveArchivesList.list).map((item , index)=>{
                            item.key=index;
                            return item
                        })
                    }
                    pagination={{
                        defaultCurrent:1,
                        defaultPageSize:18,
                        total:archivesTableData=='1'?archivesList.count:leaveArchivesList.count,
                        onChange:this.onChangPage
                    }}
                />
                <Modal
                    className='grey-close-header'
                    title={<span>{name}&nbsp;员工重要信息</span>}
                    okText='保存'
                    visible={personalMaterialVisible}
                    onCancel={this.hidePersonalMaterilModal}
                > 
                    <ul className="personalMaterial">
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">&nbsp;&nbsp;&nbsp; 证件类型：</span>
                                <Select
                                    placeholder='请选择证件类型'
                                    value={documenttype}
                                    onChange={this.handleSelectChange.bind(this,'documenttype')}
                                >
                                    {
                                        [
                                            '身份证件',
                                            '工作证件'
                                        ].map((item , index)=>{
                                            return <Option key={index} value={item}>{item}</Option>
                                        })
                                    }
                                    
                                </Select>
                            </div>
                            <div className="right-div">
                                <span>证件号：</span>
                                <Input 
                                    placeholder='请输入证件号'
                                    value={card}
                                    onChange={this.handleSelectChange.bind(this,'card')}
                                />
                            </div>  
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">&nbsp;&nbsp;&nbsp; 居住地址：</span>
                                <Input 
                                    placeholder='请输入居住地址'
                                    value={tolive}
                                    onChange={this.handleSelectChange.bind(this,'tolive')}
                                />
                            </div>
                            <div className="right-div">
                                <span>社保账号：</span>
                                <Input 
                                    placeholder='请输入社保账号'
                                    value={soci_card}
                                    onChange={this.handleSelectChange.bind(this,'soci_card')}
                                />
                            </div>  
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">公积金账号：</span>
                                <Input 
                                    placeholder='请输入公积金账号'
                                    value={fund_card}
                                    onChange={this.handleSelectChange.bind(this,'fund_card')}
                                />
                            </div>
                            <div className="right-div">
                                <span>工资卡卡号：</span>
                                <Input 
                                    placeholder='请输入工资卡号'
                                    value={wage_card}
                                    onChange={this.handleSelectChange.bind(this,'wage_card')}
                                />
                            </div>  
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">紧急联系人：</span>
                                <Input 
                                    placeholder='请输入紧急联系人'
                                    value={contactname}
                                    onChange={this.handleSelectChange.bind(this,'contactname')}
                                />
                            </div>
                            <div className="right-div">
                                <span>紧急联系人电话：</span>
                                <Input 
                                    placeholder='紧急联系人电话'
                                    value={mobile}
                                    onChange={this.handleSelectChange.bind(this,'mobile')}
                                />
                            </div>  
                        </li>
                    </ul>     
                </Modal>
            </div>
        )
    }
}