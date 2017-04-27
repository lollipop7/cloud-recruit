import * as types from 'constants/ActionTypes.js';
import {AjaxByToken} from 'utils/ajax';

import only from 'only';
import extend from 'lodash/extend';

// 紧急任务
const URGENT_TASKS = {type:types.URGENT_TASKS};
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