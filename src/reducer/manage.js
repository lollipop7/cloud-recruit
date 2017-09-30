import {
    //**员工名册 ------------------------------------------------*/
    GET_MANAGE_START,
    GET_MANAGE_END,
    GET_MANAGE_STATISTICS,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    LOAD_CREW_LIST,
    SHOW_UPLOAD_CLERK_MODAL,
    HIDE_UPLOAD_CLERK_MODAL,
    UPLOAD_CLERK_START,
    UPLOAD_CLERK_DONE,
    SET_RESETFORM_TRUE,
    SET_RESETFORM_FALSE,
    QUERY_EMPLOYEE_START,
    QUERY_EMPLOYEE_DONE,
    QUERY_EMPLOYEE_LIST,
    SHOW_DISMISSION_MODAL,
    HIDE_DISMISSION_MODAL,
    SHOW_FORMAL_MODAL,
    HIDE_FORMAL_MODAL,
    SHOW_TRANSFER_PERSONNEL_MODAL,
    HIDE_TRANSFER_PERSONNEL_MODAL,
    //**档案管理 ------------------------------------------------*/
    GET_ARCHIVES_START ,
    GET_ARCHIVES_DONE ,
    GET_ARCHIVES_LIST ,
    SHOW_CLERK_DETAIL,
    GET_ARCHIVES_DATA,
    ARCHIVES_TABLE_DATA,
    GET_LEAVEARCHIVES_START ,
    GET_LEAVEARCHIVES_DONE ,
    GET_LEAVEARCHIVES_LIST,
    //**全员概览 ------------------------------------------------*/
    GET_EMPLOYEE_QUALITY,
    GET_DEPARTMENT_LIST,
    SHOW_PERSONALMATERIAL_MODAL,
    HIDE_PERSONALMATERIAL_MODAL,
    //**组织架构 ------------------------------------------------*/
    GET_DEPARTMENT_STAFF,
    ADD_EDIT_DEPARTMENT,
    DELETE_DEPARTMENT
} from 'constants/manage'; 

const initialState = {
//**员工名册 ------------------------------------------------*/
    manageStastistics: {
        isLoading: false,
        list: []
    },
    crewList: {
        isLoading: false,
        list: [],
        count: 0
    },
    uploadClerkModal: {
        isLoading: false,
        visible: false,
        resetForm: false
    },
    queryEmployee: {
        isLoading: false,
        queryEmployeeData: {}
    },
    dismissionModal: {
        isLoading: false,
        visible: false,
    },
    permanentModal: {
        isLoading: false,
        visible: false,
    },
    transferPersonnelModal: {
        isLoading: false,
        visible: false,
    },
    //**档案管理 ------------------------------------------------*/
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
    departmentList: {
        isLoading: false,
        list: [],
        count: 0
    },
    departmentStaff: {},
    currentUid:'',
    departmentName:'',
    crewDetail: {},
    archivesData: {},
    archivesTableData:'1',
    personalMaterialVisible:false,
    personalMaterialData:{},
    departmentInfo:"",
    departmentList: {
        isLoading: false,
        list: [],
        count: 0
    },
    employeeQuality:{
        chart1:[],
        chart2:[]
    }
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
        case SHOW_UPLOAD_CLERK_MODAL:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,visible:true}};  
        case HIDE_UPLOAD_CLERK_MODAL:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,visible:false}};
        case UPLOAD_CLERK_START:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,isLoading:true}};  
        case UPLOAD_CLERK_DONE:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,isLoading:false}}; 
        case SET_RESETFORM_TRUE:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,resetForm:true}};
        case SET_RESETFORM_FALSE:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,resetForm:false}};
        case QUERY_EMPLOYEE_START:
            return {...state,queryEmployee:{...state.queryEmployee,isLoading:true}};    
        case QUERY_EMPLOYEE_DONE:
            return {...state,queryEmployee:{...state.queryEmployee,isLoading:false}}; 
        case QUERY_EMPLOYEE_LIST:
            return {...state,queryEmployee:{...state.queryEmployee,queryEmployeeData:actions.queryEmployeeData}};
        case SHOW_DISMISSION_MODAL:
            return {...state,dismissionModal:{...state.dismissionModal,visible:true}};  
        case HIDE_DISMISSION_MODAL:
            return {...state,dismissionModal:{...state.dismissionModal,visible:false}};  
        case SHOW_FORMAL_MODAL:
            return {...state,permanentModal:{...state.permanentModal,visible:true}};  
        case HIDE_FORMAL_MODAL:
            return {...state,permanentModal:{...state.permanentModal,visible:false}};
        case SHOW_TRANSFER_PERSONNEL_MODAL:
            return {...state,transferPersonnelModal:{...state.transferPersonnelModal,visible:true}}; 
        case HIDE_TRANSFER_PERSONNEL_MODAL:
            return {...state,transferPersonnelModal:{...state.transferPersonnelModal,visible:false}};                                
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
            return {...state,employeeQuality:{...state.employeeQuality,chart1:actions.chart1,chart2:actions.chart2} };
        case GET_DEPARTMENT_LIST:
            return {...state,departmentList:{...state.departmentList,list:actions.list,count:actions.count}};            
        case SHOW_PERSONALMATERIAL_MODAL:
            return {...state,personalMaterialVisible:actions.personalMaterialVisible,personalMaterialData:actions.data};
        case HIDE_PERSONALMATERIAL_MODAL:
            return {...state,personalMaterialVisible:actions.personalMaterialVisible};
        case GET_DEPARTMENT_STAFF:
            return {...state,departmentStaff:actions.departmentStaff, currentUid:actions.currentUid, departmentName:actions.departmentName}
        case ADD_EDIT_DEPARTMENT:
            return {...state,departmentInfo:actions.departmentInfo};
        case DELETE_DEPARTMENT:
            return {...state,departmentInfo:actions.departmentInfo};          
        default:
            return state;
    }
}