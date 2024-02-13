import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Router, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CardWrapper from '../UI/CardWrapper';
import { useContext } from 'react';
import { ActionType, BreadcrumbsContext } from '../../store/breadcrumbsContext';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

// const StyledLi = styled.li`
//     margin-bottom: 0.5rem;
//     text-indent: -5px;
//     display: flex;
// `;

export type listTextType = {
    id: string;
    text: string;
};

const dummyTextSections: listTextType[] = [
    { id: 'wp id', text: '5321-1' },
    { id: 's/n', text: '1143 D12C 12' },
    { id: 'p/n', text: 'bv 113 eu' },
];

const Mobilization = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    // const { state, dispatch } = useContext(BreadcrumbsContext);

    // const handleNavigate = (navigateTo: string) => {
    //     navigate(navigateTo);
    //     dispatch({ type: ActionType.GoForward, payload: { link: navigateTo } });
    // };

    // const handleClick = () => {
    //     //navigate(`mobdemod/${id}`);
    //     navigate(`mobdemob`);
    //     console.log('okkithankyou');
    // };

    console.log(state);

    const firstText = (
        <Typography variant="caption">
            <StyledUl>
                {dummyTextSections.map((item, i) => (
                    <Grid
                        key={i}
                        component={'li'}
                        container
                        wrap="nowrap"
                        justifyContent={'space-between'}
                    >
                        <Grid item sx={{ textWrap: 'nowrap' }}>
                            <b>{item.id}:</b>
                        </Grid>
                        <Grid item>{item.text} alksdnlka</Grid>
                    </Grid>
                ))}
            </StyledUl>
        </Typography>
    );
    const middleText = (
        <Typography variant="caption">
            <StyledUl>
                {dummyTextSections.map((item, i) => (
                    <Grid
                        key={i}
                        component={'li'}
                        container
                        wrap="nowrap"
                        justifyContent={'space-between'}
                    >
                        <Grid item sx={{ textWrap: 'nowrap' }}>
                            <b>{item.id}:</b>
                        </Grid>
                        <Grid item>{item.text} alksdnlka</Grid>
                    </Grid>
                ))}
            </StyledUl>
        </Typography>
    );
    const secondText = (
        <Typography variant="caption">
            <StyledUl>
                {dummyTextSections.map((item, i) => (
                    <Grid
                        key={i}
                        component={'li'}
                        container
                        wrap="nowrap"
                        justifyContent={'space-between'}
                    >
                        <Grid item sx={{ textWrap: 'nowrap' }}>
                            <b>{item.id}:</b>
                        </Grid>
                        <Grid item>{item.text} alksdnlka</Grid>
                    </Grid>
                ))}
            </StyledUl>
        </Typography>
    );

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack
                    spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}
                    onClick={() => navigate('mobdemob')}
                >
                    <CardWrapper
                        firstChild={firstText}
                        secondChild={secondText}
                        middleChild={middleText}
                    ></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                </Stack>
            </Box>
            <Button
                variant="contained"
                onClick={() => navigate('newMob')}
                sx={{ float: 'right', marginTop: '10px' }}
            >
                Create new mob
            </Button>
        </>
    );
};

export default Mobilization;
