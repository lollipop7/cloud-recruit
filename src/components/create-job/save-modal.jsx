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
                className = "save-modal grey-close-header"
                closable = {true}
                okText = "保存"
                cancelText = "返回职位管理"
                onCancel = {() => hideSaveJobModal()}
                style = {{width:800,height:600}}
            >
                <div className="tick-text" style={{textAlign: "center"}}>
                    <img src="./static/images/job/tick.png" alt="钩" className="tick"/>
                    <p>职位发布成功</p>
                    <p>该职位要求是否保存到最近发布职位以便重复使用？</p>
                </div>
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