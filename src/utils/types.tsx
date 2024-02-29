export type ItemType = 'item' | 'subAssembly' | 'assembly' | 'unit';

export type BaseEntities = {
    id: string;
    created: Date;
    createdBy?: string;
    lastModified: Date;
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

export interface Mobilization extends BaseEntities {
    status: MobilizationStatus;
    itemsCount: number;
    checklistCountDone: number;
    checklistCount: number;
    customer: string;
}
