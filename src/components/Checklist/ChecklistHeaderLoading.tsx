import { Box, Skeleton, Typography } from '@mui/material';

const ChecklistHeaderLoading = () => {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4">
                <Skeleton animation="wave" width={'30%'}></Skeleton>
            </Typography>

            <Typography>
                <Skeleton animation="wave" width={'44%'}></Skeleton>
            </Typography>
            <Typography>
                <Skeleton animation="wave" width={'26%'}></Skeleton>
            </Typography>
            <Typography>
                <Skeleton animation="wave" width={'26%'}></Skeleton>
            </Typography>
        </Box>
    );
};

export default ChecklistHeaderLoading;
