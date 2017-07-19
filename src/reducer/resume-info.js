import {
    SHOW_MODAL,
    HIDE_MODAL,
    SHOW_SHARE_MODAL,
    HIDE_SHARE_MODAL, 
    LOAD_RESUME_INFO,
    LOAD_INFO_START,
    LOAD_INFO_DONE,
    SHOW_MODAL_LOADING,
    HIDE_MODAL_LOADING,
    DOWNLOAD_RESUME_START,
    DOWNLOAD_RESUME_DONE
} from 'constants/resume-info';

const initialState = {
   modalVisible: false,
   shareModalVisible: false,
   currentStage:{},
   resumeInfo: {},
   resumeData: {},
   isModalLoading: false,
   isDownLoading: false
};

export default function resume(state = initialState,actions){
    switch(actions.type){
        case SHOW_MODAL:
            return {...state,modalVisible:true,currentStage:actions.currentStage};
        case HIDE_MODAL:
            return {...state,modalVisible:false};
        case SHOW_SHARE_MODAL:
            return {...state,shareModalVisible:true,resumeData:actions.resumeData};
        case HIDE_SHARE_MODAL:
            return {...state,shareModalVisible:false};    
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
        case DOWNLOAD_RESUME_START:
            return {...state,isDownLoading: true};
        case DOWNLOAD_RESUME_DONE:
            return {...state,isDownLoading: false};
        default: 
            return state;
    }
} 