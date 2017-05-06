import { combineReducers } from 'redux';
import Login from './login';
import Home from './home';
import Job from './job';
import Recruit from './recruit';
import User from './user';

const rootReducer = combineReducers({
    Login,
    Home,
    Job,
    Recruit,
    User
});

export default rootReducer;
