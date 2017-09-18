import React, {Component} from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import EmployeesOverview from './condition/overview';

 export default class ConditionPage extends Component {

     componentDidMount(){
        NProgress.done();
     }
     callback(key) {
        console.log(key);
     }
     render(){
        const {routes} = this.props;
        return (
            <div className="right-panel condition-page">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="员工概览" key="1">
                        <EmployeesOverview/>
                    </TabPane>
                    <TabPane tab="趋势分析" key="2">趋势分析</TabPane>
                    <TabPane tab="离职分析" key="3">离职分析</TabPane>
                    <TabPane tab="招聘分析" key="4">招聘分析</TabPane>
                </Tabs>
            </div>
        );
     }
 }