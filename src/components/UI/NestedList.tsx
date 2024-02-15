import * as React from 'react';
import List from '@mui/material/List';
import styled from 'styled-components';
import DropdownCard from './DropdownCard';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export type listTextType = {
    id: string;
    text: string;
};

const data: listTextType[] = [
    { id: 'id_1', text: 'text_1' },
    { id: 'id_2', text: 'text_2' },
    { id: 'id_3', text: 'text_3' },
    { id: 'id_4', text: 'text_4' },
];

const NestedList = () => {
    const [open, setOpen] = React.useState<boolean[]>([]);

    const handleClick = (index: number) => {
        setOpen((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };
    return (
        <List>
            {data.map((item, index) => (
                <DropdownCard
                    key={index}
                    item={item}
                    index={index}
                    openState={open[index]}
                    handleClick={handleClick}
                />
            ))}
        </List>
    );
};

export default NestedList;
