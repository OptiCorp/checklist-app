import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosClient, getSingleChecklist } from '../../api';
import BottomButtons from '../../components/BottomButtons/BottomButtons';
import ChecklistHeader from '../../components/Checklist/ChecklistHeader';
import ChecklistHeaderLoading from '../../components/Checklist/ChecklistHeaderLoading';
import ChecklistTableHeader from '../../components/Checklist/ChecklistTableHeader';
import ChecklistTaskList from '../../components/Checklist/ChecklistTaskList';
import { queryClient } from '../../tanstackQuery';
import { Checklist, ChecklistStatus } from '../../utils/types';

export type completeType = 'check' | 'na';

const ChecklistPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const paths = pathname.split('/');
    const mobilizationId = paths[1];
    const checklistId = paths[3];

    const { data: checklistData, isPending: checklistDataPending } = useQuery({
        queryKey: ['checklist', mobilizationId, checklistId],
        queryFn: async ({ signal }) =>
            getSingleChecklist({ signal, mobilizationId, checklistId }).then((res) => res.data),
    });

    const { mutate: checkMutate, isPending: checkIsPending } = useMutation({
        mutationFn: ({ questionId, value }: { questionId: string; value: boolean }) => {
            return axiosClient.post(
                `mobilizations/${mobilizationId}/ChecklistQuestionCheckedUpdate/${questionId}/${value}`
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

            //optimistically update to new value
            const { questions } = { ...previousChecklist };

            const q = questions?.find((c) => c.id == questionId);
            if (q) q.checked = value;

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

    const { mutate: naMutate, isPending: naIsPending } = useMutation({
        mutationFn: ({ questionId, value }: { questionId: string; value: boolean }) => {
            return axiosClient.post(
                `mobilizations/${mobilizationId}/ChecklistQuestionNotApplicableUpdate/${questionId}/${value}`
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
            if (q) q.notApplicable = value;

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

    const { mutate: statusMutate, isPending: statusIsPending } = useMutation({
        mutationFn: ({ checklistId, status }: { checklistId: string; status: ChecklistStatus }) => {
            return axiosClient.put(
                `mobilizations/${mobilizationId}/ChecklistStatus/${checklistId}/${status}`
            );
        },
        onMutate: async ({
            checklistId,
            status,
        }: {
            checklistId: string;
            status: ChecklistStatus;
        }) => {
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

    const handleTaskCompletion = (questionId: string, isCompleted: boolean, type: completeType) => {
        if (type == 'check') {
            checkMutate({ questionId: questionId, value: isCompleted });
        } else if (type == 'na') {
            naMutate({ questionId: questionId, value: isCompleted });
        }
    };

    const updateChecklistStatus = (status: ChecklistStatus) => {
        statusMutate({ checklistId, status });
    };

    const pending = checklistDataPending || naIsPending || checkIsPending;
    const allQuestionsMarked = checklistData?.questions.every((q) => q.checked || q.notApplicable);

    const isCompleted = checklistData ? checklistData.status === ChecklistStatus.Completed : false;
    return (
        <>
            {checklistData && !checklistDataPending && (
                <ChecklistHeader
                    id={checklistData.id}
                    itemId={checklistData.itemId}
                    punchCount={checklistData.punchesCount}
                    status={ChecklistStatus[checklistData.status]}
                ></ChecklistHeader>
            )}
            {checklistDataPending && <ChecklistHeaderLoading />}
            <ChecklistTableHeader />
            <Box>
                {checklistData && (
                    <ChecklistTaskList
                        allDisabled={isCompleted}
                        isLoading={checklistDataPending}
                        tasks={checklistData.questions}
                        onTaskCompletion={handleTaskCompletion}
                    />
                )}
            </Box>
            <Box>
                {!checklistDataPending && (
                    <Button variant="outlined" onClick={() => navigate('/')} color="secondary">
                        Add punch
                    </Button>
                )}
            </Box>
            <BottomButtons>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <LoadingButton
                    loading={statusIsPending}
                    variant="contained"
                    onClick={() =>
                        !isCompleted
                            ? updateChecklistStatus(ChecklistStatus.Completed)
                            : updateChecklistStatus(ChecklistStatus.InProgress)
                    }
                    disabled={pending || !allQuestionsMarked}
                >
                    {!isCompleted ? 'Mark as complete' : 'Mark as inprogress'}
                </LoadingButton>
            </BottomButtons>
        </>
    );
};

export default ChecklistPage;
