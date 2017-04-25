import {URGENT_TASKS} from 'constants/ActionTypes';

const initialState = {
    urgentTasks: []
};

export default function users(state = initialState,actions){
    switch(actions.type){
        case URGENT_TASKS: 
            return {...state,urgentTasks:actions.urgentTasks};
        default: 
            return state;
    }
} 