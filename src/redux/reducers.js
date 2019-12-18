import { combineReducers } from "redux";
import {
    HOME_PAGE_NEXT,
    HOME_PAGE_PREV,
    HOME_PAGE_CLEAR,
    COMMENT_ACCOUNT_SAVE,
    COMMENT_ACCOUNT_CLEAR,
    COMMENT_TOGGLE_SAVE,
    COMMENT_TOGGLE_CLEAR,
} from './actionTypes'
import { defaultUser } from '../GlobalVariable';

function commentToggleId(state = { commentToggleId: -1 }, action) {
    switch (action.type) {
        case COMMENT_TOGGLE_SAVE: {
            return { ...state, commentToggleId: action.commentToggleId };
        }
        case COMMENT_TOGGLE_CLEAR: {
            return { ...state, commentToggleId: -1 };
        }
        default: {
            return state;
        }
    }
}

function commentAccount(state = { username: defaultUser.username, avatarUrl: defaultUser.avatarUrl }, action) {
    switch (action.type) {
        case COMMENT_ACCOUNT_SAVE: {
            return { ...state, username: action.username, avatarUrl: action.avatarUrl };
        }
        case COMMENT_ACCOUNT_CLEAR: {
            return { ...state, username: defaultUser.username, avatarUrl: defaultUser.avatarUrl };
        }
        default: {
            return state;
        }
    }
}

function homePagination(state = { currentPageNum: 0 }, action) {
    switch (action.type) {
        case HOME_PAGE_NEXT: {
            return { ...state, currentPageNum: state.currentPageNum + 1 };
        }
        case HOME_PAGE_PREV: {
            return { ...state, currentPageNum: state.currentPageNum < 0 ? 0 : state.currentPageNum - 1 };
        }
        case HOME_PAGE_CLEAR: {
            return { ...state, currentPageNum: 0 };
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({ homePagination, commentAccount, commentToggleId });
