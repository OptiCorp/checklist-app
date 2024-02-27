import { Grid, Typography, Switch, Box, Checkbox } from '@mui/material';
import React from 'react';

type taskType = {
    taskText: string;
    taskNumber: number;
};

const ChecklistRows: React.FC<taskType> = ({ taskText, taskNumber }: taskType) => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <Grid component={'li'} container wrap="nowrap" paddingTop={'2rem'} paddingLeft={'5px'}>
            <Grid item xs={1} sx={{ paddingTop: '8px' }}>
                <Typography component="p">{taskNumber + 1}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ paddingLeft: '12px' }}>
                <Switch {...label} defaultChecked />
            </Grid>
            <Grid item xs={5}>
                <Box>
                    {' '}
                    <Typography component={'p'} sx={{ paddingBottom: '25px' }}>
                        {taskText}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3} sx={{ paddingRight: '5px' }}>
                <Checkbox {...label} sx={{ float: 'right' }} />
            </Grid>
        </Grid>
    );
};

export default ChecklistRows;
