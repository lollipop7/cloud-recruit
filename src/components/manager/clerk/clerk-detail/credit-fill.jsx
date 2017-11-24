import React, {Component, PropTypes} from 'react';
import { Input, Button, Card, Row, Col,Upload ,Icon , Select, Collapse,notification} from 'antd';
const Panel = Collapse.Panel;
import axios from 'axios';

import clerkInfo from 'data/clerk/clerk';
const {cardList} = clerkInfo.creditInvestgation.cardList;
import LoadingComponent from 'components/loading';

import {ErrorInputComponent} from '../input-select-time';
import store from 'store';
import pickBy from 'lodash/pickBy';

export default class CreditFillComponent extends Component {

     state = {
        name:'',
        mobile:'',
        card:'',
        certid:'',
        rid:'',
        resumeid:'',
        searchLoading:false,
        fileList:[],
        dataType:"简历文件",
        resume:"",
        authorizationFile:"",
        graduationFile:"",
        degreeFile:"",
        overseasEducationFile:"",
        certificateVocationalFile:"",
        transactionType:"",
        disableState:false ,
        border:false
        
        // name:'管文平',
        // mobile:'13000000000',
        // card:'310104198601080836',
        // certid:'104101200306000405',
        // rid:'10',
        // resumeid:'',
        // dataType:"简历文件",
        // resume:"",
        // authorizationFile:"",
        // graduationFile:"",
        // degreeFile:"",
        // overseasEducationFile:"",
        // certificateVocationalFile:"",
        // transactionType:"100,120,150,140,145,130",
        // fileList:[],
        // disableState:false ,
        // border:false 
     }

     handleChange = (field,e) => {
         switch(field)
            {
            case 'name':
                this.setState({
                    [field]:this.refs.candidatenameInput.refs.input.refs.input.value
                })
            break;
            case 'mobile':
                this.setState({
                    [field]:this.refs.phonenumInput.refs.input.refs.input.value
                })
            break;
            case 'card':
                this.setState({
                    [field]:this.refs.idnumInput.refs.input.refs.input.value
                })
            break;
            case 'certid':
                this.setState({
                    [field]:this.refs.diplomanumInput.refs.input.refs.input.value
                })
            break;
            }
    }
     componentWillReceiveProps(nextprops){
        const {searchLoading ,data={},creditData} = nextprops;
        const {resumeoff={}} = data;
        const{
            name="",
            mobile,
            card,
            certid,
            resumeid,
            rid
        } = data.resumeoff;
        if(data!={}){
            this.setState({
                isLoading:false
            })
        }
        if(resumeid){
            this.setState({
                name,
                mobile,
                card,
                certid:certid?certid:'',
                resumeid
            })
        }else{
            this.setState({
                name,
                mobile,
                card,
                certid,
                rid:rid+''
            })
        }
        this.setState({
            searchLoading
        })
    }
    searchCredit = () => {
        const {
            searchCredit,
            data,
            showcredit,
            creditData
        }=this.props;
        const {
            name,
            mobile,
            card,
            certid,
            resume,
            authorizationFile
        }= this.state;
        //检验必选项是否为空
        if(!mobile){
            this.refs.phonenumInput.triggerError(true);
            return false
        }
        if(!card){
            this.refs.idnumInput.triggerError(true);
            return false
        }
        if(!certid){
            this.refs.diplomanumInput.triggerError(true);
            return false
        }
        if(!resume){
            notification.warning({
                message:"请上传简历文件！"
            })
            return false
        }
        if(!authorizationFile){
            notification.warning({
                message:"请上传授权证明文件附件！"
            })
            return false
        }
        //已选方案
        const arr =[];
        //已选方案转为数字代替
        const numArr = [];
        $('.basicDataUl li').each(function(index,item){
            arr.push(item.innerHTML)
        });
        $('.workUl li').each(function(index,item){
            arr.push(item.innerHTML)
        });
        $('.expressUl li').each(function(index,item){
            arr.push(item.innerHTML)
        });
        for(let i=0;i<arr.length;i++){
            switch(arr[i])
                {
                case "身份证信息核查":
                    numArr.push('100')
                break;
                case "手机实名认证":
                    numArr.push('110')
                break;
                case "国内最高学历核实":
                    numArr.push('120')
                break;
                case "国内学历核实":
                    numArr.push('122')
                break;
                case "海外学历核实":
                    numArr.push('123')
                break;
                case "国内学位信息核实":
                    numArr.push('127')
                break;
                case "商业利益冲突核查":
                    numArr.push('130')
                break;
                case "金融风险核查":
                    numArr.push('140')
                break;
                case "法院诉讼核查":
                    numArr.push('145')
                break;
                case "不良记录核查":
                    numArr.push('150')
                break;
                case "职业资质核查":
                    numArr.push('160')
                break;
                case "国内工作履历核实":
                    numArr.push('200')
                break;
                case "海外工作履历核实":
                    numArr.push('201')
                break;
                case "国内工作表现访谈":
                    numArr.push('210')
                break;
                case "海外工作表现访谈":
                    numArr.push('211')
                break;
                case "自主寻访国内证明人":
                    numArr.push('212')
                break;
                case "自主寻访海外证明人":
                    numArr.push('213')
                break;    
                    }
        }
        //已选调查方案
        const numString = numArr.join(",")
        //过滤需要的参数
        const filterObj = pickBy(this.state,(val,key)=>{
            return  key=== 'graduationFile' || key=== 'degreeFile' || key=== 'overseasEducationFile' || key=== 'certificateVocationalFile' || key=== 'resumeid' || key=== 'name' || key=== 'card' || key=== 'certid' || key=== 'resume' || key=== 'authorizationFile' || key=== 'rid'
        });
        //过滤不为空的参数
        const filterdata = pickBy(filterObj,(val,key)=>{
            return  val !=="" 
        });
        //新建需要参数的对象
        const addData = {phone:mobile,transactionType:numString};
        //合并请求需要的对象参数
        const requiredata = Object.assign(filterdata,addData);
        //判断是否已选调查方案
        if(!numString){
            notification.warning({
                message:"请选择调查方案！"
            })
            return false
        }
        this.setState({
            searchLoading:true,
        })
        //开始调查
        searchCredit(requiredata,showcredit);
    }
    //基础数据点击
    onClick = (value,num) => {
        const arr =[];
        $('.basicDataUl li').each(function(index,item){
            arr.push(item.innerHTML)
        });
        if(value==="身份证信息核查"){
            $('.idcard').css({"color":"#666"});
        }else if(value==="手机实名认证"){
            $('.iphone').css({"color":"#666"});
        }else if(value==="国内最高学历核实"){
            $('.highEducate').css({"color":"#666"});
        }else if(value==="国内学历核实"){
            $('.educate').css({"color":"#666"});
        }else if(value==="海外学历核实"){
            $('.globalEducate').css({"color":"#666"});
        }else if(value==="国内学位信息核实"){
            $('.educateInfo').css({"color":"#666"});
        }else if(value==="商业利益冲突核查"){
            $('.commercialProfit').css({"color":"#666"});
        }else if(value==="金融风险核查"){
            $('.financialRisk').css({"color":"#666"});
        }else if(value==="法院诉讼核查"){
            $('.lawCourt').css({"color":"#666"});
        }else if(value==="不良记录核查"){
            $('.badRecord').css({"color":"#666"});
        }else if(value==="职业资质核查"){
            $('.workplace').css({"color":"#666"});
        }
        for(let i=0;i<arr.length;i++){
            if(arr[i]==value){
                return false
            }
        };
        const $li = $(`<li title="点击删除" style="cursor:pointer">${value}</li>`);
        $('.basicDataUl').append($li);   
    }
    //证明人访谈
    onExpressClick = (value) => {
        const arr =[];
        $('.expressUl li').each(function(index,item){
            arr.push(item.innerHTML)
        });
        if(value==="国内工作表现访谈"){
            $('.homeExpress').css({"color":"#666"});
        }else if(value==="海外工作表现访谈"){
            $('.globalExpress').css({"color":"#666"});
        }else if(value==="自主寻访国内证明人"){
            $('.homeProve').css({"color":"#666"});
        }else if(value==="自主寻访海外证明人"){
            $('.globalProve').css({"color":"#666"});
        }
        for(let i=0;i<arr.length;i++){
            if(arr[i]==value){
                // notification.warning({
                //     message:`您已添加过   ${value}   数据!`
                // })
                return false
            }
        };
        const $li = $(`<li title="点击删除" style="cursor:pointer">${value}</li>`);
        $('.expressUl').append($li)
    }
    //工作履历
    onWorkClick = (value) => {
        const arr =[];
        $('.workUl li').each(function(index,item){
            arr.push(item.innerHTML)
        });
        if(value==="国内工作履历核实"){
            $('.homeWork').css({"color":"#666"});
        }else if(value==="海外工作履历核实"){
            $('.globalWork').css({"color":"#666"});
        }
        for(let i=0;i<arr.length;i++){
            if(arr[i]==value){
                return false
            }
        };
        const $li = $(`<li title="点击删除" style="cursor:pointer">${value}</li>`);
        $('.workUl').append($li)
    }
    //其他
    onOtherClick = (value) => {
        const arr =[];
        $('.otherUl li').each(function(index,item){
            arr.push(item.innerHTML)
        });
        if(value==="翻译费"){
            $('.translate').css({"color":"#666"});
        }else if(value==="人才组织架构图"){
            $('.architecture').css({"color":"#666"});
        }else if(value==="青藤联盟"){
            $('.team').css({"color":"#666"});
        }else if(value==="职业道德规范"){
            $('.professional').css({"color":"#666"});
        }
        for(let i=0;i<arr.length;i++){
            if(arr[i]==value){
                // notification.warning({
                //     message:`您已添加过   ${value}   数据!`
                // })
                return false
            }
        };
        const $li = $(`<li title="点击删除" style="cursor:pointer">${value}</li>`);
        $('.otherUl').append($li)
    }
    //基本数据删除
    onRemove = (e) => {
        if(e.target.innerHTML==="身份证信息核查"){
            $('.idcard').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="手机实名认证"){
            $('.iphone').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="国内最高学历核实"){
            $('.highEducate').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="国内学历核实"){
            $('.educate').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="海外学历核实"){
            $('.globalEducate').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="国内学位信息核实"){
            $('.educateInfo').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="商业利益冲突核查"){
            $('.commercialProfit').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="金融风险核查"){
            $('.financialRisk').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="法院诉讼核查"){
            $('.lawCourt').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="不良记录核查"){
            $('.badRecord').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="职业资质核查"){
            $('.workplace').css({"color":"#3188ff"});
        }
        e.target.remove()
    }
    //工作履历删除
    onworkRemove = (e) => {
        if(e.target.innerHTML==="国内工作履历核实"){
            $('.homeWork').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="海外工作履历核实"){
            $('.globalWork').css({"color":"#3188ff"});
        }
        e.target.remove()
    }
    //证明人访谈删除
    onexpressRemove = (e) => {
        if(e.target.innerHTML==="国内工作表现访谈"){
            $('.homeExpress').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="海外工作表现访谈"){
            $('.globalExpress').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="自主寻访国内证明人"){
            $('.homeProve').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="自主寻访海外证明人"){
            $('.globalProve').css({"color":"#3188ff"});
        }
        e.target.remove()
    }
    //其他删除
    onotherRemove = (e) => {
        if(e.target.innerHTML==="翻译费"){
            $('.translate').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="人才组织架构图"){
            $('.architecture').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="青藤联盟"){
            $('.team').css({"color":"#3188ff"});
        }else if(e.target.innerHTML==="职业道德规范"){
            $('.professional').css({"color":"#3188ff"});
        };
        e.target.remove()
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
       const {error,fileList} = this.state,
            {name,size} = file;
       const matchName = /(\.html|\.xls|\.xlsx|\.xlsm|\.mht|\.htm|\.doc|\.docx|\.pdf)$/i;
         if(!matchName.test(name)){
                notification.warning({
                    message: '文件类型暂不支持！'
                    });
                return false;
        }
         if(size > 3*1024*1024){
                notification.warning({
                    message: '文件大小不能超过3MB！'
                    });
                return false;
            }
            return true;
        }   
    

