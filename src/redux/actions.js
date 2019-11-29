import { 
    HOME_PAGE_NEXT, 
    HOME_PAGE_PREV,
    HOME_PAGE_CLEAR,
    TOKEN_UPDATE,
    TOKEN_CLEAR,
} from "./actionTypes";


export const homePageNext = () => {
    return ({
        type: HOME_PAGE_NEXT,
    });
};

export const homePagePrev = () => {
    return ({
        type: HOME_PAGE_PREV,
    })
};

export const homePageClear = () => {
    return ({
        type: HOME_PAGE_CLEAR,
    })
};

export const updateToken = (refresh, access) => {
    return ({
        type: TOKEN_UPDATE,
        refresh_token: refresh,
        access_token: access
    });
}

export const clearToken = () => {
    return ({
        type: TOKEN_CLEAR,
        refresh_token: "",
        access_token: ""
    });
}
