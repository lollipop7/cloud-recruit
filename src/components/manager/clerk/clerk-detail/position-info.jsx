import React, {Component} from 'react';
import moment from 'moment';

import clerkInfo from 'data/clerk/clerk';

export default class PositionInfo extends Component {

    state = {
        isQualified: true
    }

    setQualified = isQualified => {
        this.setState({isQualified});
    }

    //是否提前转正

    render() {
        const {
            worknumber,             //工号
            worknature,             //工作性质
            department,             //部门
            position,               //岗位
            positionclass,          //岗位职级
            workcity,               //工作地点
            workphone,              //工作电话
            ext,                    //分机号
            cemail,                 //企业邮箱
            contactname,            //紧急联系人
            inthetime,              //入职时间
            positivedate,           //转正时间
            theleng                 //试用期
        } = this.props.data,
        {isQualified} = this.state;
        return (
            <div className="position-info clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                在职信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>工号 : </span>
                                    <span>{worknumber}</span>
                                </li>
                                <li>
                                    <span>部门 : </span>
                                    <span>{department}</span>
                                </li>
                                <li>
                                    <span>岗位职级 : </span>
                                    <span>{positionclass}</span>
                                </li>
                                <li>
                                    <span>工作电话 : </span>
                                    <span>{workphone}</span>
                                </li>
                                <li>
                                    <span>企业邮箱 : </span>
                                    <span>{cemail}</span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>工作性质 : </span>
                                    <span>{worknature}</span>
                                </li>
                                <li>
                                    <span>岗位 : </span>
                                    <span>{position}</span>
                                </li>
                                <li>
                                    <span>工作地点 : </span>
                                    <span>{workcity}</span>
                                </li>
                                <li>
                                    <span>分机号 : </span>
                                    <span>{ext}</span>
                                </li>
                                <li>
                                    <span>紧急联系人 : </span>
                                    <span>{contactname}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                员工动态
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>入职时间 : </span>
                                    <span>{moment(inthetime).format("YYYY-MM-DD")}</span>
                                </li>
                                <li>
                                    <span>试用期 : </span>
                                    <span>{theleng}</span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>转正时间 : </span>
                                    <span>{moment(positivedate).format("YYYY-MM-DD")}</span>
                                    { isQualified && <span>(提前转正)</span>}
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