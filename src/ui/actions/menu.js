import {
    CLOSE_MENU,
    OPEN_MENU,
    OPEN_ABOUT,
    CLOSE_ABOUT
} from './types';

export const openMenu = () => ({
    type: OPEN_MENU
});

export const closeMenu = () => ({
    type: CLOSE_MENU
});

export const openAbout = () => ({
    type: OPEN_ABOUT
});

export const closeAbout = () => ({
    type: CLOSE_ABOUT
});
