import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomButtons from '../../components/BottomButtons/BottomButtons';
import ChecklistHeader from '../../components/Checklist/ChecklistHeader';
import ChecklistTableHeader from '../../components/Checklist/ChecklistTableHeader';
import ChecklistTaskList from '../../components/Checklist/ChecklistTaskList';
import PageHeaderLoading from '../../components/UI/PageHeaderLoading';
import { usePostCheckOrNaChecklist } from '../../hooks/usePostCheckOrNaChecklist';
import { usePutChecklistStatus } from '../../hooks/usePutChecklistStatus';
import apiService from '../../services/api';
import { ChecklistStatus } from '../../services/apiTypes';

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
            apiService().getSingleChecklist({ signal, mobilizationId, checklistId }),
    });

    const { mutate: checkMutate, isPending: checkIsPending } = usePostCheckOrNaChecklist(
        mobilizationId,
        checklistId,
        'check'
    );

    const { mutate: naMutate, isPending: naIsPending } = usePostCheckOrNaChecklist(
        mobilizationId,
        checklistId,
        'NA'
    );

    const { mutate: statusMutate, isPending: statusIsPending } = usePutChecklistStatus(
        mobilizationId,
        checklistId
    );

    const handleTaskCompletion = (questionId: string, isCompleted: boolean, type: completeType) => {
        if (type == 'check') {
            checkMutate({ questionId: questionId, value: isCompleted });
        } else if (type == 'na') {
            naMutate({ questionId: questionId, value: isCompleted });
        }
    };

    const updateChecklistStatus = (status: ChecklistStatus) => {
        statusMutate({ status });
    };

    const pending = checklistDataPending || naIsPending || checkIsPending;

    const allQuestionsMarked =
        checklistData?.questions.every((q) => q.checked || q.notApplicable) ?? false;
    const nonQuestionsMarked =
        checklistData?.questions.every((q) => !q.checked && !q.notApplicable) ?? false;

    let status: ChecklistStatus | undefined = undefined;

    if (checklistData) {
        status = checklistData.status;
    }

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
            {checklistDataPending && <PageHeaderLoading lines={4} />}
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
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/checklist/somechecklistId/punches')}
                        color="secondary"
                    >
                        Add punch
                    </Button>
                )}
            </Box>
            <BottomButtons>
                <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <LoadingButton
                    loading={statusIsPending}
                    size="small"
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
                {status != ChecklistStatus.NotStarted && nonQuestionsMarked ? (
                    <LoadingButton
                        loading={statusIsPending}
                        size="small"
                        variant="contained"
                        onClick={() => updateChecklistStatus(ChecklistStatus.NotStarted)}
                    >
                        Mark as not started
                    </LoadingButton>
                ) : (
                    <></>
                )}
            </BottomButtons>
        </>
    );
};

export default ChecklistPage;
