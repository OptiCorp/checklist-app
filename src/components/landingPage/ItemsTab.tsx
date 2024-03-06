import { Box, IconButton, Stack, Typography } from '@mui/material';
import CardWrapper from '../UI/CardWrapper';
import { StyledUl } from './MobilizationTab';
import { Item } from '../../utils/types';
import CardWrapperList from '../UI/CardWrapperList';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';

const dummyItem1: Item = {
    type: 'assembly',
    itemId: 'TnOmHQCW6h',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bob2.0',
    id: '42342-42342-12311',
    serialNumber: 'asdlømad',
    itemTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    partOf: {
        itemId: '12343-asd-dd-a',
        type: 'assembly',
    },
};

const dummyItem2: Item = {
    type: 'assembly',
    itemId: 'TnOmHQCW6h',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bolt2.0',
    id: 'asdonal-asdlma-das',
    serialNumber: 'asuiabs-daisd-adas',
    itemTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
    partOf: {
        itemId: 'alsk-as9as-dk',
        type: 'item',
    },
};

const dummyItem3: Item = {
    type: 'item',
    itemId: 'TnOmHQCW6h',
    hasChecklistTemplate: true,
    created: new Date(),
    lastModified: new Date(),
    name: 'Bolt2.0',
    id: 'lkdf-asjdb-sdi3',
    serialNumber: 'qwoie-qweiqna-kasnda',
    itemTemplateId: 'okda-asjda-adh',
    wpId: 'aow-adnas-dasd',
    partOf: {
        itemId: 'alsk-as9as-dk',
        type: 'item',
    },
};

const mockItems: Item[] = [dummyItem1, dummyItem2, dummyItem3];

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
                    {mockItems.map((item) => {
                        return (
                            <CardWrapper
                                key={item.id}
                                onClick={() => navigate(`/item/${item.id}`)}
                                firstChild={
                                    <StyledUl>
                                        <CardWrapperList id={'item-ID'} text={item.id} />
                                        <CardWrapperList id={'srn'} text={`${item.serialNumber}`} />
                                        <CardWrapperList id={'type'} text={`${item.type}`} />
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
                                                        `${item.itemId}/checklistTemplate`
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
