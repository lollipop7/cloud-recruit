import React, {Component, PropTypes} from 'react';
import { Input, Button, Card, Row, Col } from 'antd';

import clerkInfo from 'data/clerk/clerk';
const {cardList} = clerkInfo.creditInvestgation.cardList;

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
        diplomanum: '',
        gridStyle: {
            width: '30%',
            textAlign: 'center',
        } 
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
            gridStyle
         } = this.state;
         console.log(gridStyle)
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
                    <div className="hint-field">
                        <div className="hint-title">
                            <span>可查内容展示</span>
                        </div>
                        <div className="card-list">
                            <Row>
                                <Col span={8}><Card></Card></Col>
                                <Col span={8}><Card></Card></Col>
                                <Col span={8}><Card></Card></Col>
                            </Row>
                            <Row>
                                <Col span={8}><Card></Card></Col>
                                <Col span={8}><Card></Card></Col>
                                <Col span={8}><Card></Card></Col>
                            </Row>
                            <Row>
                                <Col span={8}><Card></Card></Col>
                                <Col span={8}><Card></Card></Col>
                                <Col span={8}><Card></Card></Col>
                            </Row>
                        </div>
                    </div>
                 </div>
             </li>
         )
     }
 }  