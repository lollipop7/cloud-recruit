import React, {Component} from 'react';
import ProgressComponent from './archives/progress';
import TableComponent from './archives/table';
import { Modal} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class ArchivesPage extends Component {
    state = {
        ridName :{}
    }
     componentDidMount(){
        this.props.getArchivesList({sort:'1'});
        this.props.getArchivesData();
        NProgress.done();
        
     }
     getRid = (value) => {
        this.setState({
            ridName:value
        })
    }
     

     render(){
        const { 
            routes , 
            archivesList ,//在职人员列表
            archivesData , //在职、离职人数、百分比数据
            changeTableData , //改变在职、离职table数据索引
            archivesTableData,//在职、离职table数据索引
            leaveArchivesList,//离职人员table列表
            getArchivesList,//获取在职人员列表数据
            getLeaveArchivesList,//获取离职人员列表数据
            showPersonalMaterialModal,//显示个人材料Modal
            hidePersonalMaterialModal,//隐藏个人材料Modal
            personalMaterialVisible,//个人材料状态
            personalMaterialData,//个人材料数据
            downloadMaterial,//下载材料附件
            editEmployeeInformation//添加、编辑员工信息
        } = this.props; 
        return (
            <div className="archives-right">
                <div className="box-border right-panel">
                    <ProgressComponent 
                        archivesData={archivesData}
                        changeTableData={changeTableData}
                        getArchivesList={getArchivesList}
                        getLeaveArchivesList={getLeaveArchivesList}
                        archivesTableData={archivesTableData}
                        downloadMaterial={downloadMaterial}
                        ridName = {this.state.ridName}
                    />
                    <div>
                        <TableComponent 
                            archivesList={archivesList}
                            leaveArchivesList={leaveArchivesList}
                            archivesTableData={archivesTableData}
                            showPersonalMaterialModal={showPersonalMaterialModal}
                            hidePersonalMaterialModal={hidePersonalMaterialModal}
                            personalMaterialVisible={personalMaterialVisible}
                            personalMaterialData={personalMaterialData}
                            getRid = {this.getRid}
                            getArchivesList={getArchivesList}
                            getLeaveArchivesList={getLeaveArchivesList}
                            editEmployeeInformation={editEmployeeInformation}
                        />
                    </div>
                   
                </div>
            </div>
        );
     }
 }

 const mapStateToProps = state => ({
    archivesList: state.Manage.archivesList,
    archivesData: state.Manage.archivesData,
    archivesTableData: state.Manage.archivesTableData,
    leaveArchivesList: state.Manage.leaveArchivesList,
    personalMaterialVisible: state.Manage.personalMaterialVisible,
    personalMaterialData: state.Manage.personalMaterialData
 })
 const mapDispatchToProps = dispatch => ({
    getArchivesList:bindActionCreators(Actions.ManageActions.getArchivesList, dispatch),
    getArchivesData:bindActionCreators(Actions.ManageActions.getArchivesData, dispatch),
    changeTableData:bindActionCreators(Actions.ManageActions.changeTableData, dispatch),
    getLeaveArchivesList:bindActionCreators(Actions.ManageActions.getLeaveArchivesList, dispatch),
    showPersonalMaterialModal:bindActionCreators(Actions.ManageActions.showPersonalMaterialModal, dispatch),
    hidePersonalMaterialModal:bindActionCreators(Actions.ManageActions.hidePersonalMaterialModal, dispatch),
    downloadMaterial:bindActionCreators(Actions.ManageActions.downloadMaterial, dispatch),
    editEmployeeInformation:bindActionCreators(Actions.ManageActions.editEmployeeInformation,dispatch)
 })
 export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(ArchivesPage)