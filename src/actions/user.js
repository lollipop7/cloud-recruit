import * as types from 'constants/user';
import {AjaxByToken} from 'utils/ajax';
import { notification } from 'utils/antd';

import extend from 'lodash/extend';

// 获取用户邮箱配置基本信息
const GET_USER_EMAIL_INFO = {type:types.GET_USER_EMAIL_INFO};

// 用户修改密码
const CHANGE_PASSWD = {type:types.CHANGE_PASSWD};

// 获取用户邮箱信息
export const getUserEmail = () => (dispatch,getState) => {
    AjaxByToken('/web/toConnectMail',{
        head: {
            transcode: 'L0003'
        }
    })
    .then(res=>{
        dispatch(extend({},GET_USER_EMAIL_INFO,{userEmailInfo:res}));
    });
}

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

