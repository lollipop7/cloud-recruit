import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
class DepartmentStaff extends Component {
  
  render() {
    const { departmentStaff } = this.props;
    return (
      <div className='pull-left organize-tree-right'>
          <div className='department-title'><div></div>客户服务售前售后部门</div>
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
            <div className='sub-title'>部门在职员工（2）<span className='pull-right operate'>批量调整</span></div>
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
                    <span className='two'>{item.departmentid}</span>
                    <span className='three'>{item.companyid}</span>
                    <span className='four'>调换部门</span>
                  </div>
                ))
              }
            </div>
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  departmentStaff: state.Manage.departmentStaff
})
const mapDispatchToProps = dispatch => ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentStaff);