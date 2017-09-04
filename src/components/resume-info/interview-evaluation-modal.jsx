import React, {Component} from 'react';

import {Modal,Input,Radio,Button,Table} from 'antd';
const RadioGroup = Radio.Group;

import QRCode from 'qrcode.react';

import pickBy from 'lodash/pickBy';

import radioData from 'data/evaluation-radio.json';
import navData from 'data/nav/evaluation.json';
import columns from 'data/table-columns/evaluate-table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class EvaluationModalComponents extends Component {
    state = {
        isShowQrcode: false,
        errorinterviewer:false,
        errorintername:false,
        professional:"",            //专业技能
        workexperience:"",          //业务能力
        eduandtrain:"",             //沟通能力
        communication:"",           //语言能力
        initiative:"",              //学习能力
        grooming:"",                //仪容仪表
        attitude:"",                //态度
        intername:"",               //候选人
        interviewer:"",             //面试官
        comments:"",                //评语
        id :""                      //评估表ID
    }
    hideQrcodeShare = () => {
        this.setState({
            isShowQrcode: false
        });
    }

    showQrcodeShare = () => {
        this.setState({
            isShowQrcode: true
        });
    }
    //应聘者情况   
    onChange = (value,e) => {
        this.setState({
            [value]: e.target.value,
        })
    }
    //候选人、面试主管
    changeInput = (input,error,e) => {
        this.setState({
            [input]:e.target.value,
            [error]:false
        })
    }
    //评语内容
    changeComments = (comments,e) => {
           this.setState({
            [comments]:e.target.value,
        }) 
    }
    //重置表单
    resetForm = () => {
        this.setState({
            professional:"",        //专业技能
            workexperience:"",      //业务能力
            eduandtrain:"",         //沟通能力
            communication:"",       //语言能力
            initiative:"",          //学习能力
            grooming:"",            //仪容仪表
            attitude:"",            //态度
            intername:"",           //候选人
            interviewer:"",         //面试官
            comments:"",            //评语
        })
    }
    //添加评估
    addEvaluation = ()=>{
        const {resumeid,jobid,evaluationid} = this.props
        //判断候选人、面试官是否为空
        if(this.state.intername==""){
            this.setState({
                errorintername:true
            })
            this.refs.intername.focus()
            return false
        }
        if(this.state.interviewer==""){
            this.setState({
                errorinterviewer:true
            })
            this.refs.interviewer.focus()
            return false
        }
        if(evaluationid){
            this.setState({
                id:`${evaluationid}`
            })
        }
        setTimeout(()=>{
            //筛选
            const filterObj = pickBy(this.state,(val,key)=>{
                return val != "";
            });
            //重置
            this.resetForm();
            //隐藏
            this.props.hideEvaluationModal();
            //添加面试评估
            this.props.addEvaluation({...filterObj,resumeid:resumeid,jobid:jobid},this.props);
        })
        
    }
    //隐藏评估表
    hideEvaluationModal = () => {
        this.resetForm()
        this.props.hideEvaluationModal()    
    }
    //评估表内容赋值
    componentWillReceiveProps(){
        setTimeout(()=>{
            const evaluationId = this.props.evaluationId
            const {intername,interviewer,comments,
                    professional,//专业技能
                    workexperience,//业务能力
                    eduandtrain,//沟通能力
                    communication,//语言能力
                    initiative,//学习能力
                    grooming,//仪容仪表
                    attitude,//态度
                } = this.props.evaluation
           
            if (this.props.evaluation.id){
                this.setState({
                    intername:intername,
                    interviewer:interviewer,
                    comments:comments,
                    id :`${evaluationId}`,
                    professional:professional,
                    workexperience:workexperience,
                    eduandtrain:eduandtrain,
                    communication:communication,
                    initiative:initiative,
                    grooming:grooming,
                    attitude:attitude
                })
            }
        })
    }
   
    render(){
         const options = [
                { value: '较差' },
                { value: '一般' },
                { value: '基本满意'},
                { value: '较好' },
                { value: '优秀' }
            ],
            { evaluationModalVisible , isLoading ,evaluation } = this.props,
            { intername , interviewer , comments , errorinterviewer , errorintername } = this.state;
            const {hash} = location;
        return(
            <Modal
                title = "面试评估表"
                width = {828}
                visible = {evaluationModalVisible}
                className = "evaluation-modal grey-close-header"
                onCancel={this.hideEvaluationModal}
                onOk = {this.addEvaluation}
            >
                <div className="qrcode-write" style = {{
                    right: this.state.isShowQrcode ? '-150px' : '',
                    display:  this.state.isShowQrcode ? "block" : "none"
                }}>
                    <b className="left-arrow inline-block vertical-center "></b>
                    {/* <img src="./static/images/resume/qrcode-share.png" alt="分享"/> */}
                    <QRCode value={hash}/>
                    <p>微信扫描分享填写</p>
                </div>
                <div className="table"  style={{marginBottom: 40}}>
                    <div className="table-cell">
                        <span className="title">候选人姓名:</span>
                    </div>
                    <div className="table-cell">
                        <Input 
                            ref = "intername"
                            value={intername} 
                            onChange={this.changeInput.bind(this,'intername',"errorintername")}
                        />
                        {errorintername && 
                            <div className="error-promote">
                                <label className="error">&nbsp;&nbsp;请输入候选人姓名</label>
                            </div>
                        }
                    </div>
                    <div className="table-cell">
                        <span className="title">面试主管:</span>
                    </div>
                    <div className="table-cell">
                        <Input 
                            ref = "interviewer"
                            value={interviewer} 
                            onChange={this.changeInput.bind(this,'interviewer',"errorinterviewer")}
                        />
                        {errorinterviewer && 
                            <div className="error-promote">
                                <label className="error">&nbsp;&nbsp;请输入面试主管</label>
                            </div>
                        }
                    </div>
                    <div className="table-cell">
                        <span className="title">邀请他人填写</span>
                    </div>
                    <div className="table-cell">
                        <Button className="share" 
                                onMouseLeave={this.hideQrcodeShare} 
                                onMouseOver={this.showQrcodeShare} >
                            <img 
                                style = {{
                                    width: 40,
                                    height: 40
                                }}
                                src="./static/images/resume/share.jpg" alt="分享"/>
                         </Button>
                    </div>                    
                </div>
                 <div className='eva_div' style={{height:300}}>
                        <ul className="eva-ul">
                            <li>应聘者情况：</li>
                            <li>较差</li>
                            <li>一般</li>
                            <li style={{marginRight:80}}>基本满意</li>
                            <li>较好</li>
                            <li>优秀</li>
                        </ul>
                        <ul className="eva-jn">
                            <li >专业技能：</li>
                            <li className="li-radio" >
                                <RadioGroup  options={options} onChange={this.onChange.bind(this,'professional')} value={this.state.professional} />
                            </li>
                        </ul>
                        <ul className="eva-jn">
                            <li >业务能力：</li>
                            <li className="li-radio"  >
                                <RadioGroup options={options} onChange={this.onChange.bind(this,'workexperience')} value={this.state.workexperience} />
                            </li>
                        </ul>
                        <ul className="eva-jn">
                            <li >沟通能力：</li>
                            <li className="li-radio" >
                               <RadioGroup options={options} onChange={this.onChange.bind(this,'eduandtrain')} value={this.state.eduandtrain} />
                            </li>
                        </ul>
                        <ul className="eva-jn">
                            <li>语言能力：</li>
                            <li className="li-radio" >
                                <RadioGroup options={options} onChange={this.onChange.bind(this,'communication')} value={this.state.communication} />
                            </li>
                        </ul>
                        <ul className="eva-jn">
                            <li>学习能力：</li>
                            <li className="li-radio" >
                                <RadioGroup options={options} onChange={this.onChange.bind(this,'initiative')} value={this.state.initiative} />
                            </li>
                        </ul>
                        <ul className="eva-jn">
                            <li>仪容仪表：</li>
                            <li className="li-radio" >
                                <RadioGroup options={options} onChange={this.onChange.bind(this,'grooming')} value={this.state.grooming} />
                            </li>
                        </ul>
                        <ul className="eva-jn">
                            <li style={{marginLeft:33}}>态度：</li>
                            <li className="li-radio" >
                                <RadioGroup options={options} onChange={this.onChange.bind(this,'attitude')} value={this.state.attitude} />
                            </li>
                        </ul>
                    </div>
                <div className="table" style={{marginTop: 40}}>
                    <div className="table-cell" style={{verticalAlign: "top"}}>
                        <span className="title">
                            评语：
                        </span>
                    </div>
                    <div className="table-cell">
                        <Input type="textarea" rows="3" 
                                value={comments} 
                                onChange={this.changeComments.bind(this,'comments')}
                            style={{
                                width: 660,
                                height: 130,
                                resize: "none"
                            }}
                        />
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    evaluationModalVisible: state.Resume.evaluationModalVisible,
    isLoading: state.Resume.isModalLoading,
    evaluation : state.Resume.evaluation,
    evaluationid: state.Resume.evaluationid
})
const mapDispatchToProps = dispatch => ({
    hideEvaluationModal: bindActionCreators(Actions.ResumeActions.hideEvaluationModal, dispatch),
    addEvaluation: bindActionCreators(Actions.ResumeActions.addEvaluation, dispatch),
    getEvaluationId: bindActionCreators(Actions.ResumeActions.getEvaluationId, dispatch),
    getEvaluation: bindActionCreators(Actions.ResumeActions.getEvaluation, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EvaluationModalComponents);