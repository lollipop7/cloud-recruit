import React , { Component } from "React"
import {Modal , Tabs , Input , Icon} from 'antd';

import InputComponent from './input';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MemoModalComponent extends Component {
    
    // getFormData = () => {
    //     let data = {};
    //     data = this.refs.Memo.getFormData();
    //     if(!data){
    //         return false;
    //     }
    //     return {...data}; 
    // }

    render(){
       const {memoModalVisible} = this.props
        return(
            <Modal
                title="添加备忘录"
                visible = {memoModalVisible}
                className = "add-memo-modal grey-close-header"
                onCancel = {() => this.props.hideMemoModal()}
                width = {510}
                okText = "添加"
            >
                <div className="memo-body">
                    <InputComponent
                        timePlaceholder="请填写预处理时间"
                        memoPlaceholder="将文本添加到备忘录......"
                    />
                </div>
            </Modal>
        )
    }
}
const mapStateToProps = state => ({
    memoModalVisible: state.Home.memoModalVisible
})
const mapDispatchToProps = dispatch => ({
    hideMemoModal: bindActionCreators(Actions.homeActions.hideMemoModal, dispatch)
})
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(MemoModalComponent)