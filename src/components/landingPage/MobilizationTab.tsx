import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import apiService from '../../services/api';
import { MobilizationStatus } from '../../services/apiTypes';
import BottomButtons from '../BottomButtons/BottomButtons';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList from '../UI/CardWrapperList';
import SearchInput from '../UI/SearchInput';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const MobilizationTab = () => {
    const navigate = useNavigate();
    const [mobilizationSearchInputDebounced, setMobilizationSearchInputDebounced] = useState('');
    const [mobilizationSearchInput, setMobilizationSearchInput] = useState('');
    const [searhFilterOnStatus, setSearchFilterOnStatus] = useState('');
    const [searchFilterOnDate, setSearchFilterOnDate] = useState('');

    const [mobilizationsAllpageNumberPageSize, setMobilizationsAllPageNumberPageSize] = useState({
        pageNumber: 1,
        pageSize: 6,
    });
    const [searchPageNumberPageSize, setSearchPageNumberPageSize] = useState({
        pageNumber: 1,
        pageSize: 6,
    });

    const handleClearSearch = () => {
        setMobilizationSearchInput('');
        setMobilizationSearchInputDebounced('');
        setSearchFilterOnDate('');
        setSearchFilterOnStatus('');
    };

    const { pageNumber: mobilizationsPageNumber, pageSize: mobilizationsPageSize } =
        mobilizationsAllpageNumberPageSize;

    const { pageNumber: searchPageNumber, pageSize: searchPageSize } = searchPageNumberPageSize;

    const searchMobsInput = mobilizationSearchInputDebounced.trim();

    const handleClearSearchInput = () => {
        setMobilizationSearchInputDebounced('');
        setMobilizationSearchInput('');
    };

    const handleTopRightButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate('/newMob');
    };

    // const handleViewClick = (e: MouseEvent<HTMLButtonElement>) => {
    //     e.stopPropagation();
    //     navigate('/newMob');
    // };

    const GetCardBorderColor = useCallback((status: MobilizationStatus) => {
        if (status == MobilizationStatus.Completed) return 'green';
        else if (status == MobilizationStatus.Ready) return 'orange';
        else if (status == MobilizationStatus.NotReady) return 'secondary.main';
        else if (status == MobilizationStatus.Started) return 'orange';
    }, []);

    const debouncedSearch = useRef(
        debounce((criteria: string) => {
            setMobilizationSearchInputDebounced(criteria);
        }, 300)
    ).current;

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const inpText = e.target.value;
        setMobilizationSearchInput(inpText);
        debouncedSearch(inpText);
    }

    const searchIsEnabled =
        searchMobsInput != '' || searchFilterOnDate != '' || searhFilterOnStatus != '';

    const { data: paginatedMobilizations } = useQuery({
        queryKey: [
            'mobilizations',
            {
                pageNumber: mobilizationsPageNumber,
                pageSize: mobilizationsPageSize,
            },
        ],
        queryFn: async ({ signal }) =>
            apiService().getAllMobilizations({
                pageNumber: mobilizationsPageNumber,
                pageSize: mobilizationsPageSize,
                signal,
            }),
    });
    const { data: paginatedMobsBySearch, isLoading: searchIsPending } = useQuery({
        queryKey: [
            'searchMobilizations',
            `${searchMobsInput}`,
            {
                pageNumber: searchPageNumber,
                pageSize: searchPageSize,
                status: searhFilterOnStatus,
                date: searchFilterOnDate,
            },
        ],
        queryFn: async ({ signal }) =>
            apiService().searchAllMobilizations({
                status: searhFilterOnStatus,
                date: searchFilterOnDate,
                pageNumber: searchPageNumber,
                pageSize: searchPageSize,
                title: searchMobsInput,
                signal,
            }),
        enabled: searchIsEnabled,
        gcTime: 0, //TODO: make sure the search data is never cached
        staleTime: 0,
    });

    const handleSearchDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearchFilterOnDate(e.target.value);
    };

    const handleSearchStatusChange = (event: SelectChangeEvent) => {
        setSearchFilterOnStatus(event.target.value);
    };

    const onAllMobsPaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setMobilizationsAllPageNumberPageSize((prev) => ({
            pageNumber: page,
            pageSize: prev.pageSize,
        }));
    };

    const onMobsSearchPaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setSearchPageNumberPageSize((prev) => ({
            pageNumber: page,
            pageSize: prev.pageSize,
        }));
    };

    const { items: mobilizations, totalCount } = paginatedMobilizations ?? {};
    const { items: mobsBySearch, totalCount: totalCountMobsBySearch } = paginatedMobsBySearch ?? {};

    const mobsToRender = searchIsEnabled ? mobsBySearch : mobilizations;
    return (
        <>
            <Box sx={{ mt: 5 }}>
                <SearchInput
                    loading={searchIsPending}
                    placeHolder="Search: id, name"
                    onChange={handleSearchChange}
                    clearSearch={handleClearSearchInput}
                    value={mobilizationSearchInput}
                ></SearchInput>
                <Box sx={{ mt: 5, maxWidth: 200 }}>
                    <label htmlFor="searchDate">filter date:</label>
                    <input
                        type="date"
                        name="searchDate"
                        onChange={handleSearchDateChange}
                        value={searchFilterOnDate}
                    ></input>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="select-label-mob-status">Status</InputLabel>
                        <Select
                            onChange={handleSearchStatusChange}
                            value={searhFilterOnStatus}
                            labelId="select-label-mob-status"
                            label="Status"
                        >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={MobilizationStatus.NotReady}>
                                {MobilizationStatus[MobilizationStatus.NotReady]}
                            </MenuItem>
                            <MenuItem value={MobilizationStatus.Ready}>
                                {MobilizationStatus[MobilizationStatus.Ready]}
                            </MenuItem>
                            <MenuItem value={MobilizationStatus.Started}>
                                {MobilizationStatus[MobilizationStatus.Started]}
                            </MenuItem>
                            <MenuItem value={MobilizationStatus.Completed}>
                                {MobilizationStatus[MobilizationStatus.Completed]}
                            </MenuItem>
                        </Select>
                        <Button variant="contained" onClick={handleClearSearch}>
                            Clear
                        </Button>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    {mobsToRender ? (
                        mobsToRender.map((mob) => {
                            return (
                                <CardWrapper
                                    key={mob.id}
                                    onClick={() => navigate('/mobdemob/someId')} //todo:
                                    firstChild={
                                        <StyledUl>
                                            <CardWrapperList
                                                id={'mob-ID'}
                                                text={mob.id.slice(0, 5)}
                                            />
                                            <CardWrapperList id={'title'} text={mob.title} />
                                            <CardWrapperList
                                                id={'Checklist Done'}
                                                text={`${mob.checklistCountDone}`}
                                            />
                                            <CardWrapperList
                                                id={'Checklists Count'}
                                                text={`${mob.checklistCount}`}
                                            />
                                            <CardWrapperList
                                                id={'Status'}
                                                text={`${MobilizationStatus[mob.status]}`}
                                            />
                                        </StyledUl>
                                    }
                                    secondChild={
                                        <StyledUl>
                                            <CardWrapperList
                                                id={'Customer'}
                                                text={mob.customer ?? 'customer'}
                                            />
                                        </StyledUl>
                                    }
                                    borderColor={GetCardBorderColor(mob.status)}
                                    TopRightActionButton={
                                        mob.status !== MobilizationStatus.Completed &&
                                        mob.status !== MobilizationStatus.Started ? (
                                            <IconButton onClick={handleTopRightButtonClick}>
                                                <ModeEditOutlineIcon color="primary" />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={handleTopRightButtonClick}>
                                                <PreviewIcon color="primary" />
                                            </IconButton>
                                        )
                                    }
                                ></CardWrapper>
                            );
                        })
                    ) : (
                        <></>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {searchIsEnabled ? (
                            <Pagination
                                count={
                                    totalCountMobsBySearch
                                        ? Math.ceil(totalCountMobsBySearch / searchPageSize)
                                        : 0
                                }
                                color="primary"
                                onChange={onMobsSearchPaginationChange}
                            />
                        ) : (
                            <Pagination
                                count={
                                    totalCount ? Math.ceil(totalCount / mobilizationsPageSize) : 0
                                }
                                color="primary"
                                onChange={onAllMobsPaginationChange}
                            />
                        )}
                    </Box>
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
