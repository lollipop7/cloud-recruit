import * as types from 'constants/manage';
import axios from 'axios';
import {AjaxByToken, cancelRequestByKey} from 'utils/ajax';

import {notification , message} from 'antd';
import isNumber from 'lodash/isNumber';
import store from 'store';
import FileSaver from 'file-saver';


//**员工名册 ------------------------------------------------*/

    //获取员工管理人员统计信息
    const GET_MANAGE_START = {type: types.GET_MANAGE_START};
    const GET_MANAGE_END = {type: types.GET_MANAGE_END};
    const GET_MANAGE_STATISTICS = {type: types.GET_MANAGE_STATISTICS};

    //员工管理人员信息列表查询
    const LOAD_LIST_START = {type: types.LOAD_LIST_START};
    const LOAD_LIST_DONE = {type: types.LOAD_LIST_DONE};
    const LOAD_CREW_LIST = {type: types.LOAD_CREW_LIST};

    //导入excel人员modal
    const SHOW_UPLOAD_CLERK_MODAL = {type: types.SHOW_UPLOAD_CLERK_MODAL};
    const HIDE_UPLOAD_CLERK_MODAL = {type: types.HIDE_UPLOAD_CLERK_MODAL};
    const UPLOAD_CLERK_START = {type: types.UPLOAD_CLERK_START};
    const UPLOAD_CLERK_DONE = {type: types.UPLOAD_CLERK_DONE};
    const SET_RESETFORM_TRUE = {type:types.SET_RESETFORM_TRUE};
    const SET_RESETFORM_FALSE = {type:types.SET_RESETFORM_FALSE};

    //导出员工信息
    const EXPORT_CLERK_START = {type: types.EXPORT_CLERK_START};
    const EXPORT_CLERK_DONE = {type: types.EXPORT_CLERK_DONE};
    const EXPORT_CLERK_LIST = {type: types.EXPORT_CLERK_LIST};

    //入职人员基本信息查询
    const QUERY_EMPLOYEE_START = {type:types.QUERY_EMPLOYEE_START};
    const QUERY_EMPLOYEE_DONE = {type:types.QUERY_EMPLOYEE_DONE};
    const QUERY_EMPLOYEE_LIST = {type:types.QUERY_EMPLOYEE_LIST};

    //办理离职modal
    const SHOW_DISMISSION_MODAL = {type:types.SHOW_DISMISSION_MODAL};
    const HIDE_DISMISSION_MODAL = {type:types.HIDE_DISMISSION_MODAL};

    //办理转正modal
    const SHOW_FORMAL_MODAL = {type:types.SHOW_FORMAL_MODAL};
    const HIDE_FORMAL_MODAL = {type:types.HIDE_FORMAL_MODAL};

    //人事调动modal
    const SHOW_TRANSFER_PERSONNEL_MODAL = {type:types.SHOW_TRANSFER_PERSONNEL_MODAL};;
    const HIDE_TRANSFER_PERSONNEL_MODAL = {type:types.HIDE_TRANSFER_PERSONNEL_MODAL};

    //1.57 员工人事调动
    const MOBILIZE_EMPLOYEE_START = {type:types.MOBILIZE_EMPLOYEE_START};
    const MOBILIZE_EMPLOYEE_DONE = {type:types.MOBILIZE_EMPLOYEE_DONE};

    //添加附件modal
    const SHOW_ATTACHMENT_MODAL = {type:types.SHOW_ATTACHMENT_MODAL};
    const HIDE_ATTACHMENT_MODAL = {type:types.HIDE_ATTACHMENT_MODAL};

    //查看人员操作记录信息列表
    const OPERATION_LIST_START = {type:types.OPERATION_LIST_START};
    const OPERATION_LIST_DONE = {type:types.OPERATION_LIST_DONE};
    const OPERATION_LIST = {type:types.OPERATION_LIST};

    //1.56 员工简历查看
    const LOAD_EMPLOYEEINFO_START = {type:types.LOAD_EMPLOYEEINFO_START};
    const LOAD_EMPLOYEEINFO_DONE = {type:types.LOAD_EMPLOYEEINFO_DONE};
    const LOAD_EMPLOYEEINFO = {type:types.LOAD_EMPLOYEEINFO};

    //人员征信
    const CREDITINVESTGATION_START = {type:types.CREDITINVESTGATION_START};
    const CREDITINVESTGATION_DONE = {type:types.CREDITINVESTGATION_DONE};
    const CREDITINVESTGATION = {type:types.CREDITINVESTGATION};
    const SEARCHCREDITINVESTGATION = {type:types.SEARCHCREDITINVESTGATION};
    const CREDITINVESTGATIONSTATE = {type:types.CREDITINVESTGATIONSTATE};

    //图片地址
    const IMAGEURL = {type:types.IMAGEURL};
    const SHOW_IMAGE_MODAL = {type:types.SHOW_IMAGE_MODAL};
    const HIDE_IMAGE_MODAL = {type:types.HIDE_IMAGE_MODAL};
    const CANCELIMAGEURL = {type:types.CANCELIMAGEURL};
    

    //获取员工管理人员统计信息
    export const getCrewStatis = () => (dispatch,getState) => {
        dispatch(GET_MANAGE_START);
        AjaxByToken('emp/crewstatis',{
            head: {
                transcode: 'L0042'
            }
        })
        .then(res=>{
            dispatch(GET_MANAGE_END);
            dispatch({...GET_MANAGE_STATISTICS,list:res});
        },err=>{
            dispatch(GET_MANAGE_END);
            dispatch({...GET_MANAGE_STATISTICS,list:[]});
        })
    };

    //员工管理人员信息列表查询
    export const getCrewList = (data={}) => (dispatch, getState) => {
        if(isNumber(data.skip)) data.skip = data.skip + '';
        const uri = 'emp/crewquery';
        cancelRequestByKey(uri);
        NProgress.start();
        dispatch(LOAD_LIST_START);
        AjaxByToken(uri, {
            head: {
                transcode: 'L0043'
            },
            data: {...data}
        })
        .then(res=>{
            dispatch(LOAD_LIST_DONE);
            dispatch({...LOAD_CREW_LIST,list:res.list,count:res.count});
        },err=>{
            // console.log(err);
            dispatch(LOAD_LIST_DONE);
        })
    }

    //导出员工信息
    export const exportEmployees = (data) => (dispatch,getState) => {
        console.log(data);
        dispatch(EXPORT_CLERK_START);
        AjaxByToken('employeeinfo/exportEmployees',{
            head: {
                transcode: 'L0046'
            },
            data: data
        })
        .then(res=>{
            console.log(res);
            dispatch(EXPORT_CLERK_DONE);
            dispatch({...EXPORT_CLERK_LIST,list:res.list,count:res.count});
        },err=>{
            console.log(err);
            dispatch(EXPORT_CLERK_DONE);
        });
    }

    //删除员工信息
    export const deleteEmployees = (data) => (dispatch,getState) => {
        AjaxByToken('delete_employees',{
            head: {
                transcode: 'L0047'
            },
            data: data
        })
        .then(res=>{
            console.log(res);
        },err=>{
            console.log(err);
        });
    }

    //导入excel人员modal
    export const showUploadClerkModal = () => (dispatch,getState) => {
        dispatch(SHOW_UPLOAD_CLERK_MODAL);
    }
    // 隐藏导入excel人员MODAL
    export const hideUploadClerkModal = () => (dispatch,getState) => {
        dispatch(HIDE_UPLOAD_CLERK_MODAL);
    }

    //1.61 员工导入模板下载
    export const downloadTememployees = () => (dispatch,getState) => {
        const token = store.get('token');
        axios({
            url: `${prefixUri}/employeeinfo/downloadTememployees`,
            method: 'get',
            responseType: 'arraybuffer'
        })
        .then(res=>{
            var blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            FileSaver.saveAs(blob,'员工信息导入模板表.xlsx');
        }).catch(error=>{
            console.log(error)
        });
    }

    //上传excel
    export const uploadClerkExcel = (data,props) => (dispatch,getState) => {
        dispatch(UPLOAD_CLERK_START);
        AjaxByToken('employeeinfo/excelSave',{
            head: {
                transcode: 'L0044',
            },
            data: data
        })
        .then(res=>{
            dispatch(UPLOAD_CLERK_DONE);
            notification.success({
                message: '提示',
                description: '导入Excel人员成功！'
            });
            dispatch(SET_RESETFORM_TRUE);
            dispatch(HIDE_UPLOAD_CLERK_MODAL);
        },err=>{
            console.log(err);
            dispatch(UPLOAD_CLERK_DONE);
        });
    }


    export const setResetFormFalse = () => (dispatch,getState) => {
        dispatch(SET_RESETFORM_FALSE);
    }

    //入职人员基本信息查询
    export const queryEmployee = (data) => (dispatch,getState) => {
        dispatch(QUERY_EMPLOYEE_START);
        AjaxByToken('employeeinfo/queryEmployee', {
            head: {
                transcode: 'L0062'
            },
            data: data
        })
        .then(res=>{
            dispatch(QUERY_EMPLOYEE_DONE);
            dispatch({...QUERY_EMPLOYEE_LIST,list:res});
        },err=>{
            console.log(err)
            dispatch(QUERY_EMPLOYEE_DONE);
        })
    }

    //显示办理离职modal
    export const showDismissionModal = () => (dispatch,getState) => {
        dispatch(SHOW_DISMISSION_MODAL);
    }
    //隐藏办理离职modal
    export const hideDismissionModal = () => (dispatch,getState) => {
        dispatch(HIDE_DISMISSION_MODAL);
    }

    //1.49 员工离职办理
    export const departureEmployees = (data) => (dispatch,getState) => {
        console.log(data);
        AjaxByToken('emp/departure_employees', {
            head: {
                transcode: 'L0049'
            },
            data: data
        }).then(res=>{
            notification.success({
                message: '提示',
                description: '成功办理离职！'
            });
            dispatch(HIDE_DISMISSION_MODAL);
        },err=>{
            notification.error({
                message: '错误',
                description: '办理离职失败！'
            });
        })
    }

    //1.48 员工转正办理
    export const positiveEmployees = (data) => (dispatch,getState) => {
        AjaxByToken('emp/positive_employees', {
            head: {
                transcode: 'L0048'
            },
            data: data
        }).then(res=>{
            notification.success({
                message: '提示',
                description: '转正成功！'
            });
            dispatch(HIDE_FORMAL_MODAL);
        },err=>{
            notification.error({
                message: '错误',
                description: '办理转正失败！'
            });
        })
    }

    //显示办理转正modal
    export const showPermanentModal = () => (dispatch,getState) => {
        dispatch(SHOW_FORMAL_MODAL);
    }
    //隐藏办理离职modal
    export const hidePermanentModal = () => (dispatch,getState) => {
        dispatch(HIDE_FORMAL_MODAL);
    }

    //显示人事调动modal
    export const showTransferPersonnelModal = () => (dispatch,getState) => {
        dispatch(SHOW_TRANSFER_PERSONNEL_MODAL);
    }
    //隐藏人事调动modal
    export const hideTransferPersonnelModal = () => (dispatch,getState) => {
        dispatch(HIDE_TRANSFER_PERSONNEL_MODAL);
    }

    //1.57 员工人事调动
    export const mobilizeEmployee = (data) => (dispatch,getState) => {
        dispatch(MOBILIZE_EMPLOYEE_START);
        AjaxByToken('emp/mobilize_employees', {
            head: {
                transcode: 'L0057'
            },
            data: data
        }).then(res=>{
            dispatch(MOBILIZE_EMPLOYEE_DONE);
            notification.success({
                message: '提示',
                description: '人事调动成功！'
            });
            dispatch(HIDE_TRANSFER_PERSONNEL_MODAL);
        },err=>{
            dispatch(MOBILIZE_EMPLOYEE_DONE);
            notification.error({
                message: '错误',
                description: '人事调动失败！'
            });
        })
    }

    //显示上传附件modal
    export const showAttachmentModal = () => (dispatch,getState) => {
        dispatch(SHOW_ATTACHMENT_MODAL);
    }
    //隐藏上传附件modal
    export const hideAttachmentModal = () => (dispatch,getState) => {
        dispatch(HIDE_ATTACHMENT_MODAL);
    }

    //查看人员操作记录信息列表
    export const getOperationList = (data) => (dispatch,getState) => {
        if(isNumber(data.skip)) data.skip = data.skip + '';
        dispatch(OPERATION_LIST_START);
        AjaxByToken('emp/operationList_employees', {
            head: {
                transcode: 'L0058'
            },
            data: data
        })
        .then(res=>{
            dispatch(OPERATION_LIST_DONE);
            dispatch({...OPERATION_LIST,list:res.list,count:res.count});
        },err=>{
            console.log(err);
            dispatch(OPERATION_LIST_DONE);
        })
    }

    //上传材料附件
    export const UploadMaterial = (data) => (dispatch,getState) => {
        AjaxByToken('emp/data_employees', {
            head: {
                transcode: 'L0054'
            },
            data: data
        })
        .then(res=>{
            notification.success({
                message: '提示',
                description: '材料附件上传成功！'
            });
        },err=>{
            console.log(err);
        })
    }
    //预览材料附件
    export const viewUploadAttachment = (arr,showImageModal) => (dispatch,getState) => {
        const token = store.get('token');
        const fileArr = arr;
        const urlArr = [];
        for(let i=0;i<fileArr.length;i++){
            axios({
            url:`${prefixUri}/view_uploadAttachment`,
            method:'get',
            params:{
                token:token.token,
                tokenKey:token.tokenKey,
                fileName:fileArr[i]
            }
            }).then(res=>{
                urlArr.push(res.request.responseURL)
                if(fileArr.length==urlArr.length){
                    dispatch({...IMAGEURL,imageUrl:urlArr});
                    showImageModal()
                }   
            }).catch(error=>{
                console.log(error);
            });
        }    
    }
    //显示图片预览Modal
    export const showImageModal = (data) => (dispatch,getState) => {
        dispatch({...SHOW_IMAGE_MODAL})
    }
    export const hideImageModal = () => (dispatch,getState) => {
        dispatch({...HIDE_IMAGE_MODAL})
    }
    //清空图片地址
    export const cancelImageUrl = () => (dispatch,getState) => {
        dispatch({...CANCELIMAGEURL})
    }
    //下载材料附件
    export const downloadUploadAttachment = (name) => (dispatch,getState) => {
        const token = store.get('token');
        axios.post(`${prefixUri}/download_uploadAttachment`,{
                token:token.token,
                tokenKey:token.tokenKey,
                fileName:name   
        }).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error);
        });
    }
    //删除材料附件
    export const DeleteMaterial = (data) => (dispatch,getState) => {
        AjaxByToken('emp/dataDel_employees', {
            head: {
                transcode: 'L0055'
            },
            data: data
        })
        .then(res=>{
            notification.success({
                message: '提示',
                description: '材料附件删除成功！'
            });
        },err=>{
            console.log(err);
        })
    }
    //人员征信是否已经查询
    export const searchCreditInvestgation = (data) => (dispatch,getState) => {
        AjaxByToken('cerditFlag_employees', {
            head: {
                transcode: 'L0059'
            },
            data: data
        })
        .then(res=>{
            dispatch({...CREDITINVESTGATION,creditData:res});
        },err=>{
            console.log(err);
        })
    }
    //人员征信查询
    export const searchCredit = (data,showcredit) => (dispatch,getState) => {
        AjaxByToken('cerditQueryperationList_employees', {
            head: {
                transcode: 'L0060'
            },
            data: data
        })
        .then(res=>{
            //console.log(res)
            NProgress.done();
            dispatch({...SEARCHCREDITINVESTGATION,creditInfoData:res.data});
            showcredit()
        },err=>{
            console.log(err);
        })
    }
    export const showcredit = () => (dispatch,getState) => {
    dispatch({...CREDITINVESTGATIONSTATE,isFill:true})
}

    //1.56 员工简历查看
    export const showEmployeeResumeView = (data) => (dispatch,getState) => {
        dispatch(LOAD_EMPLOYEEINFO_START);
        AjaxByToken('employeeinfo/employeeResumeview', {
            head: {
                transcode: 'L0056'
            },
            data: data
        })
        .then(res=>{
            dispatch(LOAD_EMPLOYEEINFO_DONE);
            dispatch({...LOAD_EMPLOYEEINFO,employeeInfo:res});
        },err=>{
            console.log(err)
            dispatch(LOAD_EMPLOYEEINFO_DONE);
        })
    }

    

