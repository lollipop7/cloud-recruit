import React, {Component} from 'react';
import {Modal , DatePicker ,Input} from 'antd';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MemoModalComponent extends Component {
    hideModal = () => {
        this.props.hidememomodal()
    }
    render () {
        const {memoModalVisible}= this.props
        return(
            <Modal
                className="memomodal"
                title={<span style={{fontSize:16,fontWeight:"bold"}}>添加备忘录</span>}
                visible = {memoModalVisible}
                onCancel={this.hideModal}
                okText = "添加"
            >
            <div className="memotime">
                <span>预处理时间：</span>
                <DatePicker
                    format="YYYY-MM-DD"
                    style={{width:300}}
                />
            </div>
            <div className="addmemo">
                <span>添加备忘录：</span>
                <Input type="textarea" 
                    placeholder="将文本添加到备忘录......" 
                    style={{
                        width:300,
                        height:100
                    }}
                
                />
            </div>
            </Modal>
        )
    }
}
const mapStateToProps = state => ({
   memoModalVisible: state.Home.memoModalVisible,
})
const mapDispatchToProps = dispatch => ({
    hidememomodal: bindActionCreators(Actions.homeActions.hidememomodal, dispatch)
})
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(MemoModalComponent)