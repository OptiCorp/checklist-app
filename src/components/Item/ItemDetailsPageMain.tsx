import { Box, Pagination, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checklist, ChecklistStatus, PaginatedList } from '../../services/apiTypes';
import { CustomCard } from '../UI/CustomCard/CustomCard';

//TODO: get input search field and list checklistTemplates to see history for the item.
//TODO: when no checklistTemplate, show missing checklistTemplate
interface Props {
    itemChecklistData?: PaginatedList<Checklist>;
    // checklistsPageNumber: number;
    checklistsPageSize: number;
    onPaginationChange: (_: React.ChangeEvent<unknown>, page: number) => void;
    isLoading: boolean;
    itemHasAnyChecklists: boolean | undefined;
}

const ItemDetailsPageMain: FC<Props> = ({
    itemChecklistData,
    isLoading,
    // checklistsPageNumber,
    checklistsPageSize,
    onPaginationChange,
    itemHasAnyChecklists,
}) => {
    const navigate = useNavigate();

    const { items: checklists, totalCount } = itemChecklistData ?? {};

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 2.5, sm: 5 }}>
                    {checklists ? (
                        checklists.map((ch) => (
                            <CustomCard
                                key={ch.id}
                                isPhoneMode={true}
                                // onClick={() => navigate(`/${ci.mobilizationId}/checklist/${ci.id}`)} //todo:
                                topKeyValues={[
                                    { key: 'id', value: ch.id },
                                    { key: 'Part of mob:', value: ch.mobilizationId! },
                                ]}
                                // firstChild={
                                //     <StyledUl>
                                //         <CardWrapperList id={'id'} text={ci.id} />
                                //         {ci.mobilizationId && (
                                //             <CardWrapperList id={'Part of Mob'} text={ci.mobilizationId} />
                                //         )}
                                //         {/* <CardWrapperList id={'Created'} text={`${ci.created.toDateString()}`} /> */}
                                //     </StyledUl>
                                // }
                                bottomKeyValues={[
                                    { key: 'Punches', value: `${ch.punchesCount}` },
                                    { key: 'Status', value: `${ChecklistStatus[ch.status]}` },
                                ]}
                                primaryAction={() =>
                                    navigate(`/${ch.mobilizationId}/checklist/${ch.id}`)
                                }
                                primaryActionText="Checklist"
                                // secondChild={
                                //     <StyledUl>
                                //         <CardWrapperList id={'Punches'} text={`${ci.punchesCount}`} />
                                //         <CardWrapperList id={'Status'} text={`${ChecklistStatus[ci.status]}`} />

                                //     </StyledUl>
                                // }
                            ></CustomCard>
                        ))
                    ) : (
                        <></>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {checklists && checklists.length > 0 && (
                            <Pagination
                                count={totalCount ? Math.ceil(totalCount / checklistsPageSize) : 0}
                                color="primary"
                                onChange={onPaginationChange}
                            />
                        )}
                    </Box>
                </Stack>
                {itemHasAnyChecklists == false && <Typography>Has no history</Typography>}
            </Box>
        </>
    );
};

export default ItemDetailsPageMain;
