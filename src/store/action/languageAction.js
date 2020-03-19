import {SET_AVAILABLE_LANGUAGES} from "../action-type";

export const setAvailableLanguages = (payload) => {
    return {type: SET_AVAILABLE_LANGUAGES, payload};
};