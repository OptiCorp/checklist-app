import { Dispatch, createContext } from 'react';

export class DynamicBreadcrumbNameMap {
    private map: Record<string, string> = {};


    constructor() {
        // Initialize with any default entries if needed
        this.addEntry('/inbox', 'Inbox');
        this.addEntry('/trash', 'Trash');
        // ... add more initial entries as desired
    }

    addEntry(path: string, name: string): void {
        // You can add any logic here to handle IDs if needed
        // For demonstration purposes, I'll just use the provided name directly
        this.map[path] = name;
    }

    updateEntry(path: string, newName: string): void {
        // Update an existing entry (or add a new one if not already present)
        this.map[path] = newName;
    }

    getEntry(path: string): string | undefined {
        return this.map[path];
    }
}

export interface Breadcrumbs {
    map: Record<string, string>;
}

export enum ActionType {
    ReplaceEntry,
    GetEntry,
}

export type ReplaceEntry = {
    type: ActionType.ReplaceEntry;
    payload: {
        path: string;
    };
};

export type GetEntry = {
    type: ActionType.GetEntry;
    payload: {
        path: string;
    };
};

export const InitialBreadcrumbState: Breadcrumbs = {
    map: { '/': 'home' },
};

export type BreadcrumbsActions = ReplaceEntry | GetEntry;

export const BreadcrumbsContext = createContext<{
    state: Breadcrumbs;
    dispatch: Dispatch<BreadcrumbsActions>;
}>({ state: InitialBreadcrumbState, dispatch: () => undefined });
