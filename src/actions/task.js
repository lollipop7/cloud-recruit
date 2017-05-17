import * as types from 'constants/task.js';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import {notification} from 'antd'; 

import data from 'data/test';

// 获取任务报表
const GET_TASK_START = {type:types.GET_TASK_START};
const GET_TASK_REPORT = {type:types.GET_TASK_REPORT};
const GET_TASK_DONE = {type:types.GET_TASK_DONE};

// 获取任务报表
export const getTaskReport = () => (dispatch,getState) => {
    dispatch(GET_TASK_START);
    AjaxByToken('/web/progress_report',{
        head: {
            transcode: 'L0034'
        }
    })
    .then(res=>{
        dispatch(GET_TASK_DONE);
        dispatch({...GET_TASK_REPORT,data:res.map});
    });
}