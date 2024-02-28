import { Grid, Typography, Switch, Box, Checkbox } from '@mui/material';
import React, { useState } from 'react';

type taskType = {
    taskText: string;
    taskNumber: number;
};

const ChecklistRows: React.FC<taskType> = ({ taskText, taskNumber }: taskType) => {
    const switchlabel = { inputProps: { 'aria-label': 'Switch' } };
    const checkboxlabel = { inputProps: { 'aria-label': 'Checkbox' } };

    const [isSwitchToggled, setSwitchToggled] = useState(false);
    const [isCheckboxChecked, setCheckboxChecked] = useState(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSwitchToggled(event.target.checked);
        if (event.target.checked) {
            setCheckboxChecked(false);
        }
    };

    const handleSCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxChecked(event.target.checked);
        if (event.target.checked) {
            setSwitchToggled(false);
        }
    };

    return (
        <Grid
            component={'li'}
            container
            wrap="nowrap"
            paddingTop={'2rem'}
            paddingLeft={'5px'}
            alignItems={'center'}
        >
            <Grid item xs={1}>
                <Typography component="p">{taskNumber + 1}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ paddingLeft: '12px' }}>
                <Switch {...switchlabel} checked={isSwitchToggled} onChange={handleSwitchChange} />
            </Grid>
            <Grid item xs={5}>
                <Box>
                    {' '}
                    <Typography component={'p'}>{taskText}</Typography>
                </Box>
            </Grid>
            <Grid item xs={3} sx={{ paddingRight: '5px' }}>
                <Checkbox
                    {...checkboxlabel}
                    checked={isCheckboxChecked}
                    onChange={handleSCheckboxChange}
                    sx={{ float: 'right' }}
                />
            </Grid>
        </Grid>
    );
};

export default ChecklistRows;
