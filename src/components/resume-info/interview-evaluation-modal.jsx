import React, {Component} from 'react';

import {Modal,Input,Radio,Button,Table} from 'antd';
const RadioGroup = Radio.Group;

import radioData from 'data/evaluation-radio.json';
import navData from 'data/nav/evaluation.json';
import columns from 'data/table-columns/evaluate-table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class EvaluationModalComponents extends Component {
    state = {
        data: [],
        isShowQrcode: false
    }

    componentDidMount(){
        const data = [];
        for(let i=0;i<navData.length;i++){
            data.push({
                applicantstatus: navData[i].title,
                worse: <Radio/>,
                normal: <Radio/>,
                quitesatisfy: <Radio/>,
                good: <Radio/>,
                great: <Radio/>
            });
        }
        this.setState({data});
    }

    hideQrcodeShare = () => {
        this.setState({
            isShowQrcode: false
        });
    }

    showQrcodeShare = () => {
        this.setState({
            isShowQrcode: true
        });
    }

    render(){
        const {evaluationModalVisible,isLoading} = this.props,
        {data} = this.state;
        return(
            <Modal
                title = "面试评估表"
                width = {828}
                visible = {evaluationModalVisible}
                className = "evaluationModal"
                onCancel={isLoading ? ()=>{} : this.props.hideEvaluationModal}
                >
                <div className="qrcode-write" style = {{
                    right: this.state.isShowQrcode ? '-156px' : '',
                    display: this.state.isShowQrcode ? "block" : 'none'
                }}>
                    <b className="left-arrow inline-block vertical-center "></b>
                    <img src="./static/images/resume/qrcode-share.png" alt="分享"/>
                    <p>微信扫描分享填写</p>
                </div>
                <div className="table"  style={{marginBottom: 40}}>
                    <div className="table-cell">
                        <span className="title">候选人姓名:</span>
                    </div>
                    <div className="table-cell">
                        <Input/>
                    </div>
                    <div className="table-cell">
                        <span className="title">面试主管:</span>
                    </div>
                    <div className="table-cell">
                        <Input/>
                    </div>
                    <div className="table-cell">
                        <span className="title">邀请他人填写</span>
                    </div>
                    <div className="table-cell">
                        <Button className="share" 
                                onMouseLeave={this.hideQrcodeShare} 
                                onMouseOver={this.showQrcodeShare} >
                            <img 
                                style = {{
                                    width: 40,
                                    height: 40
                                }}
                                src="./static/images/resume/share.jpg" alt="分享"/>
                         </Button>
                    </div>                    
                </div>
                <Table 
                    columns={columns}
                    loading={isLoading}
                    pagination={false}
                    dataSource={
                        data.map((item,index)=>{
                           item.key = index;
                           return item;
                        })
                    }
                />
                <div className="table" style={{marginTop: 40}}>
                    <div className="table-cell" style={{verticalAlign: "top"}}>
                        <span className="title">
                            评语：
                        </span>
                    </div>
                    <div className="table-cell">
                        <Input type="textarea" rows="3" 
                            style={{
                                width: 682,
                                height: 130,
                                resize: "none"
                            }}/>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    evaluationModalVisible: state.Resume.evaluationModalVisible,
    isLoading: state.Resume.isModalLoading,
})
const mapDispatchToProps = dispatch => ({
    hideEvaluationModal: bindActionCreators(Actions.ResumeActions.hideEvaluationModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EvaluationModalComponents);