    // 上传文件改变时的状态
    onFileChange = info =>{
        const {dataType} = this.state;
        let fileList = info.fileList;
        if (info.file.status === 'error') {
            notification.error({
                message: '文件上传失败！'
              });
        }
        switch(dataType)
            {
            case "简历文件":
                this.setState({
                    fileList,
                    resume:fileList[0].response
                });
            break;
            case "授权证书文件":
                this.setState({
                    fileList,
                    authorizationFile:fileList[0].response
                });
            break;
            case "学历证书":
                this.setState({
                    fileList,
                    graduationFile:fileList[0].response
                });
            break;
            case "学信证书":
                this.setState({
                    fileList,
                    degreeFile:fileList[0].response
                });
            break;
            case "海外学历证书":
                this.setState({
                    fileList,
                    overseasEducationFile:fileList[0].response
                });
            break;
            case "职位资格证书":
                this.setState({
                    fileList,
                    certificateVocationalFile:fileList[0].response
                });
            break; 
            }
    }

    // 文件移除
    onFileRemove = file => {
        this.setState({
            fileList:[]
        })
    }
    //选择上传文件类型
    handleSelectChange = (value) => {
        const {
            resume,
            authorizationFile,
            graduationFile,
            degreeFile,
            overseasEducationFile,
            certificateVocationalFile
        } = this.state;
        if(value==="简历文件" && resume || 
            value==="授权证书文件" && authorizationFile || 
            value==="学历证书" && graduationFile
            || value==="学信证书" && degreeFile || 
            value==="海外学历证书" && overseasEducationFile || 
            value==="职位资格证书" && certificateVocationalFile){
                notification.warning({
                    message:"该类型文件已存在！"
                })
                return false
        }
        this.setState({
            dataType:value,
            fileList:[],
            border:false
        })
    }
    //上传文件点击
    UploadFile = () => {
        const {
            fileList,
            dataType,
            resume,
            authorizationFile,
            graduationFile,
            degreeFile,
            overseasEducationFile,
            certificateVocationalFile
        } = this.state;
        
        if(fileList.length!=0){
            this.setState({
                border:true
            })
            notification.warning({
                message: '每种文件类型一次只能上传一个文件！'
            });
        }
    }
    //删除上传文件
    deleteFile = (value) => {
        switch(value)
            {
            case "简历文件":
                this.setState({
                    resume:"",
                    fileList:[]
                })
            break;
            case "授权证书文件":
                this.setState({
                    authorizationFile:"",
                    fileList:[]
                })
            break;
            case "学历证书":
                this.setState({
                    graduationFile:"",
                    fileList:[]
                })
            break;
            case "学信证书":
                this.setState({
                    degreeFile:"",
                    fileList:[]
                })
            break;
            case "海外学历证书":
                this.setState({
                    overseasEducationFile:"",
                    fileList:[]
                })
            break;
            case "职业资格证书":
                this.setState({
                    certificateVocationalFile:"",
                    fileList:[]
                })
            break;
            }
    }
     render(){
         const {
            name,
            mobile,
            card,
            certid,
            searchLoading,
            isLoading=true,
            fileList=[],
            dataType,
            resume,
            authorizationFile,
            graduationFile,
            degreeFile,
            overseasEducationFile,
            certificateVocationalFile,
            disableState,
            border
         } = this.state;
         const {creditData}=this.props;  
         return(
             <li>
                 <div className="fill-field">
                    <Collapse defaultActiveKey={['1','2']} >
                        <Panel header="第一步：候选人信息" key="1" style={{height:350}}>
                        <div className="inline-block">
                            {isLoading &&
                                <LoadingComponent style={{
                                    position: 'absolute',
                                    top: 100,
                                    left:'25%',
                                    height: '30%',
                                    width: '10%',
                                    zIndex: 2
                                }} />
                            }
                            <ul>
                                <li style={{paddingBottom: 25}}>
                                    <ErrorInputComponent
                                        ref="candidatenameInput"
                                        name="姓名"
                                        field="candidatename"
                                        value={name}
                                        onChange={this.handleChange.bind(this,'name')}
                                        asterisk={true}
                                    />
                                </li>
                                <li style={{paddingBottom: 25}}>
                                    <ErrorInputComponent
                                        ref="phonenumInput"
                                        name="手机号"
                                        placeholder="请输入手机号"
                                        field="phonenum"
                                        value={mobile}
                                        onChange={this.handleChange.bind(this,'mobile')}
                                        asterisk={true}
                                    />
                                </li>
                                <li style={{paddingBottom: 25}}>
                                    <ErrorInputComponent
                                        ref="idnumInput"
                                        name="身份证号"
                                        placeholder="请输入身份证号"
                                        field="idnum"
                                        value={card}
                                        onChange={this.handleChange.bind(this,'card')}
                                        asterisk={true}
                                    />
                                </li >
                                <li style={{paddingBottom: 25}}>
                                    <ErrorInputComponent
                                        ref="diplomanumInput"
                                        name="毕业证书号"
                                        field="diplomanum"
                                        placeholder="请输入毕业证书号"
                                        value={certid}
                                        onChange={this.handleChange.bind(this,'certid')}
                                        asterisk={true}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="inline-block"
                            style={{
                                position: 'absolute',
                                left: 516,
                                width: 422,
                                paddingLeft: 37,
                                borderLeft: "1px solid #e3e1e1",
                                height: 221
                            }}>
                            <div className="hint-field" style={{textAlign: "center"}}>
                                <div className="resumeSource">
                                    <span>选择上传文件类型：</span>
                                    <Select
                                        ref="fileSelect"
                                        className={border?"borderState":"borderNoneState"}
                                        style={{ width: 200,height:50,color:'#868686' }}
                                        placeholder="请选择上传文件类型"
                                        value={dataType}
                                        onChange={this.handleSelectChange}
                                    >
                                        {
                                            ["简历文件","授权证书文件","学历证书","学信证书","海外学历证书","职位资格证书"].map((item)=>{
                                                return  <Option value={item}>{item}</Option>
                                            })
                                        }

                                    </Select>
                                </div>
                                <div className="hint-list" style={{width: 385}}>
                                    <span className="span-title">候选人文件上传：</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Upload
                                        name='file'
                                        disabled={fileList.length==0?false:true}
                                        action="http://www.jztest.cc/JZSystem/jz/file/upload.action"
                                        fileList={fileList}
                                        beforeUpload={this.onFilebeforeUpload}
                                        onChange={this.onFileChange}
                                        onRemove={this.onFileRemove}
                                    >
                                        <Icon 
                                            className="upLoad"
                                            type="upload" 
                                            title="请先选择要上传的文件类型再上传"
                                            onClick= {this.UploadFile}
                                        />
                                    </Upload>
                                    <span className="explaination" style={{position:"relative"}}>
                                        <span>温馨提示：</span>请先选择要上传的文件类型再上传文件，
                                        <span style={{color:"red"}}>候选人简历文件和授权证书文件为必须上传文件</span>，
                                        其他为可选上传文件，文件支持.doc, .docx, .pdf等文件格式，文件大小应小于3MB;
                                    </span>
                                </div>
                                
                                <div 
                                    className="uploadFile"
                                    style={{position:"relative",width:400,textAlign:"left"}}>
                                    已上传文件类型列表：
                                    {!resume && !authorizationFile && !graduationFile && !degreeFile && !overseasEducationFile && !certificateVocationalFile && <a>暂无上传文件</a> }
                                    <span>
                                        {resume?<a>&nbsp;&nbsp;简历文件&nbsp;&nbsp;<b title="点击删除"  onClick={this.deleteFile.bind(this,"简历文件")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                    <span>
                                        {authorizationFile?<a>&nbsp;&nbsp;授权证书文件&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"授权证书文件")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                    <span>
                                        {graduationFile?<a>&nbsp;&nbsp;学历证书&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"学历证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                    <span>
                                        {degreeFile?<a>&nbsp;&nbsp;学信证书&nbsp;&nbsp;<b title="点击删除"  onClick={this.deleteFile.bind(this,"学信证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                    <span>
                                        {overseasEducationFile?<a>&nbsp;&nbsp;海外学历证书&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"海外学历证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                    <span>
                                        {certificateVocationalFile?<a>&nbsp;&nbsp;职业资格证书&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"职业资格证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                </div>
                            </div>
                        </div>
                        </Panel>
                        <Panel header="第二步：选择调查方案" key="2">
                            <div className="hint-field">
                                <div className="card-list">
                                    <span style={{color:"#108ee9",display:"block",marginBottom:20}}>●&nbsp;&nbsp;基础数据</span>
                                    <ul>
                                        <li onClick={this.onClick.bind(this,"身份证信息核查","100")}>
                                            <Icon type="idcard" className="idcard"/><br/>
                                            <span>身份证信息核查</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"手机实名认证","110")}>
                                            <Icon type="idcard" className="iphone"/><br/>
                                            <span>手机实名认证</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"国内最高学历核实","120")}>
                                            <Icon type="book" className="highEducate"/><br/>
                                            <span>国内最高学历核实</span><br/>
                                        </li>
                                        
                                        <li onClick={this.onClick.bind(this,"国内学历核实","122")}>
                                            <Icon type="book" className="educate"/><br/>
                                            <span>国内学历核实</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"海外学历核实","123")}>
                                            <Icon type="book" className="globalEducate"/><br/>
                                            <span>海外学历核实</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"国内学位信息核实","127")}>
                                            <Icon type="switcher" className="educateInfo"/><br/>
                                            <span>国内学位信息核实</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"商业利益冲突核查","130")}>
                                            <Icon type="safety" className="commercialProfit"/><br/>
                                            <span>商业利益冲突核查</span><br/>
                                        </li>
                                        
