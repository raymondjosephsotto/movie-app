import { useState } from 'react';
import { Media, Movie, TVShow } from '../../../types/mediaTypes';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import MediaModal from '../MediaModal/MediaModal'; // Import the new modal component
import styles from './MediaCard.module.scss';

interface MediaCardProps {
    media: Media;
}

const getTitle = (media: Media) => {
    if (media.type === 'tv') {
        return (media as TVShow).name;
    }
    return (media as Movie).title;
};

const getReleaseYear = (media: Media) => {
    if (media.type === 'tv') {
        return (media as TVShow).first_air_date?.split('-')[0] || 'Unknown';
    }
    return (media as Movie).release_date?.split('-')[0] || 'Unknown';
};

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const title = getTitle(media);
    const releaseYear = getReleaseYear(media);

    return (
        <>
            <Card className={styles['movie-card']}>
                <CardHeader className={styles['movie-card__header']} title={title} subheader={releaseYear} />
                <CardMedia
                    component="img"
                    className={styles['movie-card__img']}
                    image={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                    alt={`${title} Image`}
                />
                <CardActions className={styles['movie-card__button-container']}>
                    <Button onClick={handleOpen} size="medium" color="primary" variant="contained" className={styles['movie-card__button']}>
                        Learn More
                    </Button>
                </CardActions>
            </Card>

            {/* Pass the necessary props to MediaModal */}
            <MediaModal open={open} onClose={handleClose} media={media} />
        </>
    );
};

export default MediaCard;