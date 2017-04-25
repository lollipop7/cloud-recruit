import * as types from 'constants/ActionTypes.js';
import {AjaxByToken} from 'utils/ajax';

import only from 'only';
import extend from 'lodash/extend';

// 紧急任务
const URGENT_TASKS = {type:types.URGENT_TASKS};

import res from 'data/urgentTasks';

export const getUrgentTasks = (data) => (dispatch,getState) => {
    // AjaxByToken('/web/UrgentTasks',{
    //     head: {
    //         transcode: 'L0007'
    //     },
    //     data: data
    // })
    // .then(res=>{
    //     dispatch(extend({},URGENT_TASKS,{urgentTasks:res.list}));
    // });
    setTimeout(()=>{
        dispatch(extend({},URGENT_TASKS,{urgentTasks:res.list}));
    },5000);
}