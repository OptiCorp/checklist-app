import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checklist, ChecklistStatus, PaginatedList } from '../../services/apiTypes';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList, { StyledUl } from '../UI/CardWrapperList';
import { CustomCard } from '../UI/CustomCard/CustomCard';

//TODO: get input search field and list checklistTemplates to see history for the item.
//TODO: when no checklistTemplate, show missing checklistTemplate
interface Props {
    itemChecklistData?: PaginatedList<Checklist>;
    isLoading: boolean;
}

const ItemDetailsPageMain: FC<Props> = ({ itemChecklistData, isLoading }) => {
    const navigate = useNavigate();

    const checklistElements = itemChecklistData?.items.map((ci) => {
        return (
            <CustomCard
                key={ci.id}
                isPhoneMode={true}
                // onClick={() => navigate(`/${ci.mobilizationId}/checklist/${ci.id}`)} //todo:
                topKeyValues={[
                    { key: 'id', value: ci.id },
                    { key: 'Part of mob:', value: ci.mobilizationId! },
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
                    { key: 'Punches', value: `${ci.punchesCount}` },
                    { key: 'Status', value: `${ChecklistStatus[ci.status]}` },
                ]}
                // secondChild={
                //     <StyledUl>
                //         <CardWrapperList id={'Punches'} text={`${ci.punchesCount}`} />
                //         <CardWrapperList id={'Status'} text={`${ChecklistStatus[ci.status]}`} />

                //     </StyledUl>
                // }
            ></CustomCard>
        );
    });
    const hasAnyItemHistory =
        itemChecklistData && !isLoading ? itemChecklistData.items.length > 0 : true;

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>{checklistElements}</Stack>
                {!hasAnyItemHistory && <Typography>Has no history</Typography>}
            </Box>
        </>
    );
};

export default ItemDetailsPageMain;
