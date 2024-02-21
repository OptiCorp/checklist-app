import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import PunchFileUpload from './PunchFileUpload';

interface Props {
    savedFileUrls: string[];
    uploadedFiles: { file: File; url: string }[];
    editMode: boolean;
    removeImage: (file: { url: string; isSaved: boolean }) => void;
    uploadImages: (e: ChangeEvent<HTMLInputElement>) => void;
}

function srcset(image: string, width: number) {
    return {
        // src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        // srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
        src: `${image}`,
        //srcSet: `${image}?w=${width}&fit=crop&auto=format&dpr=2 2x`,
        srcSet: `${image}`,
    };
}

const PunchImages: FC<Props> = ({
    savedFileUrls,
    editMode,
    uploadedFiles,
    removeImage,
    uploadImages,
}) => {
    const [fileUrls, setFileUrls] = useState<{ url: string; isSaved: boolean }[]>([]);

    useEffect(() => {
        const savedUrls = savedFileUrls.map((url) => ({ url: url, isSaved: true }));
        const uploadedUrls = uploadedFiles.map((file) => ({ url: file.url, isSaved: false }));

        setFileUrls([...savedUrls, ...uploadedUrls]);
    }, [savedFileUrls, uploadedFiles]);

    return (
        <>
            <Box sx={{ width: 300, maxHeight: 400, overflowY: 'scroll' }}>
                <ImageList
                    variant="masonry"
                    sx={{ transform: 'translateZ(0)', marginBottom: 0 }}
                    cols={2}
                    gap={3}
                >
                    {fileUrls.map((f, i) => (
                        <ImageListItem key={i + f.url}>
                            <img
                                {...srcset(f.url, 150)}
                                alt={`punch image ${i + 1}`}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                position="top"
                                title={!f.isSaved ? 'NOT SAVED!' : undefined}
                                actionIcon={
                                    editMode ? (
                                        <IconButton
                                            sx={{ color: 'white' }}
                                            aria-label={`star ${'something'}`}
                                            onClick={() => removeImage(f)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    ) : undefined
                                }
                                actionPosition="right"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <PunchFileUpload editMode={editMode} imageListWidth={300} fileUpload={uploadImages} />
        </>
    );
};

export default PunchImages;
