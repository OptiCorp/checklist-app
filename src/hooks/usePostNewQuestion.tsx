import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../services/api';
import { ItemTemplate } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const usePostNewQuestion = (itemTemplateId: string) => {
    return useMutation({
        mutationFn: ({ question }: { question: string }) => {
            return axiosClient(`Templates/AddQuestionForTemplate/${itemTemplateId}`, {
                method: 'POST',
                data: question,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onMutate: async ({ itemId, question }: { itemId: string; question: string }) => {
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
                    const questions = [...old.questions, { id: 'temp', question: question }];
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
