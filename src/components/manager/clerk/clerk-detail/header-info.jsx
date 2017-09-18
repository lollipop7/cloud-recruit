import React, {Component} from 'react';
import { Button } from 'antd';

import trim from 'lodash/trim';
import moment from 'moment';

import clerkInfo from 'data/clerk/clerk';

export default class HeaderInfoComponent extends Component {

    componentDidMount(){
    }

    getAstro = (month,day) => {   
        const s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
        const arr=[20,19,21,21,21,22,23,23,23,23,22,22];
        const astro = s.substr(month*2-(day<arr[month-1] ? 2 : 0),2);
        return astro;
    }

    getConstellation = (birthday) => {
        const month = moment(birthday).format("M"),
        day = moment(birthday).format("D");
        console.log(month,day);
        this.getAstro(month,day);
    }

    render() {
        const {data}=this.props,        //？？？？
        {
            name,           //姓名
            englishname,    //英文名      
            department,     //部门
            position,       //职位
            sex,            //性别
            birthday,       //出生日期
            inthetime       //入职时间
        }=clerkInfo.headerInfo;
        return (
            <div className="header-info">
                <div className="prime-name inline-block">
                    <span>{trim(name).substr(0,1)}</span>
                </div>
                <div className="base-info inline-block">
                    <ul>
                        <li>
                            <div className="inline-block">
                                {trim(name)}
                            </div>
                            <div className="inline-block">
                                <div className="en-name">{englishname}</div>
                            </div>
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
                            }}>{birthday}岁</span>}
                            {birthday && <span>|</span>}
                            {birthday && <span style={{
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{this.getConstellation(birthday)}座</span>}
                            {inthetime && <span>|</span>}
                            {inthetime && <span style={{ 
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{moment(inthetime,"YYYYMMDD").fromNow()}</span>}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}