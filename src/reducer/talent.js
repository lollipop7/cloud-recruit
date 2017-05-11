import {
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    LOAD_TALENT_LIST,
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    LOAD_TALENT_CATEGORY,
    CREATE_LABEL,
    DELETE_LABEL
} from 'constants/talent';

const initialState = {
   isListLoading: false,
   categoryData: {},
   talentList: {
       list: []
   },
   createLabelRes: false
};

export default function talent(state = initialState,actions){
    switch(actions.type){
        case LOAD_LIST_START:
            return {...state,isListLoading:true};
        case LOAD_LIST_DONE:
            return {...state,isListLoading:false};
        case LOAD_TALENT_LIST: 
            return {...state,talentList:actions.talentList};
        case LOAD_CATEGORY_START:
            return {...state,isCategoryLoading:true};
        case LOAD_CATEGORY_DONE:
            return {...state,isCategoryLoading:false};
        case LOAD_TALENT_CATEGORY:
            return {...state,categoryData:actions.categoryData};
        case CREATE_LABEL:
            return {...state,createLabelRes:actions.createLabelRes};
        case DELETE_LABEL:
            return {...state,deleteLabelRes:actions.deleteLabelRes};
        default: 
            return state;
    }
} 