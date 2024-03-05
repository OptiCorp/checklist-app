import { Box, Checkbox, Grid, Switch, Typography } from '@mui/material';
import React from 'react';
import { completeType } from '../../pages/ChecklistPage/ChecklistPage';

type taskType = {
    taskText: string;
    taskNumber: number;
    onCompletionChange: (isChecked: boolean, type: completeType) => void;
    checked: boolean;
    notApplicable: boolean;
    overrideDisabled: boolean;
};

const ChecklistRows: React.FC<taskType> = ({
    taskText,
    taskNumber,
    onCompletionChange,
    checked,
    notApplicable,
    overrideDisabled,
}) => {
    const switchlabel = { inputProps: { 'aria-label': 'Switch' } };
    const checkboxlabel = { inputProps: { 'aria-label': 'Checkbox' } };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        onCompletionChange(isChecked, 'na');
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        onCompletionChange(isChecked, 'check');
    };

    console.log(overrideDisabled);
    return (
        <Grid container wrap="nowrap" alignItems={'center'} marginTop={'1rem'}>
            <Grid item xs={1}>
                <Typography component="p">{taskNumber + 1}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Switch
                    {...switchlabel}
                    disabled={checked || overrideDisabled}
                    onChange={handleSwitchChange}
                    checked={notApplicable}
                />
            </Grid>
            <Grid item xs={8}>
                <Box>
                    <Typography component={'p'}>{taskText}</Typography>
                </Box>
            </Grid>
            <Grid item xs={1}>
                <Checkbox
                    {...checkboxlabel}
                    disabled={notApplicable || overrideDisabled}
                    onChange={handleCheckboxChange}
                    checked={checked}
                    sx={{ float: 'right' }}
                />
            </Grid>
        </Grid>
    );
};

export default ChecklistRows;
