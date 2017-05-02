import { combineReducers } from 'redux';
import Login from './login';
import Home from './home';
import Job from './job';

const rootReducer = combineReducers({
    Login,
    Home,
    Job
});

export default rootReducer;
