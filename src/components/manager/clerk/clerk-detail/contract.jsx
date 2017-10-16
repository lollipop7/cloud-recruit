import React, {Component} from 'react';

import {Icon} from 'antd';
import PlusAttachmentModal from './attactment-modal'; 

import clerkInfo from 'data/clerk/clerk';

const constractData={name: '劳动合同', isShow: 1};

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class Contract extends Component {

    state = {
        itemData: {},
        attachment_type_con: []
    }

    componentWillReceiveProps(nextProps){
        const {
            attachment_type_con = []
        } = this.state;
        nextProps.atcs.forEach((value,index) => {
            attachment_type_con.push(value);
        })
        this.setState({
            attachment_type_con
        });
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextState !== this.state || nextProps !== this.props;
    }

    handleAttachmentClick = (itemData) => {
        this.setState({itemData});
        this.props.showAttachmentModal();
     }

    render() {
        const {
            starttime,          //合同开始日期
            yearnumber,         //合同年限
            endtime,            //合同结束日期
        } = this.props.data,
        {
            attachment_type_con,
            itemData
        } = this.state;
        return (
            <div className="contract clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                合同信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 60}}>
                                <li>
                                    <span>合同开始日期 : </span>
                                    <span>{starttime}</span>
                                </li>
                                <li>
                                    <span>合同年限 : </span>
                                    <span>{yearnumber}</span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>合同结束日期 : </span>
                                    <span>{endtime}</span>
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                合同附件
                            </h3>
                            {
                                attachment_type_con.map((value,index) => {
                                    const {name,isShow} = value;
                                    return(
                                        <div key={name} 
                                             className="add-attactment" 
                                             onClick={this.handleAttachmentClick.bind(this,value)}
                                             style={{display: isShow==1 ? 'inline-block' : 'none'}}
                                        >
                                            <Icon type="plus-circle-o"
                                                style={{ 
                                                    fontSize: 45, 
                                                    color: '#d2d2d2',
                                                }}
                                            />
                                            <p>{name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                </ul>
                <PlusAttachmentModal {...this.props} itemData={itemData}/> 
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
)(Contract)