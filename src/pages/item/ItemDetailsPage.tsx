import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemDetailsPageMain from '../../components/Item/ItemDetailsPageMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import SearchInput from '../../components/UI/SearchInput';
import apiService from '../../services/api';
import { Item } from '../../services/apiTypes';

const dummyItem: Item = {
    itemId: '31232',
    id: 'aslkd-12-lsad-a',
    created: new Date(),
    lastModified: new Date(),
    name: 'Geir2.0',
    itemTemplateId: '9391293',
    serialNumber: '131233',
    type: 'item',
    wpId: '1231232',
};

const ItemDetailsPage = () => {
    const navigate = useNavigate();
    //const { state } = useLocation();
    // const locationState: HasChecklistTemplateNavigation | undefined = state || {};
    // console.log(locationState)
    const [checklistSearchInputDebounced, setChecklistSearchInputDebounced] = useState('');
    const [checklistSearchInput, setChecklistSearchInput] = useState('');
    const { pathname } = useLocation();
    const paths = pathname.split('/');
    const itemId = paths[2];

    const { data: itemChecklistData, isPending: itemChecklistDataIsPending } = useQuery({
        queryKey: ['itemHistory', { itemId: itemId }],
        queryFn: async ({ signal }) => apiService().getItemChecklistsHistory({ signal, itemId }),
    });

    const { data: itemTemplateData, isLoading: itemTemplateDateIsLoading } = useQuery({
        queryKey: ['itemsHasChecklistTemplate', { itemId: itemId }],
        queryFn: async ({ signal }) =>
            apiService().getItemTemplateExistForItem({ signal, itemIds: [itemId] }),
        enabled: !!itemChecklistData && itemChecklistData.items.length == 0,
    });

    const debouncedSearch = useRef(
        debounce((criteria: string) => {
            setChecklistSearchInputDebounced(criteria);
        }, 300)
    ).current;

    const handleClearSearch = () => {
        setChecklistSearchInputDebounced('');
        setChecklistSearchInput('');
    };

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const inpText = e.target.value;
        setChecklistSearchInput(inpText);
        debouncedSearch(inpText);
    }

    return (
        <>
            <ItemTopHeader item={dummyItem}>
                <LoadingButton
                    loading={itemChecklistDataIsPending || itemTemplateDateIsLoading}
                    variant="contained"
                    size="small"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => navigate(`/${itemId}/checklistTemplate`)}
                >
                    <Typography variant="body2">
                        {!itemTemplateData && 'Edit checklist template'}
                        {itemTemplateData &&
                            !itemTemplateData[0].hasChecklistTemplate &&
                            'Create checklist template'}
                    </Typography>
                </LoadingButton>
            </ItemTopHeader>
            <Box mt={5}>
                <Typography variant="h4">History</Typography>
                {itemChecklistData?.items.length != 0 && (
                    <SearchInput
                        loading={false}
                        onChange={handleSearchChange}
                        placeHolder="search"
                        clearSearch={handleClearSearch}
                        value={checklistSearchInput}
                    ></SearchInput>
                )}
            </Box>
            <ItemDetailsPageMain itemChecklistData={itemChecklistData} />
        </>
    );
};

export default ItemDetailsPage;
