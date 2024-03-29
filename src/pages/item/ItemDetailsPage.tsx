import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemDetailsPageMain from '../../components/Item/ItemDetailsPageMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import SearchInput from '../../components/UI/SearchInput';
import { usePostCreateChecklistTemplate } from '../../hooks/usePostCreateChecklistTemplate';
import apiService from '../../services/api';
import { Item } from '../../services/apiTypes';

const dummyItem: Item = {
    id: 'aslkd-12-lsad-a',
    itemTemplateId: '9391293',
    serialNumber: '131233',
    wpId: '1231232',
    preCheck: {
        check: false,
        comment: '',
    },
    vendorId: '',
    createdDate: '',
    vendor: {
        id: '',
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        addedById: '',
    },
    location: {
        id: '',
        name: '',
        userId: '',
    },
    createdBy: {
        id: '',
        azureAdUserId: '',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        userRole: {
            id: '',
            name: '',
        },
        status: '',
        createdDate: '',
        updatedDate: null,
    },
    logEntries: [],
    itemTemplate: {
        inputValue: undefined,
        revision: '',
        description: '',
        id: '',
        category: {
            id: '',
            name: '',
            userId: '',
        },
        categoryId: '',
        createdById: '',
        type: 'item',
        productNumber: '',
    },
};

const ItemDetailsPage = () => {
    const navigate = useNavigate();
    //const { state } = useLocation();
    // const locationState: HasChecklistTemplateNavigation | undefined = state || {};
    // console.log(locationState)
    const [checklistSearchInputDebounced, setChecklistSearchInputDebounced] = useState('');
    const [checklistSearchInput, setChecklistSearchInput] = useState('');
    const { itemId, itemTemplateId } = useParams();
    const [cheklistsAllpageNumberPageSize, setChecklistsAllPageNumberPageSize] = useState({
        pageNumber: 1,
        pageSize: 6,
    });
    const [cheklistsAllSearchedpageNumberPageSize, setChecklistsAllSearchedPageNumberPageSize] =
        useState({
            pageNumber: 1,
            pageSize: 6,
        });

    const searchChecklistInput = checklistSearchInputDebounced.trim();

    const { pageNumber: checklistsPageNumber, pageSize: checklistsPageSize } =
        cheklistsAllpageNumberPageSize;

    const { pageNumber: checklistsSearchedPageNumber, pageSize: checklistsSearchedPageSize } =
        cheklistsAllSearchedpageNumberPageSize;

    const { data: itemChecklistData, isPending: itemChecklistDataIsPending } = useQuery({
        queryKey: ['itemHistory', { itemId: itemId, pageNumber: checklistsPageNumber }],
        queryFn: ({ signal }) => apiService().getItemChecklistsHistory({ signal, itemId: itemId! }),
        placeholderData: keepPreviousData,
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

    const itemHasAnyChecklists =
        itemChecklistData && !itemChecklistDataIsPending
            ? itemChecklistData.items.length > 0
            : undefined;

    const { data: itemTemplateData, isLoading: itemTemplateDataIsLoading } = useQuery({
        queryKey: ['itemsHasChecklistTemplate', { itemId: itemId }],
        queryFn: ({ signal }) =>
            apiService().getItemTemplateExistForItem({ signal, itemIds: [itemId!] }),
        // enabled: !!itemChecklistData,
        enabled: itemHasAnyChecklists == false,
    });

    const searchIsEnabled = searchChecklistInput != '';

    const { data: paginatedChecklistsBySearch, isLoading: searchIsPending } = useQuery({
        queryKey: [
            'searchChecklists',
            `${searchChecklistInput}`,
            itemId,
            {
                pageNumber: checklistsSearchedPageNumber,
                pageSize: checklistsSearchedPageSize,
            },
        ],
        queryFn: async ({ signal }) =>
            apiService().searchCheclistsForItem({
                checklistSearchId: searchChecklistInput,
                itemId: itemId!,
                pageNumber: checklistsPageNumber,
                pageSize: checklistsPageSize,
                signal,
            }),
        enabled: searchIsEnabled && !!itemId,
        gcTime: 0, //dont cache search data
        staleTime: 0, //default
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

    // const itemHasChecklistTemplate: boolean | undefined = itemTemplateData
    //     ? itemTemplateData[0].hasChecklistTemplate
    //     : undefined;

    const itemHasChecklistTemplate = itemHasAnyChecklists
        ? true
        : itemTemplateData
          ? itemTemplateData[0].hasChecklistTemplate
          : undefined;

    const createOrEditItemTemplate = () => {
        if (itemHasChecklistTemplate == undefined) return;
        else if (itemHasChecklistTemplate) navigate(`/${itemTemplateId}/checklistTemplate/edit`);
        else if (!itemHasChecklistTemplate) navigate(`/${itemTemplateId}/checklistTemplate/create`);
    };

    const handleAllChecklistsPaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
        if (searchIsEnabled) {
            setChecklistsAllSearchedPageNumberPageSize((prev) => ({
                pageNumber: page,
                pageSize: prev.pageSize,
            }));
        } else {
            setChecklistsAllPageNumberPageSize((prev) => ({
                pageNumber: page,
                pageSize: prev.pageSize,
            }));
        }
    };

    const checklistsToDisplay = searchIsEnabled ? paginatedChecklistsBySearch : itemChecklistData;
    const paginationPageSizeToDisplay = searchIsEnabled
        ? checklistsPageSize
        : checklistsSearchedPageSize;

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
                            {itemHasChecklistTemplate
                                ? 'Edit checklist template'
                                : 'Create checklist template'}
                        </Typography>
                    </LoadingButton>
                }
            </ItemTopHeader>
            <Box mt={5}>
                <Typography variant="h4">History</Typography>
                {itemChecklistData && itemHasAnyChecklists && (
                    <SearchInput
                        loading={searchIsPending}
                        onChange={handleSearchChange}
                        placeHolder="search for checklist id"
                        clearSearch={handleClearSearch}
                        value={checklistSearchInput}
                    ></SearchInput>
                )}
            </Box>
            <ItemDetailsPageMain
                itemChecklistData={checklistsToDisplay}
                isLoading={itemChecklistDataIsPending}
                // checklistsPageNumber={checklistsPageNumber}
                checklistsPageSize={paginationPageSizeToDisplay}
                onPaginationChange={handleAllChecklistsPaginationChange}
                // itemHasAnyChecklists={itemHasAnyChecklists}
            />
        </>
    );
};

export default ItemDetailsPage;
