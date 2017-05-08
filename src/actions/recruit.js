import * as types from 'constants/recruit';
import {AjaxByToken} from 'utils/ajax';

import extend from 'lodash/extend';

// 获取招聘分类统计信息
const RECRUIT_CATEGORY = {type:types.RECRUIT_CATEGORY};
// 招聘人员信息列表
const RECRUIT_LIST = {type:types.RECRUIT_LIST};
// 招聘人员详细信息
const RECRUIT_INFO = {type:types.RECRUIT_INFO};
// 开始获取招聘人员详细信息
const LOAD_INFO_START = {type:types.LOAD_INFO_START};
// 获取招聘人员详细信息结束
const LOAD_INFO_DONE = {type:types.LOAD_INFO_DONE};
// 显示详细信息MODAL
const SHOW_INFO_MODAL = {type:types.SHOW_INFO_MODAL};
// 隐藏详细信息MODAL
const HIDE_INFO_MODAL = {type:types.HIDE_INFO_MODAL};

export const getRecruitCategory = () => (dispatch,getState) => {
    dispatch(LOAD_INFO_START);
    AjaxByToken('/web/jobclassCount',{
        head: {
            transcode: 'L0015'
        }
    })
    .then(res=>{
        dispatch(LOAD_INFO_DONE);
        dispatch(extend({},RECRUIT_CATEGORY,{categoryData:res.list}));
    });
}

export const getRecruitList = () => (dispatch,getState) => {
    AjaxByToken('/web/queryResume',{
        head: {
            transcode: 'L0016'
        }
    })
    .then(res=>{
        console.log(res);
        // dispatch(Object.assign({},RECRUIT_CATEGORY,{categoryData:res.list}));
    });
}

// 得到招聘流程人员详细信息
export const getResumeInfo = (data) => (dispatch,getState) => {
    AjaxByToken('/web/getResumeById',{
        head: {
            transcode: 'L0017'
        },
        data: data
    })
    .then(res=>{
        dispatch(extend({},RECRUIT_INFO,{recruitInfo:res}));
    });
}

export const showResumeModal = () => (dispatch,getState) => {
    dispatch(SHOW_INFO_MODAL);
}

export const hideResumeModal = () => (dispatch,getState) => {
    dispatch(HIDE_INFO_MODAL);
}