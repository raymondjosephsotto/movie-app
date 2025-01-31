import React from 'react';
import { Media, Movie, TVShow } from '../../../types/mediaTypes';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './MediaModal.module.scss'; // You can create a new SCSS file for the modal styles if needed

interface MediaModalProps {
    open: boolean;
    onClose: () => void;
    media: Media;
}

const getTitle = (media: Media) => {
    if (media.type === 'tv') {
        return (media as TVShow).name;
    }
    return (media as Movie).title;
};

const MediaModal: React.FC<MediaModalProps> = ({ open, onClose, media }) => {
    const title = getTitle(media);

    return (
        <Modal className={styles['modal']} open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className={styles['modal__box']}>
                <h2>{title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} alt={`${title} Image`} />
                <p>{media.overview}</p>
            </Box>
        </Modal>
    );
};

export default MediaModal;