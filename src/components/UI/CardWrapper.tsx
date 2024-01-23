import { Card, Divider, Grid, styled } from '@mui/material';

interface Props {
    firstChild: JSX.Element;
    secondChild: JSX.Element;
}

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '0',
    border: '0.5px solid black',
}));

const CardWrapper = ({ firstChild, secondChild }: Props) => {
    return (
        <StyledCard>
            <Grid container direction={'row'} wrap="nowrap" minHeight={'4rem'}>
                <Grid item xs={6} p={3}>
                    {firstChild}
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ my: 0.7 }}></Divider>
                <Grid item xs={6} p={3}>
                    {secondChild}
                </Grid>
            </Grid>
        </StyledCard>
    );
};

export default CardWrapper;
