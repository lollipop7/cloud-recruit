import React, {Component} from 'react';

import {Icon} from 'antd';

import PlusAttachmentModal from './attactment-modal'; 

const basicData=['工资卡','身份证原件'];
const beforeData=['劳动合同','入职登记表','入职体检报告','上家公司离职证明','其他'];
const afterData=['离职证明','离职交接表'];

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MaterialAttach extends Component {

    state = {
        title: ''
    }

    handleAttachmentClick = (title) => {
       this.setState({title});
       this.props.showAttachmentModal();
    }

    render() {
        const {title} = this.state;
        return (
            <div className="material-attach clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">基本资料</h3>
                            {
                                basicData.map((item,index) => {
                                    return(
                                        <div key={item} className="add-attactment" onClick={this.handleAttachmentClick.bind(this,item)}>
                                            <Icon type="plus-circle-o"
                                                style={{ 
                                                    fontSize: 45, 
                                                    color: '#d2d2d2',
                                                }}
                                            />
                                            <p>{item}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">档案附件</h3>
                            {
                                beforeData.map((item,index) => {
                                    return(
                                        <div key={item} className="add-attactment" onClick={this.handleAttachmentClick.bind(this,item)}>
                                            <Icon type="plus-circle-o"
                                                style={{ 
                                                    fontSize: 45, 
                                                    color: '#d2d2d2',
                                                }}
                                            />
                                            <p>{item}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">离职资料</h3>
                            {
                                afterData.map((item,index) => {
                                    return(
                                        <div key={item} className="add-attactment" onClick={this.handleAttachmentClick.bind(this,item)}>
                                            <Icon type="plus-circle-o"
                                                style={{ 
                                                    fontSize: 45, 
                                                    color: '#d2d2d2',
                                                }}
                                            />
                                            <p>{item}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>    
                    </li>
                </ul>
                <PlusAttachmentModal {...this.props} title={title}/>                    
            </div>
        );
    }
}

const mapStateToProps = state => ({
    attactmentModal: state.Manage.attactmentModal
})

const mapDispatchToProps = dispatch => ({
    showAttachmentModal: bindActionCreators(Actions.ManageActions.showAttachmentModal,dispatch),
    hideAttachmentModal: bindActionCreators(Actions.ManageActions.hideAttachmentModal,dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MaterialAttach)