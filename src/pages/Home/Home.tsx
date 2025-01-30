import { useState, useEffect } from 'react';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination'; // Import the Pagination component from MUI
import movieApi from '../../api/movieApi';
import './Home.module.scss';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    item_count: number;
}

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [category, setCategory] = useState<'movie' | 'tv'>('movie'); // Default to 'movie'
    const [page, setPage] = useState<number>(1); // Track the current page
    const [totalPages, setTotalPages] = useState<number>(1); // Track the total pages

    useEffect(() => {
        const fetchMovies = async () => {
            console.log(`Fetching ${category}, page ${page}...`);
            try {
                let endpoint = 'trending/all/week?language=en-US'; // Default to trending movies
                if (category === 'movie') endpoint = `discover/movie?page=${page}`; // For movies filter
                else if (category === 'tv') endpoint = `discover/tv?page=${page}`; // For TV shows filter

                const response = await movieApi.get(endpoint);
                console.log('API Response:', response.data);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages); // Update total pages from API response
            } catch (error) {
                console.error(`Error fetching ${category}:`, error);
            }
        };

        fetchMovies();
    }, [category, page]); // Fetch when category or page changes

    useEffect(() => {
        // Reset page to 1 when the category changes
        setPage(1);
    }, [category]); // This runs when category changes

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); // Update the page number when user clicks pagination
    };

    return (
        <div className='home'>
            <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
                {/* Filter Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '50px', marginBottom: '50px' }}>
                    <Button
                        variant={category === 'tv' ? 'contained' : 'outlined'}
                        onClick={() => setCategory('tv')}
                        size="large"
                    >
                        TV Shows
                    </Button>
                    <Button
                        variant={category === 'movie' ? 'contained' : 'outlined'}
                        onClick={() => setCategory('movie')}
                        size="large"
                    >
                        Movies
                    </Button>
                </div>

                <Grid container spacing={{ xs: 1, sm: 3, md: 4 }}>
                    {movies?.map((movie) => (
                        <Grid key={movie.id} size={{ xs: 1, sm: 3, md: 4 }}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: '#FFFFFF' }}>
                    <Pagination
                        count={totalPages} // Set total pages from API
                        page={page} // Controlled by the current page state
                        onChange={handlePageChange} // Handle page changes
                        color="primary"
                        sx={{
                            '.MuiPaginationItem-root': {
                                color: '#FFF', // Pagination numbers
                            },
                            '.MuiPaginationItem-ellipsis': {
                                color: '#FFF', // Ellipsis color
                            },
                        }}
                    />
                </div>
            </Container>
        </div>
    );
};

export default Home;