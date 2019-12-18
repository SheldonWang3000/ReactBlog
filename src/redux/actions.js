import { 
    HOME_PAGE_NEXT, 
    HOME_PAGE_PREV,
    HOME_PAGE_CLEAR,
    COMMENT_ACCOUNT_SAVE,
    COMMENT_ACCOUNT_CLEAR,
    COMMENT_TOGGLE_SAVE,
    COMMENT_TOGGLE_CLEAR,
} from "./actionTypes";

export const commentToggleSave = (id) => {
    return ({
        type: COMMENT_TOGGLE_SAVE,
        commentToggleId: id 
    });
}

export const commentToggleClear = () => {
    return ({
        type: COMMENT_TOGGLE_CLEAR
    });
}

export const commentAccountSave = (username, avatarUrl) => {
    return ({
        type: COMMENT_ACCOUNT_SAVE,
        username: username,
        avatarUrl: avatarUrl
    });
}

export const commentAccountClear = () => {
    return ({
        type: COMMENT_ACCOUNT_CLEAR,
    });
}

export const homePageNext = () => {
    return ({
        type: HOME_PAGE_NEXT,
    });
};

export const homePagePrev = () => {
    return ({
        type: HOME_PAGE_PREV,
    });
};

export const homePageClear = () => {
    return ({
        type: HOME_PAGE_CLEAR,
    });
};