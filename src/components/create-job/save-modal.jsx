import React , { Component , PropTypes } from "React"
import {Modal , Tabs , Input , Icon} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class SaveModalComponent extends Component {

    backResumeManager = ()=> {
        this.props.hideSaveJobModal()
        //this.context.push('job/index')
        //返回职位管理
        setTimeout(() => {
            window.history.back()
        },500)
        
    }

    render(){
       const {saveModalVisible , hideSaveJobModal} = this.props
        return(
            <Modal
                title="温馨提示"
                visible = {saveModalVisible}
                className = "saveModal"
                closable = {true}
                cancelText = "返回职位管理"
                okText = "确定"
                onCancel = {this.backResumeManager}
                
            >
                <Icon 
                    type="check-circle-o"
                />
                <p>职位发布成功</p>

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