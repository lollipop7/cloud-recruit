import React, {Component} from 'react';
import { Modal, Button, Upload, notification, Icon } from 'antd';
const Dragger = Upload.Dragger;


export default class PlusAttachmentModal extends Component { 
    state = {
        fileList: [],
        error: false,
        errorMsg: '',
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps !== this.props;
    }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        console.log('进入');
        const matchName = /(\.xls|\.xlsx|\.xlsm)$/i,
            {error,fileList} = this.state,
            {name,size} = file;
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
            errorMsg
        } = this.state;;
      return (
        <Modal
            title={`添加${name}`}
            wrapClassName="grey-close-header vertical-center-modal attachment-wrap"
            visible={visible}
            onCancel={hideAttachmentModal}
        >
                {name=='身份证原件' ? 
                    <div>
                        <div className="add-attactment">
                            <Dragger
                                name='uploadify'
                                action={`${prefixUri}/emp/data_employees`}
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
                                    <p>{name}正面</p>
                            </Dragger>
                        </div>
                        <div className="add-attactment">
                            <Dragger
                                name='uploadify'
                                action={`${prefixUri}/emp/data_employees`}
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
                                    <p>{name}反面</p>
                            </Dragger>
                        </div>
                    </div>
                    :
                    <div className="add-attactment">
                        <Dragger
                            name='uploadify'
                            action={`${prefixUri}/emp/data_employees`}
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
                
                {error &&
                    notification.error({
                        message: '错误',
                        description: errorMsg
                    })
                }
                <p>图片大小限制在2M以下</p>
        </Modal>
      )
    }
}