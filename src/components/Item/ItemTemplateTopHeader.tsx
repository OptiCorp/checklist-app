import { Box, Grid, Typography } from '@mui/material';

interface Props {
    itemTemplateId?: string;
    children?: JSX.Element;
}

const ItemTemplateTopHeader = ({ itemTemplateId: itemTemplateId, children }: Props) => {
    return (
        <Box marginTop={5}>
            <Grid container>
                <Grid item flexGrow={1}>
                    <Typography variant="h4">ItemTemplate</Typography>
                    {/* <Typography variant="body1"> */}
                    <Box>
                        <Typography>
                            <b>itemTemplate-Id</b>: {itemTemplateId}
                        </Typography>
                        {/* <Typography>
                            <b>type</b>: {itemTemplate.type}
                        </Typography> */}
                        {/* <Box>
                            <b>item name</b>: {item.name}
                        </Box> */}
                    </Box>
                    {/* </Typography> */}
                </Grid>
                <Grid item>{children}</Grid>
            </Grid>
        </Box>
    );
};

export default ItemTemplateTopHeader;
