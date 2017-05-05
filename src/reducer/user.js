import {GET_USER_EMAIL_INFO,CHANGE_PASSWD} from 'constants/user';

const initialState = {
    userEmailInfo: {userMail:{}}
};

export default function login(state = initialState,actions){
    switch(actions.type){
        case GET_USER_EMAIL_INFO:
            return {...state,userEmailInfo:actions.userEmailInfo};
        case CHANGE_PASSWD:
            return {...state};
        default: 
            return state;
    }
} 