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
        data: []
    }

    componentDidMount(){
        let data = [];
        for(let i=0;i<navData.length;i++){
            data.push({
                worse: '1',
                normal: '2',
                quitesatisfy: '3',
                good: '4',
                great: '5',
                applicantstatus: navData[i].title
            });
        }
        this.setState({data});
    }

    handleShare = () => {
        console.log("显示二维码");
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
                <div className="table">
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
                        <Button className="share" onClick={this.handleShare} >
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
                <div className="table">
                    <div className="table-cell" style={{verticalAlign: "top"}}>
                        <span className="title">
                            评语：
                        </span>
                    </div>
                    <div className="table-cell">
                        <Input type="textarea" rows="3" 
                            style={{
                                width: 682,
                                height: 130
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