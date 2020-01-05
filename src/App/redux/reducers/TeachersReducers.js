import constants from "../../../constants";

const initial_state = {
    teachers: null
}
const {
    set_teachers
} = constants.teachersReducers

export default (state = initial_state, action) => {
    switch (action.type) {
        case set_teachers:
            return { ...state, teachers: action.payload }
        default:
            return state;
    }
}