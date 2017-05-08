import React, {Component} from 'react';

import {Modal} from 'antd';

// components
import HeaderInfoComponent from './job/recruit-info/header-info';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecruitInfoModalComponent extends Component {
    setModalVisible = () => {
        this.props.hideResumeModal();
    }
    render() {
        const {visible,recruitInfo} = this.props;
        const {
            resumeInfo={}, // 简历基本信息
            currentPName='', // 申请职位名称
            currentPworkcity='', // 申请区域
            positions, // 当前简历同时申请的
        } = recruitInfo;
        return (
            <Modal
                title="简历"
                wrapClassName="vertical-center-modal recruit-info"
                visible={visible}
                onOk={() => this.setModalVisible(false)}
                onCancel={() => this.setModalVisible(false)}
                footer={null}
                width={1100}
            >   
                <HeaderInfoComponent 
                    data={resumeInfo}
                    currentPName={currentPName}
                    currentPworkcity={currentPworkcity}
                    positions={positions}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    recruitInfo: state.Recruit.recruitInfo,
    visible: state.Recruit.visible,
    isLoading: state.Recruit.isLoading
})
const mapDispatchToProps = dispatch => ({
    hideResumeModal: bindActionCreators(Actions.RecruitACtions.hideResumeModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecruitInfoModalComponent);