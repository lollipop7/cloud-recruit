import React, {Component} from 'react';

import { Button } from 'antd';

import ControlComponent from './clerk-detail/control';
import HeaderInfoComponent from './clerk-detail/header-info';
import MainContent from './clerk-detail/main-content';
import DismissionModal from './clerk-detail/dismission-modal'; 
import PermanentModal from './clerk-detail/permanent-modal'; 
import TransferPersonnelModal from './clerk-detail/transfer-personnel-modal'; 
// 招聘人员详细信息Modal页面
import ResumeModalComponent from 'components/resume-modal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ClerkDetail extends Component {

     params = {
        skip: 0,
        count:"20"
     }

     componentDidMount(){
        NProgress.done();
        const rid = this.props.params.rid;
        const workstatus = this.props.location.state !== null ? this.props.location.state.workstatus : undefined;
        const {showPermanentModal} = this.props;
        this.props.queryEmployee({rid:rid});
        // this.props.getOperationList({rid:rid,...this.params}); 
        workstatus === 0 &&  showPermanentModal();
        this.props.showTransferPersonnelModal()
     }

     render(){
         const {
             queryEmployeeList,
             dismissionModal,
             permanentModal,
             transferPersonnelModal,
             employeeInfo,
             showDismissionModal,
             hideDismissionModal,
             showPermanentModal,
             hidePermanentModal,
             showTransferPersonnelModal,
             hideTransferPersonnelModal,
             editEmployeeInformation,
             showEmployeeResumeView,
             showResumeModal,
             mobilizeEmployee
        } = this.props,
         {list={}} = queryEmployeeList;
        return (
            <div className="right-panel clerk-detail-container">
                <ControlComponent/>
                <HeaderInfoComponent 
                    data={list}
                    employeeInfo={employeeInfo}
                    dismissionModal={dismissionModal}
                    permanentModal={permanentModal}
                    transferPersonnelModal={transferPersonnelModal}
                    showDismissionModal={showDismissionModal}
                    showPermanentModal={showPermanentModal}
                    showTransferPersonnelModal={showTransferPersonnelModal}
                    showEmployeeResumeView={showEmployeeResumeView}
                    showResumeModal={showResumeModal}
                />
                <MainContent data={list} {...this.props}/>
                <DismissionModal 
                    dismissionModal={dismissionModal}
                    hideDismissionModal={hideDismissionModal}
                />
                <PermanentModal 
                    data={list}
                    permanentModal={permanentModal}
                    hidePermanentModal={hidePermanentModal}
                />
                <TransferPersonnelModal 
                    data={list}
                    transferPersonnelModal={transferPersonnelModal}
                    hideTransferPersonnelModal={hideTransferPersonnelModal}
                    mobilizeEmployee={mobilizeEmployee}
                />
                <ResumeModalComponent onChange={this.oncChange}/>
            </div>
        );
     }
 }

 const mapStateToProps = state => ({
    queryEmployeeList: state.Manage.queryEmployeeList,
    // operationList: state.Manage.operationList,
    dismissionModal: state.Manage.dismissionModal,
    permanentModal: state.Manage.permanentModal,
    transferPersonnelModal: state.Manage.transferPersonnelModal,
    employeeInfo: state.Manage.employeeInfo
})

const mapDispatchToProps = dispatch => ({
    queryEmployee: bindActionCreators(Actions.ManageActions.queryEmployee,dispatch),
    // getOperationList: bindActionCreators(Actions.ManageActions.getOperationList,dispatch),
    showDismissionModal: bindActionCreators(Actions.ManageActions.showDismissionModal, dispatch),
    hideDismissionModal: bindActionCreators(Actions.ManageActions.hideDismissionModal, dispatch),
    showPermanentModal: bindActionCreators(Actions.ManageActions.showPermanentModal, dispatch),
    hidePermanentModal: bindActionCreators(Actions.ManageActions.hidePermanentModal, dispatch),
    showTransferPersonnelModal: bindActionCreators(Actions.ManageActions.showTransferPersonnelModal, dispatch),
    hideTransferPersonnelModal: bindActionCreators(Actions.ManageActions.hideTransferPersonnelModal, dispatch),
    editEmployeeInformation:bindActionCreators(Actions.ManageActions.editEmployeeInformation,dispatch),
    showEmployeeResumeView: bindActionCreators(Actions.ManageActions.showEmployeeResumeView, dispatch),
    mobilizeEmployee: bindActionCreators(Actions.ManageActions.mobilizeEmployee, dispatch),
    showResumeModal: bindActionCreators(Actions.RecruitActions.showResumeModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClerkDetail)