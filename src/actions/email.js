import * as types from 'constants/email';
import {AjaxByToken} from 'utils/ajax';

// 获取历史邮件列表
const GET_EMAIL_HISTORY = {type:types.GET_EMAIL_HISTORY};

// 获取历史邮件列表
export const getEmailHistory = (data={}) => (dispatch,getState) => {
    AjaxByToken('/web/talentStatis',{
        head: {
            transcode: 'L0028'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_EMAIL_HISTORY,list:res.list});
    });
}