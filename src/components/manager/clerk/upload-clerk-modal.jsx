import React, {Component} from 'react';
import { Modal } from 'antd';

export default class UploadClerkModal extends Component {
    render(){
        return(
            <Modal
                title="导入excel人员"
                wrapClassName="grey-close-header"
                visible={visible}
                onCancel={isLoading ? () => {} : hideModal}
                footer={null}
            >
                <div className="drag-wrap">

                </div>
            </Modal>
        )
    }
}