import * as types from 'constants/user';
import {AjaxByToken} from 'utils/ajax';
import { message } from 'antd';

// 获取用户基本信息
const GET_USER_INFO = {type:types.GET_USER_INFO};

// 获取用户邮箱配置基本信息
const GET_USER_EMAIL_INFO = {type:types.GET_USER_EMAIL_INFO};

// 用户修改密码
const CHANGE_PASSWD = {type:types.CHANGE_PASSWD};
const CHANGE_RES_FALSE = {type:types.CHANGE_RES_FALSE};

// 获取用户基本信息
export const getUserInfo = () => (dispatch,getState) => {
    AjaxByToken('/web/basicUserinfo',{
        head: {
            transcode: 'L0006'
        }
    })
    .then(res=>{
        dispatch({...GET_USER_INFO,userInfo:res});
    });
}

// 获取用户邮箱信息
export const getUserEmail = () => (dispatch,getState) => {
    AjaxByToken('/web/toConnectMail',{
        head: {
            transcode: 'L0003'
        }
    })
    .then(res=>{
        dispatch({...GET_USER_EMAIL_INFO,userEmailInfo:res});
    });
}

// 修改邮箱配置
export const changeEmailSetting = (data) => (dispatch,getState) => {
    AjaxByToken('/web/changeMailPwd',{
        head: {
            transcode: 'L0004'
        },
        data: data
    })
    .then(res=>{
        NProgress.done();
        message.success('配置邮箱成功！');
        // dispatch({...GET_USER_EMAIL_INFO,userEmailInfo:res});
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
        message.success('修改密码成功！');
        dispatch(CHANGE_PASSWD);
    },err=>{
        message.error('修改密码失败！');
        dispatch(CHANGE_PASSWD);
    });
}

export const changeResFalse = () => (dispatch,getState) => {
    dispatch(CHANGE_RES_FALSE);
}