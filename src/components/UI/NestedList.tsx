import * as React from 'react';
import List from '@mui/material/List';
import styled from 'styled-components';
import DropdownCard from './DropdownCard';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

interface Props {
    somethingHere: { topCard: JSX.Element; subCards: JSX.Element[] }[];
}

const NestedList: React.FC<Props> = ({ somethingHere }) => {
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
            {somethingHere.map((item, index) => (
                <DropdownCard
                    key={index}
                    index={index}
                    openState={open[index]}
                    handleClick={handleClick}
                    topCard={item.topCard}
                    subCards={item.subCards}
                />
            ))}
        </List>
    );
};

export default NestedList;
