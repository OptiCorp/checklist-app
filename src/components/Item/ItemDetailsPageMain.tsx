import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checklist, ChecklistStatus, PaginatedList } from '../../services/apiTypes';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList, { StyledUl } from '../UI/CardWrapperList';

//TODO: get input search field and list checklistTemplates to see history for the item.
//TODO: when no checklistTemplate, show missing checklistTemplate
interface Props {
    itemChecklistData?: PaginatedList<Checklist>;
}

const ItemDetailsPageMain: FC<Props> = ({ itemChecklistData }) => {
    const navigate = useNavigate();

    const checklistElements = itemChecklistData?.items.map((ci) => {
        return (
            <CardWrapper
                key={ci.id}
                onClick={() => navigate(`/${ci.mobilizationId}/checklist/${ci.id}`)} //todo:
                firstChild={
                    <StyledUl>
                        <CardWrapperList id={'id'} text={ci.id} />
                        {ci.mobilizationId && (
                            <CardWrapperList id={'Part of Mob'} text={ci.mobilizationId} />
                        )}
                        {/* <CardWrapperList id={'Created'} text={`${ci.created.toDateString()}`} /> */}
                    </StyledUl>
                }
                secondChild={
                    <StyledUl>
                        <CardWrapperList id={'Punches'} text={`${ci.punchesCount}`} />
                        <CardWrapperList id={'Status'} text={`${ChecklistStatus[ci.status]}`} />

                    </StyledUl>
                }
            ></CardWrapper>
        );
    });
    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>{checklistElements}</Stack>
            </Box>
        </>
    );
};

export default ItemDetailsPageMain;
