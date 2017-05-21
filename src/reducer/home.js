import {
    URGENT_TASKS,
    RESUME,
    GET_ENTRY_LIST,
    GET_ENTRY_START,
    GET_ENTRY_DONE,
    TASK_PROGRESS
} from 'constants/home';

function generateList() {
    let data = [];
    for(let i=0;i<10;i++){
        data.push({
            key: `${i}`,
            username: '',
            positionname: '',
            eventtime: '',
            telephone: ''
        });
    }
    return data;
}

const initialState = {
    // urgentTasks: [], // 紧急任务列表
    resumeData: {}, //简历入库情况
    taskProgress: [], // 任务完成指数
    isEntryLoading: false,
    entryPersonList: generateList() //待入职人员列表
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case URGENT_TASKS: 
            return {...state,urgentTasks:actions.urgentTasks};
        case RESUME:
            return {...state,resumeData:actions.resumeData};
        case TASK_PROGRESS: 
            return {...state,taskProgress:actions.taskProgress};
        case GET_ENTRY_START:
            return {...state,isEntryLoading:true};
        case GET_ENTRY_DONE:
            return {...state,isEntryLoading:false};
        case GET_ENTRY_LIST:
            return {...state,entryPersonList:actions.entryPersonList};
        default: 
            return state;
    }
} 