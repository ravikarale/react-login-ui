import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import session from './session';

const rootReducer = combineReducers({
    login,
    register,
    session,
})

export default rootReducer