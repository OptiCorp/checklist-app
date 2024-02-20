export type PartType = 'item' | 'subAssembly' | 'assembly' | 'unit';

export type BaseEntities = {
    id: string;
    created: Date;
    createdBy?: string;
    lastModified: Date;
    lastModifiedBy?: string;
};

export type PartOf = {
    partId: string;
    type: PartType;
};

export interface Part extends BaseEntities {
    itemId: string;
    type: PartType;
    wpId: string;
    serialNumber: string;
    name: string;
    partTemplateId: string;
    hasChecklistTemplate: boolean;
    partOf?: PartOf;
}

export interface Punch extends BaseEntities {
    title: string;
    checklistItemId: string;
    description: string;
    imagUrls: string[];
}
