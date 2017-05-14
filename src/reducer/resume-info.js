import {
    SHOW_MODAL,
    HIDE_MODAL,
    LOAD_RESUME_INFO,
    LOAD_INFO_START,
    LOAD_INFO_DONE,
    SHOW_MODAL_LOADING,
    HIDE_MODAL_LOADING
} from 'constants/resume-info';

const initialState = {
   modalVisible: false,
   currentStage:{},
   resumeInfo: {},
   isModalLoading: false
};

export default function resume(state = initialState,actions){
    switch(actions.type){
        case SHOW_MODAL:
            return {...state,modalVisible:true,currentStage:actions.currentStage};
        case HIDE_MODAL:
            return {...state,modalVisible:false};
        case LOAD_RESUME_INFO:
            return {...state,resumeInfo:actions.resumeInfo};
        case LOAD_INFO_START:
            return {...state,isInfoLoading:true};
        case LOAD_INFO_DONE:
            return {...state,isInfoLoading: false};
        case SHOW_MODAL_LOADING:
            return {...state,isModalLoading: true};
        case HIDE_MODAL_LOADING:
            return {...state,isModalLoading: false};
        default: 
            return state;
    }
} 