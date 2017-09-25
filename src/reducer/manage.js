import {
    GET_MANAGE_START,
    GET_MANAGE_END,
    GET_MANAGE_STATISTICS,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    LOAD_CREW_LIST,
    GET_ARCHIVES_START ,
    GET_ARCHIVES_DONE ,
    GET_ARCHIVES_LIST ,
    SHOW_CLERK_DETAIL,
    GET_ARCHIVES_DATA,
    ARCHIVES_TABLE_DATA,
    GET_LEAVEARCHIVES_START ,
    GET_LEAVEARCHIVES_DONE ,
    GET_LEAVEARCHIVES_LIST,
    GET_EMPLOYEE_QUALITY,
    GET_DEPARTMENT_LIST,
    SHOW_PERSONALMATERIAL_MODAL,
    HIDE_PERSONALMATERIAL_MODAL
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
    archivesList:{
        isLoading: false,
        count:0,
        list:[]
    },
    leaveArchivesList:{
        isLoading: false,
        count:0,
        list:[]
    },
    crewDetail: {},
    archivesData: {},
    archivesTableData:'1',
    personalMaterialVisible:false,
    personalMaterialData:{},
    departmentList: {
        isLoading: false,
        list: [],
        count: 0
    },
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
        case GET_ARCHIVES_START:
            return {...state,archivesList:{...state.archivesList,isLoading:true}};
        case GET_ARCHIVES_DONE:
            return {...state,archivesList:{...state.archivesList,isLoading:false}};
        case GET_ARCHIVES_LIST:
            return {...state,archivesList:{...state.archivesList,list:actions.list,count:actions.count}};
        case GET_LEAVEARCHIVES_START:
            return {...state,leaveArchivesList:{...state.leaveArchivesList,isLoading:true}};
        case GET_LEAVEARCHIVES_DONE:
            return {...state,leaveArchivesList:{...state.leaveArchivesList,isLoading:false}};
        case GET_LEAVEARCHIVES_LIST:
            return {...state,leaveArchivesList:{...state.leaveArchivesList,list:actions.list,count:actions.count}};
        case GET_ARCHIVES_DATA:
            return {...state,archivesData:actions.archivesData};         
        case SHOW_CLERK_DETAIL:
            return {...state,crewDetail:actions.crewDetail}; 
        case ARCHIVES_TABLE_DATA:
            return {...state,archivesTableData:actions.archivesTableData};
        case GET_EMPLOYEE_QUALITY:
            return {...state,employeeQuality:actions.employeeQuality};
        case GET_DEPARTMENT_LIST:
            return {...state,departmentList:{...state.departmentList,list:actions.list,count:actions.count}};            
        case SHOW_PERSONALMATERIAL_MODAL:
            return {...state,personalMaterialVisible:actions.personalMaterialVisible,personalMaterialData:actions.data};
        case HIDE_PERSONALMATERIAL_MODAL:
            return {...state,personalMaterialVisible:actions.personalMaterialVisible};          
        default:
            return state;
    }
}