import React, {Component} from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import PositionInfo from './position-info';
import PersonalInfo from './personal-info';
import WagesSocialSecurity from './wages-si';
import Contract from './contract';
import MaterialAttach from './material-attach';
import OperateHistory from './operate-history';
import CreditInvestgation from './credit-investgation';

export default class MainContent extends Component {

    callback = key => {
        // console.log(key);
    }  

    componentDidMount(){
    //    console.log(this.props.crewDetail);
    }

    render() {
        return (
            <div className="clerk-nav-tabs">
                <Tabs defaultActiveKey="1" 
                      onChange={this.callback}
                      tabBarStyle = {{
                        width: 870,
                        borderBottom: "none",
                        fontSize: '16',
                        fontWeight: "bold"
                      }}
                >
                    <TabPane tab="在职信息" key="1"><PositionInfo/></TabPane>
                    <TabPane tab="个人信息" key="2"><PersonalInfo/></TabPane>
                    <TabPane tab="工资社保" key="3"><WagesSocialSecurity/></TabPane>
                    <TabPane tab="合同情况" key="4"><Contract/></TabPane>
                    <TabPane tab="材料附件" key="5"><MaterialAttach/></TabPane>
                    <TabPane tab="操作记录" key="6"><OperateHistory/></TabPane>
                    <TabPane tab="人员征信" key="7"><CreditInvestgation/></TabPane>
                </Tabs>
            </div>
        );
    }
}