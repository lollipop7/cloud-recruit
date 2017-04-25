import { combineReducers } from 'redux';
import Login from './login';
import Home from './home';

const rootReducer = combineReducers({
    Login,
    Home
});

export default rootReducer;
