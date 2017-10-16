import React, {Component} from 'react';

import { Button } from 'antd';

import ControlComponent from './clerk-detail/control';
import HeaderInfoComponent from './clerk-detail/header-info';
import MainContent from './clerk-detail/main-content';
import DismissionModal from './clerk-detail/dismission-modal'; 
import PermanentModal from './clerk-detail/permanent-modal'; 
import TransferPersonnelModal from './clerk-detail/transfer-personnel-modal'; 

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ClerkDetail extends Component {

     componentDidMount(){
        NProgress.done();
        const rid = this.props.params.rid;
        this.props.queryEmployee({rid:rid});
     }

     render(){
         const {
             queryEmployeeList,
             dismissionModal,
             permanentModal,
             transferPersonnelModal,
             showDismissionModal,
             hideDismissionModal,
             showPermanentModal,
             hidePermanentModal,
             showTransferPersonnelModal,
             hideTransferPersonnelModal
        } = this.props,
         {list={}} = queryEmployeeList;
        return (
            <div className="right-panel clerk-detail-container">
                <ControlComponent/>
                <HeaderInfoComponent 
                    data={list}
                    dismissionModal={dismissionModal}
                    permanentModal={permanentModal}
                    transferPersonnelModal={transferPersonnelModal}
                    showDismissionModal={showDismissionModal}
                    showPermanentModal={showPermanentModal}
                    showTransferPersonnelModal={showTransferPersonnelModal}
                />
                <MainContent data={list}/>
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
                    transferPersonnelModal={transferPersonnelModal}
                    hideTransferPersonnelModal={hideTransferPersonnelModal}
                />
            </div>
        );
     }
 }

 const mapStateToProps = state => ({
    queryEmployeeList: state.Manage.queryEmployeeList,
    dismissionModal: state.Manage.dismissionModal,
    permanentModal: state.Manage.permanentModal,
    transferPersonnelModal: state.Manage.transferPersonnelModal,
})

const mapDispatchToProps = dispatch => ({
    queryEmployee: bindActionCreators(Actions.ManageActions.queryEmployee,dispatch),
    showDismissionModal: bindActionCreators(Actions.ManageActions.showDismissionModal, dispatch),
    hideDismissionModal: bindActionCreators(Actions.ManageActions.hideDismissionModal, dispatch),
    showPermanentModal: bindActionCreators(Actions.ManageActions.showPermanentModal, dispatch),
    hidePermanentModal: bindActionCreators(Actions.ManageActions.hidePermanentModal, dispatch),
    showTransferPersonnelModal: bindActionCreators(Actions.ManageActions.showTransferPersonnelModal, dispatch),
    hideTransferPersonnelModal: bindActionCreators(Actions.ManageActions.hideTransferPersonnelModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClerkDetail)