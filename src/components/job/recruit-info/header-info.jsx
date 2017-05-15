import React, {Component} from 'react';
import {Button} from 'antd';

import trim from 'lodash/trim';
import find from 'lodash/find';

import StepsComponent from 'components/steps';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class HeaderInfoComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    printResume() {
        // 打印简历
        window.print();
    }

    mapChannelToChinese(channel) {
        switch(channel){
            case '51job':
                return '前程无忧';
            case 'zhilian':
                return '智联招聘';
            case 'unknown':
                return '其他';
        }
    }

    downloadResume = () => {
        // 下载简历
        const {data} = this.props;
        /**
         * currentPId 当前职位id
         * resumeid 简历id
         */
        const {resumeid} = data;
        this.props.downloadResume({
            resumeid
        });
    }

    getCurrentStage =()=> {
        const {stagesMap} = this.props.data;
        if(stagesMap){
            const currentStage = find(stagesMap,item=>{
                return item.iscurrentstage === '1';
            })
            return currentStage;
        }
        return {};
    }

    changeStage = () => {
        const currentStage = this.getCurrentStage();
        // stageid为7 状态流程已结束
        if(currentStage.stageid === '7') return ;
        this.props.showModal(currentStage);
    }

    // 图片onError事件
    imgOnError = event => {
        const img = event.target;
        img.src = './static/images/head.jpg';
        img.onError = null;
    }

    render() {
        const {data} = this.props,
            {
                resumeInfo={},
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
        return (
            <div className="header-info">
                <div>
                    <div className="inline-block">
                        <img 
                            src={headimg && headimg !== '' ? headimg : "./static/images/head.jpg"} 
                            alt="默认头像" 
                            onError={this.imgOnError}
                        />
                    </div>
                    <div className="info-right inline-block">
                        <ul>
                            <li style={{
                                overflow: 'hidden',
                                minHeight: 40
                            }}>
                                <div className="pull-left">
                                    <span>{trim(username)}</span>
                                    <span style={{
                                        marginLeft: 30,
                                        marginRight: 17
                                    }}>{telephone}</span>
                                    {email && <span>|</span>}
                                    <span style={{
                                        marginLeft: 17
                                    }}>{email}</span>
                                </div>
                                <div className="pull-right noprint">
                                    <Button type="primary" onClick={this.downloadResume}>
                                        简历下载
                                    </Button>
                                    <Button type="primary" onClick={this.printResume} >
                                        打印简历
                                    </Button>
                                </div>
                            </li>
                            <li>
                                <span style={{
                                    marginRight: 6
                                }}>{workyears}</span>
                                {educationbg && <span>|</span>}
                                <span style={{
                                    marginLeft: 6
                                }}>{educationbg}</span>
                            </li>
                            <li style={{
                                marginTop: 14
                            }}>
                                简历来源 : {this.mapChannelToChinese(channel)}
                            </li>
                            <li style={{
                                marginTop: 15
                            }}>
                                申请职位 : {currentPName}
                            </li>
                            <li style={{
                                marginTop: 15
                            }}>
                                职位区域 : {currentPworkcity}
                            </li>
                        </ul>
                        <StepsComponent stagesMap={stagesMap} />
                    </div>
                    <div className="info-bottom">
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0
                        }}>
                            <span>同时申请职位 :</span>
                            <ul className="inline-block" style={{
                                listStyleType: 'none'
                            }}>
                                {
                                    positions.map((item,index)=>{
                                        return (
                                            <li key={index} className="inline-block">
                                                &nbsp;{index+1}.{item.positionname}{index !== positions.length - 1 ? ' ;' : ''}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="noprint" style={{
                            position: 'absolute',
                            right: 0
                        }}
                        onClick={this.changeStage}
                        >
                            <img src="./static/images/left-arrow.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Recruit.isInfoLoading
})
const mapDispatchToProps = dispatch => ({
    downloadResume: bindActionCreators(Actions.ResumeActions.downloadResume, dispatch),
    showModal: bindActionCreators(Actions.ResumeActions.showModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderInfoComponent);