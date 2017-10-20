import React, {Component} from 'react';
import { Modal, Button, Upload, notification, Icon } from 'antd';
const Dragger = Upload.Dragger;


export default class PlusAttachmentModal extends Component { 
    state = {
        fileList: [],
        error: false,
        errorMsg: '',
        fileListOpposite: []
    }

    // shouldComponentUpdate(nextProps,nextState) {
    //     return nextProps !== this.props || nextState!==nextState;
    // }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.html|\.xls|\.xlsx|\.xlsm|\.mht|\.htm|\.dot|\.dotx|\.jpg|\.png|\.gif)$/i,
            {error,fileList} = this.state,
            {name,size} = file;
            // 匹配文件类型
            if(!matchName.test(name)){
                this.triggerError(true);
                return false;
            }
            // 判断文件大小最大支持2M的文件
            if(size > 2*1024*1024){
                this.triggerError(true,'文件大小不能超过2MB！');
                return false;
            }
            if(error){
                this.triggerError(false);
            }
        
        return true;
    }

    // 上传文件改变时的状态
    onFileChange = info =>{
        let fileList = info.fileList;
        if (info.file.status === 'error') {
            this.triggerError(true,'文件上传失败！');
        }
        console.log(fileList)        
        this.setState({fileList});
    }

    // 文件移除
    onFileRemove = file => {
        // 文件移除
        const {response} = file;
        this.props.removeUploadFIle(response.filePath);
        if(this.state.error){
            this.triggerError(false);
        }
        return true;
    }

    // 身份证反面上传文件改变时的状态
    onFileChangeOpposite = info =>{
        let fileListOpposite = info.fileList;
        if (info.file.status === 'error') {
            this.triggerError(true,'文件上传失败！');
        }
        this.setState({fileListOpposite});
    }

    // 身份证反面文件移除
    onFileRemoveOpposite = file => {
        // 文件移除
        const {response} = file;
        this.props.removeUploadFIle(response.filePath);
        if(this.state.error){
            this.triggerError(false);
        }
        return true;
    }
    //上传材料附件
    UploadMaterial = () => {
        let {fileList,fileListOpposite,source} = this.state,
            { itemData , rid='' , UploadMaterial} = this.props,
            { type} = itemData;
        if(fileList.length === 0){
            this.triggerError(true,'请选择上传文件！');
            return ;
        }
        // 判断文件是否上传成功,上传失败fileList中的response为undefined
        const {name,response} = fileList[0];
        if(!response){
            return ;
        }
        const {filePath} = response,
            fileNameJson = `{${name}:${filePath}}`;
           // UploadMaterial({type:type+'',fileNameJson,rid});
        //身份证反面上传
        if(fileListOpposite.length != 0){
            const {name,response} = fileListOpposite[0];
            if(!response){
                return ;
            }
            const {filePath} = response,
                fileNameJson = `{${name}:${filePath}}`;
                //UploadMaterial({type:type+'',fileNameJson,rid});
        }
    }
    //隐藏Modal
    hideAttachmentModal = () => {
        this.props.hideAttachmentModal();
        this.setState({
            fileList:[],
            fileListOpposite:[]
        })
    }
    

    render() {
        const {
            attactmentModal,
            hideAttachmentModal,
            itemData
        } = this.props,
        {visible} = attactmentModal,
        {
            name,
            max,
            count,
            isImportant,
            isCustom
        } = itemData,
        {
            fileList,
            error,
            errorMsg,
            fileListOpposite
        } = this.state;
      return (
        <Modal
            title={`添加${name}`}
            wrapClassName="grey-close-header vertical-center-modal attachment-wrap"
            visible={visible}
            onCancel={this.hideAttachmentModal}
            onOk= {this.UploadMaterial}
        >
                {name=='身份证原件' ? 
                    <div>
                        <div className="add-attactment">
                            <Dragger
                                name='uploadify'
                                action={`${prefixUri}/uploadAttachment`}
                                fileList={fileList}
                                picType="idcard"
                                beforeUpload={this.onFilebeforeUpload}
                                onChange={this.onFileChange}
                                onRemove={this.onFileRemove}
                            >
                                    <Icon type="plus-circle-o"
                                        style={{ 
                                            fontSize: 45, 
                                            color: '#d2d2d2',
                                        }}
                                    />
                                    <p>{name}正面</p>
                            </Dragger>
                            {error &&
                                <span className="error-text">
                                    {errorMsg}
                                </span>
                            }  
                        </div>
                        <div className="add-attactment">
                            <Dragger
                                name='uploadify'
                                action={`${prefixUri}/uploadAttachment`}
                                picType="edu"
                                fileList={fileListOpposite}
                                beforeUpload={this.onFilebeforeUpload}
                                onChange={this.onFileChangeOpposite}
                                onRemove={this.onFileRemoveOpposite}
                            >
                                    <Icon type="plus-circle-o"
                                        style={{ 
                                            fontSize: 45, 
                                            color: '#d2d2d2',
                                        }}
                                    />
                                    <p>{name}反面</p>
                            </Dragger>
                        </div>
                    </div>
                    :
                    <div className="add-attactment">
                        <Dragger
                            name='uploadify'
                            action={`${prefixUri}/uploadAttachment`}
                            fileList={fileList}
                            beforeUpload={this.onFilebeforeUpload}
                            onChange={this.onFileChange}
                            onRemove={this.onFileRemove}
                        >
                                <Icon type="plus-circle-o"
                                    style={{ 
                                        fontSize: 45, 
                                        color: '#d2d2d2',
                                    }}
                                />
                                <p>{name}</p>
                        </Dragger>
                    </div>
                }
                <p>文件或者图片大小限制在2M以内</p>
        </Modal>
      )
    }
}