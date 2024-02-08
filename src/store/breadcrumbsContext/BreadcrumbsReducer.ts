import { ActionType, Breadcrumbs, BreadcrumbsActions } from '.';

export const breadcrumbsReducer = (state: Breadcrumbs, action: BreadcrumbsActions) => {
    const breadcrumbState = { ...state };

    switch (action.type) {
        case ActionType.GoForward: {
            return breadcrumbState.links.push(action.payload.link);
        }

        case ActionType.GoBackward: {
            return breadcrumbState.links.pop();
        }
        default:
            return breadcrumbState;
    }
};
