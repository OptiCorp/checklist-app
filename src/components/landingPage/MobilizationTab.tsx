import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, Button, CircularProgress, IconButton, Pagination, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { MouseEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAllMobilizations, searchAllMobilizations } from '../../api';
import { MobilizationStatus } from '../../utils/types';
import BottomButtons from '../BottomButtons/BottomButtons';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList from '../UI/CardWrapperList';
import SearchInput from '../UI/SearchInput';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

// const mockMobilizations: Mobilization[] = [
//     {
//         id: 'da-sada-sdlasmd',
//         created: new Date(),
//         lastModified: new Date(),
//         customer: 'Equinor',
//         itemsCount: 3,
//         checklistCount: 14,
//         status: 'Ready',
//         checklistCountDone: 0,
//     },
//     {
//         id: 'fgh-ddas-asdaww',
//         created: new Date(),
//         lastModified: new Date(),
//         customer: 'Equinor',
//         itemsCount: 22,
//         checklistCount: 22,
//         status: 'Completed',
//         checklistCountDone: 22,
//     },
//     {
//         id: 'wer-sada-sdlasmd',
//         created: new Date(),
//         lastModified: new Date(),
//         customer: 'Equinor',
//         itemsCount: 14,
//         checklistCount: 14,
//         status: 'NotReady',
//         checklistCountDone: 0,
//     },
//     {
//         id: 'aos-wqiueq-qppsla',
//         created: new Date(),
//         lastModified: new Date(),
//         customer: 'Equinor',
//         itemsCount: 14,
//         checklistCount: 14,
//         status: 'Started',
//         checklistCountDone: 0,
//     },
// ];

const MobilizationTab = () => {
    const navigate = useNavigate();
    const [mobilizationSearchInputDebounced, setMobilizationSearchInputDebounced] = useState('');
    const [mobilizationSearchInput, setMobilizationSearchInput] = useState('');

    const [mobilizationsAllpageNumberPageSize, setMobilizationsAllPageNumberPageSize] = useState({
        pageNumber: 1,
        pageSize: 6,
    });
    const [searchPageNumberPageSize, setSearchPageNumberPageSize] = useState({
        pageNumber: 1,
        pageSize: 6,
    });

    const { pageNumber: mobilizationsPageNumber, pageSize: mobilizationsPageSize } =
        mobilizationsAllpageNumberPageSize;

    const { pageNumber: searchPageNumber, pageSize: searchPageSize } = searchPageNumberPageSize;

    const searchMobsInput = mobilizationSearchInputDebounced.trim();

    //const { state } = useLocation();
    const handleClearSearch = () => {
        setMobilizationSearchInputDebounced('');
        setMobilizationSearchInput('');
    };

    const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate('/newMob');
    };

    const handleViewClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate('/newMob');
    };

    const GetCardBorderColor = (status: MobilizationStatus) => {
        if (status == 'Completed') return 'green';
        else if (status == 'Ready') return 'orange';
        else if (status == 'NotReady') return 'secondary.main';
        else if (status == 'Started') return 'orange';
    };

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

    const { data: paginatedMobilizations, isPending: mobsIsPending } = useQuery({
        queryKey: [
            'mobilizations',
            {
                pageNumber: mobilizationsPageNumber,
                pageSize: mobilizationsPageSize,
            },
        ],
        queryFn: async ({ signal }) =>
            getAllMobilizations({
                pageNumber: mobilizationsPageNumber,
                pageSize: mobilizationsPageSize,
                signal,
            }).then((res) => res.data),
    });

    const { data: paginatedMobsBySearch, isLoading: searchIsPending } = useQuery({
        queryKey: [
            'searchMobilizations',
            `${searchMobsInput}`,
            {
                pageNumber: searchPageNumber,
                pageSize: searchPageSize,
            },
        ],
        queryFn: async ({ signal }) =>
            searchAllMobilizations({
                pageNumber: searchPageNumber,
                pageSize: searchPageSize,
                title: searchMobsInput,
                signal,
            }).then((res) => res.data),
        enabled: searchMobsInput != '',
        gcTime: 0, //TODO: make sure it is not cached
    });

    const onAllMobsPaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setMobilizationsAllPageNumberPageSize((prev) => ({
            pageNumber: page,
            pageSize: prev.pageSize,
        }));
    };

    const onMobsSearcgPaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setSearchPageNumberPageSize((prev) => ({
            pageNumber: page,
            pageSize: prev.pageSize,
        }));
    };

    const { items: mobilizations, totalCount } = paginatedMobilizations ?? {};
    const { items: mobsBySearch, totalCount: totalCountMobsBySearch } = paginatedMobsBySearch ?? {};

    const mobsToRender = mobsBySearch ? mobsBySearch : mobilizations;

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <SearchInput
                    loading={searchIsPending}
                    placeHolder="Search: id, name"
                    onChange={handleSearchChange}
                    clearSearch={handleClearSearch}
                    value={mobilizationSearchInput}
                ></SearchInput>
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
                                            <CardWrapperList id={'Status'} text={`${mob.status}`} />
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
                                        mob.status !== 'Completed' && mob.status !== 'Started' ? (
                                            <IconButton onClick={handleEditClick}>
                                                <ModeEditOutlineIcon color="primary" />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={handleViewClick}>
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
                        {mobilizationSearchInput != '' ? (
                            <Pagination
                                count={
                                    totalCountMobsBySearch
                                        ? Math.ceil(totalCountMobsBySearch / searchPageSize)
                                        : 0
                                }
                                color="primary"
                                onChange={onMobsSearcgPaginationChange}
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
