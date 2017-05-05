import { combineReducers } from 'redux';
import Login from './login';
import Home from './home';
import Job from './job';
import User from './user';

const rootReducer = combineReducers({
    Login,
    Home,
    Job,
    User
});

export default rootReducer;
