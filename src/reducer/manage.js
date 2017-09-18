import {
    GET_MANAGE_START,
    GET_MANAGE_END,
    GET_MANAGE_STATISTICS,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    LOAD_CREW_LIST,
    SHOW_CLERK_DETAIL
} from 'constants/manage'; 

const initialState = {
    manageStastistics: {
        isLoading: false,
        list: []
    },
    crewList: {
        isLoading: false,
        list: [],
        count: 0
    },
    crewDetail: {}
};

export default function manage(state=initialState,actions){
    switch(actions.type){
        case GET_MANAGE_START:
            return {...state,manageStastistics:{...state.manageStastistics,isLoading:true}};
        case GET_MANAGE_END:
            return {...state,manageStastistics:{...state.manageStastistics,isLoading:false}};
        case GET_MANAGE_STATISTICS:
            return {...state,manageStastistics:{...state.manageStastistics,list:actions.list}};
        case LOAD_LIST_START:
            return {...state,crewList:{...state.crewList,isLoading:true}};
        case LOAD_LIST_DONE:
            return {...state,crewList:{...state.crewList,isLoading:false}};
        case LOAD_CREW_LIST:
            return {...state,crewList:{...state.crewList,list:actions.list,count:actions.count}};  
        case SHOW_CLERK_DETAIL:
            return {...state,crewDetail:actions.crewDetail};           
        default:
            return state;
    }
}