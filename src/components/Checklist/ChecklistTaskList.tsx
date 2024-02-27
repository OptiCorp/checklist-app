import React from 'react';
import ChecklistRows from './ChecklistRows';

type Props = {
    tasks: string[];
};

const ChecklistTaskList: React.FC<Props> = ({ tasks }) => {
    return (
        <>
            {tasks.map((item, index) => (
                <ChecklistRows key={index} taskText={item} taskNumber={index} />
            ))}
        </>
    );
};

export default ChecklistTaskList;
