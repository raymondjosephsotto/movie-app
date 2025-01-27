import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
    };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    // Extract the year from the release_date
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

    return (
        <Card className={styles['movie-card']}>
            <CardHeader title={movie.title} subheader={releaseYear} />
            <CardMedia
                component="img"
                style={{ width: '100%', height: 'auto' }}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} Image`}
            />
            <CardActions className={styles['movie-card__button']}>
                <Button size="medium" color="primary" variant="contained">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default MovieCard;