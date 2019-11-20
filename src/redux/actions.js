import { 
    HOME_PAGE_NEXT, 
    HOME_PAGE_PREV,
    UPDATE_TOKEN,
    CLEAR_TOKEN,
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

export const updateToken = (refresh, access) => {
    return ({
        type: UPDATE_TOKEN,
        refresh_token: refresh,
        access_token: access
    });
}

export const clearToken = () => {
    return ({
        type: CLEAR_TOKEN,
        refresh_token: "",
        access_token: ""
    });
}
