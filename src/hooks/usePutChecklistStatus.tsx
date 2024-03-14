import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../services/api';
import { queryClient } from '../tanstackQuery';
import { Checklist, ChecklistStatus } from '../services/apiTypes';

export const usePutChecklistStatus = (mobilizationId: string, checklistId: string) => {
    return useMutation({
        mutationFn: ({ status }: { status: ChecklistStatus }) => {
            return axiosClient.put(
                `mobilizations/${mobilizationId}/ChecklistStatus/${checklistId}/${status}`
            );
        },
        onMutate: async ({ status }: { status: ChecklistStatus }) => {
            await queryClient.cancelQueries({
                queryKey: ['checklist', mobilizationId, checklistId],
            });

            const previousChecklist = queryClient.getQueryData<Checklist>([
                'checklist',
                mobilizationId,
                checklistId,
            ]);

            queryClient.setQueryData<Checklist>([mobilizationId, checklistId], (old) =>
                old ? { ...old, status: status } : undefined
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
