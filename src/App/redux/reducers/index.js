import {combineReducers} from 'redux';
import login from './LoginReducers'
import classes from './ClassesReducers'
import teachers from './TeachersReducers'

export default combineReducers({
    login,
    classes,
    teachers
})