import { Grid, Skeleton, Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export type listTextType = {
    id: string;
    text: string;
    textColor?: string;
    valueIsLoading?: boolean;
};

const CardWrapperList = ({ id, text, textColor, valueIsLoading = false }: listTextType) => {
    return (
        <Grid component={'li'} container wrap="nowrap">
            <Grid item xs={5}>
                <b>{id.length > 25 ? `${id.slice(0, 25)}...` : id} :</b>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="inherit" component={'span'} color={textColor}>
                    {!valueIsLoading ? (
                        text.length > 30 ? (
                            `${text.slice(0, 30)}...`
                        ) : (
                            text
                        )
                    ) : (
                        <Skeleton animation={'wave'} />
                    )}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default CardWrapperList;
