import * as types from 'constants/ActionTypes.js';
import {AjaxByToken} from 'utils/ajax';
import { notification } from 'utils/antd';

import extend from 'lodash/extend';

// 用户修改密码
const CHANGE_PASSWD = {type:types.CHANGE_PASSWD};

// 修改密码
export const changePassWd = (data={}) => (dispatch,getState) => {
    NProgress.start();
    AjaxByToken('/web/changepwd',{
        head: {
            transcode: 'L0002'
        },
        data: data
    })
    .then(res=>{
        notification.success('修改密码成功！');
        dispatch(CHANGE_PASSWD);
    });
}

export const getUserEmail = () => {
    
}