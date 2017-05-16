import React, {Component} from 'react';

import {Button} from 'antd';

export default class RightComponents extends Component {
    render() {
        return (
            <div className="box-border">
                <div className="email-msg">
                    <div className="send-people">
                        <div className="table">
                            <div className="table-cell">
                                收件人
                            </div>
                            <div className="table-cell">
                                <img src="/static/images/email/head.png" alt="头像"/>
                            </div>
                            <div className="table-cell">
                                <div className="name">
                                    张学友
                                </div>
                                <div className="address">
                                    alicewang@163.com
                                </div>
                            </div>
                            <div className="table-cell">
                                <Button type="primary">
                                    发送邮件
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="theme">
                        <div className="field">
                            主题
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}