import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Typography,
    styled,
} from '@mui/material';
import { FC } from 'react';
import CardWrapperList, { StyledUl } from '../CardWrapperList';

const StyledCustomAccordian = styled(Accordion)(({ theme }) => ({
    //border: '0.5px solid black',
    // borderStyle: 'solid',
    // borderWidth: '1px',
    borderColor: theme.palette.text.primary,
    backgroundColor: ['#F2F2F2'],
}));

interface CardProps {
    topKeyValues: { key: string; value: string }[];
    extraKeyValue?: { key: string; value?: string };
    extraKeyValueLoading?: boolean;
    extraKeyValueValueColor?: string;
    bottomKeyValues?: { key: string; value: string }[];
    primaryAction?: () => void;
    primaryActionText?: string;
    secondaryAction?: () => void;
    secondaryActionText?: string;
    isPhoneMode: boolean;
    defaultExpanded?: boolean;
}

export const CustomCard: FC<CardProps> = ({
    topKeyValues,
    bottomKeyValues,
    extraKeyValue,
    extraKeyValueLoading,
    extraKeyValueValueColor,
    primaryAction,
    primaryActionText,
    secondaryAction,
    secondaryActionText,
    defaultExpanded = false,
    // isPhoneMode
}) => {
    // const { width } = useWindowDimensions();
    // const [expanded, setExpanded] = useState(defaultExpanded);

    // const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.stopPropagation();
    //     setExpanded(!expanded);
    // };

    // const handleActionClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.stopPropagation();
    //     if (!primaryAction) return;
    //     primaryAction();
    // };

    // let topKeyValuesToDisplay = topKeyValues;
    const isDroppable = bottomKeyValues != undefined || primaryAction != undefined;
    return (
        <StyledCustomAccordian
            // expanded={expanded}
            // sx={{ backgroundColor: 'secondary.main' }}
            // sx={{ cursor: 'pointer' }}
            defaultExpanded={defaultExpanded}
            disableGutters
            // onClick={onClick}
        >
            <AccordionSummary
                sx={{ m: 0 }}
                expandIcon={
                    isDroppable ? (
                        // <IconButton onClick={handleExpand}>
                        <ExpandMoreIcon />
                    ) : (
                        // </IconButton>
                        <Box width={40}></Box>
                    )
                }
                aria-controls="panel1-content"
                id="panel1-header"
            >
                {/* <Grid container direction={'row'} wrap="nowrap" minHeight={'4rem'}> */}
                {/* <Grid item xs={middleChild ? 4 : 6} p={3}> */}
                <Box width={'100%'}>
                    <Typography variant="caption">
                        <StyledUl>
                            {topKeyValues.map((keyVal, i) => (
                                <CardWrapperList key={i} id={keyVal.key} text={keyVal.value} />
                            ))}
                            {extraKeyValue && (
                                <CardWrapperList
                                    id={extraKeyValue.key}
                                    text={extraKeyValue.value ?? ''}
                                    textColor={extraKeyValueValueColor}
                                    valueIsLoading={extraKeyValueLoading}
                                />
                            )}
                            {/* {noteLoading && (
                                <Typography component={'li'}>
                                    <Skeleton animation={'wave'} />
                                </Typography>
                            )} */}
                        </StyledUl>
                    </Typography>
                </Box>
                {/* </Grid> */}
                {/* </Grid> */}
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
                {bottomKeyValues && (
                    <Box width={'100%'} display={'flex'}>
                        <Typography variant="caption" component={'div'} flexGrow={1}>
                            <StyledUl>
                                {bottomKeyValues.map((keyVal, i) => (
                                    <CardWrapperList key={i} id={keyVal.key} text={keyVal.value} />
                                ))}
                            </StyledUl>
                        </Typography>
                        {/* <IconButton onClick={() => setExpanded(!expanded)} sx={{ display: 'hidden' }}>
                        <ExpandMoreIcon sx={{ display: 'hidden' }}/>
                    </IconButton> */}
                        <Box width={40}></Box>
                    </Box>
                )}
            </AccordionDetails>
            {primaryAction && (
                <AccordionActions>
                    <Button onClick={primaryAction} size="small" variant="contained">
                        {primaryActionText}
                    </Button>
                    {secondaryAction && (
                        <Button onClick={secondaryAction} size="small" variant="contained">
                            {secondaryActionText}
                        </Button>
                    )}
                </AccordionActions>
            )}
        </StyledCustomAccordian>
    );
};
