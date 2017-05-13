import {
   SHOW_MODAL,
   HIDE_MODAL
} from 'constants/resume-info';

const initialState = {
   modalVisible: false,
   currentStage:{}
};

export default function resume(state = initialState,actions){
    switch(actions.type){
        case SHOW_MODAL:
            return {...state,modalVisible:true,currentStage:actions.currentStage};
        case HIDE_MODAL:
            return {...state,modalVisible:false};
        default: 
            return state;
    }
} 