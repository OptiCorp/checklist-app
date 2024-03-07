import axios, { AxiosResponse } from 'axios';
import {
    Checklist,
    ItemHasItemTemplate,
    ItemTemplate,
    Mobilization,
    PaginatedList,
} from './utils/types';

export const axiosClient = axios.create({
    baseURL: 'https://localhost:7040/api/',
});

export async function getFromChecklistApi<T>(
    url: string,
    signal: AbortSignal
): Promise<AxiosResponse<T>> {
    return axiosClient<null, AxiosResponse<T>>({
        url: url,
        method: 'GET',
        signal: signal,
    });
}

// export async function post<T>(url: string): Promise<AxiosResponse<T>> {
//     return axiosClient<null, AxiosResponse<T>>({
//         url: url,
//         method: 'POST',
//     });
// }

export const getAllMobilizations = async ({
    pageNumber,
    pageSize,
    signal,
}: {
    pageNumber: number;
    pageSize: number;
    signal: AbortSignal;
}) => {
    return getFromChecklistApi<PaginatedList<Mobilization>>(
        `Mobilizations/GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        signal
    );
};

export const searchAllMobilizations = async ({
    pageNumber,
    pageSize,
    signal,
    title,
}: {
    pageNumber: number;
    pageSize: number;
    signal: AbortSignal;
    title: string;
}) => {
    return getFromChecklistApi<PaginatedList<Mobilization>>(
        `Mobilizations/GetBySearch?title=${title}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        signal
    );
};

export const getSingleChecklist = async ({
    signal,
    mobilizationId,
    checklistId,
}: {
    signal: AbortSignal;
    mobilizationId: string;
    checklistId: string;
}) => {
    return getFromChecklistApi<Checklist>(
        `Mobilizations/${mobilizationId}/GetChecklist/${checklistId}`,
        signal
    );
};

export const getItemTemplate = async ({
    signal,
    itemId,
}: {
    signal: AbortSignal;
    itemId: string;
}) => {
    return getFromChecklistApi<ItemTemplate>(`Templates/${itemId}`, signal);
};

export const getItemChecklistsHistory = async ({
    signal,
    itemId,
}: {
    signal: AbortSignal;
    itemId: string;
}) => {
    return getFromChecklistApi<PaginatedList<Checklist>>(
        `Templates/GetChecklistsForItem/${itemId}`,
        signal
    );
};

export const getItemTemplateExistForItem = async ({
    signal,
    itemIds,
}: {
    signal: AbortSignal;
    itemIds: string[];
}) => {
    const itemIdsParsed = itemIds.join('&itemIds=');
    return getFromChecklistApi<ItemHasItemTemplate[]>(
        `Templates/GetItemTemplatesExists/?itemIds=${itemIdsParsed}`,
        signal
    );
};
