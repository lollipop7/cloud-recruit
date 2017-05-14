import React, {Component} from 'react';

import {Modal,Select,Input,Button,Upload,message} from 'antd';
const Option = Select.Option;
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class UploadResumeModalComponents extends Component {
    state = {
        fileList: []
    }
    tips = [
        '支持单个html,xls等格式的简历。',
        '多文件请压缩成zip包上传。',
        '猎聘HR简历需包含图片信息，并且只支持压缩上传。',
        '猎聘HR简历需包含图片信息，并且只支持压缩上传。',
        '上传文件最大支持100M,建议分成小包多次上传。',
        '导入简历过程中请不要刷新页面。'
    ]

    handleChange = value => {
        console.log(value);
    }

    onFileChange = info =>{
        let fileList = info.fileList;
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        this.setState({fileList});
    }

    render() {
        const {fileList} = this.state;
        const {data,showRecommendModal} = this.props,
            {visible} = data;
        console.log(fileList);
        return (
            <Modal
                title="简历上传"
                wrapClassName="vertical-center-modal upload-resume-modal"
                visible={visible}
                onCancel={this.props.hideModal}
                footer={null}
            >
                <ul>
                    <li>
                        <span>简历来源</span>
                        <Select 
                            defaultValue="51job" 
                            onChange={this.handleChange}
                            style={{
                                width: 366
                            }}
                        >
                            <Option value="51job">51job</Option>
                            <Option value="zhilian">智联招聘</Option>
                            <Option value="unknown">其他</Option>
                        </Select>
                    </li>
                    <li>
                        <span>
                            推荐职位
                        </span>
                        <Input 
                            defaultValue="高级理财师"
                            disabled
                        />
                        <Button type="primary" onClick={()=>showRecommendModal()}>
                            选择
                        </Button>
                    </li>
                    <li>
                        <span>
                            选择文件
                        </span>
                        {/*<Input 
                            defaultValue="高级理财师"
                            disabled
                        />*/}
                        <Upload 
                            name='uploadify'
                            action='/web/upload'
                            fileList={fileList}
                            onChange={this.onFileChange}
                        >
                            <Button type="primary">
                                选择
                            </Button>
                        </Upload>
                    </li>
                </ul>
                <Button className="upload-button" type="primary">
                    上传
                </Button>
                <div className="tips-wrapper table">
                    <div className="table-cell">
                        提示 : 
                    </div>
                    <div className="table-cell">
                        <div className="table">
                            {
                                this.tips.map((item,index)=>{
                                    return (
                                        <div key={index} className="table-row">
                                            {index+1}.{item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Recruit.uploadModal
})
const mapDispatchToProps = dispatch => ({
    showRecommendModal: bindActionCreators(Actions.RecruitActions.showRecommendModal, dispatch),
    hideModal: bindActionCreators(Actions.RecruitActions.hideUploadModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadResumeModalComponents);