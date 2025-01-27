import { useState, useEffect } from 'react';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import movieApi from '../../api/movieApi';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    item_count: number;
}


const Home = () => {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
          console.log('Fetching movies...');
          try {
            const response = await movieApi.get(`movie/popular`);
            console.log('API Response:', response.data);
            setMovies(response.data.results);
          } catch (error) {
            console.error('Error fetching popular movies:', error);
          }
        };
      
        fetchMovies();
      }, []);
      
    return (
        <div className='home'>
            <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {movies?.map((movie) => (
                        <Grid key={movie.id} size={{ xs: 1, sm: 4, md: 3 }}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </div>
    );
}

export default Home;