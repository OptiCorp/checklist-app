import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosClientChecklist } from '../services/api';
import { ItemTemplateChecklistApi } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

type CreateChecklistTemplateRequest = {
    questions: string[];
    itemTemplateId: string;
};

export const usePostCreateChecklistTemplate = () => {
    return useMutation({
        //TODO:
        mutationFn: async ({
            itemTemplateId,
            questions,
        }: {
            itemTemplateId: string;
            questions: string[];
        }) => {
            const res = axiosClientChecklist<
                CreateChecklistTemplateRequest,
                AxiosResponse<ItemTemplateChecklistApi>
            >(`Templates/${itemTemplateId}/CreateChecklistTemplateForItemTemplate`, {
                method: 'POST',
                data: { questions: questions, itemTemplateId: itemTemplateId },
            });
            return (await res).data;
        },
        onSuccess: (data, { itemTemplateId }) => {
            queryClient.setQueryData([itemTemplateId, 'itemTemplate'], data);
        },
    });
};
