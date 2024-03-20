import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../services/api';
import { ChecklistItemTemplate } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const usePutUpdateQuestion = () => {
    return useMutation({
        mutationFn: ({
            itemId,
            question,
            questionId,
        }: {
            itemId: string;
            question: string;
            questionId: string;
        }) => {
            return axiosClient(`Templates/${itemId}/${questionId}`, {
                method: 'PUT',
                data: question,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onMutate: async ({
            itemId,
            question,
            questionId,
        }: {
            itemId: string;
            question: string;
            questionId: string;
        }) => {
            await queryClient.cancelQueries({
                queryKey: [itemId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ChecklistItemTemplate>([
                itemId,
                'itemTemplate',
            ]);

            queryClient.setQueryData<ChecklistItemTemplate>([itemId, 'itemTemplate'], (old) => {
                if (old) {
                    const questions = [...old.questions];
                    const updatedQuestion = questions.find((q) => q.id == questionId);
                    if (updatedQuestion) {
                        updatedQuestion.question = question;
                    }
                    return { ...old, questions: questions };
                }
                return undefined;
            });

            return { previousItemTemplate };
        },
        onError: (err, { itemId }, context) => {
            queryClient.setQueryData([itemId, 'itemTemplate'], context?.previousItemTemplate);
        },
        onSettled: async (err, data, { itemId }) => {
            return await queryClient.invalidateQueries({
                queryKey: [itemId, 'itemTemplate'],
            });
        },
    });
};
