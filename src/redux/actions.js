import { HOME_PAGE_NEXT, HOME_PAGE_PREV } from "./actionTypes";


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
