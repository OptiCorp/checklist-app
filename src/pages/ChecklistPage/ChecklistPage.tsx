import { Box, Button, Divider,Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BottomButtons from '../../components/BottomButtons/BottomButtons';
import ChecklistTaskList from '../../components/Checklist/ChecklistTaskList';
import { useState } from 'react';

const ChecklistPage = () => {
    const navigate = useNavigate();

    // const mockChecklist: string[] = [
    //     'The part is the correct size and type for its intended use.',
    //     'The part is free from cracks or fractures.',
    //     'The part fits correctly in its designated place.',
    //     'The part is not deformed or bent.',
    //     'The part is clean and free from dirt or debris.',
    //     "The part's surface finish meets the required specifications.",
    //     "The part's edges are smooth and free from burrs.",
    //     "The part's installation does not impede the function of adjacent parts.",
    //     'The part is secure and does not move when force is applied.',
    //     "The part's markings (if any) are clear and correct.",
    //     'The part does not show signs of excessive wear or tear.',
    //     "The part's temperature is within the acceptable range during operation.",
    //     "The part's weight is within the acceptable range.",
    //     "The part's color (if applicable) is consistent and correct.",
    //     "The part's material is appropriate for its function and environment.",
    //     "The part's electrical conductivity (if applicable) is within the acceptable range.",
    // ];

    const mockChecklist: string[] = [
        'The part is the correct size and type for its intended use.',
        'The part is free from cracks or fractures.',
        'The part fits correctly in its designated place.',
        'The part is not deformed or bent.',
        'The part is clean and free from dirt or debris.',
    ];

    const [taskCompletionStatus, setTaskCompletionStatus] = useState<boolean[]>(
        Array(mockChecklist.length).fill(false)
    );

    const handleTaskCompletion = (index: number, isCompleted: boolean) => {
        const newTaskCompletionStatus = [...taskCompletionStatus];
        newTaskCompletionStatus[index] = isCompleted;
        setTaskCompletionStatus(newTaskCompletionStatus);
    };

    const allTasksCompleted = taskCompletionStatus.every((status) => status);

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <Typography variant="h4">Checklist</Typography>
                        {/* <Typography variant="body1"> */}

                        <Box>
                            <Box>
                                <b>item-Id: ølko-as9as-dk</b>
                            </Box>
                            <Box>
                                <b>item name: Bolt 2.0</b>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

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
            </Box>
            <Box>
                <ChecklistTaskList tasks={mockChecklist} onTaskCompletion={handleTaskCompletion} />
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
            <BottomButtons>
                <Button variant="outlined" onClick={() => navigate('/')}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    disabled={!allTasksCompleted}
                >
                    Mark as complete
                </Button>
            </BottomButtons>
        </>
    );
};

export default ChecklistPage;
