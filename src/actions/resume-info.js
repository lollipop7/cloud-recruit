import * as types from 'constants/resume-info';
import {AjaxByToken} from 'utils/ajax';

const SHOW_MODAL = {type:types.SHOW_MODAL};
const HIDE_MODAL = {type:types.HIDE_MODAL};

// 获取用户基本信息
export const changeStageStatus = (data,props) => (dispatch,getState) => {
    AjaxByToken('/web/changeStageStatus',{
        head: {
            transcode: 'L0020'
        },
        data: data
    })
    .then(res=>{
        // 隐藏Modal
        dispatch(HIDE_MODAL);
        const {currentStage,getStageLog} = props;
        const {positionid,resumeid} = currentStage;
        getStageLog({
            positionId: positionid,
            resumeId: resumeid
        });
    });
}

export const showModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_MODAL,currentStage:data});
}

export const hideModal = () => (dispatch,getState) => {
    dispatch(HIDE_MODAL);
}