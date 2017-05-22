import React, {Component} from 'react';

import { Collapse } from 'antd';
const Panel = Collapse.Panel;

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class PersonInfoListComponent extends Component {

    componentWillUnmount() {
        this.props.resetEmailBoxDetail();
    }

    render() {
        const {list} = this.props;
        const text = 'test collapse panel';
        return (
            <div className="list-block">
                <div className="personInfo-list">
                     <Collapse accordion>
                     {
                         list.map((item,index)=>{
                             const {
                                 resumename,
                                 fromaddress,
                                 toaddress,
                                 title,
                                 content,
                                 srdateStr
                                } = item;
                             const header = (
                                <div className="table header">
                                    <div className="table-cell">发件</div>
                                    <div className="table-cell">
                                        <img src="/static/images/email/head.png" alt="头像" />
                                    </div>
                                    <div className="table-cell" style={{
                                        width: 275
                                    }}>
                                        {resumename}
                                    </div>
                                    <div className="table-cell" style={{
                                        width: 380,
                                        textAlign: 'center'
                                    }}>{title}</div>
                                    <div className="table-cell">{srdateStr}</div>
                                </div>
                             );
                             return (
                                <Panel header={header} key={index}>
                                    <ul className="list">
                                        <li>
                                            收件人 : {fromaddress}
                                        </li>
                                        <li>
                                            发件人 : {toaddress}
                                        </li>
                                        <li>
                                            主题 : {title}
                                        </li>
                                        <li dangerouslySetInnerHTML={{__html:content}}>
                                        </li>
                                    </ul>
                                </Panel>
                             )
                         })
                     }
                    </Collapse>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.Email.personHistoryList
})
const mapDispatchToProps = dispatch => ({
    resetEmailBoxDetail: bindActionCreators(Actions.EmailActions.resetEmailBoxDetail, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonInfoListComponent);