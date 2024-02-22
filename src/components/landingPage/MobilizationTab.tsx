import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Mobilization } from '../../utils/types';
import BottomButtons from '../BottomButtons/BottomButtons';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList, { listTextType } from '../UI/CardWrapperList';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const mockMobilizations: Mobilization[] = [
    {
        id: 'da-sada-sdlasmd',
        created: new Date(),
        lastModified: new Date(),
        costumer: 'Equinor',
        partsCount: 3,
        checklistCount: 14,
        status: 'NotReady',
        checklistCountDone: 3,
    },
    {
        id: 'fgh-ddas-asdaww',
        created: new Date(),
        lastModified: new Date(),
        costumer: 'Equinor',
        partsCount: 22,
        checklistCount: 22,
        status: 'NotReady',
        checklistCountDone: 22,
    },
    {
        id: 'wer-sada-sdlasmd',
        created: new Date(),
        lastModified: new Date(),
        costumer: 'Equinor',
        partsCount: 14,
        checklistCount: 14,
        status: 'NotReady',
        checklistCountDone: 8,
    },
];

const MobilizationTab = () => {
    const navigate = useNavigate();
    //const { state } = useLocation();

    const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate('/newMob');
    };

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    {mockMobilizations.map((mob) => {
                        return (
                            <CardWrapper
                                key={mob.id}
                                onClick={() => navigate('/mobdemob/someId')} //todo:
                                firstChild={
                                    <StyledUl>
                                        <CardWrapperList id={'mob-ID'} text={mob.id} />
                                        <CardWrapperList
                                            id={'Checklist Done'}
                                            text={`${mob.checklistCountDone}`}
                                        />
                                        <CardWrapperList
                                            id={'Checklists Count'}
                                            text={`${mob.checklistCount}`}
                                        />
                                    </StyledUl>
                                }
                                secondChild={
                                    <StyledUl>
                                        <CardWrapperList id={'Costumer'} text={mob.costumer} />
                                    </StyledUl>
                                }
                                borderColor={
                                    mob.checklistCount != mob.checklistCountDone
                                        ? 'secondary.main'
                                        : 'primary.main'
                                }
                                TopRightActionButton={
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                        }}
                                        onClick={handleEditClick}
                                    >
                                        <ModeEditOutlineIcon color="primary" />
                                    </IconButton>
                                }
                            ></CardWrapper>
                        );
                    })}
                </Stack>
            </Box>
            <BottomButtons>
                <Button variant="contained" onClick={() => navigate('newMob')}>
                    Create new mob
                </Button>
            </BottomButtons>
        </>
    );
};

export default MobilizationTab;
