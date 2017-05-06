import * as types from 'constants/recruit';
import {AjaxByToken} from 'utils/ajax';

// 获取// 招聘分类统计信息
const RECRUIT_CATEGORY = {type:types.RECRUIT_CATEGORY};

// 获取用户邮箱信息
export const getRecruitCategory = () => (dispatch,getState) => {
    AjaxByToken('/web/jobclassCount',{
        head: {
            transcode: 'L0015'
        }
    })
    .then(res=>{
        dispatch(Object.assign({},RECRUIT_CATEGORY,{categoryData:res.list}));
    });
}