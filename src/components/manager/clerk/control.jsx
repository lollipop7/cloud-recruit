import React, {Component, PropTypes} from 'react';
import { Button, Menu, Dropdown,Icon } from 'antd';

import UploadClerkModal from './upload-clerk-modal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


class ControlComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    handleLinkTo = () => {
        this.context.router.push(`manager/newClerkForm`);
        NProgress.start();
    }

    handlePlusClerkClick = (e) => {
        switch(e.key){
            case '1': this.props.showUploadClerkModal(); break;
            case '2': this.handleLinkTo(); break;
        }
    }

    render() {
        const { 
            title,
        } = this.props;

        const plusClerkMenu = (
            <Menu onClick={this.handlePlusClerkClick}>
              <Menu.Item key="1">导入Excel人员信息</Menu.Item>
              <Menu.Item key="2">手动添加</Menu.Item>
            </Menu>
        );

        return (
            <div className="control">
                <div className="pull-left">
                    <h2>{title}</h2>
                </div>
                <div className="pull-right">
                    <Dropdown overlay={plusClerkMenu}>
                        <Button style={{ width: 100 }} type="primary">
                            添加员工
                            <img src="static/images/manager/arrow-down.png" alt="选择"/>
                        </Button>
                    </Dropdown>
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
                <UploadClerkModal {...this.props}/>
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