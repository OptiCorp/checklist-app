import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import { useQuery, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ItemDetailsPageMain from '../../components/Item/ItemDetailsPageMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import SearchInput from '../../components/UI/SearchInput';
import apiService from '../../services/api';
import { Item } from '../../services/apiTypes';
import { ErrorBoundary } from 'react-error-boundary';
import axios, { AxiosError } from 'axios';
import { usePostCreateChecklistTemplate } from '../../hooks/usePostCreateChecklistTemplate';

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
    const { id: itemId } = useParams();

    const { data: itemChecklistData, isPending: itemChecklistDataIsPending } = useQuery({
        queryKey: ['itemHistory', { itemId: itemId }],
        queryFn: async ({ signal }) =>
            apiService().getItemChecklistsHistory({ signal, itemId: itemId! }),
        // throwOnError: (error) => {
        //     if (axios.isAxiosError(error)) {
        //         if (error.response) {
        //             return error.response?.status >= 500;
        //         }
        //     }
        //     return true;
        // },
        // throwOnError: true,
    });

    const { data: itemTemplateData, isLoading: itemTemplateDataIsLoading } = useQuery({
        queryKey: ['itemsHasChecklistTemplate', { itemId: itemId }],
        queryFn: async ({ signal }) =>
            apiService().getItemTemplateExistForItem({ signal, itemIds: [itemId!] }),
        enabled: !!itemChecklistData,
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

    const {
        mutate: createItemTemplateMutate,
        isPending: createItemTemplateIsPending,
        isSuccess: mutateIsSuccess,
    } = usePostCreateChecklistTemplate({ itemIds: [itemId!] });

    const ItemHasChecklistTemplate: boolean | undefined = itemTemplateData
        ? itemTemplateData[0].hasChecklistTemplate
        : undefined;

    const createOrEditItemTemplate = () => {
        if (ItemHasChecklistTemplate == undefined) return;
        else if (ItemHasChecklistTemplate) navigate(`/${itemId}/checklistTemplate`);
        else if (!ItemHasChecklistTemplate) {
            createItemTemplateMutate({ itemId: itemId!, questions: ['sample question'] });
        }
    };

    console.log(itemTemplateData);

    return (
        <>
            <ItemTopHeader item={dummyItem}>
                {
                    <LoadingButton
                        loading={itemChecklistDataIsPending || itemTemplateDataIsLoading}
                        variant="contained"
                        size="small"
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        onClick={createOrEditItemTemplate}
                    >
                        <Typography variant="body2">
                            {ItemHasChecklistTemplate
                                ? 'Edit checklist template'
                                : 'Create checklist template'}
                        </Typography>
                    </LoadingButton>
                }
            </ItemTopHeader>
            <Box mt={5}>
                <Typography variant="h4">History</Typography>
                {itemChecklistData && (
                    <SearchInput
                        loading={false}
                        onChange={handleSearchChange}
                        placeHolder="search"
                        clearSearch={handleClearSearch}
                        value={checklistSearchInput}
                    ></SearchInput>
                )}
            </Box>
            <ItemDetailsPageMain
                itemChecklistData={itemChecklistData}
                isLoading={itemChecklistDataIsPending}
            />
        </>
    );
};

export default ItemDetailsPage;
