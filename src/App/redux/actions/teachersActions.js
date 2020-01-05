import axios from 'axios';
import constants from '../../../constants';

const {
    set_teachers
} = constants.teachersReducers;

const makeFormData = obj => {
    const toReturn = new FormData();
    for (let key in obj) {
        toReturn.append(key, obj[key]);
    }
    return toReturn;
}

export const addTeacher = (name, teacher_id, callbackSuccess, callbackFailure) => {
    console.log(name, teacher_id);
    return async dispatch => {
        if (name && teacher_id) {
            try {
                const result = await axios.post(
                    constants.base_url + '/addTeacher',
                    makeFormData({ name, teacher_id }),
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
                        }
                    }
                );


                dispatch({
                    type: set_teachers,
                    payload: result.data.data
                });
                callbackSuccess();
            } catch (e) {
                console.log(e);
                callbackFailure();
            }
        } else {
            callbackFailure();
        }
    }
}

export const getAllTeachers = (callbackSuccess, callbackFailure) => {
    return async dispatch => {
        try {
            const result = await axios.get(
                `${constants.base_url}/teachers`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
                    }
                }
            );

            dispatch({
                type: set_teachers,
                payload: result.data
            });
            callbackSuccess();
        } catch (e) {
            console.log(e);
            callbackFailure();
        }
    }
}
