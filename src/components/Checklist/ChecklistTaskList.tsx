import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { completeType } from '../../pages/ChecklistPage/ChecklistPage';
import { ChecklistQuestion } from '../../services/apiTypes';
import ChecklistRows from './ChecklistRows';

type Props = {
    tasks: ChecklistQuestion[];
    isLoading: boolean;
    allDisabled: boolean;
    onTaskCompletion: (questionId: string, isCompleted: boolean, type: completeType) => void;
};

const ChecklistTaskList: React.FC<Props> = ({
    tasks,
    onTaskCompletion,
    isLoading,
    allDisabled,
}) => {
    return (
        <>
            {!isLoading ? (
                tasks.map((item, index) => (
                    <ChecklistRows
                        overrideDisabled={allDisabled}
                        key={item.id}
                        taskText={item.question}
                        taskNumber={index}
                        checked={item.checked}
                        notApplicable={item.notApplicable}
                        onCompletionChange={(isCompleted, type) =>
                            onTaskCompletion(item.id, isCompleted, type)
                        }
                    />
                ))
            ) : (
                <Box marginTop={'1rem'}>
                    {new Array(3).fill(0).map((_, index) => (
                        <Skeleton animation="wave" key={index} height={42} />
                    ))}{' '}
                </Box>
            )}
        </>
    );
};

export default ChecklistTaskList;
