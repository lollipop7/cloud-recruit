import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader ,Pagination} from 'antd';
const SubMenu = Menu.SubMenu;

export default class ResumeSimplePage extends Component {
    checkResumeDetail = (resumeId) => {
        this.props.searchResumeDetail({resumeId:`${resumeId}`})
        this.props.showResumeDetail()
    }
    pageSize = (page, pageSize) => {
        this.props.searchResume(page, pageSize)
    }
    render() {
        const {resumeData=[],totalHits} = this.props;
        return (
            <div className="resumeSimple">
                {
                    resumeData.length!=0 ?
                        <table className="resumeSimpleTable">
                            <thead>
                                <tr>
                                    <th>求职意向</th>
                                    <th>姓名</th>
                                    <th>学历</th>
                                    <th>最近职位</th>
                                    <th>最近工作公司名称</th>
                                    <th>期望薪资</th>
                                    <th>工作年限</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                { resumeData.map((item,index)=>{
                                    return(
                                        <tr>
                                            <td><span>{item.expectPositions.length==0?"无":item.expectPositions[0]}</span></td>
                                            <td><a onClick={this.checkResumeDetail.bind(this,item.resumeId)}>{item.name}先生</a></td>
                                            <td><span>{item.education}</span></td>
                                            <td><span>{item.lastPosition}</span></td>
                                            <td><span>{item.lastCompany}</span></td>
                                            <td><span>{item.expectSalary}</span></td>
                                            <td><span>{item.workedYears}</span></td>
                                            <td><a onClick={this.checkResumeDetail.bind(this,item.resumeId)}>查看</a></td>
                                    </tr>
                                    )
                                }) 
                                }
                            </tbody>
                        </table>:
                        <div style={{textAlign:"center",marginTop:200,color:"#CDCDCD"}}>
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