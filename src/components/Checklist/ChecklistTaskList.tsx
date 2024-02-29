import React from 'react';
import ChecklistRows from './ChecklistRows';

type Props = {
    tasks: string[];
    onTaskCompletion: (index: number, isCompleted: boolean) => void;
    //onTaskCompletion: () => void;
};

const ChecklistTaskList: React.FC<Props> = ({ tasks, onTaskCompletion }) => {
    return (
        <>
            {tasks.map((item, index) => (
                <ChecklistRows
                    key={index}
                    taskText={item}
                    taskNumber={index}
                    onCompletionChange={(isCompleted) => onTaskCompletion(index, isCompleted)}
                />
            ))}
        </>
    );
};

export default ChecklistTaskList;
