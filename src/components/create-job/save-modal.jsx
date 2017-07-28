import React , { Component } from "React"
import {Modal , Tabs , Input , Icon} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class SaveModalComponent extends Component {

    render(){
       const {saveModalVisible , hideSaveJobModal} = this.props
        return(
            <Modal
                title="温馨提示"
                visible = {saveModalVisible}
                className = "saveModal"
                closable = {true}
                cancelText = "返回职位管理"
                okText = "保存"
                onCancel = {() => hideSaveJobModal()}
                style = {{width:800,height:600}}
            >
                <Icon 
                    type="check-circle-o"
                />
                <p>职位发布成功</p>
                <p>该职位要求是否保存到最近发布职位以便重复使用？</p>
            </Modal>
        )
    }
}
const mapStateToProps = state => ({
    saveModalVisible: state.Job.saveModalVisible,
})
const mapDispatchToProps = dispatch => ({
    hideSaveJobModal: bindActionCreators(Actions.jobActions.hideSaveJobModal, dispatch)
})
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SaveModalComponent)