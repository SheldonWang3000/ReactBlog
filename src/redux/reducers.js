import { combineReducers } from "redux";
import { HOME_PAGE_NEXT, HOME_PAGE_PREV } from './actionTypes'

const initialState = 0;

function homePagination(state = initialState, action) {
    switch (action.type) {
        case HOME_PAGE_NEXT: {
            return state + 1;
        }
        case HOME_PAGE_PREV: {
            return state - 1 < 0 ? 0 : state - 1;
        }
        default: {
            return state;
        }
    }

}

export default combineReducers({ homePagination });
