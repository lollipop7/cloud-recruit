import {URGENT_TASKS,RESUME,ENTRY_PERSON,TASK_PROGRESS} from 'constants/home';

const initialState = {
    urgentTasks: [], // 紧急任务列表
    resumeData: {}, //简历入库情况
    taskProgress: [], // 任务完成指数
    entryPersonList: [] //待入职人员列表
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case URGENT_TASKS: 
            return {...state,urgentTasks:actions.urgentTasks};
        case RESUME:
            return {...state,resumeData:actions.resumeData};
        case TASK_PROGRESS: 
            return {...state,taskProgress:actions.taskProgress};
        case ENTRY_PERSON:
            return {...state,entryPersonList:actions.entryPersonList};
        default: 
            return state;
    }
} 