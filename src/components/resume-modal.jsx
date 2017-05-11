import React, {Component} from 'react';

import {Modal} from 'antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ResumeModalComponent extends Component {

    setModalVisible = () => {
        this.props.hideResumeModal();
    }

    render() {
        const {visible,uriParams} = this.props,
            {resumeid=0,id=0} = uriParams;
        return (
            <Modal
                title="简历"
                wrapClassName="vertical-center-modal modal-recruit"
                visible={visible}
                onOk={() => this.setModalVisible(false)}
                onCancel={() => this.setModalVisible(false)}
                footer={null}
                width={1100}
            >   
                {visible &&
                    <iframe 
                        src={`/#/resumeInfo/${resumeid}/${id}`}
                        frameBorder="0"
                        width='100%'
                        height='100%'
                    >
                    </iframe>
                }
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    visible: state.Recruit.visible,
    uriParams: state.Recruit.uriParams
})
const mapDispatchToProps = dispatch => ({
    hideResumeModal: bindActionCreators(Actions.RecruitActions.hideResumeModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeModalComponent);