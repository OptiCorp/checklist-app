import { Grid, Skeleton, Typography, styled } from '@mui/material';

export type listTextType = {
    id: string;
    text: string;
    textColor?: string;
    valueIsLoading?: boolean;
};

const TypographyStyled = styled(Typography)(({ theme }) => ({
    // lineHeight: '60px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const CardWrapperList = ({ id, text, textColor, valueIsLoading = false }: listTextType) => {
    return (
        <Grid component={'li'} container wrap="nowrap">
            <Grid item xs={4}>
                <TypographyStyled variant="inherit">
                    <b>{id}:</b>
                </TypographyStyled>
            </Grid>
            <Grid item xs={8}>
                <TypographyStyled variant="inherit" color={textColor}>
                    {!valueIsLoading ? text : <Skeleton animation={'wave'} />}
                </TypographyStyled>
            </Grid>
        </Grid>
    );
};

export default CardWrapperList;
