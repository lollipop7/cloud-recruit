import {JOB_STATISTICS,LOAD_START,LOAD_DONE,JOB_LIST} from 'constants/ActionTypes';

const initialState = {
    statisticsData: {},
    JobList: {
        list: [],
        count: 0
    },
    isLoading: false
};

export default function job(state = initialState,actions){
    switch(actions.type){
        case JOB_STATISTICS: 
            return {...state,statisticsData:actions.statisticsData};
        case LOAD_START:
            return {...state,isLoading:true};
        case LOAD_DONE:
            return {...state,isLoading:false};
        case JOB_LIST:
            return {...state,JobList:actions.JobList};
        default: 
            return state;
    }
} 