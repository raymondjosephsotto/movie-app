import { useState, useEffect } from 'react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Media, Movie, TVShow } from '../../../types/mediaTypes';
import movieApi from '../../../api/movieApi';
import 'swiper/swiper-bundle.css';
import styles from './HeroCarousel.module.scss';

interface HeroCarouselProps {
    apiEndpoint?: string;
}

const API_ENDPOINT = '/trending/all/week';

const HeroCarousel: React.FC<HeroCarouselProps> = ({ apiEndpoint = API_ENDPOINT }) => {
    const [mediaItems, setMediaItems] = useState<Media[]>([]);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await movieApi.get(apiEndpoint);
                setMediaItems(response.data.results);
            } catch (error) {
                console.error('Error fetching trending Movies & TV Shows', error);
            }
        };
        fetchMedia();
    }, [apiEndpoint]);

    const isMovie = (media: Media): media is Movie => {
        return 'title' in media;
    };

    return (
        <div className={styles.heroCarousel}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop
                modules={[Autoplay, Pagination, A11y]}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
            >
                {mediaItems.map((media) => (
                    <SwiperSlide
                        key={media.id}
                        className={styles.heroCarousel__slide}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
                        }}
                    >
                        <div className={styles.heroCarousel__content}>
                            <h1 className={styles.heroCarousel__title}>{isMovie(media) ? media.title : (media as TVShow).name}</h1>
                            <p className={styles.heroCarousel__description}>{media.overview}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroCarousel;