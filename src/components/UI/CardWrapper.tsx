import { Box, Card, Divider, Grid, Typography, styled } from '@mui/material';

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
                <Grid item xs={middleChild ? 4 : 6} p={3}>
                    <Box width={'90%'} margin={'auto'}>
                        <Typography variant="caption">{firstChild}</Typography>
                    </Box>
                </Grid>
                {middleChild && (
                    <>
                        <Divider orientation="vertical" flexItem sx={{ my: 0.7 }} />
                        <Grid item xs={4} p={3}>
                            <Box width={'90%'} margin={'auto'}>
                                <Typography variant="caption"> {middleChild}</Typography>
                            </Box>
                        </Grid>
                    </>
                )}

                <Divider orientation="vertical" flexItem sx={{ my: 0.7 }}></Divider>
                <Grid item xs={middleChild ? 4 : 6} p={3}>
                    <Box width={'90%'} margin={'auto'}>
                        <Typography variant="caption"> {secondChild}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </StyledCard>
    );
};

export default CardWrapper;
