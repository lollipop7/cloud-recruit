import React, {Component} from 'react';

import clerkInfo from 'data/clerk/clerk';

export default class PersonalInfo extends Component {

    render() {
        const {
            name,                   //姓名
            documenttype,           //证件类型
            mobile,                 //手机号
            birthday,               //生日
            married,                //是否已婚
            national,               //民族
            natives,                //籍贯
            accounttype,            //户口类型
            englishname,            //英文名
            card,                   //证件号码
            workemail,              //个人邮箱
            sex,                    //性别
            children,               //是否已育
            political,              //政治面貌
            city,                   //户籍城市
            tolive,                 //居住地址
            schooling,              //最高学历
            professional,           //专业
            degree,                 //学位
            school,                 //毕业学校
            endtime,                //毕业时间
            recruitment,            //是否统招
        } = clerkInfo.personalInfo;
        return (
            <div className="personal-info clerk-tab-container" ref="PersonalInfoHeight">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                基本信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>姓名 : </span>
                                    <span>{name}</span>
                                </li>
                                <li>
                                    <span>证件类型 : </span>
                                    <span>{documenttype}</span>
                                </li>
                                <li>
                                    <span>手机号 : </span>
                                    <span>{mobile}</span>
                                </li>
                                <li>
                                    <span>生日 : </span>
                                    <span>{birthday}</span>
                                </li>
                                <li>
                                    <span>是否已婚 : </span>
                                    <span>{married}</span>
                                </li>
                                <li>
                                    <span>民族 : </span>
                                    <span>{national}</span>
                                </li>
                                <li>
                                    <span>籍贯 : </span>
                                    <span>{natives}</span>
                                </li>
                                <li>
                                    <span>户口类型 : </span>
                                    <span>{accounttype}</span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>英文名 : </span>
                                    <span>{englishname}</span>
                                </li>
                                <li>
                                    <span>证件号码 : </span>
                                    <span>{card}</span>
                                </li>
                                <li>
                                    <span>个人邮箱 : </span>
                                    <span>{workemail}</span>
                                </li>
                                <li>
                                    <span>性别 : </span>
                                    <span>{sex}</span>
                                </li>
                                <li>
                                    <span>是否已育 : </span>
                                    <span>{children}</span>
                                </li>
                                <li>
                                    <span>政治面貌 : </span>
                                    <span>{political}</span>
                                </li>
                                <li>
                                    <span>户籍城市 : </span>
                                    <span>{city}</span>
                                </li>
                                <li>
                                    <span>居住地址 : </span>
                                    <span>{tolive}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                教育经历
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>最高学历 : </span>
                                    <span>{schooling}</span>
                                </li>
                                <li>
                                    <span>专业 : </span>
                                    <span>{professional}</span>
                                </li>
                                <li>
                                    <span>学位 : </span>
                                    <span>{degree}</span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>毕业学校 : </span>
                                    <span>{school}</span>
                                </li>
                                <li>
                                    <span>毕业时间 : </span>
                                    <span>{endtime}</span>
                                </li>
                                <li>
                                    <span>是否统招 : </span>
                                    <span>{recruitment}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}