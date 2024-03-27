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
}

const ItemDetailsPageMain: FC<Props> = ({
    itemChecklistData,
    isLoading,
    // checklistsPageNumber,
    checklistsPageSize,
    onPaginationChange,
}) => {
    const navigate = useNavigate();

    const { items: checklists, totalCount } = itemChecklistData ?? {};

    const paginationCount = totalCount ? Math.ceil(totalCount / checklistsPageSize) : 0;
    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 2.5, sm: 5 }}>
                    {checklists ? (
                        checklists.map((ch) => (
                            <CustomCard
                                key={ch.id}
                                isPhoneMode={true}
                                topKeyValues={[
                                    { key: 'id', value: ch.id },
                                    { key: 'Part of mob', value: ch.mobilizationId! },
                                ]}
                                bottomKeyValues={[
                                    { key: 'Punches', value: `${ch.punchesCount}` },
                                    { key: 'Status', value: `${ChecklistStatus[ch.status]}` },
                                ]}
                                primaryAction={() =>
                                    navigate(`/${ch.mobilizationId}/checklist/${ch.id}`)
                                }
                                primaryActionText="Checklist"
                            ></CustomCard>
                        ))
                    ) : (
                        <></>
                    )}
                    {checklists && checklists.length == 0 && !isLoading && (
                        <Typography>Nothing to show</Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={paginationCount}
                            color="primary"
                            onChange={onPaginationChange}
                        />
                    </Box>
                </Stack>
            </Box>
        </>
    );
};

export default ItemDetailsPageMain;
