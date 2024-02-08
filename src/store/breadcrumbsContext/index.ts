import { Dispatch, createContext } from 'react';

export interface Breadcrumbs {
    links: string[];
}

export enum ActionType {
    GoForward,
    GoBackward,
}

export type GoForward = {
    type: ActionType.GoForward;
    payload: {
        link: string;
    };
};

export type GoBackward = {
    type: ActionType.GoBackward;
    payload: {
        link: string;
    };
};

export const InitialBreadcrumbState: Breadcrumbs = {
    links: ['test'],
};

export type BreadcrumbsActions = GoForward | GoBackward;

export const BreadcrumbsContext = createContext<{
    state: Breadcrumbs;
    dispatch: Dispatch<BreadcrumbsActions>;
}>({ state: InitialBreadcrumbState, dispatch: () => undefined });
