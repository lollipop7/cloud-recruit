import React, {Component} from 'react';

import {Button} from 'antd';

export default class EmailInfoComponent extends Component {

    state = {
        title: ''
    }

    setTitle = title => {
        this.setState({title});
    }

    inputEmailTheme = e => {
        this.setTitle(e.target.value);
    }

    render() {
        const {title} = this.state;
        const {addressee} = this.props;
        const {resumename,email} = addressee;
        return (
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
                                {resumename}
                            </div>
                            <div className="address">
                                {email}
                            </div>
                        </div>
                        <div className="table-cell">
                            <Button type="primary" onClick={this.props.sendEmail} >
                                发送邮件
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="theme">
                    <div className="table">
                        <div className="table-cell">
                            主题
                        </div>
                        <div className="table-cell">
                            <input 
                                type="text" 
                                placeholder="请输入邮件主题"
                                value={title}
                                onChange={this.inputEmailTheme}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}