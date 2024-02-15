import * as React from 'react';
// import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
// import CardWrapper from './CardWrapper';
import styled from 'styled-components';
// import { Typography, Grid } from '@mui/material';
import DropdownCard from './DropdownCard';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export type listTextType = {
    id: string;
    text: string;
};

const data: listTextType[] = [
    { id: 'id_1', text: 'text_1' },
    { id: 'id_2', text: 'text_2' },
    { id: 'id_3', text: 'text_3' },
    { id: 'id_4', text: 'text_4' },
];

const NestedList = () => {
    const [open, setOpen] = React.useState<boolean[]>([]);

    const handleClick = (index: number) => {
        setOpen((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };
    return (
        <List>
            {data.map((item, index) => (
                <DropdownCard
                    key={index}
                    item={item}
                    index={index}
                    openState={open[index]}
                    handleClick={handleClick}
                />
            ))}
        </List>
    );
};

export default NestedList;

// const [open, setOpen] = React.useState(false);

// const handleClick = () => {
//     setOpen(!open);
// };

// const firstText = (
//     <Typography variant="caption">
//         <StyledUl>
//             {dummyTextSections.map((item, i) => (
//                 <Grid
//                     key={i}
//                     component={'li'}
//                     container
//                     wrap="nowrap"
//                     justifyContent={'space-between'}
//                 >
//                     <Grid item sx={{ textWrap: 'nowrap' }}>
//                         <b>{item.id}:</b>
//                     </Grid>
//                     <Grid item>{item.text} alksdnlka</Grid>
//                 </Grid>
//             ))}
//         </StyledUl>
//     </Typography>
// );
// const middleText = (
//     <Typography variant="caption">
//         <StyledUl>
//             {dummyTextSections.map((item, i) => (
//                 <Grid
//                     key={i}
//                     component={'li'}
//                     container
//                     wrap="nowrap"
//                     justifyContent={'space-between'}
//                 >
//                     <Grid item sx={{ textWrap: 'nowrap' }}>
//                         <b>{item.id}:</b>
//                     </Grid>
//                     <Grid item>{item.text} alksdnlka</Grid>
//                 </Grid>
//             ))}
//         </StyledUl>
//     </Typography>
// );
// const secondText = (
//     <Typography variant="caption">
//         <StyledUl>
//             {dummyTextSections.map((item, i) => (
//                 <Grid
//                     key={i}
//                     component={'li'}
//                     container
//                     wrap="nowrap"
//                     justifyContent={'space-between'}
//                 >
//                     <Grid item sx={{ textWrap: 'nowrap' }}>
//                         <b>{item.id}:</b>
//                     </Grid>
//                     <Grid item>{item.text} alksdnlka</Grid>
//                 </Grid>
//             ))}
//         </StyledUl>
//     </Typography>
// );

// return (
//     <List
//         sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//         component="nav"
//         aria-labelledby="nested-list-subheader"
//         subheader={
//             <ListSubheader component="div" id="nested-list-subheader">
//                 hello
//             </ListSubheader>
//         }
//     >
//         <ListItemButton onClick={handleClick}>
//             <CardWrapper firstChild={firstText} secondChild={secondText} />
//             {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={open} timeout="auto" unmountOnExit orientation="vertical">
//             <List component="div" disablePadding>
//                 <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemIcon>
//                         <CardWrapper firstChild={firstText} secondChild={secondText} />
//                     </ListItemIcon>
//                 </ListItemButton>
//             </List>
//         </Collapse>
//         <ListItemButton onClick={handleClick}>
//             <CardWrapper firstChild={firstText} secondChild={secondText} />
//             {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={open} timeout="auto" unmountOnExit orientation="vertical">
//             <List component="div" disablePadding>
//                 <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemIcon>
//                         <CardWrapper firstChild={firstText} secondChild={secondText} />
//                     </ListItemIcon>
//                 </ListItemButton>
//             </List>
//         </Collapse>
//         <ListItemButton onClick={handleClick}>
//             <CardWrapper firstChild={firstText} secondChild={secondText} />
//             {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={open} timeout="auto" unmountOnExit orientation="vertical">
//             <List component="div" disablePadding>
//                 <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemIcon>
//                         <CardWrapper firstChild={firstText} secondChild={secondText} />
//                     </ListItemIcon>
//                 </ListItemButton>
//             </List>
//         </Collapse>
//     </List>
// );
// };

// export default NestedList;
