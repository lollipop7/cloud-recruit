import React, {Component} from 'react';
import LoadingComponent from 'components/loading';
import columns from 'data/table-columns/defaulter-table';
import BarChartComponent from './bar-chart';
import { Collapse } from 'antd';
import store from 'store';
const Panel = Collapse.Panel;
import moment from 'moment'

export default class CreditReturnComponent extends Component {
    componentDidMount() {
        const {searchCredit , data , creditData} = this.props,
        {resumeid,rid} = data.resumeoff;
        if(creditData.flag){
            if(resumeid){
                searchCredit({resumeid});
            }else{
                searchCredit({rid});
            }
        }
    }
    render(){
        const {creditInfoData} = this.props,
            {
                cerditcerinfo=[],
                dishonest=[],
                education=[],
                selfinfo={},
                basic={},//基本信息{}
                jzList=[]//较真返回的各方案信息[]
            } = creditInfoData;
        // const {
        //     sid,
        //     card,
        //     certcard,
        //     mobile,
        //     verifymessage,//返回消息
        //     bizno,//"transactionid": "2017102010510295036e89a77-b06a-4ead-9ab7-850defdfa0fb",//业务流水号
        //     cid,
        //     createby,
        //     createdate,
        //     activeflag,
        //     flg1,//姓名和身份证是否匹配标识字段
        //     flg2//电话号码和姓名是否匹配标识字段
        // } = selfinfo;
        const token = store.get('token');
        return (
            <li style={{paddingLeft: 100}}>
                <div className="inverst-field" style={{marginBottom:30}}>
                    {/* <div className="inverst-item inline-block box-border">
                        <div className="top-title">
                            身份证核查
                            <span className="pull-right" style={{color: "#48df81"}}>信息源自中国公安部</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "27px 0 0 49px"
                        }}>
                            <div className="inline-block">
                                <img src={`/static/images/manager/clerk/${flg1 ? `gou` : `cha`}.png`} alt="勾差" style={{height: 44}}/>   
                            </div>
                            <div className="info-right inline-block">
                                <ul>
                                    <li className="list-item">
                                        <span style={{fontSize: 20}}>{selfinfo.name?selfinfo.name:""}</span>
                                        <span></span>
                                        <span></span>
                                    </li>
                                    <li className="list-item">
                                    <span>{card}</span>
                                    <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img className="consquence"
                               src={`/static/images/manager/clerk/${flg1 ? `pipei.png` : `bupipei.png`}`
                               } alt="匹配"/>
                    </div> */}
                    {/* <div className="inverst-item inline-block box-border">
                        <div className="top-title">
                            手机号核查
                            <span className="pull-right" style={{color: "#c25255"}}>信息源自运营商</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "27px 0 0 49px"
                        }}>
                            <div className="inline-block">
                                <img src={`/static/images/manager/clerk/${flg2 ? `gou` : `cha`}.png`} 
                                    alt="勾差"
                                    style={{height: 44}}/>
                            </div>
                            <div className="info-right inline-block">
                                <ul>
                                    <li className="list-item">
                                        <span style={{fontSize: 20}}>{mobile}</span>
                                        <span>移动号码</span>
                                    </li>
                                    <li className="list-item">
                                        <span>{name}</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img   className="consquence"
                               src={`/static/images/manager/clerk/${flg2 ? `pipei.png` : `bupipei.png`}`
                               } alt="匹配"/>
                    </div> */}
                    <div className="inverst-item">
                            <div className="top-title">
                                基本信息
                            </div>
                            <div style={{margin:"10px 0px 60px 0px"}}>
                                <ul className="field-list inline-block" style={{width:350}}>
                                    <li>
                                        <span>姓名：</span>
                                        <span>{basic.name?basic.name:"无"}</span>
                                    </li>
                                    <li>
                                        <span>手机：</span>
                                        <span>{basic.phone?basic.phone:"无"}</span>
                                    </li>
                                    <li>
                                        <span>创建日期：</span>
                                        <span>{basic.createdate?moment(basic.createdate).format("YYYY-MM-DD"):"无"}</span>
                                    </li>
                                    <li>
                                        <span>订单状态：</span>
                                        <span>{basic.orderstatus===1?"未开始":basic.orderstatus===2?"进行中":basic.orderstatus===3?"已完成":"已取消"}</span>
                                    </li>
                                </ul>
                                <ul className="field-list inline-block" style={{width:350}}>
                                    <li>
                                        <span>身份证号：</span>
                                        <span>{basic.card?basic.card:"无"}</span>
                                    </li>
                                    <li>
                                        <span>毕业证书号：</span>
                                        <span>{basic.certcard?basic.certcard:"无"}</span>
                                    </li>
                                    <li>
                                        <span>公司：</span>
                                        <span>{basic.createby?basic.createby:"无"}</span>
                                    </li>
                                    <li style={{height:50,position:"relative",left:"-22px"}}>
                                        <span style={{display:"block",float:"left"}}>非秒查信息文件：</span>
                                        <span style={{display:"block",float:"left",overflow:"hidden",width:160}}>{basic.filepath?<a href={basic.filepath} title="点击下载">{basic.filepath}</a>:"无"}</span>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            学历信息核查
                            <span className="pull-right">数据源自学信网</span>
                        </div>
                        <Collapse defaultActiveKey={['1']}>
                            {
                                education.map((item,index)=>{
                                        return <Panel header="学历信息" key={index+1}>
                                                    <div className="superior-content" 
                                                        style={{padding: "27px 0 0 49px"}}>
                                                    <div>
                                                        <div className="inline-block info-bar">
                                                            <span>毕业证书编号 : </span>
                                                            {/* <span>{selfinfo.certcard}</span> */}
                                                        </div>
                                                        <div className="inline-block info-bar">
                                                            <span>专业 : </span>
                                                            {/* <span>{item.major}</span> */}
                                                        </div>
                                                        <div className="inline-block info-bar">
                                                            <span>院校地址 : </span>
                                                            <span>无</span>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: 26, position: "relative"}}>
                                                        <div className="inline-block">
                                                            <div className="inline-block">
                                                            <img alt="example" style={{ width: '110px',height:'130px',marginBottom:'-90px'}} src={`${prefixUri}/view_cerdit?fileName=${item.headimg}`} />
                                                            </div>
                                                            <div className="inline-block remark">
                                                                <ul>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#ff0000"
                                                                        }}></i>
                                                                        <span>{item.level}</span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#517fa0"
                                                                        }}></i>
                                                                        <span></span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#61aa61"
                                                                        }}></i>
                                                                        <span>全国热度排名 : </span>
                                                                        <span></span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#efcb5b"
                                                                        }}></i>
                                                                        <span>学校人气值 : </span>
                                                                        <span> </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="duration inline-block" style={{
                                                            position: "absolute",
                                                            top: 10,
                                                            left: 410
                                                        }}>
                                                            <div className="inline-block">
                                                                <ul>
                                                                    <li>
                                                                        <span>开始时间</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>{item.inschooldate}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="inline-block"style={{textAlign: "center", margin: "0 20px"}}>
                                                                <h3 style={{marginBottom: 15}}>{education[0].schoolname}</h3>
                                                                <img src="/static/images/manager/clerk/time.png" alt="time"
                                                                    style={{
                                                                        width: 136,
                                                                        height: 70
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="inline-block">
                                                                <ul>
                                                                    <li>
                                                                        <span>毕业时间</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>{item.endschooldate}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Panel> 
                                })
                            }
                                
                        </Collapse>   
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            各调查方案查询结果
                        </div>
                        <Collapse defaultActiveKey={['1']}>
                            {
                                jzList.map((item,index)=>{
                                        return <Panel 
                                            header={item.transactiontype=="100"?"身份信息核实":item.transactiontype=="110"?"手机实名核查":item.transactiontype=="120"?"国内最高学历核实":item.transactiontype=="130"?"商业利益冲突核实":item.transactiontype=="140"?"金融风险信息核查":item.transactiontype=="145"?"法院诉讼核查":item.transactiontype=="150"?"犯罪记录核实":item.transactiontype=="160"?"职业资质核实":item.transactiontype=="122"?"国内学历核实":item.transactiontype=="127"?"国内学位核实":item.transactiontype=="123"?"海外学历核实":item.transactiontype=="200"?"国内工作履历核实":item.transactiontype=="201"?"海外工作履历核实":item.transactiontype=="210"?"国内工作表现访谈":item.transactiontype=="211"?"海外工作表现访谈":item.transactiontype=="212"?"自主寻访国内证明人":"自主寻访海外证明人"} 
                                            key={index+1}
                                        >
                                                    <div className="superior-content" style={{padding: "27px 0 0 49px"}}>
                                                        {item.transactiontype=="100"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="110"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="120"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td>学校名称</td>
                                                                <td>{JSON.parse(item.content).university?
                                                                    JSON.parse(item.content).university:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>毕业院校类型</td>
                                                                <td>{JSON.parse(item.content).schoolType?
                                                                    JSON.parse(item.content).schoolType:"无"}</td>
                                                                <td>学历</td>
                                                                <td>{JSON.parse(item.content).degree?
                                                                    JSON.parse(item.content).degree:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>学历类型</td>
                                                                <td>{JSON.parse(item.content).degreesType?
                                                                    JSON.parse(item.content).degreesType:"无"}</td>
                                                                <td>专业</td>
                                                                <td>{JSON.parse(item.content).major?
                                                                    JSON.parse(item.content).major:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>报名时间</td>
                                                                <td>{JSON.parse(item.content).enrolDate?
                                                                    JSON.parse(item.content).enrolDate:"无"}</td>
                                                                <td>毕业日期</td>
                                                                <td>{JSON.parse(item.content).graduateDate?
                                                                    JSON.parse(item.content).graduateDate:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>是否毕业</td>
                                                                <td>{JSON.parse(item.content).graduateResult?
                                                                    JSON.parse(item.content).graduateResult:"无"}</td>
                                                            </tr>
                                                        </table>:item.transactiontype=="130"? 
                                                            <div>
                                                                {
                                                                    !JSON.parse(item.content).conflictResult?"":JSON.parse(item.content).conflictResult.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            注册及职位信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td>公司名称</td>
                                                                                    <td>{item.entName?item.entName:"无"}</td>
                                                                                    <td>注册号</td>
                                                                                    <td>{item.regNo?item.regNo:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>注册资本（万元）</td>
                                                                                    <td>{item.regCap?item.regCap:"无"}</td>
                                                                                    <td>币种</td>
                                                                                    <td>{item.regCapCur?item.regCapCur:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>企业状态</td>
                                                                                    <td>{item.entStatus?item.entStatus:"无"}</td>
                                                                                    <td>担任职位</td>
                                                                                    <td>{item.position?item.position:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                    })
                                                                }
                                                                {
                                                                    !JSON.parse(item.content).ryPosFrList?"":JSON.parse(item.content).ryPosFrList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            企业法人
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td>企业法人</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>公司名称</td>
                                                                                    <td>{item.entName?item.entName:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>企业(机构)类型</td>
                                                                                    <td>{item.entType?item.entType:"无"}</td>
                                                                                    <td>注册号</td>
                                                                                    <td>{item.regNo?item.regNo:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>注册资本（万元）</td>
                                                                                    <td>{item.regCap?item.regCap:"无"}</td>
                                                                                    <td>币种</td>
                                                                                    <td>{item.regCapCur?item.regCapCur:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>企业状态</td>
                                                                                    <td>{item.entStatus?item.entStatus:"无"}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </table></div>
                                                                    })
                                                                }
                                                                {
                                                                    !JSON.parse(item.content).ryPosShaList?"":JSON.parse(item.content).ryPosShaList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            企业股东
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td>公司名称</td>
                                                                                    <td>{item.entName?item.entName:"无"}</td>
                                                                                    <td>企业(机构)类型</td>
                                                                                    <td>{item.entType?item.entType:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>注册号</td>
                                                                                    <td>{item.regNo?item.regNo:"无"}</td>
                                                                                    <td>注册资本（万元）</td>
                                                                                    <td>{item.regCap?item.regCap:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>币种</td>
                                                                                    <td>{item.regCapCur?item.regCapCur:"无"}</td>
                                                                                    <td>企业状态</td>
                                                                                    <td>{item.entStatus?item.entStatus:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                    })
                                                                }
                                                                {
                                                                    !JSON.parse(item.content).ryPosPerList?"":JSON.parse(item.content).ryPosPerList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            企业高管
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td>公司名称</td>
                                                                                    <td>{item.entName?item.entName:"无"}</td>
                                                                                    <td>企业(机构)类型</td>
                                                                                    <td>{item.entType?item.entType:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>注册号</td>
                                                                                    <td>{item.regNo?item.regNo:"无"}</td>
                                                                                    <td>注册资本（万元）</td>
                                                                                    <td>{item.regCap?item.regCap:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>币种</td>
                                                                                    <td>{item.regCapCur?item.regCapCur:"无"}</td>
                                                                                    <td>企业状态</td>
                                                                                    <td>{item.entStatus?item.entStatus:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                    })
                                                                }
                                                            </div>                            
                                                        :item.transactiontype=="140"?
                                                        <div>
                                                            {
                                                                JSON.parse(item.content).taxDuesAnnouncementList==null?<h3>暂无欠税公告</h3>:JSON.parse(item.content).taxDuesAnnouncementList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            欠税公告
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>欠税公告</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>所欠税种</td>
                                                                                    <td>{item.taxType?item.taxType:"无"}</td>
                                                                                    <td>期初陈欠</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>当期发生欠税余额（元）</td>
                                                                                    <td>{item.money2?item.money2:"无"}</td>
                                                                                    <td>欠税余额</td>
                                                                                    <td>{item.money3?item.money3:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>应征发生日期</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td>认定日期</td>
                                                                                    <td>{item.time2?item.time2:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                    <td>分管领导</td>
                                                                                    <td>{item.leaderShip?item.leaderShip:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>主管税务人员</td>
                                                                                    <td>{item.taxPeople?item.taxPeople:"无"}</td>
                                                                                    <td>所属市县区</td>
                                                                                    <td>{item.region?item.region:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>认定字号</td>
                                                                                    <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                    <td>公告期次</td>
                                                                                    <td>{item.period?item.period:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).taxMissList==null?<h3>暂无失踪纳税人信息</h3>:JSON.parse(item.content).taxMissList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            失踪纳税人信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>失踪纳税人信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                    <td>认定失踪日期</td>
                                                                                    <td>{item.missTime?item.missTime:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>偷逃欠税税额</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                    <td>公告时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr> 
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).taxCancleList==null?<h3>暂无注销信息</h3>:JSON.parse(item.content).taxCancleList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            注销信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>注销信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>纳税户类型</td>
                                                                                    <td>{item.peopleType?item.peopleType:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>注销日期</td>
                                                                                    <td>{item.cancleTime?item.cancleTime:"无"}</td>
                                                                                    <td>注销类型</td>
                                                                                    <td>{item.cancleType?item.cancleType:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>注销原因</td>
                                                                                    <td>{item.cancleReason?item.cancleReason:"无"}</td>
                                                                                    <td>公告时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr> 
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).taxDishonestList==null?<h3>暂无失信纳税人信息</h3>:JSON.parse(item.content).taxDishonestList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            失信纳税人信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>失信纳税人信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>是否评定为D级</td>
                                                                                    <td>{item.isD?item.isD:"无"}</td>
                                                                                    <td>评定时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).taxIllegalList==null?<h3>暂无税务违法信息</h3>:JSON.parse(item.content).taxIllegalList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            税务违法信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>税务违法信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>检查/稽查年度</td>
                                                                                    <td>{item.year?item.year:"无"}</td>
                                                                                    <td>违法违章事实</td>
                                                                                    <td>{item.fact?item.fact:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>违法违章手段</td>
                                                                                    <td>{item.means?item.means:"无"}</td>
                                                                                    <td>处理处罚决定日期</td>
                                                                                    <td>{item.punishTime?item.punishTime:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>处理处罚限定履行日期</td>
                                                                                    <td>{item.decisionTime?item.decisionTime:"无"}</td>
                                                                                    <td>罚款金额</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>处罚处理实际履行时间</td>
                                                                                    <td>{item.performTime?item.performTime:"无"}</td>
                                                                                    <td>实缴税款/入库金额</td>
                                                                                    <td>{item.money2?item.money2:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>未缴税款/未入库金额</td>
                                                                                    <td>{item.money3?item.money3:"无"}</td>
                                                                                    <td>限改状态</td>
                                                                                    <td>{item.statute?item.statute:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人当前状态</td>
                                                                                    <td>{item.statute2?item.statute2:"无"}</td>
                                                                                    <td>公告时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).taxOverdueList==null?<h3>暂无税务逾期信息</h3>:JSON.parse(item.content).taxOverdueList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            税务逾期信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>税务逾期信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>海关代码</td>
                                                                                    <td>{item.code?item.code:"无"}</td>
                                                                                    <td>经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>申报期限</td>
                                                                                    <td>{item.timeLimit?item.timeLimit:"无"}</td>
                                                                                    <td>未申报项目</td>
                                                                                    <td>{item.project?item.project:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>未申报税种</td>
                                                                                    <td>{item.taxType?item.taxType:"无"}</td>
                                                                                    <td>欠缴税额</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>处罚金额</td>
                                                                                    <td>{item.money2?item.money2:"无"}</td>
                                                                                    <td>处理时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).administrativePunishmentDecisionList==null?<h3>暂无税务行政处罚决定书信息</h3>:JSON.parse(item.content).administrativePunishmentDecisionList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            税务行政处罚决定书信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>税务行政处罚决定书信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>违法事实</td>
                                                                                    <td>{item.situation?item.situation:"无"}</td>
                                                                                    <td>处罚时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>处罚类别</td>
                                                                                    <td>{item.punishmentType?item.punishmentType:"无"}</td>
                                                                                    <td>处罚结果</td>
                                                                                    <td>{item.punishmentResult?item.punishmentResult:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>公告时间</td>
                                                                                    <td>{item.openTime?item.openTime:"无"}</td>
                                                                                    <td>生产经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).administrativePunishmentInfoList==null?<h3>暂无税务行政处罚信息</h3>:JSON.parse(item.content).administrativePunishmentInfoList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            税务行政处罚信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>税务行政处罚信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>责令限改通知书号</td>
                                                                                    <td>{item.num?item.num:"无"}</td>
                                                                                    <td>责令限改状态</td>
                                                                                    <td>{item.statute?item.statute:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>公告时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td>生产经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).netLoanBlacklistLessList==null?<h3>暂无催欠公告信息</h3>:JSON.parse(item.content).netLoanBlacklistLessList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            催欠公告信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>催欠公告信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>催欠金额</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                    <td>催欠状态</td>
                                                                                    <td>{item.statute?item.statute:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>催欠时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                            {
                                                                JSON.parse(item.content).netLoanBlacklistOverdueList==null?<h3>暂无网贷逾期信息</h3>:JSON.parse(item.content).netLoanBlacklistOverdueList.map((item,index)=>{
                                                                    return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            网贷逾期信息
                                                                            </h3>
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td style={{textAlign:"center"}}>网贷逾期信息</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>借入本金</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                    <td>逾期笔数</td>
                                                                                    <td>{item.debtNum?item.debtNum:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>借款时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td>逾期总罚息</td>
                                                                                    <td>{item.overdueInterest?item.overdueInterest:"无"}</td>
                                                                                </tr>
                                                                            </table></div>
                                                                })
                                                            }
                                                        </div>
                                                        :item.transactiontype=="145"?
                                                        <div>
                                                            {
                                                                JSON.parse(item.content).litigationDecisionList==null?<h3>暂无判决文书信息</h3>:
                                                                    JSON.parse(item.content).litigationDecisionList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            失信被执行人信息
                                                                            </h3>
                                                                            <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>判决文书信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>标题</td>
                                                                                <td>{item.title?item.title:"无"}</td>
                                                                                <td>审理程序</td>
                                                                                <td>{item.trialProcedure?item.trialProcedure:"无"}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                                <td>文书字号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>文书类型</td>
                                                                                <td>{item.dateTime?item.dateTime:"无"}</td>
                                                                                <td>审结日期</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                            </tr>
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationDecisionList==null?<h3>暂无失信被执行人信息</h3>:
                                                                    JSON.parse(item.content).litigationDecisionList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            失信被执行人信息
                                                                            </h3>
                                                                            <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>失信被执行人信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>法定代表人/负责人</td>
                                                                                <td>{item.leader?item.leader:"无"}</td>
                                                                                <td>住所地</td>
                                                                                <td>{item.address?item.address:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                                <td>立案时间</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                <td>执行依据文号</td>
                                                                                <td>{item.base?item.base:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>做出执行依据单位</td>
                                                                                <td>{item.baseCompany?item.baseCompany:"无"}</td>
                                                                                <td>生效法律文书确定的义务</td>
                                                                                <td>{item.obligation?item.obligation:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>生效法律文书确定后履行截止时间</td>
                                                                                <td>{item.lastTime?item.lastTime:"无"}</td>
                                                                                <td>被执行人的履行情况</td>
                                                                                <td>{item.performance?item.performance:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>实行被执行人行为具体情形</td>
                                                                                <td>{item.concreteSituation?item.concreteSituation:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>认定失信时间</td>
                                                                                <td>{item.breakTime?item.breakTime:"无"}</td>
                                                                            </tr>
                                                                            
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationSupremeLawList==null?<h3>暂无最高法执行信息</h3>:
                                                                    JSON.parse(item.content).litigationSupremeLawList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            最高法执行信息
                                                                            </h3>
                                                                       <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>最高法执行信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                                <td>立案时间</td>
                                                                                <td>{item.time?item.time:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                <td>案件状态</td>
                                                                                <td>{item.statute?item.statute:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行依据</td>
                                                                                <td>{item.basic?item.basic:"无"}</td>
                                                                                <td>做出执行依据的机构</td>
                                                                                <td>{item.basicCourt?item.basicCourt:"无"}</td>
                                                                            </tr>      
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationSpendingLimitsList==null?<h3>暂无限制高消费被执行人信息</h3>:
                                                                    JSON.parse(item.content).litigationSpendingLimitsList.map((item,index)=>{
                                                                       return 
                                                                       <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            限制高消费被执行人信息
                                                                            </h3>
                                                                            <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>限制高消费被执行人信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>法定代表人/负责人</td>
                                                                                <td>{item.leader?item.leader:"无"}</td>
                                                                                <td>住所地</td>
                                                                                <td>{item.address?item.address:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                                <td>执行案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>案由</td>
                                                                                <td>{item.anyou?item.anyou:"无"}</td>
                                                                                <td>标的</td>
                                                                                <td>{item.money?item.money:"无"}</td>
                                                                            </tr> 
                                                                            <tr>
                                                                                <td>立案时间</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                                <td>发布时间</td>
                                                                                <td>{item.postTime?item.postTime:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>具体内容</td>
                                                                                <td>{item.content?item.content:"无"}</td>
                                                                                <td>执行依据</td>
                                                                                <td>{item.basic?item.basic:"无"}</td>
                                                                            </tr>     
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationOutboundLimitsList==null?<h3>暂无限制出境被执行人信息</h3>:
                                                                    JSON.parse(item.content).litigationOutboundLimitsList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            限制出境被执行人信息
                                                                            </h3>
                                                                            <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>限制出境被执行人信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>被限制人地址</td>
                                                                                <td>{item.address?item.address:"无"}</td>
                                                                                <td>边控措施</td>
                                                                                <td>{item.control?item.control:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>边控日期</td>
                                                                                <td>{item.controlTime?item.controlTime:"无"}</td>
                                                                                <td>承办法院 </td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                <td>执行依据</td>
                                                                                <td>{item.basic?item.basic:"无"}</td>
                                                                            </tr> 
                                                                            <tr>
                                                                                <td>执行标的</td>
                                                                                <td>{item.money?item.money:"无"}</td>
                                                                                <td>立案时间</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>具体内容</td>
                                                                                <td>{item.content?item.content:"无"}</td>
                                                                            </tr>     
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationOldLaiList==null?<h3>暂无老赖信息</h3>:
                                                                    JSON.parse(item.content).litigationOldLaiList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            老赖信息
                                                                            </h3>
                                                                            <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>老赖信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>失信情形</td>
                                                                                <td>{item.situation?item.situation:"无"}</td>
                                                                                <td>执行法院</td>
                                                                                <td>{item.court?item.court:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                <td>立案时间 </td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>发布日期</td>
                                                                                <td>{item.postTime?item.postTime:"无"}</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                            </tr>    
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationFilingList==null?<h3>暂无立案信息</h3>:
                                                                    JSON.parse(item.content).litigationFilingList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            立案信息
                                                                            </h3>
                                                                            <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>立案信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>原告(上诉人)</td>
                                                                                <td>{item.plaintiff?item.plaintiff:"无"}</td>
                                                                                <td>原审原告</td>
                                                                                <td>{item.plaintiff2?item.plaintiff2:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>被告(被上诉人)</td>
                                                                                <td>{item.defendant?item.defendant:"无"}</td>
                                                                                <td>原审被告 </td>
                                                                                <td>{item.defendant2?item.defendant2:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>第三人</td>
                                                                                <td>{item.thirdPeople?item.thirdPeople:"无"}</td>
                                                                                <td>原审第三人</td>
                                                                                <td>{item.thirdPeople2?item.thirdPeople2:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>受理法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                                <td>立案时间</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>案由</td>
                                                                                <td>{item.anYou?item.anYou:"无"}</td>
                                                                                <td>案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                            </tr>      
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationHoldCourtList==null?<h3>暂无开庭信息</h3>:
                                                                    JSON.parse(item.content).litigationHoldCourtList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            开庭信息
                                                                            </h3>
                                                                       
                                                                       <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>开庭信息</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>原告(上诉人)</td>
                                                                                <td>{item.plaintiff?item.plaintiff:"无"}</td>
                                                                                <td>原审原告</td>
                                                                                <td>{item.plaintiff2?item.plaintiff2:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>被告(被上诉人)</td>
                                                                                <td>{item.defendant?item.defendant:"无"}</td>
                                                                                <td>原审第三人</td>
                                                                                <td>{item.thirdPeople2?item.thirdPeople2:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>受理法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                                <td>开庭时间</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>案由</td>
                                                                                <td>{item.anYou?item.anYou:"无"}</td>
                                                                                <td>案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                            </tr>      
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationServiceAnnouncementList==null?<h3>暂无送达公告</h3>:
                                                                    JSON.parse(item.content).litigationServiceAnnouncementList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                style={{
                                                                                    width:"100%",
                                                                                    textAlign:"center",
                                                                                    border:"1px solid #EEEEEE"
                                                                                }}  
                                                                            >
                                                                            送达公告
                                                                            </h3>
                                                                       
                                                                       <table>
                                                                            <tr>
                                                                                <td style={{textAlign:"center"}}>送达公告</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>标题</td>
                                                                                <td>{item.title?item.title:"无"}</td>
                                                                                <td>送达类型</td>
                                                                                <td>{item.type?item.type:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>送达内容</td>
                                                                                <td>{item.content?item.content:"无"}</td>
                                                                                <td>送达法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>刊登媒体</td>
                                                                                <td>{item.media?item.media:"无"}</td>
                                                                                <td>刊登日期</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>刊登版面</td>
                                                                                <td>{item.banmian?item.banmian:"无"}</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                            </tr>      
                                                                        </table></div>
                                                                    })
                                                            }
                                                            {
                                                                JSON.parse(item.content).litigationOtherList==null?<h3>暂无其他信息</h3>:
                                                                    JSON.parse(item.content).litigationOtherList.map((item,index)=>{
                                                                       return <div>
                                                                            <h3
                                                                                   style={{
                                                                                       width:"100%",
                                                                                       textAlign:"center",
                                                                                       border:"1px solid #EEEEEE"}}  
                                                                                >
                                                                                    其他信息
                                                                            </h3>
                                                                           <table>
                                                                            
                                                                                
                                                                            
                                                                            <tr>
                                                                                <td>执行申请人 </td>
                                                                                <td>{item.applyName?item.applyName:"无"}</td>
                                                                                <td>法定代表人/负责人</td>
                                                                                <td>{item.leader?item.leader:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>异议申请人</td>
                                                                                <td>{item.applyName2?item.applyName2:"无"}</td>
                                                                                <td>执行法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                <td>执行标的</td>
                                                                                <td>{item.money?item.money:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>未履行标的（万元）</td>
                                                                                <td>{item.money2?item.money2:"无"}</td>
                                                                                <td>执行依据文号</td>
                                                                                <td>{item.basic?item.basic:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>立案时间</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                                <td>执行状态</td>
                                                                                <td>{item.statute?item.statute:"无"}</td>
                                                                            </tr> 
                                                                            <tr>
                                                                                <td>执行依据制作单位</td>
                                                                                <td>{item.unit?item.unit:"无"}</td>
                                                                                <td>公开日期</td>
                                                                                <td>{item.openTime?item.openTime:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>生效文书确定的义务</td>
                                                                                <td>{item.obligation?item.obligation:"无"}</td>
                                                                                <td>住所地</td>
                                                                                <td>{item.address?item.address:"无"}</td>
                                                                            </tr>       
                                                                        </table></div>
                                                                    })
                                                            }
                                                        </div>
                                                        :item.transactiontype=="150"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>案发时间</td>
                                                                <td>{JSON.parse(item.content).caseTime}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>案发描述</td>
                                                                <td>{JSON.parse(item.content).des}</td>
                                                            </tr>
                                                        </table>:item.transactiontype=="160"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="122"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="127"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="123"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="200"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="201"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="210"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="211"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="212"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype=="213" && <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>
                                                        }
                                                    </div>
                                            </Panel> 
                                })
                            }
                                
                        </Collapse>   
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            职业证书信息核查
                            <span className="pull-right">数据源自国家人力资源和社会保障部</span>
                        </div>
                        {cerditcerinfo.length==0?
                            <div className="superior-content" style={{
                                padding: "10px 0 0 8px"
                            }}>
                                <p className='above-all'>
                                基于51招聘云大数据及工商局信息匹配核查，未发现该被调人职业证书信息。
                                </p>
                            </div>: <Collapse defaultActiveKey={['1']}>
                            {cerditcerinfo.map((item,index)=>{
                                return <Panel header={`${item.occupation}证书信息`} key={index+1}>
                                        <div className="superior-content" style={{padding: "27px 0 0 78px"}}>
                                            <ul className="field-list inline-block">
                                                <li>
                                                    <span>姓名</span>
                                                    <span>{item.name}</span>
                                                </li>
                                                <li>
                                                    <span>性别</span>
                                                    <span></span>
                                                </li>
                                                <li>
                                                    <span>文化程度</span>
                                                    <span>{item.level}</span>
                                                </li>
                                                <li>
                                                    <span>身份证号</span>
                                                    <span>{item.card}</span>
                                                </li>
                                                <li>
                                                    <span>数据上报单位</span>
                                                    <span></span>
                                                </li>
                                            </ul>  
                                            <ul className="field-list inline-block" style={{left: 490}}>
                                                <li>
                                                    <span>职业名称</span>
                                                    <span>{item.occupation}</span>
                                                </li>
                                                <li>
                                                    <span>评定级别</span>
                                                    <span>{item.certlevel}</span>
                                                </li>
                                                <li>
                                                    <span>评定成绩</span>
                                                    <span></span>
                                                </li>
                                                <li>
                                                    <span>证书编号</span>
                                                    <span></span>
                                                </li>
                                                <li>
                                                    <span>发证日期</span>
                                                    <span>{item.createdate}</span>
                                                </li>
                                            </ul>  
                                        </div>
                                    </Panel>
                                })
                            }   
                        </Collapse>
                        }   
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            失信被执行信息核查
                            <span className="pull-right">数据源自最高人民法院</span>
                        </div>
                        {dishonest.length==0?<div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <p className='above-all'>
                            基于51招聘云大数据及工商局信息匹配核查，未发现该被调人失信被执行信息。
                            </p>
                        </div>:<Collapse defaultActiveKey={['1']}>
                            {dishonest.map((item,index)=>{
                                return <Panel header={`${item.courtname}核查`} key={index+1}>
                                            <div className="superior-content" style={{
                                            padding: "10px 0 0 8px"
                                        }}>
                                            <table cellSpacing={0}>
                                                <tr>
                                                    <td>被执行人名称</td>
                                                    <td>{item.name}</td>
                                                    <td>身份证号/组织机构代码</td>
                                                    <td>{item.card}</td>
                                                </tr>
                                                <tr>
                                                    <td>年龄</td>
                                                    <td>{item.age}</td>
                                                    <td>性别</td>
                                                    <td>{item.sexy}</td>
                                                </tr>
                                                <tr>
                                                    <td>执行法院</td>
                                                    <td>{item.courtname}</td>
                                                    <td>省份</td>
                                                    <td>{item.areaname}</td>
                                                </tr>
                                                <tr>
                                                    <td>执行依据文号</td>
                                                    <td>{item.casecode}</td>
                                                    <td>作出执行依据单位</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>案号</td>
                                                    <td>{item.casecode}</td>
                                                    <td>立案时间</td>
                                                    <td>{item.createdate}</td>
                                                </tr>
                                                <tr>
                                                    <td>生效法律文书确定的义务</td>
                                                    <td colSpan={3}>{item.disrupttypename}</td>
                                                </tr>
                                                <tr>
                                                    <td>被执行人的履行情况</td>
                                                    <td colSpan={3}>{item.performance}</td>
                                                </tr>
                                                <tr>
                                                    <td>失信被执行人行为情形</td>
                                                    <td colSpan={3}>{item.duty}</td>
                                                </tr>
                                                <tr>
                                                    <td>发布时间</td>
                                                    <td colSpan={3}>{item.publishdate}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Panel>
                            })}  
                        </Collapse>
                        }  
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            网贷黑名单核查
                            <span className="pull-right">网贷黑名单核查</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <p className='above-all'>
                            基于51招聘云大数据及网贷黑名单匹配核查，未发现该被调人信息。
                            </p>
                        </div>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            职场信用核查
                            <span className="pull-right">数据来源职场黑名单</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <p className='above-all'>
                            基于51招聘云大数据及职场黑名单匹配核查，未发现该被调人信息。
                            </p>
                        </div>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            企业经营核查
                            <span className="pull-right">数据来源中国工商局</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <p className='above-all'>
                            基于51招聘云大数据及工商局信息匹配核查，未发现该被调人企业注册经营信息。
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}