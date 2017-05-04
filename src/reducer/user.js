import {CHANGE_PASSWD} from 'constants/ActionTypes';

const initialState = {
};

export default function login(state = initialState,actions){
    switch(actions.type){
        case CHANGE_PASSWD:
            return {...state};
        default: 
            return state;
    }
} 