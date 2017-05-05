import {
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    JOB_CATEGORY,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    JOB_LIST,
    JOB_INFO,
    LOAD_INFO_START,
    LOAD_INFO_DONE,
    CREATE_JOB
} from 'constants/job';

const initialState = {
    categoryData: {
        all: 0,
        completed: 0,
        ongoing: 0,
        preparation: 0,
        stop: 0
    },
    JobList: {
        list: [],
        count: 0
    },
    jobInfo: {},
    isLoadingList: false,
    isLoadingInfo: false
};

export default function job(state = initialState,actions){
    switch(actions.type){
        case LOAD_CATEGORY_START:
            return {...state,isLoadingCategory:true};
        case LOAD_CATEGORY_DONE:
            return {...state,isLoadingCategory:false};
        case JOB_CATEGORY: 
            return {...state,categoryData:actions.categoryData};
        case LOAD_LIST_START:
            return {...state,isLoadingList:true};
        case LOAD_LIST_DONE:
            return {...state,isLoadingList:false};
        case JOB_LIST:
            return {...state,JobList:actions.JobList};
        case LOAD_INFO_START:
            return {...state,isLoadingInfo:true};
        case LOAD_INFO_DONE:
            return {...state,isLoadingInfo:false};
        case JOB_INFO:
            return {...state,jobInfo:actions.jobInfo};
        default: 
            return state;
    }
} 