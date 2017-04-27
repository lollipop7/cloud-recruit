import {JOB_STATISTICS} from 'constants/ActionTypes';

const initialState = {
    statisticsData: {}
};

export default function job(state = initialState,actions){
    switch(actions.type){
        case JOB_STATISTICS: 
            return {...state,statisticsData:actions.statisticsData};
        default: 
            return state;
    }
} 