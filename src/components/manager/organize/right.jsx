import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
// antd
import { Modal, Select } from 'antd';
const Option = Select.Option;

class DepartmentStaff extends Component {
  state = { 
    visible: false,
    name:'',
    resultTree: [],
    flag: true,
    departmentInfo:{},
    department:'',
    uid:''
  }
  componentDidUpdate(){
    const { flag } = this.state;
    const { departmentList:{list} } = this.props;
    if(flag){
      this.makeResult(list);
      this.setState({flag:false})
    }
  }

  // 调换部门
  changeDepartment = (item) => {
    this.setState({departmentInfo:item})
    this.showModal()
  }
  handleChange = (value, data) => {
    this.setState({uid:value,department:data.props.children})
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    const { departmentInfo, uid, department } = this.state;
    var dataInfo = {};
    dataInfo.department = department;
    dataInfo.rid = departmentInfo.rid.toString();
    dataInfo.departmentid = uid.toString();
    this.props.editEmployeeInformation(dataInfo, this.props);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 模拟下拉选择框
  makeResult = (ss) => {
      let pp = []
      function recursion(data){
      data.forEach(function(item, index){
          var x = item.list
          if (x) {
            pp.push({name:item.name, uid:item.uid, sup_id:item.supDepartmentId});
              recursion(x);
          } else {
            pp.push({name:item.name, uid:item.uid, sup_id:item.supDepartmentId});
          }
      })
    }
    recursion(ss);
    this.setState({resultTree:pp})
  }
  
  render() {
    const { departmentInfo, resultTree } = this.state;
    const { departmentStaff, departmentList:{list}, currentUid, departmentName } = this.props;
    return (
      <div className='pull-left organize-tree-right'>
          <div className='department-title'><div></div>{departmentName}</div>
          <div className='down-line'></div>

          {/* 下级部门 */}

          <div className='sub-department'>
            <div className='sub-title'>下级部门（2）</div>
            <div className='sub-depart-table'>
              <div className='sub-depart-table-title'>
                <span>部门名称</span>
                <span className='left-width'>部门人数</span>
              </div>
              {
                departmentStaff.departmentList && departmentStaff.departmentList.map((item,index)=>(
                  <div className='sub-depart-table-lab'>
                    <span className='left'>{item.name}</span>
                    <span className='right'>{item.isManagement}</span>
                  </div>
                ))
              }
            </div>
          </div>
          {/* 部门在职员工 */}

          <div className='sub-department-two'>
            <div className='sub-title'>部门在职员工（2）<span className='pull-right operate' style={{display:'none'}}>批量调整</span></div>
            <div className='sub-depart-table'>
              <div className='sub-depart-table-title'>
                <span className='one'>姓名</span>
                <span className='two'>部门</span>
                <span className='three'>岗位</span>
                <span className='four'>操作</span>
              </div>
              {
                departmentStaff.resumeoffList && departmentStaff.resumeoffList.map((item,index)=>(
                  <div className='sub-depart-table-lab'>
                    <span className='one'>{item.name}</span>
                    <span className='two'>{item.department}</span>
                    <span className='three'>{item.position}</span>
                    <span className='four' onClick={this.changeDepartment.bind(this,item)}>调换部门</span>
                  </div>
                ))
              }
            </div>
          </div>

          {/* 调换部门弹窗 */}

          <div>
            <Modal
              title="部门人员调动"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className='sub'>
                <span className='sub-title'>原属部门：</span><span className='sub-content'>{departmentInfo.department}</span>
              </div>
              <div className='department'>
                <span className='name'>调至部门：</span>
                <div className='input-type'>
                  <Select
                      style={{ width: 200 }}
                      onSelect={this.handleChange}
                    >
                      {
                        resultTree.map((item,index)=>{
                            return (<Option key={item.supDepartmentId} value={item.uid}>{item.name}</Option>)
                          }
                        )
                      }
                  </Select>
                </div>
              </div>
            </Modal>
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  departmentList: state.Manage.departmentList,
  departmentStaff: state.Manage.departmentStaff,
  currentUid: state.Manage.currentUid,
  departmentName: state.Manage.departmentName,
})
const mapDispatchToProps = dispatch => ({
  getDepartMentStaff: bindActionCreators(Actions.ManageActions.getDepartMentStaff, dispatch),
  editEmployeeInformation:bindActionCreators(Actions.ManageActions.editEmployeeInformation,dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentStaff);