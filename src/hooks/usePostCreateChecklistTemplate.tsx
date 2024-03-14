import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../services/api';
import { ItemHasItemTemplate } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const usePostCreateChecklistTemplate = () => {
    const navigate = useNavigate();
    return useMutation({
        //TODO:
        mutationFn: ({ itemId, questions }: { itemId: string; questions: string[] }) => {
            return axiosClient(`Templates/${itemId}/CreateTemplateForItem`, {
                method: 'POST',
                data: { questions: questions, itemId: itemId },
            });
        },
        onSuccess: (_, { itemId }) => {
            queryClient.setQueryData(
                ['itemsHasChecklistTemplate'],
                (oldData: ItemHasItemTemplate[]) => {
                    if (oldData) {
                        const newData = [...oldData];
                        const item = newData.find((it) => it.itemId == itemId);
                        if (item) item.hasChecklistTemplate = true;
                        return newData;
                    }
                    return oldData;
                }
            );
            navigate(`/${itemId}/checklistTemplate`);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['itemsHasChecklistTemplate'],
            });
        },
    });
};
