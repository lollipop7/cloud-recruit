import { combineReducers } from 'redux';
import Login from './login';
import Home from './home';
import Job from './job';
import Recruit from './recruit';
import Talent from './talent';
import User from './user';
import Resume from './resume-info';

const rootReducer = combineReducers({
    Login,
    Home,
    Job,
    Recruit,
    Talent,
    User,
    Resume
});

export default rootReducer;
