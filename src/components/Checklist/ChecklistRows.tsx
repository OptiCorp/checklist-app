import { Grid, Typography, Switch, Box, Checkbox } from '@mui/material';
import React, { useState } from 'react';

type taskType = {
    taskText: string;
    taskNumber: number;
    onCompletionChange: (isChecked: boolean) => void;
};

const ChecklistRows: React.FC<taskType> = ({ taskText, taskNumber, onCompletionChange }) => {
    const switchlabel = { inputProps: { 'aria-label': 'Switch' } };
    const checkboxlabel = { inputProps: { 'aria-label': 'Checkbox' } };

    const [disabledToggle, setDisabledToggle] = useState(false);
    const [disabledCheckbox, setDisabledCheckbox] = useState(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setDisabledToggle(isChecked);
        if (isChecked) {
            setDisabledCheckbox(true);
        }
        onCompletionChange(isChecked);
    };

    const handleSCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setDisabledCheckbox(isChecked);
        if (isChecked) {
            setDisabledToggle(true);
        }
        onCompletionChange(isChecked);
    };

    return (
        <Grid component={'li'} container wrap="nowrap" paddingTop={'2rem'} paddingLeft={'5px'}>
            <Grid item xs={1} sx={{ paddingTop: '8px' }}>
                <Typography component="p">{taskNumber + 1}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ paddingLeft: '12px' }}>
                <Switch {...switchlabel} disabled={disabledToggle} onChange={handleSwitchChange} />
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
                <Checkbox
                    {...checkboxlabel}
                    disabled={disabledCheckbox}
                    onChange={handleSCheckboxChange}
                    sx={{ float: 'right' }}
                />
            </Grid>
        </Grid>
    );
};

export default ChecklistRows;
