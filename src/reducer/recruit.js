import {
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    RECRUIT_CATEGORY,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    RECRUIT_LIST,
    SHOW_INFO_MODAL,
    HIDE_INFO_MODAL,
    SHOW_UPLOAD_MODAL,
    HIDE_UPLOAD_MODAL,
    SHOW_RECOMMEND_MODAL,
    HIDE_RECOMMEND_MODAL
} from 'constants/recruit';

const initialState = {
    visible: false,
    isCategoryLoading: false,
    isInfoLoading: false,
    isListLoading:false,
    categoryData: [],
    uriParams: {},
    recruitList: {
        list: [],
        count: 0
    },
    uploadModal:{
        visible: false
    },
    recommendModal: {
        visible: false
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
        case SHOW_INFO_MODAL:
            return {...state,visible: true,uriParams:actions.uriParams};
        case HIDE_INFO_MODAL:
            return {...state,visible: false};
        case SHOW_UPLOAD_MODAL:
            return {...state,uploadModal:{visible:true}};
        case HIDE_UPLOAD_MODAL:
            return {...state,uploadModal:{visible:false}};
        case SHOW_RECOMMEND_MODAL:
            return {...state,recommendModal:{visible:true}};
        case HIDE_RECOMMEND_MODAL:
            return {...state,recommendModal:{visible:false}};
        default: 
            return state;
    }
} 