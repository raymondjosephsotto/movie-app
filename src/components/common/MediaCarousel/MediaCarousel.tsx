import { useState, useEffect } from 'react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Media } from '../../../types/mediaTypes';
import MediaCard from '../MediaCard/MediaCard';
import movieApi from '../../../api/movieApi';
import 'swiper/swiper-bundle.css';
import styles from './MediaCarousel.module.scss';

interface MediaCarouselProps {
    title: string;
    endpoint: string;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ title, endpoint }) => {
    const [mediaItems, setMediaItems] = useState<Media[]>([]);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await movieApi.get(endpoint);
                setMediaItems(response.data.results);
            } catch (error) {
                console.error(`Error fetching ${title}:`, error);
            }
        };

        fetchMedia();
    }, [endpoint, title]);

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.carouselTitle}>{title}</h2>
            <Swiper spaceBetween={25} slidesPerView={6} modules={[Autoplay, Navigation, A11y]} navigation loop>
                {mediaItems.map((media) => (
                    <SwiperSlide key={media.id} className={styles.slide}>
                        <MediaCard media={media} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MediaCarousel;