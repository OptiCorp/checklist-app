import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
    id: string;
    punchCount: number;
    itemId: string;
    status: string;
}

const ChecklistHeader: FC<Props> = ({ id, itemId, punchCount, status }) => {
    return (
        <Box sx={{ mt: 5 }}>
            <Grid container>
                <Grid item flexGrow={1}>
                    <Typography variant="h4">Checklist</Typography>
                    <Box>
                        <Typography>
                            <b>id: {id}</b>
                        </Typography>
                        <Typography>
                            <b>itemId: {itemId}</b>
                        </Typography>
                        <Typography>
                            <b>punchCount: {punchCount}</b>
                        </Typography>
                        <Typography>
                            <b>status: {status}</b>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChecklistHeader;
