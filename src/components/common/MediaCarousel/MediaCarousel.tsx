import { useState, useEffect } from 'react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Media, Movie, TVShow } from '../../../types/mediaTypes';
import movieApi from '../../../api/movieApi';
import 'swiper/swiper-bundle.css';
import styles from './MediaCarousel.module.scss';

interface MediaCarouselProps {
    apiEndpoint: string;
    category: 'movie' | 'tv'; // Removed 'all'
}

// Type guard function to check if media is a Movie
const isMovie = (media: Media): media is Movie => {
    return 'title' in media;
};

const MediaCarousel: React.FC<MediaCarouselProps> = ({ apiEndpoint, category }) => {
    const [mediaItems, setMediaItems] = useState<Media[]>([]);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await movieApi.get(apiEndpoint);
                setMediaItems(response.data.results);
            } catch (error) {
                console.error(`Error fetching ${category}`, error);
            }
        };
        fetchMedia();
    }, [apiEndpoint, category]);

    return (
        <div className={styles.carouselContainer}>
            <Swiper spaceBetween={50} slidesPerView={3} loop modules={[Autoplay, Pagination, A11y]} pagination={{ clickable: true }}>
                {mediaItems.map((media) => (
                    <SwiperSlide key={media.id} className={styles.slide}>
                        <img src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} alt={isMovie(media) ? media.title : (media as TVShow).name} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MediaCarousel;