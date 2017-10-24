import React, {Component} from 'react';

import {Icon , Modal} from 'antd';
import store from 'store';
import PlusAttachmentModal from './attactment-modal'; 

import forEach from 'lodash/forEach';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

import LoadingComponent from 'components/loading';

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
        const rid = this.props.data.resumeoff.rid+'';
        this.props.queryEmployee({rid:rid});
        const {token,tokenKey} = store.get('token') || {};
        this.setState({tokenKey, token})
        
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.list.listAll)
        if(!isEmpty(nextProps.listAll)){
            const {
                basicData= [],
                beforeData= [],
                afterData= []
            } = this.state;
            nextProps.listAll.forEach((value,index) => {
                switch(value.type){
                    case 1 : 
                        value.list.forEach((item) => {basicData.push(item)});break;
                    case 2 : 
                        value.list.forEach((item) => {beforeData.push(item)});break;
                    case 3 : 
                        value.list.forEach((item) => {afterData.push(item)});break;
                }
            })
            this.setState({
                basicData,
                beforeData,
                afterData
            });
            if(basicData.length!=0){
                this.setState({
                isLoading:false
            });
            }
       }
    }

    // shouldComponentUpdate(nextProps,nextState) {
    //     console.log(nextProps !== this.props);
    //     return nextProps !== this.props;
    // }

    handleAttachmentClick = (itemData) => {
        const {rid} = this.props.params;
       this.setState({
           itemData,
           rid
        });
       this.props.showAttachmentModal();
    }

    showImageModal = (value) => {
         const {showImageModal, viewUploadAttachment} = this.props;
        this.props.showImageModal(value,viewUploadAttachment)
    }
    hideImageModal = () =>{
        this.props.hideImageModal();//隐藏预览框
        this.props.cancelImageUrl();//清空图片地址
    }
    //删除图片
    deleteImage = (value) =>{
        console.log(value);
        this.props.DeleteMaterial({id:value.id+''},this.props.queryEmployee,value)
        //this.props.viewUploadAttachment();
        //const rid = this.props.data.resumeoff.rid+'';
        //this.props.queryEmployee({rid:rid});
        for(let i=0;i<this.props.imageUrl.length;i++){
            if(value.id==this.props.imageUrl[i]){
                this.props.imageUrl.splice(i,1)
            }
        }
        this.props.hideImageModal()
        
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
            isLoading=true
        } = this.state;
        const {imageUrl , imageVisible, showImageModal, hideImageModal} = this.props;
        return (
            <div className="material-attach clerk-tab-container">
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
                                                value.attachment_type.length==0?
                                                <div>
                                                    <Icon type="plus-circle-o"
                                                    onClick={this.handleAttachmentClick.bind(this,value)}
                                                        style={{ 
                                                            //marginBottom:'-120px',
                                                            paddingTop:'30px',
                                                            fontSize: 45, 
                                                            color: '#d2d2d2',
                                                        }}
                                                    />
                                                    <p style={{marginBottom:10}}>{name}</p> 
                                                </div>:<div>
                                                    <img alt="example" style={{ width: '190px',height:'150px',marginBottom:'-90px'}} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`} />
                                                        <div>
                                                            <h3 onClick={this.handleAttachmentClick.bind(this,value)} alt="点击上传附件">{name}</h3>
                                                            <span onClick={this.showImageModal.bind(this,value.attachment_type)}>预览</span> 
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
                                                </div>:<div>
                                                        <img alt="example" style={{ width: '190px',height:'150px',marginBottom:'-90px'}} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`} />
                                                        <div>
                                                            <h3>{name}</h3>
                                                            <span onClick={this.showImageModal.bind(this,value.attachment_type)}>预览</span>
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
                                             onClick={this.handleAttachmentClick.bind(this,value)}
                                        >
                                        {
                                            value.attachment_type.length==0?
                                            <div >
                                                <Icon type="plus-circle-o"
                                                    style={{ 
                                                        paddingTop:'30px',
                                                        fontSize: 45, 
                                                        color: '#d2d2d2',
                                                    }}
                                                />
                                                <p style={{marginBottom:10}}>{name}</p>
                                            </div>:<div>
                                                    <img alt="example" style={{ width: '190px',height:'150px',marginBottom:'-90px'}} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`} />
                                                    <div>
                                                        <h3>{name}</h3>
                                                        <span onClick={this.showImageModal.bind(this,value.attachment_type)}>预览</span>
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
                <Modal
                    title="图片预览"
                    wrapClassName="grey-close-header "
                    visible={imageVisible}
                    onCancel={this.hideImageModal}
                    onOk={this.hideImageModal}
                >
                    <div style={{width:500,height:500,margin:'0 auto'}}>
                        {
                            imageUrl.map((item,index)=>{
                                return <div 
                                            style={{width:'25%',height:'25%',margin:12,float:'left',textAlign:'center'}}>
                                            <img alt="example" style={{ width: '100%',height:'100%'}} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${item.filename}`} />
                                            <a 
                                                onClick={this.deleteImage.bind(this,item)}
                                                style={{textAlign:'center',fontSize:'18'}}
                                            >
                                                删除
                                            </a>
                                        </div>
                                    
                            })
                        } 
                    </div>  
                </Modal>                   
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
    downloadUploadAttachment: bindActionCreators(Actions.ManageActions.downloadUploadAttachment,dispatch),
    showImageModal: bindActionCreators(Actions.ManageActions.showImageModal,dispatch),
    hideImageModal: bindActionCreators(Actions.ManageActions.hideImageModal,dispatch),
    cancelImageUrl: bindActionCreators(Actions.ManageActions.cancelImageUrl,dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MaterialAttach)