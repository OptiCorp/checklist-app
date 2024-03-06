export type ItemType = 'item' | 'subAssembly' | 'assembly' | 'unit';

export type BaseEntities = {
    id: string;
    created: Date;
    createdBy?: string;
    lastModified?: Date;
    lastModifiedBy?: string;
};

export type PartOf = {
    itemId: string;
    type: ItemType;
};

export interface Item extends BaseEntities {
    itemId: string;
    type: ItemType;
    wpId: string;
    serialNumber: string;
    name: string;
    itemTemplateId: string;
    hasChecklistTemplate: boolean;
    checklistId?: string; //TODO: this should probably not be here later
    partOf?: PartOf;
}

export interface Punch extends BaseEntities {
    title: string;
    checklistItemId: string;
    description: string;
    imagUrls: string[];
}

export interface ItemChecklists extends BaseEntities {
    PartOfMobId: string;
    Punches: Punch[];
}

export type MobilizationStatus = 'NotReady' | 'Ready' | 'Completed' | 'Started';
type MobilizationType = 'Mobilization' | 'Demobilization';

export interface Mobilization extends BaseEntities {
    status: MobilizationStatus;
    itemsCount?: number;
    type: MobilizationType;
    checklistCountDone: number;
    checklistCount: number;
    title: string;
    customer?: string;
}

export interface PaginatedList<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ChecklistQuestion extends BaseEntities {
    checked: boolean;
    notApplicable: boolean;
    question: string;
    questionTemplateId: string;
}

export enum ChecklistStatus {
    NotStarted,
    InProgress,
    Completed,
}

export interface Checklist extends BaseEntities {
    itemId: string;
    itemTemplateId: string;
    questions: ChecklistQuestion[];
    punchesCount: number;
    completionPercent: number;
    status: ChecklistStatus;
}

export interface ItemTemplate {
    itemId?: string;
    hasChecklistTemplate: boolean;
    questions: string[];
}
