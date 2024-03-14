import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../services/api';
import { ItemTemplate } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const useDeleteQuestion = () => {
    return useMutation({
        mutationFn: ({ itemId, questionId }: { itemId: string; questionId: string }) => {
            return axiosClient(`Templates/${itemId}/DeleteQuestionTemplate/${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onMutate: async ({
            itemId,
            index,
        }: {
            itemId: string;
            questionId: string;
            index: number;
        }) => {
            await queryClient.cancelQueries({
                queryKey: [itemId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ItemTemplate>([
                itemId,
                'itemTemplate',
            ]);

            //optimistically update to new value
            //const { questions } = { ...previousChecklist };

            queryClient.setQueryData<ItemTemplate>([itemId, 'itemTemplate'], (old) => {
                if (old) {
                    const questions = [...old.questions];
                    questions.splice(index, 1);
                    return { ...old, questions: questions };
                }
                return undefined;
            });

            return { previousItemTemplate };
        },
        onError: (err, { itemId }, context) => {
            queryClient.setQueryData([itemId, 'itemTemplate'], context?.previousItemTemplate);
        },
        onSettled: async (data, err, { itemId }) => {
            return await queryClient.invalidateQueries({
                queryKey: [itemId, 'itemTemplate'],
            });
        },
    });
};
