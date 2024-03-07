import { Box, Link, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemTemplateExistForItem } from '../../api';
import { Item, ItemType } from '../../utils/types';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList from '../UI/CardWrapperList';
import { StyledUl } from './MobilizationTab';

const dummyItem1: Item = {
    type: 'assembly',
    itemId: 'TnOmHQCW6h',
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
    itemId: 'testonetwo123',
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
    itemId: 'yYRnyWrs9A',
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

interface ItemChecklistTemplate {
    itemId: string;
    serialNumber: string;
    type: ItemType;
    hasChecklistTemplate?: boolean;
}

const ItemsTab = () => {
    const navigate = useNavigate();
    const handleEditChecklistTemplateClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        navigateTo: string
    ) => {
        e.stopPropagation();
        navigate(navigateTo);
    };
    const [itemChecklistTemplate, setItemChecklistTemplate] = useState<ItemChecklistTemplate[]>([]);

    useEffect(() => {
        setItemChecklistTemplate(
            mockItems.map((item) => ({
                itemId: item.itemId,
                serialNumber: item.serialNumber,
                type: item.type,
            }))
        );
    }, []);

    const itemIds = mockItems.map((mI) => mI.itemId);

    const { data: itemDataHasItemTemplate } = useQuery({
        queryKey: ['itemsHasChecklistTemplate'],
        queryFn: async ({ signal }) =>
            getItemTemplateExistForItem({ signal, itemIds }).then((res) => res.data),
    });

    useEffect(() => {
        if (itemDataHasItemTemplate) {
            setItemChecklistTemplate(
                mockItems.map((item) => ({
                    itemId: item.itemId,
                    serialNumber: item.serialNumber,
                    type: item.type,
                    hasChecklistTemplate: itemDataHasItemTemplate.find(
                        (it) => it.itemId == item.itemId
                    )?.hasChecklistTemplate,
                }))
            );
        }
    }, [itemDataHasItemTemplate]);

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    {itemChecklistTemplate.map((item) => {
                        return (
                            <CardWrapper
                                key={item.itemId}
                                onClick={() =>
                                    navigate(`/item/${item.itemId}`, {
                                        state: {
                                            hasChecklistTemplate:
                                                item.hasChecklistTemplate ?? false,
                                        },
                                    })
                                }
                                firstChild={
                                    <StyledUl>
                                        <CardWrapperList id={'item-ID'} text={item.itemId} />
                                        <CardWrapperList id={'srn'} text={`${item.serialNumber}`} />
                                        <CardWrapperList id={'type'} text={`${item.type}`} />
                                    </StyledUl>
                                }
                                secondChild={
                                    <StyledUl>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="caption" component="span">
                                                {item.hasChecklistTemplate != undefined ? (
                                                    item.hasChecklistTemplate ? (
                                                        <Typography variant="inherit">
                                                            <Link
                                                                component={'button'}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigate(
                                                                        `/${item.itemId}/checklistTemplate`,
                                                                        {
                                                                            state: {
                                                                                hasChecklistTemplate:
                                                                                    true,
                                                                            },
                                                                        }
                                                                    );
                                                                }}
                                                                //to={`/${item.itemId}/checklistTemplate`}
                                                            >
                                                                Edit checklistTemplate
                                                            </Link>
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="inherit" color={'red'}>
                                                            <Link
                                                                component={'button'}
                                                                color={'inherit'}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigate(
                                                                        `/${item.itemId}/checklistTemplate`,
                                                                        {
                                                                            state: {
                                                                                hasChecklistTemplate:
                                                                                    false,
                                                                            },
                                                                        }
                                                                    );
                                                                }}
                                                                //to={`/${item.itemId}/checklistTemplate`}
                                                            >
                                                                Create checklistTemplate
                                                            </Link>
                                                        </Typography>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </Typography>
                                            {/* <IconButton
                                                sx={{ color: 'primary.main' }}
                                                onClick={(e) =>
                                                    handleEditChecklistTemplateClick(
                                                        e,
                                                        `${item.itemId}/checklistTemplate`
                                                    )
                                                }
                                            >
                                                <ModeEditOutlineIcon />
                                            </IconButton> */}
                                        </Box>
                                    </StyledUl>
                                }
                            ></CardWrapper>
                        );
                    })}
                </Stack>
            </Box>
        </>
    );
};

export default ItemsTab;
