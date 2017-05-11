import {
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    RECRUIT_CATEGORY,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
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
    isListLoading:false,
    categoryData: [],
    recruitInfo: {},
    uriParams: {},
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
        case LOAD_LIST_START:
            return {...state,isListLoading: true};
        case LOAD_LIST_DONE:
            return {...state,isListLoading: false};
        case RECRUIT_LIST:
            return {...state,recruitList:actions.recruitList};
        case RECRUIT_INFO:
            return {...state,recruitInfo:actions.recruitInfo};
        case LOAD_INFO_START:
            return {...state,isInfoLoading:true};
        case LOAD_INFO_DONE:
            return {...state,isInfoLoading: false};
        case SHOW_INFO_MODAL:
            return {...state,visible: true,uriParams:actions.uriParams};
        case HIDE_INFO_MODAL:
            return {...state,visible: false};
        default: 
            return state;
    }
} 