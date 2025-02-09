import { useState, useEffect } from 'react';
import { Media } from '../../types/mediaTypes';

import MediaCard from '../../components/common/MediaCard/MediaCard';
import HeroCarousel from '../../components/common/HeroCarousel/HeroCarousel';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import movieApi from '../../api/movieApi';
import styles from './Home.module.scss';

interface HomeProps {
    category: 'movie' | 'tv';
}

interface ApiResponseItem {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    backdrop_path: string;
    release_date?: string;
    first_air_date?: string;
    overview: string;
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

                const normalizedData: Media[] = response.data.results.map((item: ApiResponseItem) => ({
                    id: item.id,
                    title: category === 'movie' ? item.title : item.name,
                    poster_path: item.poster_path,
                    backdrop_path: item.backdrop_path,
                    release_date: category === 'movie' ? item.release_date : item.first_air_date,
                    overview: item.overview,
                }));

                setMedia(normalizedData);
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