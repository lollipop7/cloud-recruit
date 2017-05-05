import * as types from 'constants/ActionTypes.js';
import {AjaxByToken} from 'utils/ajax';
import store from 'store';
import extend from 'lodash/extend';

// 紧急任务
const URGENT_TASKS = {type:types.URGENT_TASKS};
// 获取简历入库情况
const RESUME = {type:types.RESUME};
// 获取任务完成指数
const TASK_PROGRESS = {type:types.TASK_PROGRESS};
// 待入职人员列表
const ENTRY_PERSON = {type:types.ENTRY_PERSON};

// 获取紧急任务
export const getUrgentTasks = (data={}) => (dispatch,getState) => {
    AjaxByToken('/web/UrgentTasks',{
        head: {
            transcode: 'L0007'
        },
        data: data
    })
    .then(res=>{
        dispatch(extend({},URGENT_TASKS,{urgentTasks:res.list}));
    });
}

// 获取简历入库情况
export const resumeWareHousing = (latestDays=7) => (dispatch,getState) => {
    // setTimeout(function(){
    //     console.log(latestDays);
    //     dispatch(extend({},RESUME,{resumeData:store.get('resume')}));
    // },10000);
    // return;
    return ;
    AjaxByToken('/web/ResumeWareHousing',{
        head: {
            transcode: 'L0008'
        },
        data: {
            latestDays: latestDays + ''
        }
    })
    .then(res=>{
        dispatch(extend({},RESUME,{resumeData:res}));
    });
}

// 获取任务完成指数
export const getTaskProgress = (latestDays) => (dispatch,getState) => {
    AjaxByToken('/web/TaskCompletion',{
        head: {
            transcode: 'L0009'
        },
        data: {
            latestDays: latestDays + '' //将数字转化为字符串
        }
    })
    .then(res=>{
        dispatch(extend({},TASK_PROGRESS,{taskProgress:res.content}));
    });
}

// 获取待入职人员列表
export const getEntryPerson = (data={}) => (dispatch,getState) => {
    AjaxByToken('/web/home_personnelList',{
        head: {
            transcode: 'L0010'
        },
        data: data
    })
    .then(res=>{
        dispatch(extend({},ENTRY_PERSON,{entryPersonList:res.content}));
    });
}

// 重置待入职人员列表
export const resetEntryPerson = () => (dispatch,getState) => {
    dispatch(extend({},ENTRY_PERSON,{entryPersonList:[]}));
}