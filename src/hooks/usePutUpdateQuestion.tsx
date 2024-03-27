import { useMutation } from '@tanstack/react-query';
import { axiosClientChecklist } from '../services/api';
import { ItemTemplateChecklistApi } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const usePutUpdateQuestion = () => {
    return useMutation({
        mutationFn: ({
            itemTemplateId,
            checklistTemplateId,
            question,
            questionId,
        }: {
            itemTemplateId: string;
            checklistTemplateId: string;
            question: string;
            questionId: string;
        }) => {
            return axiosClientChecklist(`Templates/${itemTemplateId}/${checklistTemplateId}/${questionId}`, {
                method: 'PUT',
                data: question,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onMutate: async ({
            itemTemplateId,
            question,
            questionId,
        }: {
            itemTemplateId: string;
            question: string;
            questionId: string;
        }) => {
            await queryClient.cancelQueries({
                queryKey: [itemTemplateId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ItemTemplateChecklistApi>([
                itemTemplateId,
                'itemTemplate',
            ]);

            queryClient.setQueryData<ItemTemplateChecklistApi>(
                [itemTemplateId, 'itemTemplate'],
                (old) => {
                    if (old) {
                        const checklistTemplate = { ...old.checklistTemplate };
                        // checklistTemplate.questions.push({ id: 'temp', question: '' });
                        const questions = [...checklistTemplate.questions];

                        const updatedQuestion = questions.find((q) => q.id == questionId);
                        if (updatedQuestion) {
                            updatedQuestion.question = question;
                        }
                        return {
                            ...old,
                            checklistTemplate: { ...checklistTemplate, questions: questions },
                        };
                    }
                    return undefined;
                }
            );

            return { previousItemTemplate };
        },
        onError: (err, { itemTemplateId }, context) => {
            queryClient.setQueryData(
                [itemTemplateId, 'itemTemplate'],
                context?.previousItemTemplate
            );
        },
        onSettled: async (err, data, { itemTemplateId }) => {
            return await queryClient.invalidateQueries({
                queryKey: [itemTemplateId, 'itemTemplate'],
            });
        },
    });
};
