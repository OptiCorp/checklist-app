export type ItemType = 'item' | 'subAssembly' | 'assembly' | 'unit';

export type BaseEntities = {
    id: string;
    created: Date;
    createdBy?: string;
    lastModified?: Date;
    lastModifiedBy?: string;
};

export type PreCheck = {
    check: boolean;
    comment: string;
};

export type Vendor = {
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    addedById: string;
};

export type User = {
    id: string;
    azureAdUserId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    userRole: UserRole;
    status: string;
    createdDate: string;
    updatedDate: string | null;
};

export type UserRole = {
    id: string;
    name: string;
};

export type LogEntry = {
    createdBy: User;
    id: string;
    itemId: string;
    userId: string;
    message: string;
    createdDate: string;
};

export type Location = {
    id: string;
    name: string;
    userId: string;
};

export type Item = {
    id: string;
    preCheck: PreCheck;
    itemTemplateId: string;
    wpId: string;
    serialNumber: string;
    vendorId: string;
    locationId?: string;
    parentId?: string;
    addedById?: string;
    comment?: string;
    listId?: string;
    parent?: Item;
    children?: Item[];
    createdDate: string;
    updatedDate?: string;
    vendor: Vendor;
    location: Location;
    createdBy: User;
    logEntries: LogEntry[];
    itemTemplate: ItemTemplate;
    documents?: Document;
};

export type ItemTemplate = {
    inputValue?: string;
    revision: string;
    description: string;
    id: string;
    category: { id: string; name: string; userId: string };
    categoryId: string;
    createdById: string;
    type: 'item' | 'subAssembly' | 'assembly' | 'unit';
    productNumber: string;
};

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

export enum MobilizationStatus {
    NotReady,
    Ready,
    Started,
    Completed,
}
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
    mobilizationId?: string;
    questions: ChecklistQuestion[];
    punchesCount: number;
    completionPercentage?: number;
    status: ChecklistStatus;
}

export interface QuestionTemplate {
    id: string;
    question: string;
}

export interface ChecklistItemTemplate extends BaseEntities {
    itemId?: string;
    questions: QuestionTemplate[];
}

export interface ItemHasChecklistItemTemplate {
    itemId: string;
    hasChecklistTemplate: boolean;
}
