import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// antd
import { Tree, Icon, Modal, Input, message } from 'antd';
const TreeNode = Tree.TreeNode;

class LeftTreePage extends Component {
  state = {
    name:'',
    uid:'',
    sup_id:'',
    title:'',
    title2:'',
    name2: '',
    type:'',
    departmentName:'',
    visible: false,
    departmentName2:''
  }
  componentDidMount(){
    // 获取数据
    this.props.getOrganizeChart();
  }
  // 提示框
  info = (data) => {
    message.info(data);
  };
  // 左侧树结构
  recursion(dataSource=[]) {
    return (
        dataSource.map((tree, index) => {
            if (tree.list) {
                return (
                    tree.type == "4"?
                    <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId} leaderName = {tree.leaderName} >
                        {this.recursion(tree.list)}
                    </TreeNode>:<TreeNode></TreeNode>
                )
                } else {
                return (
                    tree.type == "4"?
                    <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId} leaderName = {tree.leaderName}>
                    </TreeNode>:<TreeNode></TreeNode>
                )
            }
      })
    )
  }

  // 选中菜单
  onSelect = (selectedKeys, info) => {
    if(selectedKeys[0]){
      const { uid } = this.state;
      this.setState({departmentName2:info.selectedNodes[0].props.leaderName,uid:selectedKeys[0], sup_id:info.selectedNodes[0].props.sup_id, name:info.selectedNodes[0].props.title,name2:info.selectedNodes[0].props.title});
    }else{
      this.setState({
        name:'',
        uid:'',
        sup_id:''
      })
      return;
    }
  }

  // 添加子部门弹窗
  showAdd = () => {
    this.setState({title:'添加子部门',type:'add',title2:'机构名称：'})
    this.addEditDeleteModal();
  }
  addEditDeleteModal = () => {
    const {name2, sup_id, uid} = this.state;
    if(!name2 || !sup_id || !uid){
      // this.info('请选择一个部门');
      // return;
      this.setState({name2:"一级机构",sup_id:"0"})
    }
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    const { uid, type, sup_id } = this.state;
    const { departmentNameInput, departmentName2Input } = this.refs;
    if(type=='add'){
      this.props.addEditMechnism({sup_id:uid,name:departmentNameInput.refs.input.value,leader_name:departmentName2Input.refs.input.value,stype:'4',dtype:'4'})
    }else if(type =='edit'){
      this.props.addEditMechnism({sup_id:sup_id,name:departmentNameInput.refs.input.value,uid:uid})
    }else{
      this.props.deleteMechnism({uid:uid})
    }
    this.setState({
      visible: false
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 编辑部门
  showEdit = () => {
    this.setState({title:'编辑部门',type:'edit',title2:'变更名称：'});
    const {name2, sup_id, uid} = this.state;
    if(!name2 || !sup_id || !uid){
        this.info('请选择一个机构');
        return;
    }
    this.addEditDeleteModal();
  }

  // 成功后执行的操作
  afterSuccess = () => {
    const { type } = this.state;
    this.info('操作成功');
    this.props.addEditMechnism();
    if(type=='delete'){
      this.setState({ name:'', uid:'', sup_id:''})
    }
  }

  // 删除部门
  showDelete = () => {
    this.setState({type:'delete',title:'删除部门'});
    const {name2, sup_id, uid} = this.state;
    if(!name2 || !sup_id || !uid){
        this.info('请选择一个机构');
        return;
    }
    this.addEditDeleteModal();
  }

    // 分配部门
    showTool = () => {
        this.setState({type:'delete',title:'删除部门'});
        const {name2, sup_id, uid} = this.state;
        if(!name2 || !sup_id || !uid){
            this.info('请选择操作目标');
            return;
        }
        this.addEditDeleteModal();
    }

  handleChange = (e) => {
    this.setState({departmentName:e.target.value,name:e.target.value})
  }
  handleChange2 = (e) => {
    this.setState({departmentName2:e.target.value,name:e.target.value})
  }
  render() {
    const {title, name, sup_id,type, title2, departmentName, name2, departmentName2} = this.state;
    const { organize:{list}, mechnismInfo, organize } = this.props;
    // console.log(5555,organize)
    if(mechnismInfo == 'success'){
      this.afterSuccess()
      this.setState({departmentName:''});
    }
    console.log(organize)
    return (
        <div className='pull-left tree-type'>
            <div className='operate-button'>
              <Icon type="plus-circle-o" className='icon' onClick={this.showAdd} />
              <Icon type="edit" className='icon' onClick={this.showEdit} />
              <Icon type="delete" className='icon' onClick={this.showDelete} />
              <Icon type="tool" className='icon' onClick={this.showTool} />
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
            {/* 添加子部门-编辑部门弹窗 */}
            <Modal
              title={title}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className={type=='add'?'sub':'sub hide'}>
                <span className='sub-title'>上级：</span><span className='sub-content'>{name2}</span>
              </div>
              <div className={type=='edit'?'sub':'sub hide'}>
                <span className='sub-title'>上级：</span><span className='sub-content'>{sup_id}</span>
              </div>
              <div className={type=='edit'?'sub':'sub hide'}>
                <span className='sub-title'>机构名称：</span><span className='sub-content'>{name}</span>
              </div>
              <div className={type=='delete'?'sub2':'sub2 hide'}>
                <span className='sub-title2'>该项操作执行后，该部门信息将无法恢复，确认删除？</span>
              </div>
              <div className={type=='delete'?'department hide':'department'}>
                <span className='name'>{title2}</span>
                <div className='input-type'>
                  <Input value={departmentName} ref = "departmentNameInput" onChange={this.handleChange} />
                </div>
              </div>
              <div className={type=='delete'?'department hide':'department'}>
                <span className='name'>管理者名称：</span>
                <div className='input-type'>
                  <Input value={departmentName2} ref = "departmentName2Input" onChange={this.handleChange2} />
                </div>
              </div>
            </Modal>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  organize: state.Manage.organize,
  mechnismInfo: state.Manage.mechnismInfo
})
const mapDispatchToProps = dispatch => ({
  getDepartMentList: bindActionCreators(Actions.ManageActions.getDepartMentList, dispatch),
  getDepartMentStaff: bindActionCreators(Actions.ManageActions.getDepartMentStaff, dispatch),
  addEditMechnism: bindActionCreators(Actions.ManageActions.addEditMechnism, dispatch),
  refreshDepartmentInfo: bindActionCreators(Actions.ManageActions.refreshDepartmentInfo, dispatch),
  deleteMechnism: bindActionCreators(Actions.ManageActions.deleteMechnism, dispatch),
  getOrganizeChart: bindActionCreators(Actions.ManageActions.getOrganizeChart, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftTreePage);
 