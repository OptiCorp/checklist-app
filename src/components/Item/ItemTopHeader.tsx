import { Box, Grid, Typography } from '@mui/material';
import { Item } from '../../services/apiTypes';

interface Props {
    item: Item;
    children?: JSX.Element;
}

const ItemTopHeader = ({ item: item, children }: Props) => {
    return (
        <Box marginTop={5}>
            <Grid container>
                <Grid item flexGrow={1}>
                    <Typography variant="h4">{item.type.toUpperCase()}</Typography>
                    {/* <Typography variant="body1"> */}
                    <Box>
                        <Box>
                            <b>item-Id</b>: {item.id}
                        </Box>
                        <Box>
                            <b>item name</b>: {item.name}
                        </Box>
                    </Box>
                    {/* </Typography> */}
                </Grid>
                <Grid item>{children}</Grid>
            </Grid>
        </Box>
    );
};

export default ItemTopHeader;
