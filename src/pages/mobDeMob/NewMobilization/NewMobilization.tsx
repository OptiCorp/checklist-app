import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    FormControl,
    ListItemButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomButtons from '../../../components/BottomButtons/BottomButtons';
import CardWrapper from '../../../components/UI/CardWrapper';
import CardWrapperList, { StyledUl } from '../../../components/UI/CardWrapperList';
import NestedList from '../../../components/UI/NestedList';
import SearchAutoComplete from '../../../components/UI/SearchAutoComplete';
import { RecentOrSearch } from '../../../components/landingPage/OverViewTabs';
import { Item } from '../../../utils/types';

const dummyItem1: Item = {
    type: 'assembly',
    itemId: 'alsk-as9as-dk',
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
    itemId: 'ølko-as9as-dk',
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
    itemId: 'poasd-sadl-as9as-drrr',
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

const NewMobilization = () => {
    const navigate = useNavigate();
    const [itemsOptions, setItemsOptions] = useState<readonly Item[]>([]);
    const [recentOrSearch, setRecentOrSearch] = useState<RecentOrSearch>('recent');

    const handleRecentOrSearch = (newOne: RecentOrSearch) => {
        setRecentOrSearch(newOne);
    };

    const itemRenderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Item) => (
        <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
            {recentOrSearch == 'search' && <SearchIcon fontSize="small" />}
            {recentOrSearch == 'recent' && <HistoryIcon fontSize="small" />}
            {option.itemId}
        </Box>
    );

    const ItemsSearch = (option: Item, value: Item) => option.itemId === value.itemId;
    const getOptionLabelItems = (option: Item) => option.itemId;

    const TopItemCard = (
        <CardWrapper
            onClick={() => navigate(`/item/soemeid`)}
            firstChild={
                <StyledUl>
                    <CardWrapperList id={'Item-ID'} text={dummyItem1.itemId} />
                    <CardWrapperList id={'Item name'} text={dummyItem1.name} />
                </StyledUl>
            }
            secondChild={
                <StyledUl>
                    {/* <Box display={'flex'} alignItems={'center'}>
                        <Typography variant="caption" component="span">
                            Go to checklist
                        </Typography>
                        <AssignmentTurnedInIcon sx={{ flexBasis: '15%' }} />
                    </Box> */}
                </StyledUl>
            }
        />
    );

    const SubItemCardList = mockItems.map((item, index) => {
        return (
            <ListItemButton key={index}>
                <CardWrapper
                    onClick={() => navigate(`/item/someotherid`)}
                    firstChild={
                        <StyledUl>
                            <CardWrapperList id={'Item-ID'} text={item.itemId} />
                            <CardWrapperList id={'Item name'} text={item.name} />
                        </StyledUl>
                    }
                    secondChild={
                        <StyledUl>
                            <Box display={'flex'} alignItems={'center'}></Box>
                        </StyledUl>
                    }
                ></CardWrapper>
            </ListItemButton>
        );
    });

    const itemCardWithItemCards: { topCard: JSX.Element; subCards: JSX.Element[] }[] = [
        {
            topCard: TopItemCard,
            subCards: SubItemCardList,
        },
        {
            topCard: TopItemCard,
            subCards: SubItemCardList,
        },
        {
            topCard: TopItemCard,
            subCards: SubItemCardList,
        },
    ];
    return (
        <>
            <Box>
                <Typography variant="h5">New Mobilization</Typography>
                <Typography variant="body1">Add details</Typography>
            </Box>
            <FormControl fullWidth margin="normal">
                <Stack
                    component="form"
                    sx={{
                        width: '70%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label={'Title'}
                        variant={'filled'}
                        color="primary"
                        type="text"
                        size="small"
                    ></TextField>
                    <TextField
                        label={'Description'}
                        variant={'filled'}
                        color="primary"
                        type="text"
                        size="small"
                    ></TextField>
                    <TextField
                        label={'Customer'}
                        variant={'filled'}
                        color="primary"
                        type="text"
                        size="small"
                    ></TextField>
                    <TextField
                        label={'Comments'}
                        variant={'filled'}
                        color="primary"
                        size="small"
                        multiline
                        rows={4}
                    ></TextField>
                </Stack>
            </FormControl>
            <Box>
                <Typography variant="h4">Add units, assemblies or items</Typography>
                <SearchAutoComplete
                    initOption={mockItems}
                    searchOptions={itemsOptions}
                    setOptions={setItemsOptions}
                    getOptionLabel={getOptionLabelItems}
                    isEqualToFunction={ItemsSearch}
                    placeHolder="Search: itemId"
                    renderOption={itemRenderOption}
                    recentOrSearch={recentOrSearch}
                    handleChangeRecentOrSearch={handleRecentOrSearch}
                    groupBy={(option) => option.type.toString()}
                />
            </Box>
            <NestedList
                somethingHere={itemCardWithItemCards}
                allExpanded={false}
                changeExpand={() => {}}
            />
            {/* <Box sx={{ mt: 5 }}>
                <Typography variant="h4">Added items</Typography>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                </Stack>
            </Box> */}

            <BottomButtons>
                <Button
                    variant="contained"
                    sx={{ marginTop: 'auto' }}
                    onClick={() => navigate('/')}
                >
                    Save
                </Button>
            </BottomButtons>
        </>
    );
};

export default NewMobilization;
