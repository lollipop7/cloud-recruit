import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
// antd
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import LeftTree from './organize/tree';
import RightContent from './organize/right';
import NoSubDepartment from './organize/nosub';

class OrganizePage extends Component {

     componentDidMount(){
        NProgress.done();
     }
     render(){
        const {departmentStaff} = this.props;
        return (
            <div className="right-panel">
                <Tabs defaultActiveKey="2">
                    <TabPane tab="组织架构图" key="1">
                        组织架构图
                    </TabPane>
                    <TabPane tab="部门管理" key="2">
                        <LeftTree/>
                        {
                            departmentStaff.resumeoffList && departmentStaff.resumeoffList.length>0 ?<RightContent/>:<NoSubDepartment/>
                        }
                    </TabPane>
                </Tabs>
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
)(OrganizePage);