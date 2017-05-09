import {
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    RECRUIT_CATEGORY,
    RECRUIT_LIST,
    RECRUIT_INFO,
    LOAD_INFO_START,
    LOAD_INFO_DONE,
    SHOW_INFO_MODAL,
    HIDE_INFO_MODAL
} from 'constants/recruit';

const initialState = {
    visible: false,
    isCategoryLoading: false,
    isInfoLoading: false,
    categoryData: [],
    recruitInfo: {},
    recruitList: {
        list: [],
        count: 0
    }
};

export default function recruit(state = initialState,actions){
    switch(actions.type){
        case LOAD_CATEGORY_START:
            return {...state,isCategoryLoading:true};
        case LOAD_CATEGORY_DONE:
            return {...state,isCategoryLoading:false};
        case RECRUIT_CATEGORY: 
            return {...state,categoryData:actions.categoryData};
        case RECRUIT_LIST:
            return {...state,recruitList:actions.recruitList};
        case RECRUIT_INFO:
            return {...state,recruitInfo:actions.recruitInfo};
        case LOAD_INFO_START:
            return {...state,isInfoLoading:true};
        case LOAD_INFO_DONE:
            return {...state,isInfoLoading: false};
        case SHOW_INFO_MODAL:
            return {...state,visible: true,isInfoLoading:true};
        case HIDE_INFO_MODAL:
            return {...state,visible: false};
        default: 
            return state;
    }
} 