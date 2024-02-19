export type PartType = 'item' | 'subAssembly' | 'assembly' | 'unit';

export type BaseEntities = {
    id: string;
    created: Date;
    createdBy?: string;
    lastModified: Date;
    lastModifiedBy?: string;
};
