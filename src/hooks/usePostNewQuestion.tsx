import { useMutation } from '@tanstack/react-query';
import { axiosClientChecklist } from '../services/api';
import { ChecklistItemTemplate, ItemTemplateChecklistApi } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const usePostNewQuestion = () => {
    return useMutation({
        mutationFn: ({
            question,
            itemTemplateId,
            checklistTemplateId,
        }: {
            question: string;
            itemTemplateId: string;
            checklistTemplateId: string;
        }) => {
            return axiosClientChecklist(
                `Templates/${itemTemplateId}/AddQuestionForChecklistTemplate/${checklistTemplateId}`,
                {
                    method: 'POST',
                    data: question,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        },
        onMutate: async ({
            itemTemplateId,
            question,
        }: {
            itemTemplateId: string;
            question: string;
        }) => {
            await queryClient.cancelQueries({
                queryKey: [itemTemplateId, 'itemTemplate'],
            });

            const previousItemTemplate = queryClient.getQueryData<ItemTemplateChecklistApi>([
                itemTemplateId,
                'itemTemplate',
            ]);

            //optimistically update to new value
            //const { questions } = { ...previousChecklist };

            queryClient.setQueryData<ItemTemplateChecklistApi>(
                [itemTemplateId, 'itemTemplate'],
                (old) => {
                    if (old) {
                        const checklistTemplate = { ...old.checklistTemplate };
                        // checklistTemplate.questions.push({ id: 'temp', question: '' });
                        const questions = [
                            ...checklistTemplate.questions,
                            { id: 'temp', question: question },
                        ];

                        return {
                            ...old,
                            checklistTemplate: { ...checklistTemplate, questions: questions },
                        };
                        // return { ...old, questions: questions };
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
        onSettled: async (data, err, { itemTemplateId }) => {
            return await queryClient.invalidateQueries({
                queryKey: [itemTemplateId, 'itemTemplate'],
            });
        },
    });
};
