import * as types from 'constants/resume-info';
import {AjaxByToken} from 'utils/ajax';

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

const SHOW_MODAL = {type:types.SHOW_MODAL};
const HIDE_MODAL = {type:types.HIDE_MODAL};

// 得到招聘流程人员详细信息(根据简历id和流程id)
export const getRecruitResumeInfo = (data) => (dispatch,getState) => {
    /**
     * resumeId: resumeId,
     * logId: logId
     */
    dispatch(LOAD_INFO_START);
    AjaxByToken('/web/getResumeById',{
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

// 获取流程log(根据简历id和职位id)
export const getStageLog = (data) => (dispatch,getState) => {
    dispatch(LOAD_INFO_START);
    AjaxByToken('/web/detailsByPosition',{
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

// 更改流程状态
export const changeStageStatus = (data,props) => (dispatch,getState) => {
    dispatch(SHOW_MODAL_LOADING);
    AjaxByToken('/web/changeStageStatus',{
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
            resumeId: resumeid
        });
        window.parent.postMessage('rerequest','*');
    });
}

export const showModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_MODAL,currentStage:data});
}

export const hideModal = () => (dispatch,getState) => {
    dispatch(HIDE_MODAL);
}