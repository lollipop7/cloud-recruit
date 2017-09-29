import React, {Component} from 'react';
import { Modal, Tag , Button } from 'antd';

import {DatePickerComponent} from '../input-select-time';

export default class PermanentModal extends Component {
    render(){
        return(
            <Modal
                title="办理离职"
                wrapClassName="grey-close-header vertical-center-modal permanent-wrap"
                visible={visible}
                onCancel={hidePermanentModal}
                width={827}
            >
                <div className="base-info"
                    style={{
                        marginLeft: 28
                    }} 
                >
                    <ul>
                        <li>
                            <div className="inline-block">
                                {trim(name)}
                            </div>
                            {englishname && <div className="inline-block en-name">
                                {englishname}
                            </div>}
                        </li>
                        <li>
                                <span style={{
                                    marginRight: 6
                                }}>{department}</span>
                                {position && <span>|</span>}
                                {position && <span style={{
                                    marginLeft: 6
                                }}>{position}</span>}
                        </li>
                        <li>
                            <span style={{
                                marginRight: 6
                            }}>{sex}</span>
                            {birthday && <span>|</span>}
                            {birthday && <span style={{
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{parseInt(moment(birthday,"YYYYMMDD").fromNow())}岁</span>}
                            {inthetime && <span>|</span>}
                            {inthetime && <span style={{ 
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{moment(inthetime,"YYYYMMDD").fromNow()}</span>}
                        </li>
                    </ul>
                </div>
                <div className="regular-field">
                    <div className="pull-left">
                    
                    </div>
                </div>
            </Modal>
        )
    }
}