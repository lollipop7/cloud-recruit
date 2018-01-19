import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader,Spin} from 'antd';
const SubMenu = Menu.SubMenu;
import city from 'data/resumeCity.json';
import pickBy from 'lodash/pickBy';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';
import ResumeDetailComponent from 'components/resumeSearch/resumeDetail';
import ResumeSimpleComponent from 'components/resumeSearch/resumeSimple';
import CandidateResumeComponent from 'components/resumeSearch/candidateResume';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class SearchResumePage extends Component {
    state = {
        switchContent:"简",
        detail:true,
        isCheckResume:false,
        isCandidateResume:false,
        startState:true,
        updateDays:"更新时间",
        salaryFrom:"",//薪资范围开始
        salaryTo:"",//薪资范围结束
        education:"学历",//学历
        sex:"性别",//性别
        money:"薪资范围",//薪资
        lastUpdateDays:"",//更新时间
        workcity:"全国",//工作地点
        city:"全国",
        pageNo:1,
        pageSize:10,
        q:"",
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
    //条件选择搜索
    conditionSearch = () => {
        setTimeout(()=>{
            const filterObj = pickBy(this.state,(val,key)=>{
               return key==="education" || key==="sex"|| key==="salaryFrom" || key==="salaryTo" || key==="lastUpdateDays" ||
              key==="city" || key==="pageNo"|| key==="pageSize" || key==="q"
            });
            const filter = pickBy(filterObj,(val,key)=>{
               return val!=="" && val!=="更新时间" && val!=="学历" && val!=="薪资范围" && val!=="性别" 
            });
            this.props.searchResume({...filter})
        })
    }
    //条件选择
    handleChange = (field,value) => {
        if(field==="updateDays"){
            switch(value){
                case "最近3天":
                    this.setState({
                        lastUpdateDays:3
                    });
                    break;
                case "最近7天":
                    this.setState({
                        lastUpdateDays:7
                    });
                    break;
                case "最近30天":
                    this.setState({
                        lastUpdateDays:30
                    });
                    break;
            }   
        }
        if(field==="money"){
            switch(value){
                case "五千以内":
                    this.setState({
                        salaryTo:5000
                    });
                    break;
                case "5千-1万":
                    this.setState({
                        salaryFrom:5000,
                        salaryTo:10000
                    });
                    break;
                case "1万-3万":
                    this.setState({
                        salaryFrom:10000,
                        salaryTo:30000
                    });
                    break;
                case "3万-5万":
                    this.setState({
                        salaryFrom:30000,
                        salaryTo:50000
                    });
                    break;
                case "5万-10万":
                    this.setState({
                        salaryFrom:50000,
                        salaryTo:100000
                    });
                    break;
                case "10万-20万":
                    this.setState({
                        salaryFrom:100000,
                        salaryTo:200000
                    });
                    break;
                case "20万以上":
                    this.setState({
                        salaryFrom:200000,
                    });
                    break;
            }   
        }
        this.setState({
            [field]:value
        })
        
        this.conditionSearch()
    }
    //工作地点选择
    handleCityChange = (val) => {
        this.setState({
            workcity: val.length > 0 ?  val[0] + '/' + val[1] : '',
            city: val.length > 1 ?  val[1] : val.length <= 1?val[0]:''
        });
        this.conditionSearch()
    }
    onChangeInput = (e) => {
        this.setState({
            q:e.target.value
        })
    }
    //隐藏联系人内容，显示简历详情
    checkCandidate = () => {
        this.setState({
            isCheckResume:true,
            isCandidateResume:false,
            startState:false
        })
    }
    //显示查看联系人内容
    showResumeDetail = () => {
        this.setState({
            isCheckResume:false,
            isCandidateResume:true
        })
    }
    searchResume = (page, pageSize) => {
        const {q} = this.state;
        if(page && pageSize){
            this.setState({
                pageSize,
                pageNo:page
            })
        }else{
            this.setState({
                pageNo:1
            })
        }
        setTimeout(()=>{
            if(q){
                const filterObj = pickBy(this.state,(val,key)=>{
                    return key==="city" || key==="pageNo"|| key==="pageSize" || key==="q"
                });
                this.props.searchResume(filterObj)
                this.checkCandidate()
            }
        })
    }
    
    render() {
        const {
            switchContent, 
            detail,
            isCheckResume,//查看联系人状态
            isCandidateResume,
            education,//学历
            sex,//性别
            money,//薪资
            updateDays,//更新时间
            workcity,//工作地点
            q,//混合查询字段
            startState
        } = this.state;
        const {
            resumeData,
            searchResumeDetail,
            resumeDetailData,
            isLoading,
            clearResumeData,
            detailLoading,
            downLoadResume,
            totalHits
        } = this.props;
        return (
            <div className="queryResume">
                <div style={{marginLeft:20}}>
                    <Input 
                        placeholder="例如：研发 前端开发工程师"
                        value={q}
                        onChange={this.onChangeInput}
                        onPressEnter={this.searchResume}
                    />
                    <Button 
                       type="primary" 
                       icon="search"
                       onClick={this.searchResume}
                    >
                       搜索
                    </Button>
                    <p className="example">搜索规则任意组合即可：公司+岗位+工作年限+年龄+城市等</p>
                </div>
                {
                    startState && <div className="tipInfo">
                            <Icon type="solution">
                                <p style={{lineHeight:"50px"}}>在输入框内输入简历关键字，点击搜索，将可以搜索到您需要的简历哦~~</p>
                            </Icon>
                        </div> 
                }
                {
                    isLoading && <Spin size="large"/>
                }
                {
                    isCheckResume && <div className="queryResult">
                        <span style={{color:"#8F9EB4"}}>共找到{totalHits}份简历</span>
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
                                    [
                                        "学历",
                                        "大专及以下",
                                        "大专",
                                        "本科",
                                        "研究生",
                                        "硕士",
                                        "博士",
                                        "MBA"
                                    ].map((item,index)=>{
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
                                value ={workcity ? workcity.split("/"):''}
                                onChange={this.handleCityChange}
                                displayRender={label => label.join(' / ')}
                                placeholder="请选择工作地点" 
                                allowClear={false}
                                style={{ height: 40,width: 230}}
                            />
                            <Select 
                                style={{top:1}} 
                                value={updateDays}
                                onChange={this.handleChange.bind(this,"updateDays")}
                            >
                                {
                                    [
                                        "更新时间",
                                        "最近3天",
                                        "最近7天",
                                        "最近30天"
                                    ].map((item,index)=>{
                                        return (
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        {
                            detail && <ResumeDetailComponent 
                                checkCandidate={this.checkCandidate}
                                showResumeDetail={this.showResumeDetail}
                                searchResumeDetail={searchResumeDetail}
                                downLoadResume={downLoadResume}
                                resumeData={resumeData}
                                totalHits={totalHits}
                                searchResume={this.searchResume}
                            />
                        }
                        {
                            !detail && <ResumeSimpleComponent 
                                showResumeDetail={this.showResumeDetail}
                                searchResumeDetail={searchResumeDetail}
                                resumeData={resumeData}
                                totalHits={totalHits}
                                searchResume={this.searchResume}
                            />
                        }
                    </div>
                }
                {
                    isCandidateResume && <CandidateResumeComponent 
                        checkCandidate= {this.checkCandidate}
                        resumeDetailData= {resumeDetailData}
                        clearResumeData= {clearResumeData}
                        detailLoading= {detailLoading}
                    />
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    resumeData: state.ResumeSearch.resumeData,
    resumeDetailData: state.ResumeSearch.resumeDetailData,
    isLoading: state.ResumeSearch.isLoading,
    detailLoading: state.ResumeSearch.detailLoading,
    totalHits: state.ResumeSearch.totalHits
})
const mapDispatchToProps = (dispatch) => ({
    searchResume: bindActionCreators(Actions.SearchActions.searchResume, dispatch),
    searchResumeDetail: bindActionCreators(Actions.SearchActions.searchResumeDetail, dispatch),
    clearResumeData: bindActionCreators(Actions.SearchActions.clearResumeData, dispatch),
    downLoadResume: bindActionCreators(Actions.SearchActions.downLoadResume, dispatch)
})
   

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResumePage)