import {
    GET_USER_INFO,
    GET_USER_EMAIL_INFO,
    CHANGE_PASSWD,
    CHANGE_RES_FALSE
} from 'constants/user';

const initialState = {
    userInfo: {},
    userEmailInfo: {
        userMail: {},
        mailServersList: []
    },
    changeRes: false
};

export default function user(state = initialState,actions){
    switch(actions.type){
        case GET_USER_INFO:
            return {...state,userInfo:actions.userInfo};
        case GET_USER_EMAIL_INFO:
            return {...state,userEmailInfo:actions.userEmailInfo};
        case CHANGE_PASSWD:
            return {...state,changeRes: true};
        case CHANGE_RES_FALSE:
            return {...state,changeRes:false};
        default: 
            return state;
    }
} 