import { ActionType, Breadcrumbs, BreadcrumbsActions } from '.';

export const breadcrumbsReducer = (state: Breadcrumbs, action: BreadcrumbsActions) => {
    switch (action.type) {
        case ActionType.GetEntry: {
            // const newLinks = [...state.links, action.payload.link];
            // console.log(newLinks);
            //return { ...state, links: newLinks };
            
        }

        // case ActionType.GoBackward: {
        //     const newLinks = state.links.slice(0, -1); // Removes the last item
        //     return { ...state, links: newLinks };
        // }
        default:
            return state;
    }
};