//**档案管理 ------------------------------------------------*/

//员工管理档案管理在职人员信息
const GET_ARCHIVES_START = {type: types.GET_ARCHIVES_START};
const GET_ARCHIVES_DONE = {type: types.GET_ARCHIVES_DONE};
const GET_ARCHIVES_LIST = {type: types.GET_ARCHIVES_LIST};

//员工管理档案管理离职人员信息
const GET_LEAVEARCHIVES_START = {type: types.GET_LEAVEARCHIVES_START};
const GET_LEAVEARCHIVES_DONE = {type: types.GET_LEAVEARCHIVES_DONE};
const GET_LEAVEARCHIVES_LIST = {type: types.GET_LEAVEARCHIVES_LIST};

//档案管理员工数据
const GET_ARCHIVES_DATA = {type: types.GET_ARCHIVES_DATA};

//档案管理个人材料Modal
const SHOW_PERSONALMATERIAL_MODAL = {type:types.SHOW_PERSONALMATERIAL_MODAL};
const HIDE_PERSONALMATERIAL_MODAL = {type:types.HIDE_PERSONALMATERIAL_MODAL};

//档案管理table数据
const ARCHIVES_TABLE_DATA = {type: types.ARCHIVES_TABLE_DATA}

//**全员概览 ------------------------------------------------*/

