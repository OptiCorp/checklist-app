import { useMutation } from '@tanstack/react-query';
import { axiosClientChecklist } from '../services/api';
import { ChecklistItemTemplate, ItemTemplateChecklistApi } from '../services/apiTypes';
import { queryClient } from '../tanstackQuery';

export const useDeleteQuestion = () => {
    return useMutation({
        mutationFn: ({
            itemTemplateId,
            checklistTemplateId,
            questionId,
        }: {
            itemTemplateId: string;
            checklistTemplateId: string;
            questionId: string;
        }) => {
            return axiosClientChecklist(
                `Templates/${itemTemplateId}/DeleteQuestionTemplate/${checklistTemplateId}/${questionId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        },
        onMutate: async ({
            itemTemplateId,
            index,
        }: {
            itemTemplateId: string;
            checklistTemplateId: string;
            questionId: string;
            index: number;
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
                        const questions = [...checklistTemplate.questions];
                        questions.splice(index, 1);

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
        onSettled: async (data, err, { itemTemplateId }) => {
            return await queryClient.invalidateQueries({
                queryKey: [itemTemplateId, 'itemTemplate'],
            });
        },
    });
};
