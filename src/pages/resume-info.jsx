import React, {Component} from 'react';

// components
import HeaderInfoComponent from 'components/job/recruit-info/header-info';
import MainContentComponent from 'components/job/recruit-info/main-content';

import ModalComponents from 'components/resume-info/modal';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ResumeInfoPage extends Component {

    state = {
        type: 0
    }

    componentDidMount() {
        const {resumeId,logId} = this.props.routeParams;
        if(resumeId && logId){
            // 获取简历详情
            this.props.getRecruitResumeInfo({
                resumeId: resumeId,
                logId: logId
            });
        }else if(resumeId){
            // this.props.getTalentResume({
            //     resumeid: resumeId
            // });
        }
    }

    handleChangeType(type){
        this.setState({type});
    }

    render() {
        const {type} = this.state,
            {isLoading,resumeInfo} = this.props;
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
                            <HeaderInfoComponent 
                                data={resumeInfo}
                            />
                            <ul className="table tabs-container">
                                <li className="table-cell empty"></li>
                                <li 
                                    className={`tab-item table-cell boder-right-none ${!!type ? '' : 'active'}`}
                                    onClick={this.handleChangeType.bind(this,0)}
                                >
                                    个人简历
                                </li>
                                <li 
                                    className={`tab-item table-cell ${!!type ? 'active' : ''}`}
                                    onClick={this.handleChangeType.bind(this,1)}
                                >
                                    邮件
                                </li>
                                <li className="table-cell empty"></li>
                            </ul>
                            <div className="main-content">
                                <div className={`info-content ${!!type ? 'none' : ''}`}>
                                    <MainContentComponent data={resumeInfo} />
                                </div>
                                <div className={`email-content ${!!type ? '' : 'none'}`}>
                                    邮件
                                </div>
                            </div>
                            <ModalComponents />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    resumeInfo: state.Resume.resumeInfo,
    isLoading: state.Resume.isInfoLoading
})
const mapDispatchToProps = dispatch => ({
    getRecruitResumeInfo: bindActionCreators(Actions.ResumeActions.getRecruitResumeInfo, dispatch),
    // getTalentResume: bindActionCreators(Actions.ResumeActions.getTalentResume, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeInfoPage);