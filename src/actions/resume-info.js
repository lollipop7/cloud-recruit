import * as types from 'constants/resume-info';

// download
import axios from 'axios';
import store from 'store';
import FileSaver from 'file-saver';

import { message } from 'antd';

import {AjaxByToken } from 'utils/ajax';

// 招聘人员详细信息
const LOAD_RESUME_INFO = {type:types.LOAD_RESUME_INFO};
// 开始获取招聘人员详细信息
const LOAD_INFO_START = {type:types.LOAD_INFO_START};
// 获取招聘人员详细信息结束
const LOAD_INFO_DONE = {type:types.LOAD_INFO_DONE};

// 显示Modal 确定按钮loading
const SHOW_MODAL_LOADING ={type:types.SHOW_MODAL_LOADING};
// 隐藏Modal 确定按钮loading
const HIDE_MODAL_LOADING = {type:types.HIDE_MODAL_LOADING};

// 下载简历
const DOWNLOAD_RESUME_START = {type:types.DOWNLOAD_RESUME_START};
const DOWNLOAD_RESUME_DONE = {type:types.DOWNLOAD_RESUME_DONE};
const DOWNLOAD_RESUME = {type:types.DOWNLOAD_RESUME};

const SHOW_MODAL = {type:types.SHOW_MODAL};
const HIDE_MODAL = {type:types.HIDE_MODAL};

const SHOW_SHARE_MODAL = {type:types.SHOW_SHARE_MODAL};
const HIDE_SHARE_MODAL = {type:types.HIDE_SHARE_MODAL};

//面试评估表
const SHOW_INTERVIEW_EVALUATION_MODAL = {type:types.SHOW_INTERVIEW_EVALUATION_MODAL};
const HIDE_INTERVIEW_EVALUATION_MODAL = {type:types.HIDE_INTERVIEW_EVALUATION_MODAL};

//添加面试评估
const GET_EVALUATION = {type:types.GET_EVALUATION}

//添加面试评估ID
const GET_EVALUATION_ID = {type:types.GET_EVALUATION_ID}

//简历信息分享
const RESUME_INFORMATION = {type:types.RESUME_INFORMATION}

//得到招聘流程人员详细信息(根据简历id和流程id)
export const getRecruitResumeInfo = (data) => (dispatch,getState) => {
    /**
     * resumeId: resumeId,
     * logId: logId
     */
    dispatch(LOAD_INFO_START);
    AjaxByToken('getResumeById',{
        head: {
            transcode: 'L0017'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_INFO_DONE);
        dispatch({...LOAD_RESUME_INFO,resumeInfo:res});
    });
}

// export const getRecruitResumeInfo = (data) => (dispatch,getState) => {
//         dispatch(LOAD_INFO_START);
//         axios({
//             url: '/hrmanage/api /web/getResumeById',
//             method: 'post',
//             data: {...data,...{
//                 head:{
//                     type:'h',
//                     transcode: 'L0017'
//                 }
//             }},
//             header: {
//                 contentType: 'application/x-www-form-urlencoded'
//             },
//         })
//         .then(res=>{
//             console.log(res);
//             dispatch(LOAD_INFO_DONE);
//             dispatch({...LOAD_RESUME_INFO,resumeInfo:res});
//         });
//     }


// 获取流程log(根据简历id和职位id)
export const getStageLog = (data) => (dispatch,getState) => {
    dispatch(LOAD_INFO_START);
    AjaxByToken('detailsByPosition',{
        head: {
            transcode: 'L0019'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_INFO_DONE);
        dispatch({...LOAD_RESUME_INFO,resumeInfo:res});
    });
}

// 根据简历id查询具体信息
export const getTalentResumeInfo = (data) => (dispatch,getState) => {
    dispatch(LOAD_INFO_START);
    AjaxByToken('resumeView',{
        head: {
            transcode: 'L0040'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_INFO_DONE);
        dispatch({...LOAD_RESUME_INFO,resumeInfo:res});
    },err=>{
        console.log(err);
    });
}

// export const getTalentResumeInfo = (data) => (dispatch,getState) => {
//         dispatch(LOAD_INFO_START);
//         axios({
//             url: '/hrmanage/api /web/resumeView',
//             method: 'post',
//             data: {...data,...{
//                 head:{
//                     type:'h',
//                     transcode: 'L0040'
//                 }
//             }},
//             header: {
//                 contentType: 'application/x-www-form-urlencoded'
//             },
//         })
//         .then(res=>{
//             dispatch(LOAD_INFO_DONE);
//             dispatch({...LOAD_RESUME_INFO,resumeInfo:res});
//         });
//     }

