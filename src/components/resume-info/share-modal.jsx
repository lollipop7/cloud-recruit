import React, {Component} from 'react';

import {Modal,Tabs,Input,Button,message} from 'antd';
const TabPane = Tabs.TabPane;

import QRCode from 'qrcode.react';
import Clipboard from "clipboard";
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ShareModalComponents extends Component {
    constructor(){
        super();
        
    }
    

    handlePressEnter = (event) => {
        console.log(event.target.value);
    }

    componentWillUnmount(){
         //复制简历分享地址
        const clipboard = new Clipboard('.btn');
        clipboard.on('success', function() {
            message.success('复制成功',2);
        });

        clipboard.on('error', function(e) {
            message.error('复制失败，请在输入框内手动复制.',3);
        });
        
    }
    
    render(){
        const {shareModalVisible,resumeData,isLoading,resumeUrl} = this.props,
        {data = {}} = resumeData,
        {
                resumeInfo={},
                resumeid, //简历id
                currentPId='', //当前职位id
                currentPName='', // 申请职位名称
                currentPworkcity='', // 申请区域
                positions=[], // 当前简历同时申请的
                stagesMap // 流程状态列表
            } = data,
            {
                headimg, // 头像
                username, //姓名
                telephone, //电话
                email, //邮箱
                workyears, //工作年限
                educationbg, //学历
                channel, // 简历来源
            } = resumeInfo;
            const qrcodeLink = `${resumeUrl}`;
           
        return(
            <Modal
                width = {784}
                visible = {shareModalVisible}
                className = "shareModal"
                footer = {null}
                onCancel={isLoading ? ()=>{} : this.props.hideShareModal}
                >
                <p className="title">{`分享简历  ${username}--${currentPName}`}</p>
                <p className="content">分享后，可以查看到该简历的面试评估表及招聘进度</p>
                <Tabs defaultActiveKey="1" size="small">
                    <TabPane tab="链接分享" key="1">
                        <div className="title">
                            通过公开链接分享简历
                        </div>
                        <div className="subTitle">
                            将链接通过QQ、微信等渠道分享给对方，对方即可查看该简历信息
                        </div>
                        <div className="inputGroup">
                            <Input  onPressEnter={this.handlePressEnter}
                                    ref='CopyLink'
                                    value={qrcodeLink}
                                    addonAfter={<Button value='复制链接'
                                                       className="copy-link btn"
                                                       type="primary"
                                                       data-clipboard-action="copy"
                                                       data-clipboard-text={qrcodeLink}  
                                              >复制链接</Button>}
                            />
                        </div>
                        <p className="content">
                                温馨提示： 该公开链接可被任何收到该分享的人打开查看，请您谨慎转发。如意外泄漏，可<a href="javascript:void(0)">重新生成分享链接</a>。
                         </p>
                    </TabPane>
                    <TabPane tab="二维码分享" key="2">
                        <div className="qrcode-body">
                            <div className="qrcode pull-left"
                                style = {{
                                    width: 165,
                                    height: 165
                                }}>
                                <QRCode value={qrcodeLink}/>
                            </div>
                            <div className="qrcode-info pull-left">
                                <p className="title">
                                    微信扫码 · 实时查看简历详情
                                </p>
                                <p className="content">
                                    简历信息及招聘进程一目了然
                                </p>
                                <div className="hint">
                                    <p className="content">
                                        <i className="phone"></i>
                                        打开手机微信
                                    </p>
                                    <p className="content">
                                        <i className="sweep"></i>
                                        点击右上方扫一扫
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="qrcode-foot">
                            <p className="content">
                                温馨提示：根据候选人简历自动生成的二维码。扫描后可查看候选人的简历信息、招聘进度等。
                            </p>
                        </div>
                     </TabPane>
                </Tabs>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    shareModalVisible: state.Resume.shareModalVisible,
    isLoading: state.Resume.isModalLoading,
    resumeData: state.Resume.resumeData,
    resumeUrl: state.Resume.resumeUrl
})
const mapDispatchToProps = dispatch => ({
    hideShareModal: bindActionCreators(Actions.ResumeActions.hideShareModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareModalComponents);