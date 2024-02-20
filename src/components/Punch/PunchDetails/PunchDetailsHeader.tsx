import { FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
    editModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    editMode: boolean;
    punchId: string;
}
export const PunchDetailsHeader: FC<Props> = ({ editModeChange, editMode, punchId }) => {
    return (
        <Grid container>
            <Grid item flexGrow={1}>
                <Typography variant="h4">Punch</Typography>
                <Typography>
                    <b>#{punchId}</b>
                </Typography>
            </Grid>
            <Grid item>
                <FormControlLabel
                    value="end"
                    control={
                        <Switch color="primary" checked={editMode} onChange={editModeChange} />
                    }
                    label="Edit mode"
                    labelPlacement="top"
                />
            </Grid>
        </Grid>
    );
};
