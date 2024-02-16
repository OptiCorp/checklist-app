import { Grid } from '@mui/material';
import styled from 'styled-components';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export type listTextType = {
    id: string;
    text: string;
};

const CardWrapperList = ({ id, text }: listTextType) => {
    return (
        <Grid component={'li'} container wrap="nowrap">
            <Grid item xs={4}>
                <b>{id}:</b>
            </Grid>
            <Grid item xs={8}>
                {text}
            </Grid>
        </Grid>
    );
};

export default CardWrapperList;
