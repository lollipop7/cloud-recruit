import * as types from 'constants/ActionTypes.js';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import extend from 'lodash/extend';

// 职位统计
const JOB_STATISTICS = {type:types.JOB_STATISTICS};
// 职位列表
const JOB_LIST = {type:types.JOB_LIST};
// 职位列表加载中
const LOAD_START = {type:types.LOAD_START};
const LOAD_DONE = {type:types.LOAD_DONE};

export const getJobStatistics = () => (dispatch,getState) => {
    AjaxByToken('/web/PositionStatus',{
        head: {
            transcode: 'L0011'
        }
    })
    .then(res=>{
        dispatch(extend({},JOB_STATISTICS,{statisticsData:res}));
    });
}

export const getJobList = (data={}) => (dispatch,getState) => {
    const uri = '/web/PositionQuery';
    cancelRequestByKey(uri);
    dispatch(LOAD_START);
    AjaxByToken(uri,{
        head: {
            transcode: 'L0012'
        },
        data: extend({},data,{count:'20'})
    })
    .then(res=>{
        dispatch(LOAD_DONE);
        dispatch(extend({},JOB_LIST,{JobList:res}));
    });
}