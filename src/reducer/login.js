import {USER_LOGIN} from 'constants/ActionTypes';

const initialState = {
};

export default function users(state = initialState,actions){
    switch(actions.type){
        case USER_LOGIN: 
            return {...state};
        default: 
            return state;
    }
} 