                                        <li onClick={this.onClick.bind(this,"金融风险核查","140")}>
                                            <Icon type="folder" className="financialRisk"/><br/>
                                            <span>金融风险核查</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"法院诉讼核查","145")}>
                                            <Icon type="minus-circle-o" className="lawCourt"/><br/>
                                            <span>法院诉讼核查</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"不良记录核查","150")}>
                                            <Icon type="file-text" className="badRecord"/><br/>
                                            <span>不良记录核查</span><br/>
                                        </li>
                                        <li onClick={this.onClick.bind(this,"职业资质核查","160")}>
                                            <Icon type="user" className="workplace"/><br/>
                                            <span>职业资质核查</span><br/>
                                        </li>
                                    </ul>   
                                </div>
                                <div className="card-list">
                                    <span style={{color:"#108ee9",display:"block",marginBottom:20,marginTop:20}}>●&nbsp;&nbsp;工作履历</span>
                                    <ul>
                                        <li onClick={this.onWorkClick.bind(this,"国内工作履历核实")}>
                                            <Icon type="contacts" className="homeWork"/><br/>
                                            <span>国内工作履历核实</span><br/>
                                        </li>
                                        <li onClick={this.onWorkClick.bind(this,"海外工作履历核实")} >
                                            <Icon type="contacts" className="globalWork"/><br/>
                                            <span>海外工作履历核实</span><br/>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-list">
                                    <span style={{color:"#108ee9",display:"block",marginBottom:20,marginTop:20}}>●&nbsp;&nbsp;证明人访谈</span>
                                    <ul>
                                        <li onClick={this.onExpressClick.bind(this,"国内工作表现访谈")}>
                                            <Icon type="message" className="homeExpress"/><br/>
                                            <span>国内工作表现访谈</span><br/>
                                        </li>
                                        <li onClick={this.onExpressClick.bind(this,"海外工作表现访谈")}>
                                            <Icon type="message" className="globalExpress"/><br/>
                                            <span>海外工作表现访谈</span><br/>
                                        </li>
                                        <li onClick={this.onExpressClick.bind(this,"自主寻访国内证明人")}>
                                            <Icon type="user" className="homeProve"/><br/>
                                            <span>自主寻访国内证明人</span><br/>
                                        </li>
                                        <li onClick={this.onExpressClick.bind(this,"自主寻访海外证明人")}>
                                            <Icon type="user" className="globalProve"/><br/>
                                            <span>自主寻访海外证明人</span><br/>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-list">
                                    <span style={{color:"#108ee9",display:"block",marginBottom:20,marginTop:20}}>●&nbsp;&nbsp;其他类</span>
                                    <ul>
                                        <li onClick={this.onOtherClick.bind(this,"翻译费")}>
                                            <Icon type="message" className="translate"/><br/>
                                            <span>翻译费</span><br/>
                                        </li>
                                        <li onClick={this.onOtherClick.bind(this,"人才组织架构图")}>
                                        <Icon type="share-alt" className="architecture"/><br/>
                                            <span>人才组织架构图</span><br/>
                                        </li>
                                        <li onClick={this.onOtherClick.bind(this,"青藤联盟")}>
                                            <Icon type="global" className="team"/><br/>
                                            <span>青藤联盟</span><br/>
                                        </li>
                                        <li onClick={this.onOtherClick.bind(this,"职业道德规范")}>
                                            <Icon type="file" className="professional"/><br/>
                                            <span>职业道德规范</span><br/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="SurveyPlan">
                                <p className="p-title">已选调查方案</p>
                                <div className="data">
                                    <div className="basicData">
                                        <span 
                                            style={{
                                                color:"#108ee9",
                                                display:"block",
                                                marginBottom:20,
                                                marginTop:20
                                            }}
                                        >
                                             ●&nbsp;&nbsp;基础数据类
                                       </span>
                                       <ul className="basicDataUl" style={{overflow:"hidden"}}  onClick={this.onRemove}>
                                       </ul>
                                    </div>
                                    <div className="work">
                                        <span 
                                            style={{
                                                color:"#108ee9",
                                                display:"block",
                                                marginBottom:20,
                                                marginTop:20
                                            }}
                                        >
                                                ●&nbsp;&nbsp;工作履历
                                        </span>
                                        <ul className="workUl" style={{overflow:"hidden"}}  onClick={this.onworkRemove}>

                                       </ul>
                                    </div>
                                    <div className="express">
                                        <span 
                                            style={{
                                                color:"#108ee9",
                                                display:"block",
                                                marginBottom:20,
                                                marginTop:20
                                            }}
                                        >
                                                ●&nbsp;&nbsp;证明人访谈
                                        </span>
                                        <ul className="expressUl" style={{overflow:"hidden"}}  onClick={this.onexpressRemove}>

                                       </ul>
                                    </div>
                                    <div className="other">
                                        <span 
                                            style={{
                                                color:"#108ee9",
                                                display:"block",
                                                marginBottom:20,
                                                marginTop:20
                                            }}
                                        >
                                                ●&nbsp;&nbsp;其他类
                                        </span>
                                        <ul className="otherUl" style={{overflow:"hidden"}} onClick={this.onotherRemove}>

                                       </ul>
                                    </div>
                                </div>
                                <div className="bottomBtn">
                                    <Button
                                        loading={searchLoading}
                                        type="primary" 
                                        onClick={this.searchCredit}
                                        style={{width:150,height:40,fontSize:16}}
                                    >
                                    开始调查
                                    </Button>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                 </div>
             </li>
         )
     }
 }
