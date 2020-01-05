import axios from 'axios';
import constants from '../../../constants';

export const addStudent = (name, father_name, mother_name, father_phone, mother_phone, address, password, callbackSuccess, callbackFailure) => {
    return async dispatch => {
        try {
            const result = await axios.post(
                constants.base_url + '/addStudent',
                makeFormData({
                    name,
                    father_name,
                    mother_name,
                    father_phone,
                    mother_phone,
                    address,
                    password,
                    user_type: 'student',
                    isAdmin: 0
                }),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
                    }
                }
            );

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
