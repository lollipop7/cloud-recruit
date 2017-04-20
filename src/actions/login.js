import * as types from 'constants/ActionTypes.js';
import Md5 from 'blueimp-md5';
import {AjaxByPost} from 'utils/ajax';

// Login type
const USER_LOGIN = {type:types.USER_LOGIN};

export const userLogin = (userInfo={}) => (dispatch,getState) => {
    userInfo.password = Md5(userInfo.password);
    AjaxByPost('/web/login',{
        head: {
            transcode: 'L0001'
        },
        data: userInfo
    })
    .then(data=>{
        console.log(data);
    });
}