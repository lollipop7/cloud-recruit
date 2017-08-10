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
const GET_ENTRY_START = {type:types.GET_ENTRY_START};
const GET_ENTRY_DONE = {type:types.GET_ENTRY_DONE};
const GET_ENTRY_LIST = {type:types.GET_ENTRY_LIST};

//添加备忘录MODAL
 const SHOW_MEMO_MODAL = {type:types.SHOW_MEMO_MODAL};
 const HIDE_MEMO_MODAL = {type:types.HIDE_MEMO_MODAL};

// 获取紧急任务
export const getUrgentTasks = (data={}) => (dispatch,getState) => {
    AjaxByToken('UrgentTasks',{
        head: {
            transcode: 'L0007'
        },
        data: data
    })
    .then(res=>{
        dispatch({...URGENT_TASKS,urgentTasks:res.list});
    },err=>{
        dispatch({...URGENT_TASKS,urgentTasks:[]});
    });
}

// 获取简历入库情况
export const resumeWareHousing = (latestDays=7) => (dispatch,getState) => {
    AjaxByToken('ResumeWareHousing',{
        head: {
            transcode: 'L0008'
        },
        data: {
            latestDays: latestDays + ''
        }
    })
    .then(res=>{
        dispatch({...RESUME,resumeData:res});
    },err=>{
        dispatch({...RESUME,resumeData:{content:[]}});
    });
}

// 获取任务完成指数
export const getTaskProgress = (latestDays) => (dispatch,getState) => {
    AjaxByToken('TaskCompletion',{
        head: {
            transcode: 'L0009'
        },
        data: {
            latestDays: latestDays + '' //将数字转化为字符串
        }
    })
    .then(res=>{
        dispatch({...TASK_PROGRESS,taskProgress:res.content});
    },err=>{
        dispatch({...TASK_PROGRESS,taskProgress:[1]});
    });
}

// 获取待入职人员列表
export const getEntryPerson = (data={}) => (dispatch,getState) => {
    dispatch(GET_ENTRY_START);
    AjaxByToken('home_personnelList',{
        head: {
            transcode: 'L0010'
        },
        data: data
    })
    .then(res=>{
        dispatch(GET_ENTRY_DONE);
        dispatch({...GET_ENTRY_LIST,entryPersonList:res.content});
    },err=>{
        dispatch(GET_ENTRY_DONE);
        dispatch({...GET_ENTRY_LIST,entryPersonList:[]});
    });
}

// 重置待入职人员列表
export const resetEntryPerson = () => (dispatch,getState) => {
    dispatch({...GET_ENTRY_LIST,entryPersonList:[]});
}

// 显示添加备忘录MODAL
export const showMemoModal = () => (dispatch,getState) => {
    dispatch(SHOW_MEMO_MODAL);
}

// 隐藏添加备忘录MODAL
export const hideMemoModal = () => (dispatch,getState) => {
    dispatch(HIDE_MEMO_MODAL);
}

//获取备忘录