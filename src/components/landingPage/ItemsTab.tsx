import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostCreateChecklistTemplate } from '../../hooks/usePostCreateChecklistTemplate';
import apiService from '../../services/api';
import { Item } from '../../services/apiTypes';
import { CustomCard } from '../UI/CustomCard/CustomCard';

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
    id: 'somerandom-id-yeah',
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
    id: 'd2259717-6d21-411d-ae06-a3e20333a1ea',
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
    hasChecklistTemplate: boolean;
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
                hasChecklistTemplate: true,
            }))
        );
    }, []);

    const itemIds = mockItems.map((mI) => mI.id);

    const {
        mutate: createItemTemplateMutate,
        isPending: createItemTemplateIsPending,
        isSuccess: mutateIsSuccess,
    } = usePostCreateChecklistTemplate({ itemIds: itemIds });

    const { data: itemDataHasItemTemplate, isPending: itemDataHasItemTemplateIsPending } = useQuery(
        {
            queryKey: ['itemsHasChecklistTemplate', itemIds], //set key based on fetching from items api as well
            queryFn: async ({ signal }) =>
                apiService().getItemTemplateExistForItem({ signal, itemIds }),
        }
    );

    useEffect(() => {
        if (itemDataHasItemTemplate ?? (itemDataHasItemTemplate && mutateIsSuccess)) {
            setItemChecklistTemplate(
                mockItems.map((item) => {
                    const findItem = itemDataHasItemTemplate.find((it) => it.itemId == item.id);
                    return {
                        item: item,
                        hasChecklistTemplate: findItem ? findItem.hasChecklistTemplate : true,
                    };
                })
            );
        }
    }, [itemDataHasItemTemplate, mutateIsSuccess]);

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 2.5, sm: 4, md: 6, lg: 6 }}>
                    {itemChecklistTemplate.map((item) => {
                        return (
                            <CustomCard
                                extraKeyValueLoading={itemDataHasItemTemplateIsPending}
                                defaultExpanded={false}
                                isPhoneMode={true}
                                key={item.item.id}
                                // onClick={() =>
                                //     navigate(`/item/${item.item.id}`, {
                                //         state: {
                                //             hasChecklistTemplate:
                                //                 item.hasChecklistTemplate ?? false,
                                //         },
                                //     })
                                // }
                                // firstChild={
                                //     <StyledUl>
                                //         <CardWrapperList id={'item-ID'} text={item.item.id} />
                                //         <CardWrapperList
                                //             id={'srn'}
                                //             text={`${item.item.serialNumber}`}
                                //         />
                                //         <CardWrapperList
                                //             id={'type'}
                                //             text={`${item.item.itemTemplate.type}`}
                                //         />
                                //     </StyledUl>
                                // }
                                topKeyValues={[
                                    { key: 'item-Id', value: item.item.id },
                                    { key: 'srn', value: item.item.serialNumber },
                                    { key: 'type', value: item.item.itemTemplate.type },
                                ]}
                                extraKeyValue={{
                                    key: 'Has checklistTemplate',
                                    value: `${item.hasChecklistTemplate}`,
                                }}
                                extraKeyValueValueColor={
                                    item.hasChecklistTemplate ? 'green' : 'secondary.main'
                                }
                                primaryActionText={
                                    item.hasChecklistTemplate ? 'Edit template' : 'create template'
                                }
                                primaryAction={
                                    !item.hasChecklistTemplate
                                        ? () =>
                                              createItemTemplateMutate({
                                                  itemId: item.item.id,
                                                  questions: ['sample question'],
                                              })
                                        : () => navigate(`${item.item.id}/checklistTemplate`)
                                }
                                secondaryAction={() =>
                                    navigate(`/item/${item.item.id}`, {
                                        state: {
                                            hasChecklistTemplate:
                                                item.hasChecklistTemplate ?? false,
                                        },
                                    })
                                }
                                secondaryActionText="Item history"
                                // secondChild={
                                //     <StyledUl>
                                //         <Box display={'flex'} alignItems={'center'}>
                                //             <Typography variant="caption" component="div">
                                //                 {item.hasChecklistTemplate != undefined ? (
                                //                     item.hasChecklistTemplate ? (
                                //                         <Typography variant="inherit">
                                //                             <Link
                                //                                 component={'button'}
                                //                                 onClick={(e) => {
                                //                                     e.stopPropagation();
                                //                                     navigate(
                                //                                         `/${item.item.id}/checklistTemplate`,
                                //                                         {
                                //                                             state: {
                                //                                                 hasChecklistTemplate:
                                //                                                     true,
                                //                                             },
                                //                                         }
                                //                                     );
                                //                                 }}
                                //                                 //to={`/${item.itemId}/checklistTemplate`}
                                //                             >
                                //                                 Edit checklistTemplate
                                //                             </Link>
                                //                         </Typography>
                                //                     ) : (
                                //                         <Typography
                                //                             variant="inherit"
                                //                             component="div"
                                //                             color={'red'}
                                //                         >
                                //                             {/* <Link
                                //                                 component={'button'}
                                //                                 color={'inherit'}
                                //                                 onClick={(e) => {
                                //                                     e.stopPropagation();
                                //                                     navigate(
                                //                                         `/${item.itemId}/checklistTemplate`,
                                //                                         {
                                //                                             state: {
                                //                                                 hasChecklistTemplate:
                                //                                                     false,
                                //                                             },
                                //                                         }
                                //                                     );
                                //                                 }}
                                //                                 //to={`/${item.itemId}/checklistTemplate`}
                                //                             >
                                //                                 Create checklistTemplate
                                //                             </Link> */}
                                //                             <Button
                                //                                 // loading={
                                //                                 //     createItemTemplateIsPending
                                //                                 // }
                                //                                 onClick={(e) => {
                                //                                     e.stopPropagation();
                                //                                     createItemTemplateMutate({
                                //                                         itemId: item.item.id,
                                //                                         questions: [
                                //                                             'sample question',
                                //                                         ],
                                //                                     });
                                //                                 }}
                                //                                 variant="contained"
                                //                                 size="small"
                                //                             >
                                //                                 Create checklist template
                                //                             </Button>
                                //                         </Typography>
                                //                     )
                                //                 ) : (
                                //                     ''
                                //                 )}
                                //             </Typography>
                                //             {/* <IconButton
                                //                 sx={{ color: 'primary.main' }}
                                //                 onClick={(e) =>
                                //                     handleEditChecklistTemplateClick(
                                //                         e,
                                //                         `${item.itemId}/checklistTemplate`
                                //                     )
                                //                 }
                                //             >
                                //                 <ModeEditOutlineIcon />
                                //             </IconButton> */}
                                //         </Box>
                                //     </StyledUl>
                                // }
                            ></CustomCard>
                        );
                    })}
                </Stack>
            </Box>
        </>
    );
};

export default ItemsTab;