//获取全员概览-员工性质分布信息
const GET_EMPLOYEE_WORK = {type:types.GET_EMPLOYEE_WORK};
const GET_EMPLOYEE_SEX = {type:types.GET_EMPLOYEE_SEX};
const GET_EMPLOYEE_EDU = {type:types.GET_EMPLOYEE_EDU};
const GET_EMPLOYEE_AGE = {type:types.GET_EMPLOYEE_AGE};
const GET_EMPLOYEE_MARRY = {type:types.GET_EMPLOYEE_MARRY};
const GET_EMPLOYEE_CHILD = {type:types.GET_EMPLOYEE_CHILD};
const GET_EMPLOYEE_DEPART = {type:types.GET_EMPLOYEE_DEPART};
const GET_EMPLOYEE_POST = {type:types.GET_EMPLOYEE_POST};

//获取全员概览-员工性质分布信息
const GET_DEPARTMENT_LIST = {type:types.GET_DEPARTMENT_LIST};

//**组织架构 ------------------------------------------------*/
// 获取组织架构图数据
const GET_ORGANIZE_CHART = {type:types.GET_ORGANIZE_CHART}
//根据部门id查询子部门及人员
const GET_DEPARTMENT_STAFF = {type:types.GET_DEPARTMENT_STAFF};
// 添加或者修改部门
const ADD_EDIT_DEPARTMENT = {type:types.ADD_EDIT_DEPARTMENT};

// 添加或者修改部门
const DELETE_DEPARTMENT = {type:types.DELETE_DEPARTMENT};

//获取档案管理在职人员列表信息
export const getArchivesList = (data={}) => (dispatch,getState) => {
    NProgress.start();
    dispatch(GET_ARCHIVES_START);
    AjaxByToken('archives/resume_statis_List_Job', {
        head: {
            transcode: 'L0075'
        },
        data: data
    })
    .then(res=>{
        dispatch(GET_ARCHIVES_DONE);
        for(let i=0;i<res.list.length;i++){
            delete res.list[i].children;  
        };
        dispatch({...GET_ARCHIVES_LIST,list:res.list,count:res.count});
    },err=>{
        dispatch(GET_ARCHIVES_DONE);
    })
}

//获取档案管理离职人员列表信息
export const getLeaveArchivesList = (data={}) => (dispatch,getState) => {
    NProgress.start();
    dispatch(GET_LEAVEARCHIVES_START);
    AjaxByToken('archives/resume_statis_List_Department', {
        head: {
            transcode: 'L0076'
        },
        data: data
    })
    .then(res=>{
        dispatch(GET_LEAVEARCHIVES_DONE);
        for(let i=0;i<res.list.length;i++){
            delete res.list[i].children;  
        }
        dispatch({...GET_LEAVEARCHIVES_LIST,list:res.list,count:res.count});
        
    },err=>{
        dispatch(GET_LEAVEARCHIVES_DONE);
    })
}

//下载材料附件
export const downloadMaterial = (data) => (dispatch,getState) => { 
    const token = store.get('token');
    const {rid,name} = data;
    axios({
        url: `${prefixUri}/archives/DOWNLOAD_RESUME_METERIAL`,
        method: 'get',
        params: {
            token:token.token,
            tokenKey:token.tokenKey,
            rid:rid,
            transcode: 'L0077'
        }
    })
    .then(res=>{
        const {data} = res;
        var blob = new Blob([data], {type: "application/vnd.ms-excel"});
        FileSaver.saveAs(blob, `${name}个人材料附件.zip`);
    }).catch(error=>{
        console.log(error)
    });
}

//添加、编辑员工信息
export const editEmployeeInformation = (data,props) => (dispatch,getState) => {
    AjaxByToken('employeeinfo/addEmployee', {
        head: {
            transcode: 'L0045'
        },
        data: data
    })
    .then(res=>{
            if(props){
                const {
                getArchivesList , 
                getLeaveArchivesList,
                archivesTableData,
                getDepartMentStaff,
                currentUid
            } = props;
            if(data.rid){
                message.success('编辑信息成功！')
                if(archivesTableData=='1'){
                    getArchivesList({sort:'1'}) 
                }else if (archivesTableData=='2'){
                    getLeaveArchivesList({sort:'1'})
                }
                getDepartMentStaff({departmentId:currentUid},currentUid);       
            }else{
                message.success('添加信息成功！');
                if(archivesTableData=='1'){
                    getArchivesList({sort:'1'}) 
                }else if (archivesTableData=='2'){
                    getLeaveArchivesList({sort:'1'})
                }   
            }
        }else{
            message.success('编辑信息成功！')
        }
              
    },err=>{
        if(data.rid){
            message.error('编辑信息失败！')
        }else{
            message.error('添加信息失败！')
        }
    })
}

//显示档案管理个人材料Modal
export const showPersonalMaterialModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_PERSONALMATERIAL_MODAL,personalMaterialVisible:true,data:data})
}
export const hidePersonalMaterialModal = () => (dispatch,getState) => {
    dispatch({...HIDE_PERSONALMATERIAL_MODAL,personalMaterialVisible:false})
}



//档案管理在职、离职人员数据
export const getArchivesData = (data={}) => (dispatch,getState) => {
    AjaxByToken('archives/resume_statis', {
        head: {
            transcode: 'L0074'
        },
        data: data
    })
    .then(res=>{
        //console.log(res)
        //dispatch(GET_ARCHIVES_DONE);
        dispatch({...GET_ARCHIVES_DATA,archivesData:res});
    },err=>{
        dispatch(GET_ARCHIVES_DONE);
    })
}

// 获取全员概览-员工性质分布信息
export const getEmployeeQuality = (type) => (dispatch,getState) => {
    AjaxByToken('empoverview/singleclumn',{
        head: {
            transcode: 'L0085'
        },
        data: type
    }).then(res=>{
        if(type.counttype=="1"){
            dispatch({...GET_EMPLOYEE_WORK,work:res.content});
        }else if(type.counttype=="2"){
            dispatch({...GET_EMPLOYEE_SEX,sex:res.content});
        }else if(type.counttype=="3"){
            dispatch({...GET_EMPLOYEE_EDU,edu:res.content});
        }else if(type.counttype=="4"){
            dispatch({...GET_EMPLOYEE_AGE,age:res.content});
        }else if(type.counttype=="5"){
            dispatch({...GET_EMPLOYEE_MARRY,marry:res.content});
        }else if(type.counttype=="6"){
            dispatch({...GET_EMPLOYEE_CHILD,child:res.content});
        }else if(type.counttype=="7"){
            dispatch({...GET_EMPLOYEE_DEPART,depart:res.content});
        }else if(type.counttype=="8"){
            dispatch({...GET_EMPLOYEE_POST,post:res.content});
        }
    },err=>{
        console.log(err)
    });
}

//  组织架构-部门列表查询
export const getDepartMentList = () => (dispatch,getState) => {
    AjaxByToken('structure/resume_statis_List_Department',{
        head: {
            transcode: 'L0078',
            type: 'h'
        }
    })
    .then(res=>{
        dispatch({...GET_DEPARTMENT_LIST,list:res.list,count:res.count});
    },err=>{
        dispatch({...GET_DEPARTMENT_LIST},list:[],count:0);
    });
}

export const getTreeList = (list) => (dispatch,getState) => {
    const treeList = [];
    function recursion(list){
      list.forEach(function(item, index){
          const childList = item.list;
          if (childList) {
            treeList.push({name:item.name, uid:item.uid, sup_id:item.supDepartmentId});
              recursion(childList);
          } else {
            treeList.push({name:item.name, uid:item.uid, sup_id:item.supDepartmentId});
          }
      })
    }
    recursion(list);
    return treeList;
}

//档案管理table数据
export const changeTableData = (data) => (dispatch, getState) => {
    dispatch({...ARCHIVES_TABLE_DATA,archivesTableData:data})
}
 
//  组织架构-根据部门id查询子部门及人员
export const getDepartMentStaff = (data={},currentUid,departmentName='') => (dispatch,getState) => {
    AjaxByToken('structure/resume_statis_List_DepartmentAndResumeOff',{
        head: {
            transcode: 'L0079',
            type: 'h'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_DEPARTMENT_STAFF,departmentStaff:res, currentUid:currentUid,departmentName:departmentName});
    },err=>{
        dispatch({...GET_DEPARTMENT_STAFF});
    });
}

//  组织架构-添加或者修改部门
export const addEditDepartment = (data={}) => (dispatch,getState) => {
    AjaxByToken('structure/resume_statis_operation_Department',{
        head: {
            transcode: 'L0080',
            type: 'h'
        },
        data: data
    })
    .then(res=>{
        dispatch({...ADD_EDIT_DEPARTMENT,departmentInfo:'success'});
    },err=>{
        dispatch({...ADD_EDIT_DEPARTMENT,departmentInfo:''});
    });
}
//  组织架构-添加或者修改部门成功后执行操作
export const refreshDepartmentInfo = (data={}) => (dispatch,getState) => {
    dispatch({...ADD_EDIT_DEPARTMENT,departmentInfo:''});
    AjaxByToken('structure/resume_statis_List_Department',{
        head: {
            transcode: 'L0078',
            type: 'h'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_DEPARTMENT_LIST,list:res.list,count:res.count});
    },err=>{
        dispatch({...GET_DEPARTMENT_LIST,list:[],count:0});
    });
}

//  组织架构-删除部门
export const deleteDepartment = (data={}) => (dispatch,getState) => {
    AjaxByToken('structure/resume_statis_del_Department',{
        head: {
            transcode: 'L0081',
            type: 'h'
        },
        data: data
    })
    .then(res=>{
        dispatch({...DELETE_DEPARTMENT,departmentInfo:'success'});
    },err=>{
        dispatch({...DELETE_DEPARTMENT});
    });
}

//  组织架构-根据部门id查询子部门及人员
export const getOrganizeChart = (data={}) => (dispatch,getState) => {
    AjaxByToken('structure/company_structure',{
        head: {
            transcode: 'L0083',
            type: 'h'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_ORGANIZE_CHART,organize:res.companystructure});
    },err=>{
        dispatch({...GET_ORGANIZE_CHART});
    });
}