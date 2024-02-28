import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Mobilization, MobilizationStatus } from '../../utils/types';
import BottomButtons from '../BottomButtons/BottomButtons';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList from '../UI/CardWrapperList';
import PreviewIcon from '@mui/icons-material/Preview';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const mockMobilizations: Mobilization[] = [
    {
        id: 'cf741149-e788-4dc9-ae04-a18209cdd111',
        created: new Date(),
        lastModified: new Date(),
        costumer: 'Equinor',
        partsCount: 3,
        checklistCount: 14,
        status: 'Ready',
        checklistCountDone: 0,
    },
    {
        id: 'fgh-ddas-asdaww',
        created: new Date(),
        lastModified: new Date(),
        costumer: 'Equinor',
        partsCount: 22,
        checklistCount: 22,
        status: 'Completed',
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
        checklistCountDone: 0,
    },
    {
        id: 'aos-wqiueq-qppsla',
        created: new Date(),
        lastModified: new Date(),
        costumer: 'Equinor',
        partsCount: 14,
        checklistCount: 14,
        status: 'Started',
        checklistCountDone: 0,
    },
];

const MobilizationTab = () => {
    const navigate = useNavigate();
    //const { state } = useLocation();

    const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate('/newMob');
    };

    const handleViewClick = (e: MouseEvent<HTMLButtonElement>, mobId: string) => {
        e.stopPropagation();
        navigate(`/mobdemob/${mobId}`);
    };

    const GetCardBorderColor = (status: MobilizationStatus) => {
        if (status == 'Completed') return 'green';
        else if (status == 'Ready') return 'orange';
        else if (status == 'NotReady') return 'secondary.main';
        else if (status == 'Started') return 'orange';
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
                                        <CardWrapperList id={'Status'} text={`${mob.status}`} />
                                    </StyledUl>
                                }
                                secondChild={
                                    <StyledUl>
                                        <CardWrapperList id={'Costumer'} text={mob.costumer} />
                                    </StyledUl>
                                }
                                borderColor={GetCardBorderColor(mob.status)}
                                TopRightActionButton={
                                    mob.status !== 'Completed' && mob.status !== 'Started' ? (
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
                                    ) : (
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                            }}
                                            onClick={(e) => handleViewClick(e, mob.id)}
                                        >
                                            <PreviewIcon color="primary" />
                                        </IconButton>
                                    )
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
