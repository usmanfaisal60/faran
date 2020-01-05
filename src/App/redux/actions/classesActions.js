import axios from 'axios';
import constants from '../../../constants';

const {
    set_classes
} = constants.classesReducers

export const addClass = (name, section, callbackSuccess, callbackFailure) => {
    return async dispatch => {
        if (name) {
            try {
                const result = await axios.post(
                    constants.base_url + '/addClass',
                    makeFormData({ name, section }),
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
                        }
                    }
                );
                
                console.log(result);
                dispatch({
                    type: set_classes,
                    payload: result.data.data
                });
                callbackSuccess();
            } catch (e) {
                console.log(e);
                callbackFailure();
            }
        }
    }
}

export const getAllClasses = (callbackSuccess, callbackFailure) => {
    return async dispatch => {
        try {
            const result = await axios.get(
                `${constants.base_url}/classes`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
                    }
                }
            );

            dispatch({
                type: set_classes,
                payload: result.data
            });
            callbackSuccess();
        } catch (e) {
            console.log(e);
            callbackFailure();
        }
    }
}

const makeFormData = obj => {
    const toReturn = new FormData();
    for (let key in obj) {
        toReturn.append(key, obj[key]);
    }
    return toReturn;
}