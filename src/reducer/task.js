import {
    GET_TASK_START,
    GET_TASK_DONE,
    GET_TASK_REPORT
} from 'constants/task';

const initialState = {
   isLoading: false,
   data: {}
};

export default function user(state = initialState,actions){
    switch(actions.type){
        case GET_TASK_START:
            return {...state,isLoading: true};
        case GET_TASK_DONE:
            return {...state,isLoading: false};
        case GET_TASK_REPORT:
            return {...state,data:actions.data};
        default: 
            return state;
    }
} 