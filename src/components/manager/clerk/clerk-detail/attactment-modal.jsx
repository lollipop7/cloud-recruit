import React, {Component} from 'react';
import { Modal, Button, Upload, notification, Icon } from 'antd';
const Dragger = Upload.Dragger;


export default class PlusAttachmentModal extends Component { 
    state = {
        fileList: [],
        error: false,
        errorMsg: '',
        fileListq: []
    }

    // shouldComponentUpdate(nextProps,nextState) {
    //     return nextProps !== this.props || nextState!==nextState;
    // }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.jpg|\.png|\.gif)$/i,
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
        console.log(info)
        if (info.file.status === 'error') {
            this.triggerError(true,'文件上传失败！');
        }
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

    // 文件上传之前的钩子函数
    onFilebeforeUploadq = (file) => {
        const matchName = /(\.jpg|\.png|\.gif)$/i,
            {error,fileListq} = this.state,
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
    onFileChangeOpposite = info =>{
        let fileListOpposite = info.fileList;
        if (info.file.status === 'error') {
            this.triggerError(true,'文件上传失败！');
        }
        this.setState({fileListOpposite});
    }

    // 文件移除
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
        let {fileList,source} = this.state,
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
            UploadMaterial({type:type+'',fileNameJson,rid});
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
            fileListq
        } = this.state;
      return (
        <Modal
            title={`添加${name}`}
            wrapClassName="grey-close-header vertical-center-modal attachment-wrap"
            visible={visible}
            onCancel={hideAttachmentModal}
            onOk= {this.UploadMaterial}
        >
                {name=='身份证原件' ? 
                    <div>
                        <div className="add-attactment">
                            <Dragger
                                name='uploadify'
                                action={`${prefixUri}/uploadAttachment`}
                                fileList={fileList}
                                beforeUpload={this.onPicturebeforeUpload}
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
                                fileList={fileListq}
                                beforeUpload={this.onFilebeforeUploadq}
                                onChange={this.onFileChangeq}
                                onRemove={this.onFileRemoveq}
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
                <p>图片大小限制在2M以下</p>
        </Modal>
      )
    }
}