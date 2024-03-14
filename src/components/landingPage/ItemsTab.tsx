import { LoadingButton } from '@mui/lab';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostCreateChecklistTemplate } from '../../hooks/usePostCreateChecklistTemplate';
import apiService from '../../services/api';
import { Item } from '../../services/apiTypes';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList from '../UI/CardWrapperList';
import { StyledUl } from './MobilizationTab';

const dummyItem1: Item = {
    id: 'raq6iWvV1V',
    createdDate: '2024-04-21',
    serialNumber: 'asdlømad',
    itemTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    preCheck: {
        check: false,
        comment: 'random comment',
    },
    vendorId: 'oiodfnaksnd',
    vendor: {
        id: 'kaskjdnøsdføa',
        name: 'someone',
        address: '',
        email: '',
        phoneNumber: '',
        addedById: '',
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
        type: 'assembly',
        productNumber: '',
    },
    location: {
        id: 'gfsda',
        name: 'onsd+1sdd',
        userId: 'sldnfdsdmøasdølnaskln',
    },
};

const dummyItem2: Item = {
    id: 'nkjksapdnas',
    createdDate: '2024-04-21',
    serialNumber: 'asdlømad',
    itemTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    preCheck: {
        check: false,
        comment: 'random comment',
    },
    vendorId: 'oiodfnaksnd',
    vendor: {
        id: 'kaskjdnøsdføa',
        name: 'someone',
        address: '',
        email: '',
        phoneNumber: '',
        addedById: '',
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
    location: {
        id: 'gfsda',
        name: 'onsd+1sdd',
        userId: 'sldnfdsdmøasdølnaskln',
    },
};

const dummyItem3: Item = {
    id: 'rBfH8pXyYB',
    createdDate: '2024-04-21',
    serialNumber: 'asdlømad',
    itemTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    preCheck: {
        check: false,
        comment: 'random comment',
    },
    vendorId: 'oiodfnaksnd',
    vendor: {
        id: 'kaskjdnøsdføa',
        name: 'someone',
        address: '',
        email: '',
        phoneNumber: '',
        addedById: '',
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
        type: 'unit',
        productNumber: '',
    },
    location: {
        id: 'gfsda',
        name: 'onsd+1sdd',
        userId: 'sldnfdsdmøasdølnaskln',
    },
};

const dummyItem4: Item = {
    id: 'dsm12naksdd',
    createdDate: '2024-04-21',
    serialNumber: 'asdlømad',
    itemTemplateId: 'lsk-alsd',
    wpId: 'alk alsd',
    preCheck: {
        check: false,
        comment: 'random comment',
    },
    vendorId: 'oiodfnaksnd',
    vendor: {
        id: 'kaskjdnøsdføa',
        name: 'someone',
        address: '',
        email: '',
        phoneNumber: '',
        addedById: '',
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
        type: 'assembly',
        productNumber: '',
    },
    location: {
        id: 'gfsda',
        name: 'onsd+1sdd',
        userId: 'sldnfdsdmøasdølnaskln',
    },
};

const mockItems: Item[] = [dummyItem1, dummyItem2, dummyItem3, dummyItem4];

interface ItemChecklistTemplate {
    item: Item;
    hasChecklistTemplate?: boolean;
}

const ItemsTab = () => {
    const navigate = useNavigate();
    // const handleEditChecklistTemplateClick = (
    //     e: React.MouseEvent<HTMLButtonElement>,
    //     navigateTo: string
    // ) => {
    //     e.stopPropagation();
    //     navigate(navigateTo);
    // };
    const [itemChecklistTemplate, setItemChecklistTemplate] = useState<ItemChecklistTemplate[]>([]);

    useEffect(() => {
        setItemChecklistTemplate(
            mockItems.map((item) => ({
                item: item,
            }))
        );
    }, []);

    const itemIds = mockItems.map((mI) => mI.id);

    const {
        mutate: createItemTemplateMutate,
        isPending: createItemTemplateIsPending,
        isSuccess: mutateIsSuccess,
    } = usePostCreateChecklistTemplate();

    const { data: itemDataHasItemTemplate } = useQuery({
        queryKey: ['itemsHasChecklistTemplate'], //set key based on fetching from items api as well
        queryFn: async ({ signal }) =>
            apiService().getItemTemplateExistForItem({ signal, itemIds }),
    });

    useEffect(() => {
        console.log(itemDataHasItemTemplate);
        if (itemDataHasItemTemplate ?? (itemDataHasItemTemplate && mutateIsSuccess)) {
            setItemChecklistTemplate(
                mockItems.map((item) => {
                    const findItem = itemDataHasItemTemplate.find((it) => it.itemId == item.id);
                    //if (!findItem) return null;
                    return {
                        item: item,
                        hasChecklistTemplate: findItem?.hasChecklistTemplate,
                    };
                })
            );
        }
    }, [itemDataHasItemTemplate, mutateIsSuccess]);

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    {itemChecklistTemplate.map((item) => {
                        return (
                            <CardWrapper
                                key={item.item.id}
                                onClick={() =>
                                    navigate(`/item/${item.item.id}`, {
                                        state: {
                                            hasChecklistTemplate:
                                                item.hasChecklistTemplate ?? false,
                                        },
                                    })
                                }
                                firstChild={
                                    <StyledUl>
                                        <CardWrapperList id={'item-ID'} text={item.item.id} />
                                        <CardWrapperList
                                            id={'srn'}
                                            text={`${item.item.serialNumber}`}
                                        />
                                        <CardWrapperList
                                            id={'type'}
                                            text={`${item.item.itemTemplate.type}`}
                                        />
                                    </StyledUl>
                                }
                                secondChild={
                                    <StyledUl>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Typography variant="caption" component="div">
                                                {item.hasChecklistTemplate != undefined ? (
                                                    item.hasChecklistTemplate ? (
                                                        <Typography variant="inherit">
                                                            <Link
                                                                component={'button'}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigate(
                                                                        `/${item.item.id}/checklistTemplate`,
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
                                                        <Typography
                                                            variant="inherit"
                                                            component="div"
                                                            color={'red'}
                                                        >
                                                            {/* <Link
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
                                                            </Link> */}
                                                            <Button
                                                                // loading={
                                                                //     createItemTemplateIsPending
                                                                // }
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    createItemTemplateMutate({
                                                                        itemId: item.item.id,
                                                                        questions: [
                                                                            'sample question',
                                                                        ],
                                                                    });
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                            >
                                                                Create checklist template
                                                            </Button>
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
