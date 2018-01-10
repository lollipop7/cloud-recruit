import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader} from 'antd';
const SubMenu = Menu.SubMenu;
import Education from 'data/select/education';
import city from 'data/city.json';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';
import ResumeDetailComponent from 'components/resumeSearch/resumeDetail';
import ResumeSimpleComponent from 'components/resumeSearch/resumeSimple';
import CandidateResumeComponent from 'components/resumeSearch/candidateResume';

export default class SearchResumePage extends Component {
    state = {
        switchContent:"简",
        detail:true,
        isCheckResume:false,
        education:"学历",//学历
        sex:"性别",//性别
        money:"薪资范围",//薪资
        time:"更新时间",//更新时间
        workcity:"北京市-东城区"//工作地点
    }
    static contextTypes = {
        router: PropTypes.object
    }
    //简历详情、简版切换
    switch = (switchContent) => {
        this.setState({
            switchContent:switchContent=="详"?"简":"详",
            detail:!this.state.detail
        })
    };
    //条件选择
    handleChange = (field,value) => {
        this.setState({
            [field]:value
        })
    }
    //工作地点选择
    handleCityChange = (val) => {
        this.setState({
            workcity: val.length > 0 ?  val[0] + '-' + val[1] : ''
        });
    }
    //显示查看联系人内容
    checkCandidate = () => {
        this.setState({
            isCheckResume:true
        })
    }
    //隐藏联系人内容，显示简历详情
    showResumeDetail = () => {
        this.setState({
            isCheckResume:false
        })
    }
    render() {
        const {
            switchContent, 
            detail,
            isCheckResume,//查看联系人状态
            education,//学历
            sex,//性别
            money,//薪资
            time,//更新时间
            workcity//工作地点
        } = this.state;
        return (
            <div className="queryResume">
                <div style={{marginLeft:20}}>
                    <Input placeholder="例如：研发 前端开发工程师" />
                    <Button type="primary" icon="search">搜索</Button>
                    <p className="example">搜索规则任意组合即可：公司+岗位+工作年限+年龄+城市等</p>
                </div>
                {
                    !isCheckResume && <div className="queryResult">
                        <span>共找到1923份简历</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <a 
                            onClick={this.switch.bind(this,switchContent)}
                        >
                            <Icon type="swap" />
                            切换至{switchContent}版
                        </a>
                        <div className="conditionSelect">
                            <Select 
                                value={education}
                                onChange={this.handleChange.bind(this,"education")}
                            >
                                {
                                    Education.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <Select 
                                value={sex}
                                onChange={this.handleChange.bind(this,"sex")}
                            >
                                {
                                    [
                                        "性别",
                                        "男",
                                        "女"
                                    ].map((item,index)=>{
                                        return (
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <Select 
                                value={money}
                                onChange={this.handleChange.bind(this,"money")}
                            >
                                {
                                    ["薪资范围",
                                    "5千以内",
                                    "5千-1万",
                                    "1万-3万",
                                    "3万-5万",
                                    "5万-10万",
                                    "10万-20万",
                                    "20万以上"
                                    ].map((item,index)=>{
                                        return (
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <Cascader 
                                options={city}
                                value ={workcity ? workcity.split("-"):''}
                                onChange={this.handleCityChange}
                                displayRender={label => label.join(' - ')}
                                placeholder="请选择工作地点" 
                                style={{
                                    height: 40,
                                    width: 230
                                }}
                            />
                            <Select 
                                style={{top:1}} 
                                value={time}
                                onChange={this.handleChange.bind(this,"time")}
                            >
                                {
                                    [
                                        "更新时间",
                                        "最近3天",
                                        "最近7天",
                                        "最近30天",
                                        "最近60天"
                                    ].map((item,index)=>{
                                        return (
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        {detail && <ResumeDetailComponent checkCandidate={this.checkCandidate} />}
                        {!detail && <ResumeSimpleComponent checkCandidate={this.checkCandidate}/>}
                    </div>
                }
                {isCheckResume && <CandidateResumeComponent showResumeDetail= {this.showResumeDetail}/>}
            </div>
        );
    }
}