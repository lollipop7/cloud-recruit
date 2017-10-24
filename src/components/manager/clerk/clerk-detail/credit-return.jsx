import React, {Component} from 'react';
import LoadingComponent from 'components/loading';
import columns from 'data/table-columns/defaulter-table';
import BarChartComponent from './bar-chart';

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
                education=[{
                    name:'',//姓名
                    schoolname:'',//院校
                    major:'',//专业
                    level:'',//学历
                    endschooldate:'',//毕业时间
                    birthdate:''
                }]
            } = creditInfoData;
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
                                <img src={`/static/images/manager/clerk/${isSuit ? `gou` : `cha`}.png`} alt="勾差" style={{height: 44}}/>
                            </div>
                            <div className="info-right inline-block">
                                <ul>
                                    <li className="list-item">
                                        <span style={{fontSize: 20}}></span>
                                        <span>河南省-郑州市</span>
                                        <span>男</span>
                                    </li>
                                    <li className="list-item">
                                        <span>411721199305177744</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img   className="consquence"
                               src={`/static/images/manager/clerk/${isSuit ? `pipei.png` : `bupipei.png`}`
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
                                <img src={`/static/images/manager/clerk/${!isSuit ? `gou` : `cha`}.png`} 
                                    alt="勾差"
                                    style={{height: 44}}/>
                            </div>
                            <div className="info-right inline-block">
                                <ul>
                                    <li className="list-item">
                                        <span style={{fontSize: 20}}></span>
                                        <span>移动号码</span>
                                    </li>
                                    <li className="list-item">
                                        <span></span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img   className="consquence"
                               src={`/static/images/manager/clerk/${!isSuit ? `pipei.png` : `bupipei.png`}`
                               } alt="匹配"/>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            学历信息核查
                            <span className="pull-right">数据源自学信网</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "27px 0 0 49px"
                        }}>
                            <div>
                                <div className="inline-block info-bar">
                                    <span>毕业证书编号 : </span>
                                    <span></span>
                                </div>
                                <div className="inline-block info-bar">
                                    <span>专业 : </span>
                                    <span>{major}</span>
                                </div>
                                <div className="inline-block info-bar">
                                    <span>院校地址 : </span>
                                    <span></span>
                                </div>
                            </div>
                            <div style={{marginTop: 26, position: "relative"}}>
                                <div className="inline-block">
                                    <div className="inline-block">
                                        <img src="/static/images/manager/clerk/logo.png" alt="学校logo" style={{width: 120, height: 120}}/>
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
                                                <span>985、211大学</span>
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
                                                <span>{endschooldate}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            职业证书信息核查
                            <span className="pull-right">数据源自国家人力资源和社会保障部</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "27px 0 0 78px"
                        }}>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>姓名</span>
                                    <span>{name}</span>
                                </li>
                                <li>
                                    <span>性别</span>
                                    <span></span>
                                </li>
                                <li>
                                    <span>文化程度</span>
                                    <span>{level}</span>
                                </li>
                                <li>
                                    <span>身份证号</span>
                                    <span></span>
                                </li>
                                <li>
                                    <span>数据上报单位</span>
                                    <span></span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block" style={{left: 490}}>
                                <li>
                                    <span>职业名称</span>
                                    <span></span>
                                </li>
                                <li>
                                    <span>评定级别</span>
                                    <span></span>
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
                                    <span></span>
                                </li>
                            </ul>  
                        </div>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            失信被执行信息核查
                            <span className="pull-right">数据源自最高人民法院</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <table cellSpacing={0}>
                                <tr>
                                    <td>被执行人名称</td>
                                    <td>{name}</td>
                                    <td>身份证号/组织机构代码</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>年龄</td>
                                    <td></td>
                                    <td>性别</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>执行法院</td>
                                    <td></td>
                                    <td>省份</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>执行依据文号</td>
                                    <td></td>
                                    <td>作出执行依据单位</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>案号</td>
                                    <td></td>
                                    <td>立案时间</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>生效法律文书确定的义务</td>
                                    <td colSpan={3}></td>
                                </tr>
                                <tr>
                                    <td>被执行人的履行情况</td>
                                    <td colSpan={3}></td>
                                </tr>
                                <tr>
                                    <td>失信被执行人行为具体情形</td>
                                    <td colSpan={3}></td>
                                </tr>
                                <tr>
                                    <td>发布时间</td>
                                    <td colSpan={3}></td>
                                </tr>
                            </table>
                        </div>
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