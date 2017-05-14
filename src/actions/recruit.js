import * as types from 'constants/recruit';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

let defaultData = {};

// 开始请求分类统计信息
const LOAD_CATEGORY_START = {type:types.LOAD_CATEGORY_START};
// 请求分类统计信息结束
const LOAD_CATEGORY_DONE = {type:types.LOAD_CATEGORY_DONE};
// 获取招聘分类统计信息
const RECRUIT_CATEGORY = {type:types.RECRUIT_CATEGORY};
// 开始请求列表
const LOAD_LIST_START = {type:types.LOAD_LIST_START};
// 结束请求列表
const LOAD_LIST_DONE = {type:types.LOAD_LIST_DONE};
// 招聘人员信息列表
const RECRUIT_LIST = {type:types.RECRUIT_LIST};
// 显示详细信息MODAL
const SHOW_INFO_MODAL = {type:types.SHOW_INFO_MODAL};
// 隐藏详细信息MODAL
const HIDE_INFO_MODAL = {type:types.HIDE_INFO_MODAL};

export const getRecruitCategory = () => (dispatch,getState) => {
    dispatch(LOAD_CATEGORY_START);
    AjaxByToken('/web/jobclassCount',{
        head: {
            transcode: 'L0015'
        }
    })
    .then(res=>{
        dispatch(LOAD_CATEGORY_DONE);
        dispatch({...RECRUIT_CATEGORY,categoryData:res.list});
    });
}

export const getRecruitList = (data=defaultData) => (dispatch,getState) => {
    data.skip = data.skip + '';
    defaultData = {...data,count: '20'};
    const uri = '/web/queryResume';
    cancelRequestByKey(uri);
    dispatch(LOAD_LIST_START);
    AjaxByToken(uri,{
        head: {
            transcode: 'L0016',
        },
        data: defaultData
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        dispatch({...RECRUIT_LIST,recruitList:res});
    });
}

export const getTalentResume = (data) => (dispatch,getState) => {
    dispatch(LOAD_INFO_START);
    AjaxByToken('/web/resumeView',{
        head: {
            transcode: 'L0036'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_INFO_DONE);
        dispatch({...RECRUIT_INFO,recruitInfo:res});
    });
}

export const showResumeModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_INFO_MODAL,uriParams:data});
}

export const hideResumeModal = () => (dispatch,getState) => {
    dispatch(HIDE_INFO_MODAL);
}