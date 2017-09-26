import React, {Component, PropTypes} from 'react';
import { Input, Button, Card, Row, Col} from 'antd';

import {InputComponent} from 'components/input';

export class ErrorInputComponent extends Component {
    state = {
        error: false
    }
    static propTypes = {
        name: PropTypes.string,
        field: PropTypes.string,
        value: PropTypes.oneOfType([ // 输入框的值
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool, //是否禁用输入框
        className: PropTypes.string, // 输入框类名
        style: PropTypes.object // 输入框内联样式
    }

    handleChange = (field,event) => {
        const {error} = this.state;
        const {onChange} = this.props;
        if(error){
           this.triggerError(false);
        }
        if(onChange){
            onChange(field,event);
        }
    }

    triggerError = (error) => {
        this.setState({error});
    }

    handleBlur = () => {
        const {value} = this.props;
        if(value === ''){
            this.triggerError(true);
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.value !== this.props.value || nextState.error !== this.state.error;
    }

    render() {
        const {error} = this.state,
            {
                name='',
                field='',
                value,
                placeholder,
                disabled=false,
                className='',
                style={}
            } = this.props;
        return (
            <div className="inline-block">
                <span>{name}</span>
                <div className="inline-block" style={{
                    position: 'relative',
                    marginRight: 0
                }}>
                    <Input 
                        ref='input'
                        placeholder={placeholder} 
                        value={value}
                        onChange={this.handleChange.bind(this,field)} 
                        disabled={disabled}
                        className={className}
                        className={error ? 'error' : ''}
                        style={style}
                        onBlur={this.handleBlur}
                    />
                    {error &&
                        <div className="error-promote" style={{
                            paddingLeft: 0
                        }}>
                            <label className="error">必填</label>
                        </div>
                    }
                </div>
            </div>
        )
    }
}


export default class CreditFillComponent extends Component {

     state = {
        candidatename: '刘德华',
        phonenum: '15126450564',
        idnum: '4114242424224242',
        diplomanum: ''
     }

     handleChange = (filed,e) => {
        console.log(filed);
    }

     render(){
         const {
            candidatename,
            phonenum,
            idnum,
            diplomanum,
         } = this.state;
         const gridStyle = {
            width: '25%',
            textAlign: 'center',
        };
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
                                    value={candidatename}
                                    onChange={this.handleChange}
                                    disabled
                                />
                             </li>
                             <li>
                                <ErrorInputComponent
                                    ref="phonenumInput"
                                    name="手机号"
                                    field="phonenum"
                                    value={phonenum}
                                    onChange={this.handleChange}
                                    disabled
                                />
                             </li>
                             <li>
                                <ErrorInputComponent
                                    ref="idnumInput"
                                    name="身份证号"
                                    field="idnum"
                                    value={idnum}
                                    onChange={this.handleChange}
                                    disabled
                                />
                             </li>
                             <li>
                                <ErrorInputComponent
                                    ref="diplomanumInput"
                                    name="毕业证书号"
                                    field="diplomanum"
                                    placeholder="请输入毕业证书号"
                                    value={diplomanum}
                                    onChange={this.handleChange}
                                />
                             </li>
                         </ul>
                         <div className="inline-block" style={{marginLeft: 177}}>
                            <Button type="primary" style={{fontSize: 20, width: 182, height: 45}}>一键查询</Button>
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
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/02.png" />
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
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/05.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>网贷黑名单核查</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/06.png" />
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
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/07.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>职场稳定性分析</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/08.png" />
                                        </div>
                                        <div className="custom-card">
                                            <p>司法犯罪核查</p>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <div className="custom-image">
                                            <img alt="picture" max-width="100%" src="/static/images/manager/clerk/09.png" />
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