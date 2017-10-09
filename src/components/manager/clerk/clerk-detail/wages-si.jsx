import React, {Component} from 'react';

import clerkInfo from 'data/clerk/clerk';

export default class WagesSocialSecurity extends Component {

    render() {
        const {
            wageCard,               //工资卡卡号
            wageBank,               //工资卡开户行
            wageCity,               //工资卡开户城市
            sociCard,               //社保账号
            fundCard,               //公积金账号
        } = this.props.data,
        {
            salaryBasic,            //基本工资
            salarySubsidies,        //补贴
            salaryPer               //绩效工资
        } = this.props.wage;
        return (
            <div className="wages-social-security clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                工资卡信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 85}}>
                                <li>
                                    <span>工资卡卡号 : </span>
                                    <span>{wageCard}</span>
                                </li>
                                <li>
                                    <span>工资卡开户行 : </span>
                                    <span>{wageBank}</span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>工资卡开户城市 : </span>
                                    <span>{wageCity}</span>
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                社保公积金
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>社保账号 : </span>
                                    <span>{sociCard}</span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>公积金账号 : </span>
                                    <span>{fundCard}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                薪资状况
                            </h3>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>基本工资 : </span>
                                    <span>{salaryBasic}</span>
                                </li>
                                <li>
                                    <span>补贴 : </span>
                                    <span>{salarySubsidies}</span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>绩效工资 : </span>
                                    <span>{salaryPer}</span>
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}