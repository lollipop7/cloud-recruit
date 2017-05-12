import * as types from 'constants/home';
import {AjaxByToken} from 'utils/ajax';
import store from 'store';

// 紧急任务
const URGENT_TASKS = {type:types.URGENT_TASKS};
// 获取简历入库情况
const RESUME = {type:types.RESUME};
// 获取任务完成指数
const TASK_PROGRESS = {type:types.TASK_PROGRESS};
// 待入职人员列表
const GET_ENTRY_LIST = {type:types.GET_ENTRY_LIST};

// 获取紧急任务
export const getUrgentTasks = (data={}) => (dispatch,getState) => {
    AjaxByToken('/web/UrgentTasks',{
        head: {
            transcode: 'L0007'
        },
        data: data
    })
    .then(res=>{
        dispatch({...URGENT_TASKS,urgentTasks:res.list});
    });
}

// 获取简历入库情况
export const resumeWareHousing = (latestDays=7) => (dispatch,getState) => {
    AjaxByToken('/web/ResumeWareHousing',{
        head: {
            transcode: 'L0008'
        },
        data: {
            latestDays: latestDays + ''
        }
    })
    .then(res=>{
        dispatch({...RESUME,resumeData:res});
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
        dispatch({...TASK_PROGRESS,taskProgress:res.content});
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
        dispatch({...GET_ENTRY_LIST,entryPersonList:res.content});
    });
}

// 重置待入职人员列表
export const resetEntryPerson = () => (dispatch,getState) => {
    dispatch({...GET_ENTRY_LIST,entryPersonList:[]});
}