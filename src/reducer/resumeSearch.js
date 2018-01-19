import {
    RESUME_SEARCH,
    RESUME_DETAIL,
    RESUME_SEARCH_START,
    RESUME_SEARCH_DONE,
    CLEAR_RESUME_DATA,
    VIEW_DETAILS_START,
    VIEW_DETAILS_DONE
} from 'constants/resumeSearch';
const initialState = {
    resumeData:[],
    resumeDetailData:{},
    isLoading:false,
    detailLoading:false,
    totalHits:""
};
export default function recruit(state = initialState,actions){
    switch(actions.type){
        case RESUME_SEARCH:
            return {...state,resumeData:actions.resumeData,totalHits:actions.totalHits};
        case RESUME_SEARCH_START:
            return {...state,isLoading:true};
        case RESUME_SEARCH_DONE:
            return {...state,isLoading:false};
        case VIEW_DETAILS_DONE:
            return {...state,detailLoading:false};
        case VIEW_DETAILS_START:
            return {...state,detailLoading:true};
        case RESUME_DETAIL:
            return {...state,resumeDetailData:actions.resumeDetailData,detailLoading:false};
        case CLEAR_RESUME_DATA:
            return {...state,resumeDetailData:{}};
        default: 
            return state;
    }
} 