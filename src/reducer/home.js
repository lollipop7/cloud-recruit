import {URGENT_TASKS,ENTRY_PERSON,TASK_PROGRESS} from 'constants/ActionTypes';

const initialState = {
    urgentTasks: [], // 紧急任务列表
    taskProgress: [], // 任务完成指数
    entryPersonList: [] //待入职人员列表
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case URGENT_TASKS: 
            return {...state,urgentTasks:actions.urgentTasks};
        case TASK_PROGRESS: 
            return {...state,taskProgress:actions.taskProgress};
        case ENTRY_PERSON:
            return {...state,entryPersonList:actions.entryPersonList};
        default: 
            return state;
    }
} 