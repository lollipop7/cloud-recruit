import React, {Component} from 'react';
import store from 'store';
import { Modal, Icon } from 'antd';
import LoadingComponent from 'components/loading';
const confirm = Modal.confirm;

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ViewModal extends Component {
    state = {
        tokenKey:'',
        token:''
    }
    componentDidMount(){
        const rid = this.props.queryEmployeeList.list.resumeoff.rid+'';
        this.props.queryEmployee({rid:rid});
        const {token,tokenKey} = store.get('token') || {};
        this.setState({tokenKey, token})
        
    }
    //删除图片
    deleteImage = (value) =>{
        const{imageUrl,hideImageModal,DeleteMaterial} = this.props;
        confirm({
            content: <h2>确定要删除吗?</h2>,
            okText: '删除',
            okType: "danger",
            cancelText: '取消',
            maskClosable:true,
            style:{top:300},
            onOk:()=> {
                DeleteMaterial({id:value.id+''},this.props,value) 
            }
        });
        
    }
    //下载附件材料
    downloadAttachment = (name) => {
        this.props.downloadAttachment(name)
    }
    hideImageModal = () =>{
        this.props.hideImageModal();//隐藏预览框
        //this.props.cancelImageUrl();//清空图片地址
    }


    render(){
        const {
            showImageModal, 
            hideImageModal,
            queryEmployeeList,
            attactmentType
        } = this.props;
        const {isLoading, list} = queryEmployeeList;
        const {listAll} = list;
        const{
            parmentType,
            type,
            imageVisible
        }=attactmentType;
        const {
            tokenKey,
            token,
        } = this.state;
        const imageUrl = [];
        if(Array.isArray(listAll)){
            for(let i=0;i<listAll.length;i++){
                if(listAll[i].type==parmentType){
                    for(let j=0;j<listAll[i].list.length;j++){
                        if(listAll[i].list[j].type==type){
                            for(let k=0;k<listAll[i].list[j].attachment_type.length;k++){
                                imageUrl.push(listAll[i].list[j].attachment_type[k])
                            }
                        }
                    }
                }
            }
        }
        return(
            <Modal
                visible={imageVisible}
                footer={null}
                closable={false}
                onCancel={this.hideImageModal}
                wrapClassName='viewMaterialModal'
            >
            {isLoading && 
                <LoadingComponent style={{
                    position: 'absolute',
                    top: 200,
                    left:'46%',
                    height: '10%',
                    width: '10%',
                    zIndex: 2
                }} />
            }
            <div style={{width:500,height:500,margin:'0 auto', overflow:'auto'}}>
                {imageUrl.length==0?<h1 style={{color:'#cccccc',textAlign:'center',width:'100%',marginTop:100}}>暂无附件预览</h1>:
                    imageUrl.map((item,index)=>{
                        return (item.filenameExt!='jpg' && item.filenameExt!='png')?
                                <div
                                    style={{
                                        width:"25%",
                                        height:"25%",
                                        margin:20,
                                        float:'left',
                                        textAlign:'center'
                                        }}
                                >
                                    <img 
                                        alt="材料附件" 
                                        style={{ width: '80%',height:'80%',display:'block'}} 
                                        src="/static/images/manager/clerk/fjcl.png" />
                                    <a 
                                        onClick={this.downloadAttachment.bind(this,item.filename)}
                                        style={{textAlign:'center',fontSize:'18'}}
                                    >
                                        下载
                                    </a>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a 
                                        onClick={this.deleteImage.bind(this,item)}
                                        style={{textAlign:'center',fontSize:'18'}}
                                    >
                                        删除
                                    </a>
                                </div>
                                :
                                <div 
                                    className="viewMaterial"
                                >
                                    <img 
                                        alt="材料附件" 
                                        style={{ width: '80%',height:'80%',display:'block'}} 
                                        src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${item.filename}`} />
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
        )
    }
}
const mapStateToProps = state => ({
    queryEmployeeList: state.Manage.queryEmployeeList,
    attactmentType: state.Manage.attactmentType
})

const mapDispatchToProps = dispatch => ({
    DeleteMaterial: bindActionCreators(Actions.ManageActions.DeleteMaterial,dispatch),
    viewUploadAttachment: bindActionCreators(Actions.ManageActions.viewUploadAttachment,dispatch),
    downloadAttachment: bindActionCreators(Actions.ManageActions.downloadAttachment,dispatch),
    showImageModal: bindActionCreators(Actions.ManageActions.showImageModal,dispatch),
    hideImageModal: bindActionCreators(Actions.ManageActions.hideImageModal,dispatch),
    queryEmployee: bindActionCreators(Actions.ManageActions.queryEmployee,dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewModal)