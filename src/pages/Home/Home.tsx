import { useState, useEffect } from 'react';
import { Media } from '../../types/mediaTypes';

import MediaCard from '../../components/common/MediaCard/MediaCard';
import HeroCarousel from '../../components/common/HeroCarousel/HeroCarousel';
import MediaCarousel from '../../components/common/MediaCarousel/MediaCarousel';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import movieApi from '../../api/movieApi';
import styles from './Home.module.scss';

const MOVIE_CAROUSELS = [
    { title: 'Now Playing', endpoint: 'movie/now_playing?language=en-US&page=1' },
    { title: 'Top Rated Movies', endpoint: 'movie/top_rated?language=en-US&page=1' },
    { title: 'Upcoming Movies', endpoint: 'movie/upcoming?language=en-US&page=1' }
];

const TV_CAROUSELS = [
    { title: 'Popular TV Shows', endpoint: 'tv/popular?language=en-US&page=1' },
    { title: 'Top Rated TV Shows', endpoint: 'tv/top_rated?language=en-US&page=1' }
];

interface HomeProps {
    category: 'movie' | 'tv';
}

const Home: React.FC<HomeProps> = ({ category }) => {
    const [media, setMedia] = useState<Media[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const endpoint = `discover/${category}?page=${page}&sort_by=popularity.desc`;
                const response = await movieApi.get(endpoint);
                setMedia(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error(`Error fetching ${category}:`, error);
            }
        };

        fetchMedia();
    }, [category, page]);

    return (
        <div className='home'>
            <HeroCarousel category={category} />
            <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
                {/* Render multiple carousels dynamically */}
                {(category === 'movie' ? MOVIE_CAROUSELS : TV_CAROUSELS).map(({ title, endpoint }) => (
                    <MediaCarousel key={title} title={title} endpoint={endpoint} />
                ))}

                {/* Grid for browsing movies */}
                <Grid container spacing={{ xs: 1, sm: 3, md: 4 }}>
                    {media.map((item) => (
                        <Grid key={`${category}-${item.id}`} size={{ xs: 6, md: 2 }}>
                            <MediaCard media={item} />
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
                <Pagination
                    className={styles.paginationContainer}
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    size='small'
                    color='primary'
                />
            </Container>
        </div>
    );
};

export default Home;