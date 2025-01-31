import { useState, useEffect, useRef, useCallback } from 'react';
import { Media } from '../../types/mediaTypes';

import MediaCard from '../../components/common/MediaCard/MediaCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import movieApi from '../../api/movieApi';
import './Home.module.scss';

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

const Home = () => {
    const [media, setMedia] = useState<Media[]>([]); // <-- More accurate name
    const [category, setCategory] = useState<'movie' | 'tv'>('movie'); // Default to 'movie'
    const [page, setPage] = useState<number>(1); // Track the current page
    const [totalPages, setTotalPages] = useState<number>(1); // Track the total pages
    const observerRef = useRef<IntersectionObserver | null>(null); // Reference for infinite scrolling

    const fetchMedia = useCallback(async () => {
        if (page > totalPages) return;

        console.log(`Fetching ${category}, page ${page}...`);
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

            setMedia((prevMedia) => [...prevMedia, ...normalizedData]);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error(`Error fetching ${category}:`, error);
        }
    }, [category, page, totalPages]);

    useEffect(() => {
        setMedia([]); // Clear movies when category changes
        setPage(1); // Reset page to 1 when switching categories
        fetchMedia();
    }, [category, fetchMedia]);

    // Infinite Scroll with Intersection Observer
    const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );
        if (node) observerRef.current.observe(node);
    }, []);

    return (
        <div className='home'>
            <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
                {/* Filter Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <Button
                        variant={category === 'tv' ? 'contained' : 'outlined'}
                        onClick={() => setCategory('tv')}
                    >
                        TV Shows
                    </Button>
                    <Button
                        variant={category === 'movie' ? 'contained' : 'outlined'}
                        onClick={() => setCategory('movie')}
                    >
                        Movies
                    </Button>
                </div>

                <Grid container spacing={{ xs: 1, sm: 3, md: 4 }}>
                    {media.map((item, index) => (
                        <Grid
                            key={`${category}-${item.id}`}
                            size={{ xs: 2, md: 2 }}
                            ref={index === media.length - 1 ? lastMovieRef : null} // Attach observer to the last movie
                        >
                            <MediaCard media={item} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Home;