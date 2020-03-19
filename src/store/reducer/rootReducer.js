import {SET_AVAILABLE_LANGUAGES} from "../action-type";
import {LANGUAGES} from "../../constants"

const initState = {
    availableLanguages: LANGUAGES
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_AVAILABLE_LANGUAGES:
            return {...state, availableLanguages: action.payload};
        default:
            return state;
    }
}

export default rootReducer;