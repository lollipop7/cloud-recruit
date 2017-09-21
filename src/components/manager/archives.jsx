import React, {Component} from 'react';
import ProgressComponent from './archives/progress';
import TableComponent from './archives/table';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class ArchivesPage extends Component {

     componentDidMount(){
        this.props.getArchivesList();
        this.props.getArchivesData();
        NProgress.done();
        
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
        } = this.props; 
        //console.log(leaveArchivesList)   
        return (
            <div className="archives-right">
                <div className="box-border right-panel">
                    <ProgressComponent 
                        archivesData={archivesData}
                        changeTableData={changeTableData}
                        getArchivesList={getArchivesList}
                        getLeaveArchivesList={getLeaveArchivesList}
                        archivesTableData={archivesTableData}
                    />
                    <div>
                        <TableComponent 
                            archivesList={archivesList}
                            leaveArchivesList={leaveArchivesList}
                            archivesTableData={archivesTableData}
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
    leaveArchivesList: state.Manage.leaveArchivesList
 })
 const mapDispatchToProps = dispatch => ({
    getArchivesList:bindActionCreators(Actions.ManageActions.getArchivesList, dispatch),
    getArchivesData:bindActionCreators(Actions.ManageActions.getArchivesData, dispatch),
    changeTableData:bindActionCreators(Actions.ManageActions.changeTableData, dispatch),
    getLeaveArchivesList:bindActionCreators(Actions.ManageActions.getLeaveArchivesList, dispatch)
 })
 export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(ArchivesPage)