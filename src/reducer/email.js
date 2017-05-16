import {
    GET_EMAIL_HISTORY
} from 'constants/email';

const initialState = {
    list: []
};

export default function email(state = initialState,actions){
    switch(actions.type){
        case GET_EMAIL_HISTORY: 
            return {...state,list:actions.list};
        default: 
            return state;
    }
} 