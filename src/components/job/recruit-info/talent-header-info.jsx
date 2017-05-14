import React, {Component} from 'react';
import {Button} from 'antd';

import trim from 'lodash/trim';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TalentHeaderInfoComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    printResume() {
        // 打印简历
        window.print();
    }

    downloadResume = () => {
        // 下载简历
        const {data} = this.props;
        /**
         * currentPId 当前职位id
         * resumeid 简历id
         */
        const {resumeid} = data;
        this.props.downloadResume({
            resumeid
        });
    }

    render() {
        const {data} = this.props,
            {
                resumeInfo={}
            } = data,
            {
                headimg, // 头像
                username, //姓名
                telephone, //电话
                email, //邮箱
                workyears, //工作年限
                educationbg, //学历
                channel, // 简历来源
            } = resumeInfo;
        return (
            <div className="header-info">
                <div>
                    <div className="inline-block">
                        <img src={headimg && headimg !== '' ? headimg : "./static/images/head.jpg"} alt="默认头像" />
                    </div>
                    <div className="info-right inline-block">
                        <ul>
                            <li style={{
                                overflow: 'hidden',
                                minHeight: 40
                            }}>
                                <div className="pull-left">
                                    <span>{trim(username)}</span>
                                    <span style={{
                                        marginLeft: 30,
                                        marginRight: 17
                                    }}>{telephone}</span>
                                    {email && <span>|</span>}
                                    <span style={{
                                        marginLeft: 17
                                    }}>{email}</span>
                                </div>
                                <div className="pull-right noprint">
                                    <Button type="primary" onClick={this.downloadResume}>
                                        简历下载
                                    </Button>
                                    <Button type="primary" onClick={this.printResume} >
                                        打印简历
                                    </Button>
                                </div>
                            </li>
                            <li>
                                <span style={{
                                    marginRight: 6
                                }}>{workyears}</span>
                                {educationbg && <span>|</span>}
                                <span style={{
                                    marginLeft: 6
                                }}>{educationbg}</span>
                            </li>
                            <li style={{
                                marginTop: 14
                            }}>
                                简历来源 : {channel === 'unknown' ? '其他' : channel}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
    downloadResume: bindActionCreators(Actions.ResumeActions.downloadResume, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalentHeaderInfoComponent);