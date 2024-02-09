import { Card, Divider, Grid, styled } from '@mui/material';

interface Props {
    firstChild: JSX.Element;
    middleChild?: JSX.Element;
    secondChild: JSX.Element;
}

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '0',
    //border: '0.5px solid black',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.text.primary,
}));

const CardWrapper = ({ firstChild, secondChild, middleChild }: Props) => {
    return (
        <StyledCard>
            <Grid container direction={'row'} wrap="nowrap" minHeight={'4rem'}>
                <Grid justifyContent={'space-between'} item xs={middleChild ? 4 : 6} p={3}>
                    {firstChild}
                </Grid>
                {middleChild && (
                    <>
                        <Divider orientation="vertical" flexItem sx={{ my: 0.7 }} />
                        <Grid item xs={4} p={3}>
                            {middleChild}
                        </Grid>
                    </>
                )}

                <Divider orientation="vertical" flexItem sx={{ my: 0.7 }}></Divider>
                <Grid item xs={middleChild ? 4 : 6} p={3}>
                    {secondChild}
                </Grid>
            </Grid>
        </StyledCard>
    );
};

export default CardWrapper;
