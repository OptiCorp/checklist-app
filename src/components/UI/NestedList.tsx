import * as React from 'react';
import List from '@mui/material/List';
import styled from 'styled-components';
import DropdownCard from './DropdownCard';
import { useEffect } from 'react';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

interface Props {
    somethingHere: { topCard: JSX.Element; subCards: JSX.Element[] }[];
    allExpanded: boolean;
    changeExpand: (value: boolean) => void;
}

const NestedList: React.FC<Props> = ({ somethingHere, allExpanded, changeExpand }) => {
    const [open, setOpen] = React.useState<boolean[]>(
        new Array<boolean>(somethingHere.length).fill(false)
    );

    const handleClick = (index: number) => {
        setOpen((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };

    useEffect(() => {
        if (open.every((val) => val == true)) changeExpand(true);
        else if (open.every((val) => val == false)) changeExpand(false);
    }, [open]);

    useEffect(() => {
        if (allExpanded) {
            // Create a new array with all elements set to true
            const updatedOpen = new Array<boolean>(open.length).fill(true);

            // Update the state with the new array
            setOpen(updatedOpen);
        } else {
            const updatedOpen = new Array<boolean>(open.length).fill(false);

            // Update the state with the new array
            setOpen(updatedOpen);
        }
    }, [allExpanded]);
    console.log(open);
    return (
        <List>
            {somethingHere.map((item, index) => (
                <DropdownCard
                    key={index}
                    index={index}
                    openState={open[index]}
                    handleDropClick={handleClick}
                    topCard={item.topCard}
                    subCards={item.subCards}
                />
            ))}
        </List>
    );
};

export default NestedList;
