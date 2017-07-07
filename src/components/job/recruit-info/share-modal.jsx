import React, {Component} from 'react';

import {Modal,Tabs,Input} from 'antd';
const TabPane = Tabs.TabPane;

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

export default class ShareModalComponents extends Component {
    
    render(){
        return(
            <Modal>
                title="分享简历 `${}`"
                content="分享后，可以查看到该简历的面试评估表及招聘进度"
                <Tabs defaultActiveKey="1" size="small">
                    <TabPane tab="链接分享" key="1">
                        <div className="title">
                            通过公开链接分享简历
                        </div>
                        <div className="subTitle">
                            将链接通过QQ、微信等渠道分享给对方，对方即可查看该简历信息
                        </div>
                        <div className="inputGroup">
                            <Input addonAfter={'复制链接'}/>
                        </div>
                    </TabPane>
                    <TabPane tab="二维码分享" key="2">Content of tab 2</TabPane>
                </Tabs>
            </Modal>
        )
    }
}