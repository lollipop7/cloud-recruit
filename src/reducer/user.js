import {GET_USER_INFO,GET_USER_EMAIL_INFO,CHANGE_PASSWD} from 'constants/user';

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
        default: 
            return state;
    }
} 