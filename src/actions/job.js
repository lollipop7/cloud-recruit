import * as types from 'constants/job.js';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import extend from 'lodash/extend';

import isNumber from 'lodash/isNumber';

// 职位统计
const JOB_CATEGORY = {type:types.JOB_CATEGORY};
// 职位统计加载中
const LOAD_CATEGORY_START = {type:types.LOAD_CATEGORY_START};
const LOAD_CATEGORY_DONE = {type:types.LOAD_CATEGORY_DONE};
// 职位列表
const JOB_LIST = {type:types.JOB_LIST};
// 职位列表加载中
const LOAD_LIST_START = {type:types.LOAD_LIST_START};
const LOAD_LIST_DONE = {type:types.LOAD_LIST_DONE};
// 职位详细信息
const JOB_INFO = {type:types.JOB_INFO};
// 职位信息加载中
const LOAD_INFO_START = {type:types.LOAD_INFO_START};
const LOAD_INFO_DONE = {type:types.LOAD_INFO_DONE};

// 创建职位
const CREATE_JOB = {type:types.CREATE_JOB};

// 获取职位分类统计
export const getJobCategory = () => (dispatch,getState) => {
    dispatch(LOAD_CATEGORY_START);
    AjaxByToken('/web/PositionStatus',{
        head: {
            transcode: 'L0011'
        }
    })
    .then(res=>{
        dispatch(LOAD_CATEGORY_DONE);
        dispatch(extend({},JOB_CATEGORY,{categoryData:res}));
    });
}

// 获取职位列表
export const getJobList = (data={}) => (dispatch,getState) => {
    if(isNumber(data.skip)) data.skip = data.skip + '';
    const uri = '/web/PositionQuery';
    cancelRequestByKey(uri);
    dispatch(LOAD_LIST_START);
    AjaxByToken(uri,{
        head: {
            transcode: 'L0012'
        },
        data: extend({},data,{count:'20'})
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        dispatch(extend({},JOB_LIST,{listData:res}));
    });
}

// 获取职位详细信息
export const getJobInfo = (data) => (dispatch,getState) => {
    dispatch(LOAD_INFO_START);
    AjaxByToken('web/lookposition',{
        head: {
            transcode: 'L0014'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_INFO_DONE);
        dispatch(extend({},JOB_INFO,{jobInfo:res.entity}));
    });
}

// 创建职位
export const createJob = (data) => (dispatch,getState) => {
    AjaxByToken('web/saveorupdateposition',{
        head: {
            transcode: 'L0013'
        },
        data: data
    })
    .then(res=>{
        console.log(res);
        // dispatch(extend({},CREATE_JOB,{jobInfo:res.entity}));
    });
}