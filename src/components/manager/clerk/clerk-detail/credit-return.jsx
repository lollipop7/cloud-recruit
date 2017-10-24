import React, {Component} from 'react';
import LoadingComponent from 'components/loading';
import columns from 'data/table-columns/defaulter-table';
import BarChartComponent from './bar-chart';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

export default class CreditReturnComponent extends Component {

    state = {
        isSuit: true
    }

    render(){
        const {isSuit} = this.state;
        const {creditInfoData} = this.props,
            {
                cerditcerinfo,
                dishonest,
                education,
                selfinfo,
            } = creditInfoData;
        const {
            sid,
            card,
            certcard,
            mobile,
            verifymessage,//返回消息
            bizno,//            "transactionid": "2017102010510295036e89a77-b06a-4ead-9ab7-850defdfa0fb",//业务流水号
            cid,
            createby,
            createdate,
            activeflag,
            flg1,//姓名和身份证是否匹配标识字段
            flg2//电话号码和姓名是否匹配标识字段

        } = selfinfo;
            console.log(creditInfoData)

        const {
                name='',//姓名
                schoolname='',//院校
                major='',//专业
                level='',//学历
                endschooldate='',//毕业时间
                birthdate=''
            } = education[0];
           // console.log(educationArr)
        return (
            <li style={{paddingLeft: 100}}>
                <div className="inverst-field">
                    <div className="inverst-item inline-block box-border">
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
                                        <span style={{fontSize: 20}}>{selfinfo.name}</span>
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
                    </div>
                    <div className="inverst-item inline-block box-border">
                        <div className="top-title">
                            身份证核查
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
                                                            <span>{item.certcard}</span>
                                                        </div>
                                                        <div className="inline-block info-bar">
                                                            <span>专业 : </span>
                                                            <span>{item.major}</span>
                                                        </div>
                                                        <div className="inline-block info-bar">
                                                            <span>院校地址 : </span>
                                                            <span>无</span>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: 26, position: "relative"}}>
                                                        <div className="inline-block">
                                                            <div className="inline-block">
                                                                {/* <img src="/static/images/manager/clerk/logo.png" alt="学校logo" style={{width: 120, height: 120}}/> */}
                                                            </div>
                                                            <div className="inline-block remark">
                                                                <ul>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#ff0000"
                                                                        }}></i>
                                                                        <span></span>
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
                                                                        <span> </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="inline-block"style={{textAlign: "center", margin: "0 20px"}}>
                                                                <h3 style={{marginBottom: 15}}></h3>
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
                            职业证书信息核查
                            <span className="pull-right">数据源自国家人力资源和社会保障部</span>
                        </div>
                        <Collapse defaultActiveKey={['1']}>
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
                        
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            失信被执行信息核查
                            <span className="pull-right">数据源自最高人民法院</span>
                        </div>
                        <Collapse defaultActiveKey={['1']}>
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
                        
                    </div>
                </div>
                <div className="inverst-field">
                    {/* <div className="inverst-item">
                        <div className="top-title">
                            职业稳定性分析
                            <span className="pull-right">数据源自51金融圈大数据</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}> 
                            <BarChartComponent/>
                            <div className="summary">
                                <div className="inline-block above-all" style={{position: 'relative'}}>
                                    数据有话说
                                </div>
                                <div className="inline-block" style={{backgroundColor: '#fff', width: 1}}></div>
                                <div className="inline-block above-all" style={{width: 787}}>结合求职者提供的工作经验，基于云招聘大数据智能分析进行分析测评，该求职者工作较为稳定。</div>
                            </div>
                        </div>
                    </div> */}
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