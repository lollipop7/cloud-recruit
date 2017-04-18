import * as types from 'constants/ActionTypes.js';
import 'whatwg-fetch';

// Login type
const USER_LOGIN = {type:types.USER_LOGIN};

export const userLogin = (userInfo={}) => (dispatch,getState) => {
    fetch('/web/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response=>{
        console.log(response);
    });
}