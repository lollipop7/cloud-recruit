import React, {Component} from 'react';

import {Icon} from 'antd';
import PlusAttachmentModal from './attactment-modal'; 

import clerkInfo from 'data/clerk/clerk';
import moment from 'moment';

const constractData={name: '劳动合同', isShow: 1};
import {Button , DatePicker , Input} from 'antd';
import pickBy from 'lodash/pickBy';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class Contract extends Component {

    state = {
        itemData: {},
        attachment_type_con: [],
        btnState:'none',
        isdisabled:true,
        borderState:"1px solid transparent",
        starttime:'',          //合同开始日期
        yearnumber:'',         //合同年限
        endtime:'',            //合同结束日期
        rid:''
    }
    componentDidMount(){
        const rid = this.props.data.rid+'';
        this.props.queryEmployee({rid:rid});
    }

    componentWillReceiveProps(nextProps){
        const {
            attachment_type_con = []
        } = this.state;
        nextProps.atcs.forEach((value,index) => {
            attachment_type_con.push(value);
        })
        this.setState({
            attachment_type_con
        });
        const {
            starttime,          //合同开始日期
            yearnumber,         //合同年限
            endtime,            //合同结束日期
            rid
        } = nextProps.data;
        this.setState({
            starttime,          //合同开始日期
            yearnumber,         //合同年限
            endtime,            //合同结束日期
            rid:rid+''
        })
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextState !== this.state || nextProps !== this.props;
    }

    handleAttachmentClick = (itemData) => {
        this.setState({itemData});
        this.props.showAttachmentModal();
     }
    //编辑信息
    editInformation = (field) => {
        if(field=='contract'){
            this.setState({
                btnState:'block',
                isdisabled:false,
                borderState:"1px solid  #d9d9d9",
            })
        }   
    }
    saveInfomation = (field) => {
        if (field== 'btnState'){

        const filterObj = pickBy(this.state,(val,key)=>{
            return key =='starttime' || key =='yearnumber' || key =='endtime' || key=='rid' ;
        });
        const filterObjEdu = pickBy(filterObj,(val,key)=>{
            return val !=undefined;
            });
        this.props.editEmployeeInformation({...filterObjEdu})
        this.setState({
                btnState:'none',
                isdisabled:true,
                borderState:"1px solid  transparent",
        })

        }
    }
    onSelectTimeChange = (field,e,date) => {
        if(field=='yearnumber'){
            this.setState({
                [field]:e.target.value
            }) 
        }else{
            this.setState({
                [field]:moment(date).format('YYYY-MM-DD')
            })
        }
    }
    render() {
        const {
            attachment_type_con,
            itemData,
            btnState ,
            borderState, 
            isdisabled,
            starttime,          //合同开始日期
            yearnumber,         //合同年限
            endtime,            //合同结束日期
        } = this.state;
        const dateFormat = 'YYYY-MM-DD';
        return (
            <div className="contract clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                合同信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span 
                                    onClick = {this.editInformation.bind(this,'contract')}
                                >
                                    编辑
                                </span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 60}}>
                                <li>
                                    <span>合同开始日期 : </span>
                                    <span>
                                        <DatePicker
                                            value={starttime?moment(moment(starttime), dateFormat):''}
                                            disabled={isdisabled}
                                            onChange={this.onSelectTimeChange.bind(this,'starttime')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>合同年限 : </span>
                                    <span>
                                        <Input
                                            value={yearnumber}
                                            disabled={isdisabled}
                                            style={{border:borderState}}
                                            onChange={this.onSelectTimeChange.bind(this,'yearnumber')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>合同结束日期 : </span>
                                    <span>
                                        <DatePicker
                                            value={endtime?moment(moment(endtime), dateFormat):''}
                                            disabled={isdisabled}
                                            onChange={this.onSelectTimeChange.bind(this,'endtime')}
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
                                合同附件
                            </h3>
                            {
                                attachment_type_con.map((value,index) => {
                                    const {name,isShow} = value;
                                    return(
                                        <div key={name} 
                                             className="add-attactment" 
                                             onClick={this.handleAttachmentClick.bind(this,value)}
                                             style={{display: isShow==1 ? 'inline-block' : 'none'}}
                                        >
                                            <Icon type="plus-circle-o"
                                                style={{ 
                                                    fontSize: 45, 
                                                    color: '#d2d2d2',
                                                }}
                                            />
                                            <p>{name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                </ul>
                <PlusAttachmentModal {...this.props} itemData={itemData}/> 
            </div>
        );
    }
}

const mapStateToProps = state => ({
    attactmentModal: state.Manage.attactmentModal
})

const mapDispatchToProps = dispatch => ({
    showAttachmentModal: bindActionCreators(Actions.ManageActions.showAttachmentModal,dispatch),
    hideAttachmentModal: bindActionCreators(Actions.ManageActions.hideAttachmentModal,dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contract)