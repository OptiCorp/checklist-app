import { useMutation } from '@tanstack/react-query';
import { axiosClientChecklist } from '../services/api';
import { queryClient } from '../tanstackQuery';
import { Checklist } from '../services/apiTypes';

export const usePostCheckOrNaChecklist = (
    mobilizationId: string,
    checklistId: string,
    checkOrNa: 'check' | 'NA'
) => {
    return useMutation({
        mutationFn: ({ questionId, value }: { questionId: string; value: boolean }) => {
            const partialEnpoint =
                checkOrNa == 'NA'
                    ? 'ChecklistQuestionNotApplicableUpdate'
                    : 'ChecklistQuestionCheckedUpdate';
            return axiosClientChecklist.post(
                `mobilizations/${mobilizationId}/${partialEnpoint}/${checklistId}/${questionId}/${value}`,
                {
                    checklistQuestionId: questionId,
                    checklistId: checklistId,
                    value: value,
                }
            );
        },
        onMutate: async ({ questionId, value }: { questionId: string; value: boolean }) => {
            await queryClient.cancelQueries({
                queryKey: ['checklist', mobilizationId, checklistId],
            });

            const previousChecklist = queryClient.getQueryData<Checklist>([
                'checklist',
                mobilizationId,
                checklistId,
            ]);

            const { questions } = { ...previousChecklist };
            const q = questions?.find((c) => c.id == questionId);
            // if (q) checkOrNa == 'NA' ? (q.notApplicable = value) : (q.checked = value);
            if (q) {
                switch (checkOrNa) {
                    case 'NA':
                        q.notApplicable = value;
                        break;
                    case 'check':
                        q.checked = value;
                        break;
                    default:
                        break;
                }
            }

            queryClient.setQueryData<Checklist>(
                ['checklist', mobilizationId, checklistId],
                (old) => (old ? { ...old, questions: questions ?? [] } : undefined)
            );

            return { previousChecklist };
        },
        onError: (err, some, context) => {
            queryClient.setQueryData(
                ['checklist', mobilizationId, checklistId],
                context?.previousChecklist
            );
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['checklist', mobilizationId, checklistId],
            });
        },
    });
};
