import { Box, Button, FormControl, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { PunchDetails } from '../../../pages/punch/Punches/PunchesPage';
import BottomButtons from '../../BottomButtons/BottomButtons';
import TextInput from '../../UI/TextInput';
import PunchImages from './PunchImages';

interface Props {
    punchDetails: PunchDetails;
    editMode: boolean;
}

const PunchDetailsMain: FC<Props> = ({ punchDetails, editMode }) => {
    const [title, setTitle] = useState(punchDetails.punch.title);
    const [imageUrls, setImageUrls] = useState<string[]>(punchDetails.punch.imagUrls);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [description, setDescription] = useState(punchDetails.punch.description);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value);
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value);
        setDescription(e.target.value);
    };
    // useEffect(() => {
    //     if (imagUrls.length > 0) {
    //         const images = imagUrls.map((url) => ({ url: url, alreadyStored: true }));
    //         setImageUrls(images);
    //     }
    // }, [imagUrls]);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (!files) return;
        const urls: string[] = [];
        for (const file of files) {
            const objectUrl = URL.createObjectURL(file);
            urls.push(objectUrl);
        }
        setImagePreviews((prevUrls) => [...prevUrls, ...urls]);
    };

    useEffect(() => {
        return () => {
            // Clean up by revoking Object URLs when component unmounts
            imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imageUrls]);

    const handleRemoveImage = (file: { url: string; isSaved: boolean }) => {
        if (!file.isSaved) {
            setImagePreviews((prev) => {
                const toDeleteIndex = prev.findIndex((f) => f == file.url);
                if (toDeleteIndex !== -1) {
                    const updatedPreviews = [
                        ...prev.slice(0, toDeleteIndex),
                        ...prev.slice(toDeleteIndex + 1),
                    ];
                    URL.revokeObjectURL(file.url);
                    return updatedPreviews;
                } else {
                    return prev;
                }
            });
        } else {
            const toDeleteIndex = imageUrls.findIndex((f) => f == file.url);
            if (toDeleteIndex !== -1) {
                //TODO: call api to delete image
                setImageUrls((prev) => {
                    const updatedPreviews = [
                        ...prev.slice(0, toDeleteIndex),
                        ...prev.slice(toDeleteIndex + 1),
                    ];
                    return updatedPreviews;
                });
            }
        }
    };

    return (
        <>
            <Box marginTop={3}>
                <Typography variant="h4">Details</Typography>
                <FormControl variant="standard" fullWidth margin="dense">
                    <Stack spacing={3}>
                        <Box>
                            <Typography component="label" variant="caption">
                                Title
                            </Typography>
                            <TextInput
                                placeHolder={'some title'}
                                onChange={handleTitleChange}
                                value={title}
                                includeClearIcon={false}
                                disabled={!editMode}
                            ></TextInput>
                        </Box>
                        <Box>
                            <Typography component="label" variant="caption">
                                Description
                            </Typography>
                            <TextInput
                                placeHolder={'some description'}
                                onChange={handleDescriptionChange}
                                value={description}
                                includeClearIcon={false}
                                rows={3}
                                disabled={!editMode}
                            ></TextInput>
                        </Box>
                    </Stack>
                </FormControl>
            </Box>
            <PunchImages
                urls={imageUrls}
                editMode={editMode}
                uploadedFiles={imagePreviews}
                removeImage={handleRemoveImage}
                uploadImages={handleFileUpload}
            ></PunchImages>
            <BottomButtons>
                <Button variant="contained" disabled={!editMode}>
                    Save
                </Button>
            </BottomButtons>
        </>
    );
};

export default PunchDetailsMain;