// 下载简历
export const downloadResume = (data,username) => (dispatch,getState) => {
    dispatch(DOWNLOAD_RESUME_START);
    const token = store.get('token');
    axios({
        url: `${prefixUri}/downloadResume`,
        method: 'post',
        data: {data:{...token,...data},...{
            head:{
                type:'h',
                transcode: 'L0023'
            }
        }},
        header: {
            contentType: 'application/json;charset=utf-8'
        },
    })
    .then(res=>{
        NProgress.done();
        const {data} = res;
        var blob = new Blob([data],{type: "text/html;charset=utf-8"});
        FileSaver.saveAs(blob ,`${username}的个人简历.html`);
        dispatch(DOWNLOAD_RESUME_DONE);
    });
}

// 更改流程状态
export const changeStageStatus = (data,props) => (dispatch,getState) => {
    dispatch(SHOW_MODAL_LOADING);
    AjaxByToken('changeStageStatus',{
        head: {
            transcode: 'L0020'
        },
        data: data
    })
    .then(res=>{
        dispatch(HIDE_MODAL_LOADING);
        // 隐藏Modal
        dispatch(HIDE_MODAL);
        const {currentStage,getStageLog} = props;
        const {positionid,resumeid} = currentStage;
        getStageLog({
            positionId: positionid,
            resumeId: resumeid,
        });
        window.parent.postMessage('rerequest','*');
    },err=>{
        dispatch(HIDE_MODAL_LOADING);
    });
}

//简历分享参数
export const getResumeUrl = (data) => (dispatch,getState) => {
    AjaxByToken("employeeinfo/resumeUrl",{
        head:{
            transcode:"L0064"
        },
        data: data
    })
    .then(res=>{
        dispatch({...RESUME_INFORMATION,resumeUrl:res})
    },err=>{
        message.error('获取简历参数失败！');
    })
}

//添加面试评估
export const addEvaluation = (data,props) => (dispatch,getState) => {
    AjaxByToken('evaluationEdit',{
        head: {
            transcode: 'L0063'
        },
        data: data
    })
    .then(res=>{
        const {getEvaluationId,jobid,resumeid,getEvaluation,evaluationid,evaluationId} = props; 
        if (!evaluationid && !evaluationId){
                getEvaluationId({
                positionid: jobid,
                resumeid: resumeid,
            },getEvaluation);
            message.success('添加评估表成功！');
        } else {
            message.success('修改评估表成功！');
        }       
    },err=>{
        const {evaluationid,evaluationId} = props; 
        if (!evaluationid && !evaluationId){
            message.error('添加评估表失败！');
        } else {
            message.success('修改评估表失败！');
        }  
    });
}

//获取评估表内容
export const getEvaluation = (data) => (dispatch,getState) => {
    AjaxByToken('employeeinfo/getResumeEvaluationById',{
        head: {
            transcode: 'L0066'
        },
        data: data,
         header: {
            contentType: 'application/json;charset=utf-8'
        },
    })
    .then(res=>{
        dispatch({...GET_EVALUATION,evaluation:res.evaluation})
    },err=>{
        message.error('获取评估表失败！');
    });
}

//获取面试评估表id
export const getEvaluationId = (data,getEvaluation) => (dispatch,getState) => {
    AjaxByToken('getInterviewForm',{
        head: {
            transcode: 'L0070'
        },
        data: data
    })
    .then(res=>{
        getEvaluation({evaluationId:`${res.evaluationId}`})
        dispatch({...GET_EVALUATION_ID,evaluationid:res.evaluationId})
    },err=>{
        message.error('获取失败！');
    });
}

export const showModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_MODAL,currentStage:data});
}

export const hideModal = () => (dispatch,getState) => {
    dispatch(HIDE_MODAL);
}

export const showShareModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_SHARE_MODAL,resumeData:data});
}

export const hideShareModal = () => (dispatch,getState) => {
    dispatch(HIDE_SHARE_MODAL);
}

export const showEvaluationModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_INTERVIEW_EVALUATION_MODAL,evaluationData:data});
}

export const hideEvaluationModal = () => (dispatch,getState) => {
    dispatch(HIDE_INTERVIEW_EVALUATION_MODAL);
}
