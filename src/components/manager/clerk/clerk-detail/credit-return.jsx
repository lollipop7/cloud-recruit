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
            if(resumeid)
                {
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
                            <div style={{margin:"10px 0px 30px 0px"}}>
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
                                                        </table>:item.transactiontype=="110"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
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
                                                        </table>:item.transactiontype=="140"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                            </tr>
                                                        </table>:item.transactiontype=="145"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                            </tr>
                                                        </table>:item.transactiontype=="150"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
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
                                                        </table>:item.transactiontype=="127"?
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
                                                        </table>:item.transactiontype=="123"?
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
                                                        </table>:item.transactiontype=="200"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
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
                                                            </tr>
                                                        </table>:<table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
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