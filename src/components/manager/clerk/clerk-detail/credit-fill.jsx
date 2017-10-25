import React, {Component, PropTypes} from 'react';
import { Input, Button, Card, Row, Col } from 'antd';

import clerkInfo from 'data/clerk/clerk';
const {cardList} = clerkInfo.creditInvestgation.cardList;

import {ErrorInputComponent} from '../input-select-time';

export default class CreditFillComponent extends Component {

     state = {
        name:'',
        mobile:'',
        card:'',
        certid:'',
        rid:'',
        resumeid:'',
        downLoading:false,
        // name:'余文忠',
        // mobile:'18616762568',
        // card:'310110199203091013',
        // certid:'104101200306000405',
        // rid:'26'
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
        if(nextprops.data.resumeoff.resumeid){
                const {
                name,
                mobile,
                card,
                certid,
                resumeid
            } = nextprops.data.resumeoff;
                this.setState({
                    name,
                    mobile,
                    card,
                    certid,
                    resumeid
                })
        }else{
                const {
                name,
                mobile,
                card,
                certid,
                rid
            } = nextprops.data.resumeoff;
                this.setState({
                    name,
                    mobile,
                    card,
                    certid,
                    rid:rid+''
                })
            }
       
    }
    searchCredit = () => {
        const {searchCredit,data,showcredit,creditData}=this.props;
        const {resumeid,rid,name,mobile,card,certid}= this.state;
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
        if(creditData.flag){
            if(resumeid)
                {
                    searchCredit({resumeid},showcredit);  
                }else{
                    searchCredit({rid},showcredit);
                }           
        }else{
            if(resumeid)
                {
                    searchCredit({
                        resumeid,
                        name,
                        phone:mobile,
                        card,
                        certid
                    },showcredit);  
                }else{
                    searchCredit({
                        rid,
                        name,
                        phone:mobile,
                        card,
                        certid
                    },showcredit); 
                }  
           
        }
        this.setState({
            downLoading:true
        })  
    }

     render(){
         const {
            name,
            mobile,
            card,
            certid,
            downLoading
         } = this.state;
         const {creditData}=this.props;
         return(
             <li>
                 <div className="fill-field" style={{paddingLeft: 82}}>
                     <div className="inline-block">
                         <ul>
                             <li>
                                <ErrorInputComponent
                                    ref="candidatenameInput"
                                    name="姓名"
                                    field="candidatename"
                                    value={name}
                                    onChange={this.handleChange.bind(this,'name')}
                                    asterisk={true}
                                />
                             </li>
                             <li>
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
                             <li>
                                <ErrorInputComponent
                                    ref="idnumInput"
                                    name="身份证号"
                                    placeholder="请输入身份证号"
                                    field="idnum"
                                    value={card}
                                    onChange={this.handleChange.bind(this,'card')}
                                    asterisk={true}
                                />
                             </li>
                             <li>
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
                         <div className="inline-block" style={{marginLeft: 177}}>
                             {creditData.flag?
                                <Button 
                                    type="primary" 
                                    style={{fontSize: 20, width: 182, height: 45}}
                                    onClick= {this.searchCredit}
                                    loading={downLoading}
                                >
                                    点击查看
                                </Button>:
                             <Button 
                                type="primary" 
                                style={{fontSize: 20, width: 182, height: 45}}
                                onClick= {this.searchCredit}
                                loading={downLoading}
                            >
                                一键查询
                            </Button>}
                            
                         </div>
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
                        <div className="hint-field">
                            <div className="hint-title">
                                <span>温馨提示</span>
                            </div>
                            <ul className="hint-list" style={{width: 385}}>
                                <li>1.51招聘云测评信息查询仅供企业招聘参考，请勿作其他商业用途。</li>
                                <li>2.基于大数据智能分析匹配数据，测评结果仅做参考。</li>
                                <li>3.查询过的数据可多次查看，无需重复查询。</li>
                                <li>4.企业可免费查询<span>3</span>次/天，<span>如需求量大，请联系商务客服400-885-6112</span>。</li>
                            </ul>
                        </div>
                     </div>
                 </div>
                 <div className="fill-field">
                    <div className="hint-field" style={{ marginTop: 70}}>
                        <div className="hint-title">
                            <span>可查内容展示</span>
                        </div>
                        <div className="card-list">
                            <Row>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/01.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>身份证信息核查</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/02.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>根据被调人的姓名、身份证号、手机号，匹配运营商数据，对个人手机号实名信息进行核查，降低欺诈风险。</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/03.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>学历信息核查</p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/04.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>失信被执行核查</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/wd.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>网贷黑名单核查</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/zyzs.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>职业证书核查</p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/zcwdx.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>职场稳定性分析</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/sffz.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>司法犯罪核查</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/syly.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>商业利益冲突核查</p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                 </div>
             </li>
         )
     }
 }  