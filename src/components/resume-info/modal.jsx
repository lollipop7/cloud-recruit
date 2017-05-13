import React, {Component} from 'react';

import {Modal} from 'antd';

// 职位申请
import ReplyComponents from './reply';
// 预约管理
import SubscribeComponents from './subscribe';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ModalComponents extends Component {

    _getTitle(stageid) {
        switch(parseInt(stageid)){
            case 1:
                return '职位申请';
            case 2:
                return '预约管理';
            case 3:
                return '面试管理';
            case 4:
                return '复试管理';
            case 5:
                return '发送offer';
            case 6:
                return '入职管理';
            default:
                return '';
        };
    }

    _getWrapClassName(stageid) {
        switch(parseInt(stageid)){
            case 1:
                return 'resume-reply-modal';
            case 2:
                return 'resume-subscribe-modal';
            case 3:
                return 'resume-face-modal';
            case 4:
                return 'resume-reface-modal';
            case 5:
                return 'resume-offer-modal';
            case 6:
                return 'resume-entry-modal';
            default:
                return '';
        };
    }

    changeStageStatus = () => {
        /**
         * stageid 当前招聘状态id
         * id 当前招聘流程id
         * statusid 选择流程状态id
         * thelable 招聘流程标签
         */
        const {currentStage} = this.props,
            {stageid,id} = currentStage,
            formData = this.refs.modal.getFormData();
        this.props.changeStageStatus({...formData,stageid,id},this.props);
    }

    render() {
        const {modalVisible,currentStage} = this.props,
            {stageid} = currentStage;
        return (
            <Modal
                title={this._getTitle(stageid)}
                wrapClassName={`vertical-center-modal resume-info-modal ${this._getWrapClassName(stageid)}`}
                visible={modalVisible}
                onOk={this.changeStageStatus}
                onCancel={this.props.hideModal}
            >
                {stageid === '1' && <ReplyComponents ref="modal" />}
                {stageid === '2' && <SubscribeComponents ref="modal" />}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    modalVisible: state.Resume.modalVisible,
    currentStage: state.Resume.currentStage
})
const mapDispatchToProps = dispatch => ({
    changeStageStatus: bindActionCreators(Actions.ResumeActions.changeStageStatus, dispatch),
    hideModal: bindActionCreators(Actions.ResumeActions.hideModal, dispatch),
    getStageLog:bindActionCreators(Actions.RecruitActions.getStageLog, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalComponents);