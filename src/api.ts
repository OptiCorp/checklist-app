import axios, { AxiosResponse } from 'axios';
import { Mobilization, PaginatedList } from './utils/types';

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
