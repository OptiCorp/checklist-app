import { Box, Skeleton, Typography } from '@mui/material';
import { FC } from 'react';

//todo:make this generic for all headers
//set with 44, 26, 44 and so on...
//get props for how many lines excluding the title

interface Props {
    lines: number;
}

const PageHeaderLoading: FC<Props> = ({ lines }) => {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4">
                <Skeleton animation="wave" width={'30%'}></Skeleton>
            </Typography>
            {new Array(lines).fill(null).map((_, i) => (
                <Typography key={i}>
                    <Skeleton animation="wave" width={i % 2 == 0 ? '44%' : '26%'}></Skeleton>
                </Typography>
            ))}
        </Box>
    );
};

export default PageHeaderLoading;
