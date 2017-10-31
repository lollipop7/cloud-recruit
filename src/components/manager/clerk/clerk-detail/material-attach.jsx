import React, {Component} from 'react';

import {Icon , Modal} from 'antd';
const confirm = Modal.confirm;
import store from 'store';
import PlusAttachmentModal from './attactment-modal'; 

import forEach from 'lodash/forEach';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

import LoadingComponent from 'components/loading';
import ViewModal from './view-modal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MaterialAttach extends Component {

    state = {
        itemData: {},
        basicData: [],      //基本资料
        beforeData: [],     //档案附件
        afterData: [],      //离职资料
        rid:'',
        tokenKey:'',
        token:''
    }

    componentDidMount(){
        const rid = this.props.queryEmployeeList.list.resumeoff.rid+'';
        this.props.queryEmployee({rid:rid});
        const {token,tokenKey} = store.get('token') || {};
        this.setState({tokenKey, token})
        
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.queryEmployeeList.list.listAll)){
            const {
                basicData= [],
                beforeData= [],
                afterData= []
            } = this.state;
            nextProps.queryEmployeeList.list.listAll.forEach((value,index) => {
                switch(value.type){
                    case 1 : 
                        this.setState({
                            basicData:value.list
                        });
                        break;
                    case 2 : 
                        this.setState({
                            beforeData:value.list
                        });
                        break;
                    case 3 : 
                        this.setState({
                            afterData:value.list
                        });
                        break;
                }
            })
       }
    }

    handleAttachmentClick = (itemData) => {
       const rid = this.props.queryEmployeeList.list.resumeoff.rid+'';
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

    render() {
        const {
            itemData,
            basicData=[],
            beforeData=[],
            afterData=[],
            rid,
            tokenKey,
            token,
        } = this.state;
        const { showImageModal, hideImageModal,attactmentType,queryEmployeeList} = this.props;
        const { isLoading} = queryEmployeeList;
        return (
            <div className="material-attach clerk-tab-container">
                {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
                        top: 300,
                        left:'46%',
                        height: '30%',
                        width: '10%',
                        zIndex: 2
                    }} />
                }
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">基本资料</h3>
                            {
                                basicData.map((value,index) => {
                                    const {name,isShow,type} = value;
                                    return(
                                        <div key={name} 
                                             className="add-attactment" 
                                             style={{display: isShow==1 ? 'inline-block' : 'none'}}
                                             
                                        >
                                            {
                                                value.attachment_type.length==0 ?
                                                <div className="plus-circle">
                                                    <Icon type="plus-circle-o"
                                                        onClick={this.handleAttachmentClick.bind(this,value)}
                                                        style={{ 
                                                            paddingTop:'30px',
                                                            fontSize: 45, 
                                                            color: '#d2d2d2',
                                                        }}
                                                    />
                                                    <p >{name}</p> 
                                                </div> : 
                                                <div className="preview-pics">
                                                    {(value.attachment_type[0].filenameExt!="jpg" && value.attachment_type[0].filenameExt!="png")?
                                                        <img alt="材料附件"  src="/static/images/manager/clerk/fjcl.png"/>
                                                        :
                                                        <img alt="材料附件"  src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`}  
                                                    />}
                                                        <div>
                                                            <h3 
                                                                className="upLoadMaterial"
                                                                onClick={this.handleAttachmentClick.bind(this,value)} 
                                                                title={`点击上传${name}附件`}
                                                            >
                                                                {name}
                                                            </h3>
                                                            <span
                                                                className="viewMaterial upLoadView" 
                                                                onClick={this.showImageModal.bind(this,value.parmentType,value.type)}
                                                                title={`点击预览${name}附件`}
                                                            >
                                                                预览
                                                            </span> 
                                                        </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">档案附件</h3>
                            {
                                beforeData.map((value,index) => {
                                    const {name,isShow,type} = value;
                                    return(
                                            <div key={name} 
                                                className="add-attactment" 
                                                style={{display: isShow==1 ? 'inline-block' : 'none'}}
                                            >
                                            {
                                                value.attachment_type.length==0?
                                                <div className="plus-circle">
                                                    <Icon type="plus-circle-o"
                                                        onClick={this.handleAttachmentClick.bind(this,value)}
                                                        style={{ 
                                                            paddingTop:'30px',
                                                            fontSize: 45, 
                                                            color: '#d2d2d2',
                                                        }}
                                                    />
                                                    <p>{name}</p>
                                                </div> : 
                                                <div className="preview-pics">
                                                    {(value.attachment_type[0].filenameExt!="jpg" && value.attachment_type[0].filenameExt!="png")?
                                                        <img alt="材料附件" src="/static/images/manager/clerk/fjcl.png"/>
                                                        :
                                                    <img alt="材料附件" src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`}/>}
                                                    <div>
                                                        <h3 
                                                            className="upLoadMaterial"
                                                            onClick={this.handleAttachmentClick.bind(this,value)} 
                                                            alt="点击上传附件"
                                                            title={`点击上传${name}附件`}
                                                        >
                                                            {name}
                                                        </h3>
                                                        <span
                                                            className="viewMaterial" 
                                                        onClick={this.showImageModal.bind(this,value.parmentType,value.type)}
                                                            title={`点击预览${name}附件`}
                                                        >
                                                            预览
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">离职资料</h3>
                            {
                                afterData.map((value,index) => {
                                    const {name,isShow,type} = value;
                                    return(
                                        <div key={name} 
                                             className="add-attactment" 
                                             style={{display: isShow==1 ? 'inline-block' : 'none'}}
                                             
                                        >
                                        {
                                            value.attachment_type.length==0?
                                            <div className="plus-circle">
                                                <Icon 
                                                    onClick={this.handleAttachmentClick.bind(this,value)}
                                                    type="plus-circle-o"
                                                    style={{ 
                                                        paddingTop:'30px',
                                                        fontSize: 45, 
                                                        color: '#d2d2d2',
                                                    }}
                                                />
                                                <p>{name}</p>
                                            </div> :
                                            <div  className="preview-pics">
                                                {(value.attachment_type[0].filenameExt!="jpg" && value.attachment_type[0].filenameExt!="png")?
                                                <img alt="材料附件" src="/static/images/manager/clerk/fjcl.png"/>
                                                :
                                                <img alt="材料附件" src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`}  
                                                />}
                                                <div>
                                                    <h3 
                                                        className="upLoadMaterial"
                                                        onClick={this.handleAttachmentClick.bind(this,value)} 
                                                        alt="点击上传附件"
                                                        title={`点击上传${name}附件`}
                                                    >
                                                        {name}
                                                    </h3>
                                                    <span
                                                        className="viewMaterial" 
                                                        onClick={this.showImageModal.bind(this,value.parmentType,value.type)}
                                                        title={`点击预览${name}附件`}
                                                    >
                                                        预览
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    )
                                })
                            }
                        </div>    
                    </li>
                </ul>
                <PlusAttachmentModal {...this.props} itemData={itemData} rid={rid}/> 
                <ViewModal/>             
            </div>
        );
    }
}

const mapStateToProps = state => ({
    attactmentModal: state.Manage.attactmentModal,
    queryEmployeeList: state.Manage.queryEmployeeList,
})

const mapDispatchToProps = dispatch => ({
    showAttachmentModal: bindActionCreators(Actions.ManageActions.showAttachmentModal,dispatch),
    hideAttachmentModal: bindActionCreators(Actions.ManageActions.hideAttachmentModal,dispatch),
    viewUploadAttachment: bindActionCreators(Actions.ManageActions.viewUploadAttachment,dispatch),
    showImageModal: bindActionCreators(Actions.ManageActions.showImageModal,dispatch),
    hideImageModal: bindActionCreators(Actions.ManageActions.hideImageModal,dispatch),
    cancelImageUrl: bindActionCreators(Actions.ManageActions.cancelImageUrl,dispatch),
    queryEmployee: bindActionCreators(Actions.ManageActions.queryEmployee,dispatch),
    UploadMaterial: bindActionCreators(Actions.ManageActions.UploadMaterial, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MaterialAttach)