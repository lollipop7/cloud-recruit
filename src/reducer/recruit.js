import {
    RECRUIT_CATEGORY,
    RECRUIT_INFO,
    LOAD_INFO_START,
    LOAD_INFO_DONE,
    SHOW_INFO_MODAL,
    HIDE_INFO_MODAL
} from 'constants/recruit';

const initialState = {
    visible: false,
    isLoading: false,
    recruitInfo: {}
};

export default function recruit(state = initialState,actions){
    switch(actions.type){
        case RECRUIT_CATEGORY: 
            return {...state,categoryData:actions.categoryData};
        case RECRUIT_INFO:
            return {...state,recruitInfo:actions.recruitInfo};
        case LOAD_INFO_START:
            return {...state,isLoading:true};
        case LOAD_INFO_DONE:
            return {...state,isLoading: false};
        case SHOW_INFO_MODAL:
            return {...state,visible: true};
        case HIDE_INFO_MODAL:
            return {...state,visible: false};
        default: 
            return state;
    }
} 