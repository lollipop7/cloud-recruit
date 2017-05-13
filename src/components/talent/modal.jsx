import React, {Component} from 'react';

import {Button,Modal,Select} from 'antd';
const Option = Select.Option;

import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MoveModalComponents extends Component {

    state = {
        selectLabelId: undefined
    }

    moveResume = () => {
        // 移动简历操作
        const {selectLabelId} = this.state;
        if(!selectLabelId) return ;
        const {data,selectedRowKeys} = this.props;
        let filterArr = filter(data,(item,index)=>{
            return indexOf(selectedRowKeys,index) !== -1;
        });
        this.props.moveResume({
            resumeid: filterArr[0].resumeid,
            lableid: selectLabelId
        });
    }   

    setModalVisible(modalVisible) {
        // 设置Modal的显示与隐藏
        if(modalVisible){
            this.props.showMoveResumeModal();
        }else{
            this.props.hideMoveResumeModal();
        }
    }

    handleChange = (value) => {
        // 多选框变化回调
        this.setState({
            selectLabelId: value
        });
    }

    render() {
        const {hasSelected,customNavData,moveModal} = this.props;
        const {isLoading,modalVisible} = moveModal;
        return (
            <div className="table-control">
                    {/*<Button type="primary">删除</Button>*/}
                    <Button 
                        type="primary" 
                        onClick={()=>this.setModalVisible(true)}
                        disabled={!hasSelected}
                    >移动</Button>
                    <Modal
                        title="移动"
                        wrapClassName="vertical-center-modal"
                        visible={modalVisible}
                        confirmLoading={isLoading}
                        onOk={this.moveResume}
                        onCancel={() => this.setModalVisible(false)}
                    >
                        <span style={{
                            marginRight: 16
                        }}>移动到</span>
                        <Select 
                            placeholder="请选择要移动到的分类" 
                            style={{ width: 395 }}
                            onChange={this.handleChange}
                        >
                            {
                                customNavData.map((item,index)=>{
                                    return (
                                        <Option 
                                            key={index} 
                                            value={item.id}
                                        >
                                            {item.lablename}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    moveModal: state.Talent.moveModal
})
const mapDispatchToProps = dispatch => ({
    moveResume: bindActionCreators(Actions.TalentActions.moveResume, dispatch),
    showMoveResumeModal: bindActionCreators(Actions.TalentActions.showMoveResumeModal, dispatch),
    hideMoveResumeModal: bindActionCreators(Actions.TalentActions.hideMoveResumeModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoveModalComponents);