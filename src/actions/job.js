import * as types from 'constants/ActionTypes.js';
import {AjaxByToken} from 'utils/ajax';

import only from 'only';
import extend from 'lodash/extend';

// 职位统计
const JOB_STATISTICS = {type:types.JOB_STATISTICS};
// 职位列表
const JOB_LIST = {type:types.JOB_LIST};

export const getJobStatistics = () => (dispatch,getState) => {
    AjaxByToken('/web/PositionStatus',{
        head: {
            transcode: 'L0011'
        }
    })
    .then(data=>{
        data = only(data,['all','preparation','ongoing','completed','stop']);
        dispatch(extend({},JOB_STATISTICS,{statisticsData:data}));
    });
}

export const getJobList = (data={}) => (dispatch,getState) => {
    AjaxByToken('/web/PositionQuery',{
        head: {
            transcode: 'L0012'
        },
        data: data
    })
    .then(data=>{
        dispatch(extend({},JOB_LIST,{JobList:only(data,['list'])}));
    });
}