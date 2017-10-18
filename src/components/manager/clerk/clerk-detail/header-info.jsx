import React, {Component,PropTypes} from 'react';
import { Button, Select, Menu, Dropdown } from 'antd';

import trim from 'lodash/trim';
import isNumber from 'lodash/isNumber';
import moment from 'moment';

import clerkInfo from 'data/clerk/clerk';


export default class HeaderInfoComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps !== this.props;
    }

    componentWillUpdate(nextProps,nextState) {
        const {employeeInfo} = nextProps;
    }

    creditInvestgation = () => {
        console.log('人员征信');
    }

    //查看简历
    showResumeModal = (rid,resumeid) => {
        const {
            showEmployeeResumeView,
            showResumeModal
        } = this.props;
        if(isNumber(rid)) rid = rid + '';
        if(isNumber(resumeid)) resumeid = resumeid + '';
        showEmployeeResumeView({rid,resumeid});
        showResumeModal({resumeid});
    }

    handleMoreOthersClick = (e) => {
        const {
            showPermanentModal,
            showDismissionModal
        } = this.props;
        switch(e.key){
            case '1': console.log('生成信息填写二维码'); break;
            case '2': showPermanentModal(); break;
            case '3': showDismissionModal(); break;
            case '4': console.log('删除员工'); break;
        }
    }

    render() {
        const {
            data,
            showTransferPersonnelModal,
            pageType
        }=this.props,        
        {resumeoff={},constellation} = data;
        const {
            name,           //姓名
            englishname,    //英文名      
            department,     //部门
            position,       //职位
            sex,            //性别
            birthday,       //出生日期
            inthetime,       //入职时间
            rid,
            resumeid
        } = resumeoff;
        const moreOthers = (
            <Menu onClick={this.handleMoreOthersClick}>
              <Menu.Item key="1">生成信息填写二维码</Menu.Item>
              <Menu.Item key="2">转正</Menu.Item>
              <Menu.Item key="3">办理离职</Menu.Item>
              <Menu.Item key="4">删除员工</Menu.Item>
            </Menu>
        );
        return (
            <div className="header-info">
                <div className="prime-name pull-left">
                    <span>{trim(name == undefined ? '' : name).substr(0,1)}</span>
                </div>
                <div className="base-info pull-left"
                     style={{
                         marginLeft: 28
                     }} 
                >
                    <ul>
                        <li>
                            <div className="inline-block">
                                {trim(name)}
                            </div>
                            {englishname && <div className="inline-block en-name">
                                {englishname}
                            </div>}
                        </li>
                        <li>
                                <span style={{
                                    marginRight: 6
                                }}>{department}</span>
                                {position && <span>|</span>}
                                {position && <span style={{
                                    marginLeft: 6
                                }}>{position}</span>}
                        </li>
                        <li>
                            <span style={{
                                marginRight: 6
                            }}>{sex}</span>
                            {birthday && <span>|</span>}
                            {birthday && <span style={{
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{parseInt(moment(birthday,"YYYYMMDD").fromNow())}岁</span>}
                            {constellation && <span>|</span>}
                            {constellation &&  <span style={{
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{constellation}</span>}
                            {inthetime && <span>|</span>}
                            {inthetime && <span style={{ 
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>入职时长：{moment(inthetime).startOf('day').fromNow()}</span>}
                        </li> 
                    </ul>
                </div>
                <div className="ctr-btns pull-right">
                    <Button onClick={this.creditInvestgation}>
                        <img src="static/images/manager/clerk/test.png" alt="测试"/>
                        人员征信
                    </Button>
                    <Button onClick={this.showResumeModal.bind(this,rid,resumeid)}>
                        查看简历
                    </Button>
                    <Button onClick={showTransferPersonnelModal}>
                        人事调动
                    </Button>
                    <Dropdown overlay={moreOthers}>
                        <Button style={{ width: 100 }}>
                            更多
                            <img src="static/images/manager/arrow-up.png" alt="选择"/>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
