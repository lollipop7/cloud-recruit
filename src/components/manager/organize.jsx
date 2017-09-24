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

export default class OrganizePage extends Component {

     componentDidMount(){
        NProgress.done();
     }
     render(){
        const {} = this.props;
        return (
            <div className="right-panel">
                <Tabs defaultActiveKey="2">
                    <TabPane tab="组织架构图" key="1">
                        组织架构图
                    </TabPane>
                    <TabPane tab="部门管理" key="2">
                        <LeftTree/>
                        <RightContent/>
                    </TabPane>
                </Tabs>
            </div>
        );
     }
 }