import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// antd
import { Tree, Icon, Modal, Input } from 'antd';
const TreeNode = Tree.TreeNode;

class LeftTreePage extends Component {
  state = {
    name:'',
    uid:'',
    sup_id:'',
    visible: false
  }
  componentDidMount(){
    this.props.getDepartMentList()
  }
  // 左侧树结构
  recursion(dataSource) {
    return (
      dataSource.map((tree, index) => {
        if (tree.list) {
          return (
            <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId}>
                {this.recursion(tree.list)}
            </TreeNode>
          )
        } else {
          return (
              <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId}>
              </TreeNode>
          )
        }
      })
    )
  }

  // 选中菜单
  onSelect = (selectedKeys, info) => {
    this.props.getDepartMentStaff({departmentId:selectedKeys[0]});
    this.setState({uid:selectedKeys[0], sup_id:info.selectedNodes[0].props.sup_id, name:info.selectedNodes[0].props.title});
  }

  // 添加子部门弹窗
  showAdd = () => {
    this.addModal();
  }
  addModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  render() {
    const { departmentList:{list} } = this.props;
    return (
        <div className='pull-left tree-type'>
            <div className='operate-button'>
              <Icon type="plus-circle-o" className='icon' onClick={this.showAdd} />
              <Icon type="edit" className='icon' />
              <Icon type="delete" className='icon' />
            </div>
            <div className='tree-box'>
              {
                <Tree 
                      defaultExpandAll
                      onSelect={this.onSelect}
                >
                  {this.recursion(list)}
                </Tree>
              }
            </div>
            {/* 添加子部门弹窗 */}
            <Modal
              title="添加子部门"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className='sub'>
                <span className='sub-title'>子级：</span><span className='sub-content'>财务部门</span>
              </div>
              <div className='department'>
                <span className='name'>部门名称：</span>
                <div className='input-type'>
                  <Input ref = "qualificationInput" />
                </div>
              </div>
            </Modal>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  departmentList: state.Manage.departmentList
})
const mapDispatchToProps = dispatch => ({
  getDepartMentList: bindActionCreators(Actions.ManageActions.getDepartMentList, dispatch),
  getDepartMentStaff: bindActionCreators(Actions.ManageActions.getDepartMentStaff, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftTreePage);
 