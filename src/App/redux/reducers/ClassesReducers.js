import constants from "../../../constants";

const initial_state = {
    classes: null
}
const {
    set_classes
} = constants.classesReducers

export default (state = initial_state, action) => {
    switch (action.type) {
        case set_classes:
            return { ...state, classes: action.payload }
        default:
            return state;
    }
}