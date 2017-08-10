import React, {Component} from 'react';

// components
import HeaderInfoComponent from 'components/job/recruit-info/header-info';
import TalentHeaderInfoComponent from 'components/job/recruit-info/talent-header-info';
import MainContentComponent from 'components/job/recruit-info/main-content';

import ModalComponents from 'components/resume-info/modal';
import ShareModalComponents from 'components/resume-info/share-modal';
import EvaluationModalComponents from 'components/resume-info/interview-evaluation-modal';

// 富文本编辑器
import EmailEditorComponents from 'components/email/right';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ResumeInfoPage extends Component {

    state = {
        type: 0
    }

    componentDidMount() {
        const {location,routeParams} = this.props,
            {resumeId,logId} = routeParams;    
            if(this.isInRecruitPage(location.pathname)) {
                debugger;
                // 获取简历详情
                this.props.getRecruitResumeInfo({
                    resumeId: resumeId,
                    logId: logId
                });
            }
            if(this.isInTalentPage(location.pathname)){
                this.props.getTalentResumeInfo({
                    resumeid: resumeId
                });
            }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    handleChangeType = (type) => {
        this.setState({type});
    }

    isInTalentPage(pathname) {
        const patternTalent = /\/resumeInfo\/\d{1,}$/i;
        return patternTalent.test(pathname);
    }
    isInRecruitPage(pathname) {
        const patternRecruit = /\/resumeInfo\/\d{1,}\/\d{1,}$/i;
        return patternRecruit.test(pathname);
    }

    render() {
        const {type} = this.state,
            {isLoading,data,location} = this.props;
        const isTalent = this.isInTalentPage(location.pathname),
            isRecruit = this.isInRecruitPage(location.pathname);
        const {resumeid,currentPId,resumeInfo={}} = data;
        const {username,email} = resumeInfo;
        return (
            <div className="resume-info-container" style={{
                height: isLoading ? '100%' : '',
                padding: isLoading ? '' : '20px 30px'
            }}>
                {isLoading &&
                    <div id="common-loader" className="common-loader page-loader theme-loader">
                        <div className="spinner">
                            <div className="dot1"></div>
                            <div className="dot2"></div>
                        </div>
                    </div>
                }
                {!isLoading &&
                        <div>
                            {isTalent && 
                                <TalentHeaderInfoComponent 
                                    data={data}
                                />
                            }
                            {isRecruit &&
                                <HeaderInfoComponent 
                                    data={data}
                                />
                            }
                            {isRecruit &&
                                <ul className="table tabs-container">
                                    <li className="table-cell empty"></li>
                                    <li 
                                        className={`tab-item table-cell boder-right-none ${!!type ? '' : 'active'}`}
                                        onClick={() => this.handleChangeType(0)}
                                    >
                                        个人简历
                                    </li>
                                    <li 
                                        className={`tab-item table-cell ${!!type ? 'active' : ''}`}
                                        onClick={() => this.handleChangeType(1)}
                                    >
                                        邮件
                                    </li>
                                    <li className="table-cell empty"></li>
                                </ul>
                            }
                            <div className="main-content" style={{
                                marginTop: isTalent ? 36 : 0
                            }}>
                                <div className={`info-content ${!!type ? 'none' : ''}`}>
                                    <MainContentComponent data={data} />
                                </div>
                                {isRecruit &&
                                    <div className={`email-content ${!!type ? '' : 'none'}`}>
                                        <EmailEditorComponents
                                            addressee={{
                                                resumeid,
                                                ...{positionid: currentPId},
                                                ...{resumename: username},
                                                email
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                            <ModalComponents />
                            {/*简历分享Modal*/}
                            <ShareModalComponents/>
                            {/*面试评估表*/}
                            <EvaluationModalComponents/>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Resume.resumeInfo,
    isLoading: state.Resume.isInfoLoading
})
const mapDispatchToProps = dispatch => ({
    getRecruitResumeInfo: bindActionCreators(Actions.ResumeActions.getRecruitResumeInfo, dispatch),
    getTalentResumeInfo: bindActionCreators(Actions.ResumeActions.getTalentResumeInfo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeInfoPage);