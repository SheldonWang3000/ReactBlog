import { combineReducers } from "redux";
import {
    HOME_PAGE_NEXT,
    HOME_PAGE_PREV,
    HOME_PAGE_CLEAR,
    TOKEN_UPDATE,
    TOKEN_CLEAR,
    COMMENT_ACCOUNT_SAVE,
    COMMENT_ACCOUNT_CLEAR,
} from './actionTypes'
import { defaultUser } from '../GlobalVariable';

function commentAccount(state = { username: defaultUser.username, avatarUrl: defaultUser.avatarUrl }, action) {
    switch (action.type) {
        case COMMENT_ACCOUNT_SAVE: {
            return { ...state, username: action.username, avatarUrl: action.avatarUrl };
        }
        case COMMENT_ACCOUNT_CLEAR:
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

function loginToken(state = { refresh_token: "" }, action) {
    switch (action.type) {
        case TOKEN_UPDATE: {
            return {
                refresh_token: action.refresh_token,
            };
        }
        case TOKEN_CLEAR: {
            return {
                refresh_token: "",
            };
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({ homePagination, loginToken, commentAccount });
