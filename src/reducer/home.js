import {URGENT_TASKS,ENTRY_PERSON} from 'constants/ActionTypes';

const initialState = {
    urgentTasks: [],
    entryPersonList: []
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case URGENT_TASKS: 
            return {...state,urgentTasks:actions.urgentTasks};
        case ENTRY_PERSON:
            return {...state,entryPersonList:actions.entryPersonList};
        default: 
            return state;
    }
} 