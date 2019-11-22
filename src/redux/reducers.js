import { combineReducers } from "redux";
import { 
    HOME_PAGE_NEXT, 
    HOME_PAGE_PREV,
    UPDATE_TOKEN,
    CLEAR_TOKEN,
} from './actionTypes'

function homePagination(state = { currentPageNum: 0 }, action) {
    switch (action.type) {
        case HOME_PAGE_NEXT: {
            return {...state, currentPageNum: state.currentPageNum + 1};
        }
        case HOME_PAGE_PREV: {
            return {...state, currentPageNum: state.currentPageNum < 0 ? 0 : state.currentPageNum - 1};
        }
        default: {
            return state;
        }
    }
}

function loginToken(state = { refresh_token: "" }, action) {
    switch (action.type) {
        case UPDATE_TOKEN: {
            return {
                refresh_token: action.refresh_token,
            };
        }
        case CLEAR_TOKEN: {
            return {
                refresh_token: "",
            };
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({ homePagination, loginToken });
