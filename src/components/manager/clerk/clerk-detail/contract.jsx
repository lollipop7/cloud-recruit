import React, {Component} from 'react';

import {Icon} from 'antd';
import store from 'store';
import PlusAttachmentModal from './attactment-modal'; 
import ViewModal from './view-modal';

import clerkInfo from 'data/clerk/clerk';
import moment from 'moment';

const constractData={name: '劳动合同', isShow: 1};
import {Button , DatePicker , Input} from 'antd';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

import LoadingComponent from 'components/loading';

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
        rid:'',
        tokenKey:'',
        token:''
    }
    componentDidMount(){
        const rid = this.props.data.rid+'';
        this.props.queryEmployee({rid});
        const {token,tokenKey} = store.get('token') || {};
        this.setState({tokenKey, token})
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.listAll)){
            const {attachment_type_con} = this.state;
            const listArr = filter(nextProps.listAll,(item,key) => {
                return item.type == 2;
            });
            listArr[0].list.forEach((item,key) => {
                if(item.type == 10010) attachment_type_con.push(item);
            });
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
            if(rid){
                this.setState({
                    isLoading:false
                })
            }
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextState !== this.state || nextProps !== this.props;
    }

    handleAttachmentClick = (itemData) => {
       const {rid} = this.state;
       this.setState({
           itemData,
           rid
        });
       this.props.showAttachmentModal();
    }

    showImageModal = (parmentType,type) => {
        const {showImageModal, viewUploadAttachment} = this.props;
        showImageModal({parmentType,type,imageVisible:true})
    }
    hideImageModal = () =>{
        this.props.hideImageModal();//隐藏预览框
        this.props.cancelImageUrl();//清空图片地址
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
        const {
                starttime,          //合同开始日期
                yearnumber,         //合同年限
                endtime,            //合同结束日期
            } = this.props.data;
        if(field=='cancelBtnState'){
            this.setState({
                starttime,          //合同开始日期
                yearnumber,         //合同年限
                endtime,            //合同结束日期
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })
        }
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
            tokenKey,
            token,
            isLoading=true
        } = this.state;
        //console.log(this.props.queryEmployeeList.list.listAll[1].list[0])
        const {attachment_type} = this.props.queryEmployeeList.list.listAll[1].list[0];
        const dateFormat = 'YYYY-MM-DD';
        return (
            <div className="contract clerk-tab-container">
                {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
                        top: 100,
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#FFF',
                        zIndex: 2
                    }} />
                }
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
                            <div style={{position:'absolute',bottom:20,left:'45%'}}>
                                <Button 
                                    type='primary' 
                                    style={{display:btnState,float:'left',marginRight:20}}
                                    onClick={this.saveInfomation.bind(this,'btnState')}
                                    >
                                        保存
                                </Button>
                                <Button  
                                    style={{display:btnState}}
                                    onClick={this.onSelectTimeChange.bind(this,'cancelBtnState')}
                                    >
                                    取消
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
                                attachment_type.map((value,index) => {
                                    const {name} = value;
                                    return(
                                        <div key={name} 
                                             className="add-attactment" 
                                             style={{display: 'inline-block'}}
                                        >
                                            {
                                                value.filename=='' ?
                                                <div>
                                                    <Icon type="plus-circle-o"
                                                    onClick={this.handleAttachmentClick.bind(this,value)}
                                                        style={{ 
                                                            paddingTop:'30px',
                                                            fontSize: 45, 
                                                            color: '#d2d2d2',
                                                        }}
                                                    />
                                                    <p style={{marginBottom:10}}>{name}</p> 
                                                </div>
                                                :
                                                value.filenameExt=='jpg' && value.filenameExt=='png'?
                                                <div>
                                                    <img alt="example" style={{ width: '190px',height:'150px',marginBottom:'-90px'}} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`} />
                                                    <div>
                                                        <span onClick={this.showImageModal.bind(this,value.parmentType,value.type)}>预览</span> 
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <img alt="example" style={{ width: '190px',height:'150px',marginBottom:'-90px'}} src="/static/images/manager/clerk/fjcl.png"/>
                                                    <div>
                                                        <span onClick={this.showImageModal.bind(this,2,value.typeId)}>预览</span> 
                                                    </div>
                                                </div>
                                            }
                                            {/* <Icon type="plus-circle-o"
                                                style={{ 
                                                    fontSize: 45, 
                                                    color: '#d2d2d2',
                                                }}
                                            />
                                            <p>{name}</p> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                </ul>
                <ViewModal/> 
            </div>
        );
    }
}

const mapStateToProps = state => ({
    attactmentModal: state.Manage.attactmentModal,
    imageUrl: state.Manage.imageUrl,
    imageVisible: state.Manage.imageVisible,
    queryEmployeeList: state.Manage.queryEmployeeList,
})

const mapDispatchToProps = dispatch => ({
    showAttachmentModal: bindActionCreators(Actions.ManageActions.showAttachmentModal,dispatch),
    hideAttachmentModal: bindActionCreators(Actions.ManageActions.hideAttachmentModal,dispatch),
    DeleteMaterial: bindActionCreators(Actions.ManageActions.DeleteMaterial,dispatch),
    viewUploadAttachment: bindActionCreators(Actions.ManageActions.viewUploadAttachment,dispatch),
    downloadAttachment: bindActionCreators(Actions.ManageActions.downloadAttachment,dispatch),
    showImageModal: bindActionCreators(Actions.ManageActions.showImageModal,dispatch),
    hideImageModal: bindActionCreators(Actions.ManageActions.hideImageModal,dispatch),
    cancelImageUrl: bindActionCreators(Actions.ManageActions.cancelImageUrl,dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contract)