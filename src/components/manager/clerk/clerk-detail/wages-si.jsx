import React, {Component} from 'react';

import clerkInfo from 'data/clerk/clerk';
import {Button , Input} from 'antd';
import pickBy from 'lodash/pickBy';

export default class WagesSocialSecurity extends Component {
    state = {
        btnState:'none',
        borderState:"1px solid transparent",
        isdisabled:true,
        eduBtnState:'none',
        eduBorderState:"1px solid transparent",
        isEdudisabled:true
    }
    //编辑信息
    editInformation = (field) => {
        if(field=='wage'){
            this.setState({
                btnState:'block',
                borderState:"1px solid #d9d9d9",
                isdisabled:false
            })
        }else if(field=='soci'){
            this.setState({
                eduBtnState:'block',
                eduBorderState:"1px solid #d9d9d9",
                isEdudisabled:false
            })
        }
        
    }
    handleSelectChange  = (field,e) => {
        this.setState({
            [field]:e.target.value
        })
    }
    saveInfomation = (field) => {
        if (field== 'btnState'){

        const filterObj = pickBy(this.state,(val,key)=>{
            return key =='wage_card' || key =='wage_bank' || key =='wage_city' || key =='rid' ;
        });
        const filterObjEdu = pickBy(filterObj,(val,key)=>{
            return val !=undefined;
            });
            this.props.editEmployeeInformation({...filterObj})
            this.setState({
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })

        }else if (field== 'eduBtnState'){

            const filterObj = pickBy(this.state,(val,key)=>{
                return key =='soci_card' || key =='fund_card' || key =='rid'
            });
            const filterObjEdu = pickBy(filterObj,(val,key)=>{
                return val !=undefined;
                });
               
            this.props.editEmployeeInformation({...filterObjEdu})
            this.setState({
                eduBtnState:'none',
                eduBorderState:"1px solid transparent",
                isEdudisabled:false,
            })
        }  
    }
    componentDidMount(){
        const rid = this.props.data.rid+'';
        this.props.queryEmployee({rid:rid});
    }
    componentWillReceiveProps(){
        setTimeout(()=>{
            const {
                wageCard,               //工资卡卡号
                wageBank,               //工资卡开户行
                wageCity,               //工资卡开户城市
                sociCard,               //社保账号
                fundCard,               //公积金账号
                rid
            } = this.props.data; 
            this.setState({
                wage_card:wageCard,               //工资卡卡号
                wage_bank:wageBank,               //工资卡开户行
                wage_city:wageCity,               //工资卡开户城市
                soci_card:sociCard,               //社保账号
                fund_card:fundCard,               //公积金账

                rid:rid+''
            })
        })
    }
    render() {
        const {
            btnState , 
            borderState , 
            isdisabled,
            eduBtnState,
            eduBorderState,
            isEdudisabled,
            
            wage_card,               //工资卡卡号
            wage_bank,               //工资卡开户行
            wage_city,               //工资卡开户城市
            soci_card,               //社保账号
            fund_card,               //公积金账

        } = this.state,
        {
            salaryBasic,            //基本工资
            salarySubsidies,        //补贴
            salaryPer               //绩效工资
        } = this.props.wage;
        return (
            <div className="wages-social-security clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                工资卡信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span  onClick = {this.editInformation.bind(this,'wage')}>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 85}}>
                                <li>
                                    <span>工资卡卡号 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            value={wage_card}
                                            disabled={isdisabled}
                                            onChange={this.handleSelectChange.bind(this,'wage_card')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>工资卡开户行 : </span>
                                    <span>
                                        <Input
                                            style={{border:borderState}}
                                            value={wage_bank}
                                            disabled={isdisabled}
                                            onChange={this.handleSelectChange.bind(this,'wage_bank')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>工资卡开户城市 : </span>
                                    <span>  
                                        <Input
                                            style={{border:borderState}}
                                            value={wage_city}
                                            disabled={isdisabled}
                                            onChange={this.handleSelectChange.bind(this,'wage_city')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                            <div style={{position:'absolute',bottom:20,left:'50%'}}>
                                <Button 
                                    type='primary' 
                                    style={{display:btnState}}
                                    onClick={this.saveInfomation.bind(this,'btnState')}
                                    >
                                        保存
                                </Button>
                            </div>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                社保公积金
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span onClick = {this.editInformation.bind(this,'soci')}>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>社保账号 : </span>
                                    <span>
                                        <Input
                                            style={{border:eduBorderState}}
                                            value={soci_card}
                                            disabled={isEdudisabled}
                                            onChange={this.handleSelectChange.bind(this,'soci_card')}
                                        />
                                    </span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>公积金账号 : </span>
                                    <span>
                                        <Input
                                            style={{border:eduBorderState}}
                                            value={fund_card}
                                            disabled={isEdudisabled}
                                            onChange={this.handleSelectChange.bind(this,'fund_card')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <div style={{position:'absolute',bottom:20,left:'50%'}}>
                                <Button 
                                    type='primary' 
                                    style={{display:eduBtnState}}
                                    onClick={this.saveInfomation.bind(this,'eduBtnState')}
                                    >
                                    保存
                                </Button>
                            </div>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                薪资状况
                            </h3>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>基本工资 : </span>
                                    <span>
                                        {salaryBasic}</span>
                                </li>
                                <li>
                                    <span>补贴 : </span>
                                    <span>{salarySubsidies}</span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>绩效工资 : </span>
                                    <span>{salaryPer}</span>
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}