import axios, { AxiosResponse } from 'axios';
import {
    Checklist,
    Item,
    ItemHasChecklistItemTemplate,
    ItemTemplateChecklistApi,
    Mobilization,
    PaginatedList,
} from './apiTypes';
import { msalInstance } from '../msalConfig';
import { SilentRequest } from '@azure/msal-browser';

export const axiosClientChecklist = axios.create({
    baseURL: 'https://localhost:7040/api/',
});

export const axiosClientInventory = axios.create({
    baseURL: 'https://wellpartner-inventory.azurewebsites.net/api/',
});

//'063f1617-3dd5-49a2-9323-69b1605fba48/user.read'
const request: SilentRequest = {
    scopes: [],
    account: msalInstance.getAllAccounts()[0],
};

console.log(request.account);

export async function getFromChecklistApi<T>(url: string, signal: AbortSignal): Promise<T> {
    const res = axiosClientChecklist<null, AxiosResponse<T>>({
        url: url,
        method: 'GET',
        signal: signal,
    });
    return (await res).data;
}

export async function getFromInventoryApi<T>(url: string, signal: AbortSignal): Promise<T> {
    return msalInstance.acquireTokenSilent(request).then(async (tokenReponse) => {
        const res = axiosClientInventory<null, AxiosResponse<T>>({
            url: url,
            method: 'GET',
            signal: signal,
            headers: {
                Authorization: `Bearer ${tokenReponse.accessToken}`,
            },
        });
        return (await res).data;
    });
}

const apiService = () => {
    const getAllMobilizations = ({
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

    const searchAllMobilizations = ({
        pageNumber,
        pageSize,
        status,
        date,
        signal,
        title,
    }: {
        pageNumber: number;
        pageSize: number;
        status: string;
        date: string;
        signal: AbortSignal;
        title: string;
    }) => {
        const dateQuery = date != '' ? `&date=${date}` : '';
        const statusQuery = status !== '' ? `&MobilizationStatus=${status}` : '';
        const queries = dateQuery.concat(statusQuery);
        return getFromChecklistApi<PaginatedList<Mobilization>>(
            `Mobilizations/GetBySearch?title=${title}&PageNumber=${pageNumber}&PageSize=${pageSize}${queries}`,
            signal
        );
    };

    const searchCheclistsForItem = ({
        pageNumber,
        pageSize,
        signal,
        itemId,
        checklistSearchId,
    }: {
        pageNumber: number;
        pageSize: number;
        signal: AbortSignal;
        itemId: string;
        checklistSearchId: string;
    }) => {
        // const dateQuery = date != '' ? `&date=${date}` : '';
        // const statusQuery = status != '' ? `&MobilizationStatus=${status}` : '';
        // const queries = dateQuery.concat(statusQuery);
        return getFromChecklistApi<PaginatedList<Checklist>>(
            `Items/${itemId}/searchChecklists?checklistSearchId=${checklistSearchId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
            signal
        );
    };

    const getSingleChecklist = ({
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

    const getItemTemplate = ({
        signal,
        itemTemplateId,
    }: {
        signal: AbortSignal;
        itemTemplateId: string;
    }) => {
        return getFromChecklistApi<ItemTemplateChecklistApi>(
            `Templates/${itemTemplateId}/getItemTemplateById`,
            signal
        );
    };

    const getItemChecklistsHistory = ({
        signal,
        itemId,
    }: {
        signal: AbortSignal;
        itemId: string;
    }) => {
        return getFromChecklistApi<PaginatedList<Checklist>>(
            `Items/${itemId}/GetChecklistsForItem`,
            signal
        );
    };

    const getItemTemplateExistForItem = ({
        signal,
        itemIds,
    }: {
        signal: AbortSignal;
        itemIds: string[];
    }) => {
        const itemIdsParsed = itemIds.join('&itemIds=');
        return getFromChecklistApi<ItemHasChecklistItemTemplate[]>(
            `Items/GetItemTemplatesExists?itemIds=${itemIdsParsed}`,
            signal
        );
    };

    const getCheckItemQuestionConflicts = ({
        signal,
        itemTemplateId,
        checklistTemplateId,
    }: {
        signal: AbortSignal;
        itemTemplateId: string;
        checklistTemplateId: string;
    }) => {
        return getFromChecklistApi<Checklist[]>(
            `Templates/${itemTemplateId}/GetCheckItemQuestionConflict/${checklistTemplateId}`,
            signal
        );
    };

    const getAllItems = ({ signal }: { signal: AbortSignal }) => {
        return getFromInventoryApi<Item[]>('Item', signal);
    };

    return {
        getAllMobilizations,
        searchAllMobilizations,
        getSingleChecklist,
        getItemTemplate,
        getItemChecklistsHistory,
        getItemTemplateExistForItem,
        getCheckItemQuestionConflicts,
        searchCheclistsForItem,
        getAllItems,
    };
};

export type ApiService = ReturnType<typeof apiService>;

export default apiService;

// export async function post<T>(url: string): Promise<AxiosResponse<T>> {
//     return axiosClient<null, AxiosResponse<T>>({
//         url: url,
//         method: 'POST',
//     });
// }
