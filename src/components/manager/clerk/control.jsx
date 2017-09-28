import React, {Component, PropTypes} from 'react';
import { Button, Select  } from 'antd';

import UploadClerkModal from './upload-clerk-modal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ControlComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state={
        context: '添加员工'
    }

    handleLinkTo = () => {
        this.context.router.push(`manager/newClerkForm`);
        NProgress.start();
    }

    handleAddClerk = (value) => {
        switch(value){
            case '导入Excel人员信息': this.props.showUploadClerkModal(); break;
            case '手动添加': this.handleLinkTo(); break;
        }
    }

    handleContext =(context) =>{
        this.setState({
            context
        })
    }

    render() {
        const { 
            title,
        } = this.props,
        {context} = this.state;
        return (
            <div className="control">
                <div className="pull-left">
                    <h2>{title}</h2>
                </div>
                <div className="pull-right">
                    <Select   
                            style={{ width: 100}}
                            value={context}
                            dropdownMatchSelectWidth={false}
                            onChange = {this.handleAddClerk}
                    >          
                        {
                            ["导入Excel人员信息",
                            "手动添加",
                            ].map((item,index)=>{
                                return (
                                    <Option  key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                      
                    </Select>    
                    <Button
                        style={{
                            width: 170,
                        }}
                    >
                        按入职时间从早到晚
                        <img src="static/images/manager/arrow-up.png" alt="选择"/>
                    </Button>
                    <Button
                        style={{
                            width: 100
                        }}
                    >
                        导出
                    </Button>
                    <Button
                        style={{
                            width: 100
                        }}
                    >
                        删除
                    </Button>
                </div>
                <div className="clearfix"></div>
                <UploadClerkModal 
                    {...this.props}
                    handleContext={this.handleContext}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    uploadClerkModal: state.Manage.uploadClerkModal
})

const mapDispatchToProps = dispatch => ({
    showUploadClerkModal: bindActionCreators(Actions.ManageActions.showUploadClerkModal,dispatch),
    hideUploadClerkModal: bindActionCreators(Actions.ManageActions.hideUploadClerkModal,dispatch),
    removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch),
    uploadClerkExcel: bindActionCreators(Actions.ManageActions.uploadClerkExcel, dispatch),
    setResetFormFalse: bindActionCreators(Actions.ManageActions.setResetFormFalse, dispatch),
    downloadTememployees: bindActionCreators(Actions.ManageActions.downloadTememployees, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlComponent)