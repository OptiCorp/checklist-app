import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CardWrapper from '../../../components/UI/CardWrapper';
import SearchAutoComplete from '../../../components/UI/SearchAutoComplete';
import { StyledUl, listTextType } from '../../../components/landingPage/Mobilization';
import { Film, RecentOrSearch } from '../../../components/landingPage/OverViewTabs';

const top5Films: Film[] = [
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
];

const dummyTextSections: listTextType[] = [
    { id: 'Item-ID', text: '5321-1' },
    { id: 'Item-Name', text: 'Geir 1.0' },
    //{ id: 'p/n', text: 'bv 113 eu' },
];

const NewMobilization = () => {
    const [itemsOptions, setItemsOptions] = useState<readonly Film[]>([]);
    const [recentOrSearch, setRecentOrSearch] = useState<RecentOrSearch>('recent');

    const handleRecentOrSearch = (newOne: RecentOrSearch) => {
        setRecentOrSearch(newOne);
    };

    const itemRenderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Film) => (
        <Box component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
            {/* <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
        /> */}
            {recentOrSearch == 'search' && <SearchIcon fontSize="small" />}
            {recentOrSearch == 'recent' && <HistoryIcon fontSize="small" />}
            {option.title}
        </Box>
    );

    const ItemsSearch = (option: Film, value: Film) => option.title === value.title;
    const getOptionLabelItems = (option: Film) => option.title;

    const firstText = (
        <Typography variant="caption">
            <StyledUl>
                {dummyTextSections.map((item, i) => (
                    <Grid
                        key={i}
                        component={'li'}
                        container
                        wrap="nowrap"
                        justifyContent={'space-between'}
                    >
                        <Grid item sx={{ textWrap: 'nowrap' }}>
                            <b>{item.id}:</b>
                        </Grid>
                        <Grid item>{item.text} alksdnlka</Grid>
                    </Grid>
                ))}
            </StyledUl>
        </Typography>
    );

    const secondText = (
        <Typography variant="caption">
            <StyledUl>
                {dummyTextSections.map((item, i) => (
                    <Grid
                        key={i}
                        component={'li'}
                        container
                        wrap="nowrap"
                        justifyContent={'space-between'}
                    >
                        <Grid item sx={{ textWrap: 'nowrap' }}>
                            <b>{item.id}:</b>
                        </Grid>
                        <Grid item>{item.text} alksdnlka</Grid>
                    </Grid>
                ))}
            </StyledUl>
        </Typography>
    );
    return (
        <>
            <Box>
                <Typography variant="h5">New Mobilization</Typography>
                <Typography variant="body1">Add details</Typography>
            </Box>
            <FormControl fullWidth margin="normal">
                <Stack
                    component="form"
                    sx={{
                        width: '70%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label={'Title'}
                        variant={'filled'}
                        color="primary"
                        type="text"
                        size="small"
                    ></TextField>
                    <TextField
                        label={'Description'}
                        variant={'filled'}
                        color="primary"
                        type="text"
                        size="small"
                    ></TextField>
                    <TextField
                        label={'Costumer'}
                        variant={'filled'}
                        color="primary"
                        type="text"
                        size="small"
                    ></TextField>
                    <TextField
                        label={'Comments'}
                        variant={'filled'}
                        color="primary"
                        size="small"
                        multiline
                        rows={4}
                    ></TextField>
                </Stack>
            </FormControl>
            <Box>
                <SearchAutoComplete
                    initOption={top5Films}
                    searchOptions={itemsOptions}
                    setOptions={setItemsOptions}
                    getOptionLabel={getOptionLabelItems}
                    isEqualToFunction={ItemsSearch}
                    placeHolder="Search: item name"
                    renderOption={itemRenderOption}
                    recentOrSearch={recentOrSearch}
                    handleChangeRecentOrSearch={handleRecentOrSearch}
                    groupBy={(option) => option.year.toString()}
                />
            </Box>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                </Stack>
            </Box>
            <Button variant="contained" sx={{ float: 'right' }}>
                Save
            </Button>
        </>
    );
};

export default NewMobilization;
