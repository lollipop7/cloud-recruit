import * as types from 'constants/login';
import Md5 from 'blueimp-md5';
import {AjaxByPost} from 'utils/ajax';

import store from 'store';
import only from 'only';
import extend from 'lodash/extend';

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
        data = only(data,['token','tokenKey']);
        store.set('token',data);
        dispatch(extend({},USER_LOGIN,{token:data}));
    });
}