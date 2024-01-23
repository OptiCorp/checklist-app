import React from 'react';
import CardWrapper from '../UI/CardWrapper';
import { Box, Stack, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledUl = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const Mobilization = () => {
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
        <Stack spacing={2}>
            <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
            <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
            <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
        </Stack>
    );
};

export default Mobilization;
