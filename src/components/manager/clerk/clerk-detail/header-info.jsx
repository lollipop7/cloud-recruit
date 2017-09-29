import React, {Component} from 'react';
import { Button, Select, Menu, Dropdown } from 'antd';

import trim from 'lodash/trim';
import moment from 'moment';

import clerkInfo from 'data/clerk/clerk';

import DismissionModal from './dismission-modal'; 

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class HeaderInfoComponent extends Component {

    componentDidMount(){
        this.props.showDismissionModal();
    }

    // getAstro = (month,day) => {   
    //     const s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    //     const arr=[20,19,21,21,21,22,23,23,23,23,22,22];
    //     const astro = s.substr(month*2-(day<arr[month-1] ? 2 : 0),2);
    //     return astro;
    // }

    // getConstellation = (birthday) => {
    //     const month = moment(birthday).format("M"),
    //     day = moment(birthday).format("D");
    //     console.log(month,day);
    //     this.getAstro(month,day);
    // }

    creditInvestgation = () => {
        console.log('人员征信');
    }

    handleMoreOthersClick = (e) => {
        switch(e.key){
            case '1': console.log('生成信息填写二维码'); break;
            case '2': this.props.showDismissionModal(); break;
            case '3': console.log('删除员工'); break;
        }
    }

    render() {
        const {crewDetail}=this.props,        //？？？？
        {
            name,           //姓名
            englishname,    //英文名      
            department,     //部门
            position,       //职位
            sex,            //性别
            birthday,       //出生日期
            inthetime       //入职时间
        }=clerkInfo.headerInfo;

        const moreOthers = (
            <Menu onClick={this.handleMoreOthersClick}>
              <Menu.Item key="1">生成信息填写二维码</Menu.Item>
              <Menu.Item key="2">办理离职</Menu.Item>
              <Menu.Item key="3">删除员工</Menu.Item>
            </Menu>
        );

        return (
            <div className="header-info">
                <div className="prime-name pull-left">
                    <span>{trim(name).substr(0,1)}</span>
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
                            {inthetime && <span>|</span>}
                            {inthetime && <span style={{ 
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{moment(inthetime,"YYYYMMDD").fromNow()}</span>}
                        </li>
                    </ul>
                </div>
                <div className="ctr-btns pull-right">
                    <Button onClick={this.creditInvestgation}>
                        <img src="static/images/manager/clerk/test.png" alt="测试"/>
                        人员征信
                    </Button>
                    <Button onClick={this.creditInvestgation}>
                        查看简历
                    </Button>
                    <Button onClick={this.creditInvestgation}>
                        人事调动
                    </Button>
                    <Dropdown overlay={moreOthers}>
                        <Button style={{ width: 100 }}>
                            更多
                            <img src="static/images/manager/arrow-up.png" alt="选择"/>
                        </Button>
                    </Dropdown>
                </div>
                <DismissionModal {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dismissionModal: state.Manage.dismissionModal
})

const mapDispatchToProps = dispatch => ({
    showDismissionModal: bindActionCreators(Actions.ManageActions.showDismissionModal, dispatch),
    hideDismissionModal: bindActionCreators(Actions.ManageActions.hideDismissionModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderInfoComponent)