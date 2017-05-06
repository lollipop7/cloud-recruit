import {RECRUIT_CATEGORY} from 'constants/recruit';

const initialState = {
    token: {}
};

export default function recruit(state = initialState,actions){
    switch(actions.type){
        case RECRUIT_CATEGORY: 
            return {...state,categoryData:actions.categoryData};
        default: 
            return state;
    }
} 