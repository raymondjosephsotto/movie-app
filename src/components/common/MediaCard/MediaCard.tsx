import { useState } from 'react';
import { Media, Movie, TVShow } from '../../../types/mediaTypes';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MediaModal from '../MediaModal/MediaModal';
import styles from './MediaCard.module.scss';

interface MediaCardProps {
    media: Media;
}

// Type Guard to check if the media is a Movie
const isMovie = (media: Media): media is Movie => {
    return 'title' in media;
};

// Get the title safely
const getTitle = (media: Media) => (isMovie(media) ? media.title : (media as TVShow).name) || 'Unknown Title';

// Get the release year safely
const getReleaseYear = (media: Media) => {
    const date = isMovie(media) ? media.release_date : (media as TVShow).first_air_date;
    return date ? date.split('-')[0] : 'Unknown';
};

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const title = getTitle(media);
    const releaseYear = getReleaseYear(media);

    return (
        <>
            <Card className={styles['movie-card']} onClick={handleOpen} sx={{ backgroundColor: 'transparent', color: '#FFFFFF' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={styles['movie-card__img']}
                        image={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : '/placeholder.jpg'}
                        alt={`${title} Image`}
                    />
                    <CardContent className={styles['movie-card__content']}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                            {title}
                        </Typography>
                        <Typography variant="body2">
                            {releaseYear}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* Pass the necessary props to MediaModal */}
            <MediaModal open={open} onClose={handleClose} media={media} />
        </>
    );
};

export default MediaCard;