import { Box, IconButton, Stack, Typography } from '@mui/material';
import CardWrapper from '../UI/CardWrapper';
import { StyledUl } from './MobilizationTab';
import { Part } from '../../utils/types';
import CardWrapperList from '../UI/CardWrapperList';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';

const dummyPart1: Part = {
    type: 'assembly',
    itemId: 'alsk-as9as-dk',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bob2.0',
    id: '42342-42342-12311',
    serialNumber: 'asdlømad',
    partTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    partOf: {
        partId: '12343-asd-dd-a',
        type: 'assembly',
    },
};

const dummyPart2: Part = {
    type: 'assembly',
    itemId: 'ølko-as9as-dk',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bolt2.0',
    id: 'asdonal-asdlma-das',
    serialNumber: 'asuiabs-daisd-adas',
    partTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
    partOf: {
        partId: 'alsk-as9as-dk',
        type: 'item',
    },
};

const dummyPart3: Part = {
    type: 'item',
    itemId: 'poasd-sadl-as9as-drrr',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bolt2.0',
    id: 'lkdf-asjdb-sdi3',
    serialNumber: 'qwoie-qweiqna-kasnda',
    partTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
    partOf: {
        partId: 'alsk-as9as-dk',
        type: 'item',
    },
};

const mockParts: Part[] = [dummyPart1, dummyPart2, dummyPart3];

const ItemsTab = () => {
    const navigate = useNavigate();

    const handleEditChecklistTemplateClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        navigateTo: string
    ) => {
        e.stopPropagation();
        navigate(navigateTo);
    };
    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    {mockParts.map((part) => {
                        return (
                            <CardWrapper
                                key={part.id}
                                onClick={() => navigate(`/part/${part.id}`)}
                                firstChild={
                                    <StyledUl>
                                        <CardWrapperList id={'item-ID'} text={part.id} />
                                        <CardWrapperList id={'srn'} text={`${part.serialNumber}`} />
                                        <CardWrapperList id={'type'} text={`${part.type}`} />
                                    </StyledUl>
                                }
                                secondChild={
                                    <StyledUl>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="caption" component="span">
                                                Edit checklist template
                                            </Typography>
                                            <IconButton
                                                sx={{ color: 'primary.main' }}
                                                onClick={(e) =>
                                                    handleEditChecklistTemplateClick(
                                                        e,
                                                        '/checklistTemplate'
                                                    )
                                                }
                                            >
                                                <ModeEditOutlineIcon />
                                            </IconButton>
                                        </Box>
                                    </StyledUl>
                                }
                            ></CardWrapper>
                        );
                    })}
                </Stack>
            </Box>
        </>
    );
};

export default ItemsTab;
