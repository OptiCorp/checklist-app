import { Box, Stack, Typography } from '@mui/material';
import CardWrapper from '../UI/CardWrapper';
import { StyledUl } from './Mobilization';

const Items = () => {
    const firstText = (
        <Box>
            <Typography variant="caption">
                <StyledUl>
                    <li>
                        <b>aksdn</b>
                    </li>
                    <li>
                        <b>aksdn</b>
                    </li>
                    <li>
                        <b>aksdn</b>
                    </li>
                </StyledUl>
            </Typography>
        </Box>
    );
    const secondText = (
        <Box>
            <Typography variant="caption">
                <StyledUl>
                    <li>aksdn</li>
                    <li>aksdn</li>
                    <li>aksdn</li>
                </StyledUl>
            </Typography>
        </Box>
    );

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                </Stack>
            </Box>
        </>
    );
};

export default Items;
