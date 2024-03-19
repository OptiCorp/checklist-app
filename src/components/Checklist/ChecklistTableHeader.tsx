import { Box, Grid, Typography, Divider } from '@mui/material';

const ChecklistTableHeader = () => {
    return (
        <Box>
            <Grid component={'li'} container wrap="nowrap" paddingTop={'2rem'}>
                <Grid item xs={1}>
                    <Typography component="p">
                        <b>#</b>
                    </Typography>
                </Grid>
                <Grid item xs={2} paddingLeft={'12px'}>
                    <Typography component="p">
                        <b>N/A</b>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography component="p">
                        <b>Task</b>
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography component="p" sx={{ float: 'right' }}>
                        <b>Ok</b>
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
    );
};

export default ChecklistTableHeader;
