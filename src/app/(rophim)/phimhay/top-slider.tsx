'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Heart, Info, Play } from 'lucide-react';
import { Autoplay, EffectFade, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieService } from '@/services/movie-service';

const TopSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await MovieService.getLatestMovies(1);
                // Handle different response formats (with or without 'data' wrapper)
                const items = (response as any).data?.items || (response as any).items || [];
                
                const mappedMovies = items.slice(0, 10).map((item: any) => ({
                    id: item._id,
                    title: item.name,
                    alias: item.origin_name,
                    slug: item.slug,
                    // Typically thumb_url is landscape (backdrop) and poster_url is portrait
                    image: item.thumb_url || item.poster_url, 
                    titleImage: '', // API doesn't provide title logo images
                    thumbnail: item.poster_url || item.thumb_url,
                    imdb: item.tmdb?.vote_average || '0.0',
                    rating: 'T16', // Placeholder
                    year: item.year || '2024',
                    duration: item.time || '120m',
                    quality: item.quality || 'Full HD',
                    // API list usually doesn't have categories, use fallback
                    genres: item.category?.map((c: any) => c.name) || ['Phim Mới', 'Phim Hay'],
                    description: item.content?.replace(/<[^>]*>?/gm, '') || 'Đang cập nhật nội dung cho bộ phim này...'
                }));
                
                setMovies(mappedMovies);
            } catch (error) {
                console.error('Failed to fetch slider movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading || movies.length === 0) {
        return (
            <div id='top_slide' className='relative h-[600px] w-full animate-pulse bg-gray-900'>
                <div className='flex h-full items-center justify-center'>
                    <div className='h-32 w-32 rounded-full border-b-2 border-t-2 border-primary'></div>
                </div>
            </div>
        );
    }

    return (
        <div id='top_slide' className='relative'>
            <div className='slide-wrapper top-slide-wrap'>
                {/* Main Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
                    effect='fade'
                    fadeEffect={{
                        crossFade: true
                    }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    loop={movies.length > 1}
                    className='top-slide-main'>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className='slide-elements relative h-[600px] overflow-hidden'>
                                <Link href={`/phim/${movie.slug}`} className='slide-url absolute inset-0 z-10' />

                                {/* Background Image */}
                                <div
                                    className='background-fade absolute inset-0 bg-cover bg-center text-transparent'
                                    style={{ backgroundImage: `url(${movie.image})` }}
                                >.</div>

                                {/* Cover Image */}
                                <div className='cover-fade absolute inset-0'>
                                    <div className='cover-image h-full'>
                                        <img
                                            className='fade-in visible h-full w-full object-cover'
                                            title={movie.title}
                                            loading='lazy'
                                            src={movie.image}
                                            alt={movie.title}
                                        />
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className='safe-area'>
                                    <div className='slide-content'>
                                        <div className='media-item'>
                                            {/* Title Image or Text Title */}
                                            {movie.titleImage ? (
                                                <div className='media-title-image mb-4'>
                                                    <Link href={`/phim/${movie.slug}`}>
                                                        <img
                                                            alt={movie.title}
                                                            src={movie.titleImage}
                                                            className='max-h-20 object-contain'
                                                        />
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className='media-title-text mb-2'>
                                                    <h2 className='text-4xl font-bold text-white uppercase tracking-wider drop-shadow-lg leading-tight'>
                                                        <Link href={`/phim/${movie.slug}`}>
                                                            {movie.title}
                                                        </Link>
                                                    </h2>
                                                </div>
                                            )}
                                            
                                            {/* Alias Title */}
                                            <h3 className='media-alias-title'>
                                                <Link href={`/phim/${movie.slug}`} className=''>
                                                    {movie.alias}
                                                </Link>
                                            </h3>

                                            {/* Tags */}
                                            <div className='hl-tags'>
                                                <div className='tag-imdb'>
                                                    <span>{movie.imdb}</span>
                                                </div>
                                                {movie.quality && (
                                                    <div className='tag-quality'>
                                                        <span>{movie.quality}</span>
                                                    </div>
                                                )}
                                                <div className='tag-model'>
                                                    <span>{movie.rating}</span>
                                                </div>
                                                <div className='tag-classic'>
                                                    <span>{movie.year}</span>
                                                </div>
                                                <div className='tag-classic'>
                                                    <span>{movie.duration}</span>
                                                </div>
                                            </div>

                                            {/* Genre Tags */}
                                            <div className='hl-tags mb-4 flex flex-wrap gap-2'>
                                                {movie.genres.map((genre: string, index: number) => (
                                                    <Link
                                                        key={index}
                                                        href={`/the-loai/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className='tag-topic rounded bg-gray-700/50 backdrop-blur-sm px-2 py-1 text-sm transition-colors hover:bg-gray-600'>
                                                        {genre}
                                                    </Link>
                                                ))}
                                            </div>

                                            {/* Description */}
                                            <div className='description lim-3 mb-6 line-clamp-3 text-gray-300 max-w-2xl'>
                                                {movie.description}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className='touch'>
                                                <Link href={`/xem-phim/${movie.slug}`} className='button-play'>
                                                    <Play className='h-6 w-6' fill='currentColor' />
                                                </Link>

                                                <div className='touch-group'>
                                                    <a className='item cursor-pointer'>
                                                        <div className='inc-icon icon-20'>
                                                            <Heart className='h-5 w-5' />
                                                        </div>
                                                    </a>
                                                    <Link href={`/phim/${movie.slug}`} className='item'>
                                                        <div className='inc-icon icon-20'>
                                                            <Info className='h-5 w-5' />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail Slider */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Navigation, Pagination, Thumbs]}
                    spaceBetween={5}
                    slidesPerView={6}
                    watchSlidesProgress={true}
                    className='top-slide-small mt-4'>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className='relative h-16 w-full group overflow-hidden rounded'>
                                <img
                                    alt={movie.title}
                                    loading='lazy'
                                    src={movie.thumbnail}
                                    className='h-full w-full cursor-pointer object-cover opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopSlider;
