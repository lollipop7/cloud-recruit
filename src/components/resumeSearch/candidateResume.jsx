import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader, Spin} from 'antd';
const SubMenu = Menu.SubMenu;
import moment from 'moment';

export default class CandidateResumePage extends Component {
    goBack = () => {
        this.props.checkCandidate();
        //清除个人简历数据
        this.props.clearResumeData();
    }
    render() {
        const {resumeDetailData,detailLoading} = this.props;
        const {
            name,
            resumeId,
            education,
            workStatus,
            workType,
            educationExpList=[],
            workExpList=[],
            projectExpList=[],
            workedYearsMeanly,
            currentArea
        } = resumeDetailData;
        return (
            <div className="candidateResume">
                {
                    detailLoading && <Spin size="large"/>
                }
                <div className="basicInfo">
                    <div className="basicInfo-left">
                        <h3>{name?`${name}先生`:""}{resumeId?`（ID:${resumeId})`:""}</h3>
                        <p>{workedYearsMeanly?`${workedYearsMeanly}年工作经验/`:""}{education==1?"小学/":education==10?"初中/":education==20?"高中/":education==21?"中专/":education==22?"技校/":education==23?"中技/":education==100?"大学/":education==101?"大专/":education==102?"专科/":education==110?"本科/":education==200?"研究生/":education==201?"MBA/":education==210?"博士/":""}{currentArea?`${currentArea}/`:""}{workStatus==0?"在职不想换工作":workStatus==1?"离职":workStatus==2?"正在找工作":workStatus==3?"在职,可以看更好机会":workStatus==4?"暂时不想找工作":""}</p>
                        <div>
                            <span>电话：</span>
                            <span>************</span>
                            <span>邮箱：</span>
                            <span>************</span>
                        </div>
                    </div>
                    <div className="basicInfo-right">
                        <Button 
                            type="primary" 
                            ghost 
                            onClick={this.goBack}
                        >
                            <Icon type="download" />下载简历
                        </Button>
                        <Button 
                            type="primary" 
                            ghost 
                            onClick={this.goBack}
                        >
                            <Icon type="left" />返回
                        </Button>
                    </div>
                </div>
                <div className="jobIntension">
                    <h3>●&nbsp;&nbsp;求职意向</h3>
                    <ul className="intensionInfo">
                        <li><span>工作性质：</span>
                            <span>
                                {
                                    workType==0?"全职":
                                    workType==1?"兼职":
                                    workType==2?"实习":
                                    workType==3?"全职或兼职":""
                                }
                            </span>
                        </li>
                        <li>
                            <span>期望岗位：</span>
                            <span>{resumeDetailData.expectPositions}</span>
                        </li>
                        <li>
                            <span>期望行业：</span>
                            <span>{resumeDetailData.expectIndustries}</span>
                        </li>
                        <li>
                            <span>期望地区：</span>
                            <span>{resumeDetailData.expectAreas}</span>
                        </li>
                        <li>
                            <span>期望月薪：</span>
                            <span>{resumeDetailData.expectSalary}</span>
                        </li>
                        <li>
                            <span>目前状况：</span>
                            <span>
                                {
                                    workStatus==0?"在职不想换工作":
                                    workStatus==1?"离职":
                                    workStatus==2?"正在找工作":
                                    workStatus==3?"在职,可以看更好机会":
                                    workStatus==4?"暂时不想找工作":""
                                }
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="education">
                    <h3>●&nbsp;&nbsp;教育经历</h3>
                    {
                        educationExpList.length==0?"":educationExpList.map((item,index)=>{
                            return(
                                <p>
                                    {moment(item.startDate).format("YYYY-MM-DD")}至{moment(item.endDate).format("YYYY-MM-DD")} | {item.schoolName} | 
                                    {item.majorName} | 
                                    {education==1?"小学":education==10?"初中":education==20?"高中":education==21?"中专":education==22?"技校":education==23?"中技":education==100?"大学":education==101?"大专":education==102?"专科":education==110?"本科":education==200?"研究生":education==201?"MBA":education==210?"博士":"暂无"}/{resumeDetailData.currentArea}/{workStatus==0?"在职不想换工作":workStatus==1?"离职":workStatus==2?"正在找工作":workStatus==3?"在职,可以看更好机会":workStatus==4?"暂时不想找工作":"无"}
                                </p>
                            )
                        })
                    }
                    
                </div>
                <div className="workExperience">
                    <h3>●&nbsp;&nbsp;工作经验</h3>
                    {
                        workExpList.length==0?"":workExpList.map((item,index)=>{
                            return(
                                <div>
                                    <div className="company">
                                        <h3 className="company-h3">{item.companyName}</h3>
                                        <p>{item.position}</p>
                                        <p>{item.startDate?moment(item.startDate).format("YYYY-MM-DD"):""}至{item.endDate?moment(item.endDate).format("YYYY-MM-DD"):""}</p>
                                    </div>
                                    <ul className="workInfo">
                                        <li>
                                            <span>行&nbsp;&nbsp;&nbsp;&nbsp;业：</span>
                                            <span>{item.industry}</span>
                                        </li>
                                        <li>
                                            <span>薪&nbsp;&nbsp;&nbsp;&nbsp;酬：</span>
                                            <span>{item.salary}</span>
                                        </li>
                                        <li>
                                            <span style={{display:"block",float:"left"}}>工作描述：</span>
                                            <span style={{display:"block",width:700,overflow:"hidden"}}>{item.summary}</span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className="projectExperience">
                    <h3>●&nbsp;&nbsp;项目经验</h3>
                    {
                        projectExpList.length==0?"":projectExpList.map((item,index)=>{
                            <div>
                                <h3 className="projectExperience-title">{item.name}</h3>
                                <div className="project">
                                    <ul className="project-title">
                                        <li><span>责任描述：</span></li>
                                        <li>{item.duty}</li>
                                    </ul>
                                    <ul className="project-title">
                                        <li><span>项目描述：</span></li>
                                        <li>{item.description}</li>
                                    </ul>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="evaluation">
                    <h3>●&nbsp;&nbsp;自我评价</h3>
                    <p>{resumeDetailData.personal}</p>
                </div>
            </div>
        );
    }
}