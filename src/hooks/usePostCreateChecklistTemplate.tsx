import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../services/api';
import { ItemHasChecklistItemTemplate } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const usePostCreateChecklistTemplate = ({ itemIds }: { itemIds: string[] }) => {
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
                ['itemsHasChecklistTemplate', itemIds],
                (oldData: ItemHasChecklistItemTemplate[]) => {
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
                queryKey: ['itemsHasChecklistTemplate', itemIds],
            });
        },
    });
};
