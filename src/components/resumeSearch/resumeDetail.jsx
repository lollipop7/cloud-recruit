import React, {Component,PropTypes} from 'react';
import moment from 'moment';

import {Button , Menu , Input , Icon , Select , Cascader, Dropdown,Pagination} from 'antd';
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

export default class ResumeDetailPage extends Component {
    checkResumeDetail = (resumeId) => {
        //this.props.checkCandidate()
        this.props.searchResumeDetail({resumeId:`${resumeId}`})
        this.props.showResumeDetail()
    }
    downLoadResume = () => {
        this.props.downLoadResume({resumeId:"10293040"})
    }
    pageSize = (page, pageSize) => {
        this.props.searchResume(page, pageSize)
    }
    render() {
        const {path,resumeData=[],totalHits} = this.props;
        return (
            <div className="resumeDetail">
                {resumeData.length!=0 ? resumeData.map((item,index)=>{
                    return(
                    <div className="detail-item">
                        <div className="details-item-intention">
                            <div className="resume-id">
                                <span>ID:</span>
                                <span>{item.resumeId}</span>
                            </div>
                            <div className="intention">
                                <div className="intention-item">
                                    <span>求职意向：</span>
                                    <Dropdown 
                                        overlay={<Menu>
                                                {item.expectPositions.map((value,index)=>{
                                                    return <Menu.Item key={index}>{value}</Menu.Item>
                                                    })
                                                }  
                                                 </Menu>
                                                 }
                                    >
                                        <a>{item.expectPositions[0]}</a>
                                    </Dropdown>
                                </div>
                                <div className="intention-item">
                                    <span>薪资范围：</span>
                                    <span>{item.expectSalary}</span>
                                </div>
                                <div className="intention-item">
                                    <span>期望城市：</span>
                                    {item.expectAreas.map((value,index)=>{
                                        return(<span>{value}</span>)
                                    })}  
                                </div>
                                <div className="intention-item">
                                    <span>更新时间：</span>
                                    <span>{moment(item.esumeLastUpdate).format("YYYY-MM-DD") }</span>
                                </div>
                            </div>  
                        </div>
                        <div className="details-item-main">
                            <div className="main-left">
                                <h3>{item.name}{item.sex=="男"?"先生":item.sex=="女"?"女士":""} | {item.age}岁 | {item.workedYears}年 | {item.lastCompany} | {item.lastPosition} | {item.currentArea}</h3>
                                {item.workExp.map((value,index)=>{
                                    return(
                                        <div className="main-left-company">
                                            <p>{value.companyName}</p>
                                            <p>{value.position}</p>
                                            <p>
                                                {value.startDate?
                                                    moment(value.startDate).format("YYYY-MM-DD"):"无"} 至
                                                {value.endDate?
                                                    moment(value.endDate).format("YYYY-MM-DD"):""
                                                }
                                            </p>
                                        </div>
                                        )
                                    })
                                }
                                <div className="main-left-company">
                                    <p>{item.lastSchool}</p>
                                    <p>{item.major}</p>
                                    <p>{item.education}</p>
                                </div>  
                            </div>
                            <div className="main-right">
                                <Button 
                                    className="detailBtn"
                                    type="primary" 
                                    ghost 
                                    onClick= {this.checkResumeDetail.bind(this,item.resumeId)}
                                >
                                    查看详情
                                </Button>
                                <div style={{width:"100%",height:10}}></div>
                                <Button 
                                    type="primary" 
                                    ghost 
                                    className="detailBtn"
                                    onClick={this.downLoadResume}
                                >
                                    {path ==="collectResume" ?"取消收藏":"收藏"}
                                </Button>
                                <div style={{width:"100%",height:10}}></div>
                                {path ==="collectResume" &&
                                    <Button 
                                        type="primary" 
                                        ghost 
                                        className="detailBtn"
                                    >
                                        备注
                                    </Button>
                                }    
                            </div>
                        </div>
                    </div> 
                        )
                    }):<div style={{textAlign:"center",marginTop:200,color:"#CDCDCD"}}>
                            <Icon type="frown-o" style={{fontSize:50}}>
                                <p style={{fontSize:14,lineHeight:"50px",color:"#CDCDCD"}}>暂未查询到相关简历~~</p>
                            </Icon>
                        </div>
                }
                {
                    resumeData.length!=0 && 
                    <div style={{marginTop:30,textAlign:"center"}}>
                        <Pagination 
                            defaultCurrent={1} 
                            total={totalHits}
                            onChange={this.pageSize} 
                        />
                    </div> 
                }  
            </div>
        );
    }
}