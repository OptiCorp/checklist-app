import { Box, Button, Divider, Grid, Switch, Checkbox, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChecklistPage = () => {
    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" sx={{ marginTop: '2rem', marginBottom: '0rem' }}>
                    Checklist
                </Typography>

                <Box>
                    <Typography
                        variant="h6"
                        sx={{ marginTop: '0rem', float: 'left', textAlign: 'left' }}
                    >
                        <b>ID: </b>
                    </Typography>
                </Box>
                <Typography
                    variant="h6"
                    sx={{ marginTop: '0rem', float: 'right', textAlign: 'right' }}
                >
                    <b>Part of:</b>
                </Typography>
            </Box>
            <div>
                <Box sx={{ paddingTop: '4rem' }}>
                    <Grid
                        component={'li'}
                        container
                        wrap="nowrap"
                        paddingTop={'2rem'}
                        paddingLeft={'5px'}
                    >
                        <Grid item xs={1}>
                            <Typography component="p">
                                <b>#</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ paddingLeft: '25px' }}>
                            <Typography component="p">
                                {' '}
                                <b>N/A</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography component="p">
                                {' '}
                                <b>Task</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ paddingRight: '10px' }}>
                            <Typography component="p" sx={{ float: 'right' }}>
                                <b>Check</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider
                        orientation="horizontal"
                        sx={{
                            width: '100%',

                            borderColor: ['#7B8287'],
                        }}
                    />
                    <Grid
                        component={'li'}
                        container
                        wrap="nowrap"
                        paddingTop={'2rem'}
                        paddingLeft={'5px'}
                    >
                        <Grid item xs={1} sx={{ paddingTop: '8px' }}>
                            <Typography component="p">
                                <b>1</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ paddingLeft: '12px' }}>
                            <Switch {...label} defaultChecked />
                        </Grid>
                        <Grid item xs={5}>
                            <Box>
                                {' '}
                                <Typography component={'p'} sx={{ paddingBottom: '25px' }}>
                                    okkithankyoooou
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3} sx={{ paddingRight: '5px' }}>
                            <Checkbox {...label} sx={{ float: 'right' }} />
                        </Grid>
                    </Grid>
                </Box>
                <Box paddingTop={'25px'}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{
                            background: 'white',
                            color: 'red',
                            borderColor: 'red',
                            borderWidth: '1px',
                        }}
                    >
                        Add punch
                    </Button>
                </Box>
                <Box
                    sx={{
                        paddingBottom: '25px',
                        paddingRight: '25px',
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{ float: 'right', marginTop: '10px' }}
                    >
                        Mark as complete
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{ float: 'right', marginTop: '10px', marginRight: '10px' }}
                    >
                        Back
                    </Button>
                </Box>
            </div>
        </>
    );
};

export default ChecklistPage;
