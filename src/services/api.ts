import axios, { AxiosResponse } from 'axios';
import { Checklist, ChecklistItemTemplate, ItemHasChecklistItemTemplate, Mobilization, PaginatedList } from './apiTypes';

export const axiosClient = axios.create({
    baseURL: 'https://localhost:7040/api/',
});

export async function getFromChecklistApi<T>(url: string, signal: AbortSignal): Promise<T> {
    const res = axiosClient<null, AxiosResponse<T>>({
        url: url,
        method: 'GET',
        signal: signal,
    });
    return (await res).data;
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
        const statusQuery = status != '' ? `&MobilizationStatus=${status}` : '';
        const queries = dateQuery.concat(statusQuery);
        return getFromChecklistApi<PaginatedList<Mobilization>>(
            `Mobilizations/GetBySearch?title=${title}&PageNumber=${pageNumber}&PageSize=${pageSize}${queries}`,
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

    const getItemTemplate = ({ signal, itemId }: { signal: AbortSignal; itemId: string }) => {
        return getFromChecklistApi<ChecklistItemTemplate>(`Templates/${itemId}`, signal);
    };

    const getItemChecklistsHistory = ({
        signal,
        itemId,
    }: {
        signal: AbortSignal;
        itemId: string;
    }) => {
        return getFromChecklistApi<PaginatedList<Checklist>>(
            `Templates/${itemId}/GetChecklistsForItem`,
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
            `Templates/GetItemTemplatesExists/?itemIds=${itemIdsParsed}`,
            signal
        );
    };

    const getCheckItemQuestionConflicts = ({
        signal,
        itemId,
        itemTemplateId,
    }: {
        signal: AbortSignal;
        itemId: string;
        itemTemplateId: string;
    }) => {
        return getFromChecklistApi<string[]>(
            `Templates/${itemId}/GetCheckItemQuestionConflict/${itemTemplateId}`,
            signal
        );
    };

    return {
        getAllMobilizations,
        searchAllMobilizations,
        getSingleChecklist,
        getItemTemplate,
        getItemChecklistsHistory,
        getItemTemplateExistForItem,
        getCheckItemQuestionConflicts,
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
