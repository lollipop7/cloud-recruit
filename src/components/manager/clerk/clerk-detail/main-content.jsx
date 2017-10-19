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

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }
    onChange = () => {
        const rid = this.props.params.rid;
        this.props.queryEmployee({rid:rid});
    }

    render() {
        const { data , editEmployeeInformation , operationList , UploadMaterial} = this.props;
        const {
            resumeoff={},                   //员工信息表
            wage={},                        //薪资状况
            contract={},                    //合同信息
            attachment_type_con = [],       //合同附件
            edu = {},
            list={},                        //人员附件列表集合
            listAll={}                      //人员基本附件说明
        } = data;
        const contractData = contract == null ? {} : contract;
        return (
            <div className="clerk-nav-tabs">
                <Tabs defaultActiveKey="5" 
                      onChange={this.onChange}
                      tabBarStyle = {{
                        width: 870,
                        borderBottom: "none",
                        fontSize: '16',
                        fontWeight: "bold"
                      }}
                >
                    <TabPane tab="在职信息" key="1">
                        <PositionInfo 
                            data={resumeoff} 
                            editEmployeeInformation={editEmployeeInformation}
                        />
                    </TabPane>
                    <TabPane tab="个人信息" key="2">
                        <PersonalInfo 
                            data={resumeoff} 
                            edu={edu} 
                            editEmployeeInformation={editEmployeeInformation} 
                        />
                    </TabPane>
                    <TabPane tab="工资社保" key="3">
                        <WagesSocialSecurity 
                            data={resumeoff} 
                            wage={wage}
                            editEmployeeInformation={editEmployeeInformation}
                        />
                    </TabPane>
                    <TabPane tab="合同情况" key="4">
                        <Contract 
                            data={resumeoff}
                            atcs={attachment_type_con}
                            editEmployeeInformation={editEmployeeInformation}
                        />
                    </TabPane>
                    <TabPane tab="材料附件" key="5">
                        <MaterialAttach listAll={listAll} {...this.props}/>
                    </TabPane>
                    <TabPane tab="操作记录" key="6">
                        <OperateHistory data={operationList}/>
                    </TabPane>
                    <TabPane tab="人员征信" key="7"><CreditInvestgation data={resumeoff}/></TabPane>
                </Tabs>
            </div>
        );
    }
}