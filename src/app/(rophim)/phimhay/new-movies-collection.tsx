'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMovieHover } from '@/hooks/use-movie-hover';
import { decodeHtmlEntities } from '@/lib/utils';

interface Movie {
    id: string;
    title: string;
    aliasTitle: string;
    image: string;
    href: string;
    quality: string;
    episode: string;
    lang: string;
    rating: string;
    part: string;
    topics: string[];
}

interface NewMoviesCollectionProps {
    initialMovies?: any[];
    titleMovies: string;
}

export default function NewMoviesCollection({ initialMovies = [], titleMovies }: NewMoviesCollectionProps) {
    const { handleMouseEnter, handleMouseLeave } = useMovieHover();
    // Map initialMovies (API items)
    const displayMovies: Movie[] = initialMovies.map((item: any) => {
        const topics = item.category?.map((c: any) => c.name) || [];

        return {
            id: item._id,
            title: decodeHtmlEntities(item.name),
            aliasTitle: decodeHtmlEntities(item.origin_name),
            image: `https://phimimg.com/${item.poster_url}`,
            href: `/phim/${item.slug}`,
            quality: item.quality || 'FHD',
            episode: item.episode_current || '',
            lang: item.lang || '',
            rating: item.quality || 'FHD',
            part: item.category?.[0]?.name || item.year?.toString() || '2026',
            topics: topics
        };
    });

    if (displayMovies.length === 0) return null;

    return (
        <div className='cards-row cards-slide wide new-movies-row overflow-hidden pb-10'>
            <div className='row-header-new'>
                <h2 className='category-title-new'>
                    {titleMovies}
                    <div className='more-link-new'>
                        <div className='more-icon-new'>
                            <ChevronRight size={14} strokeWidth={3} />
                        </div>
                        <span className='more-text-new'>Xem thêm</span>
                    </div>
                </h2>
            </div>
            <div className='row-content relative group'>
                <div className='sw-navigation transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block'>
                    <div className='sw-prev-new absolute left-0 top-[40%] -translate-y-1/2 z-30 cursor-pointer text-white/50 hover:text-white transition-colors bg-black/20 p-2 rounded-r-lg'>
                        <ChevronLeft size={36} strokeWidth={1.5} />
                    </div>
                    <div className='sw-next-new absolute right-0 top-[40%] -translate-y-1/2 z-30 cursor-pointer text-white/50 hover:text-white transition-colors bg-black/20 p-2 rounded-l-lg'>
                        <ChevronRight size={36} strokeWidth={1.5} />
                    </div>
                </div>

                <div className='cards-slide-wrapper'>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.sw-next-new',
                            prevEl: '.sw-prev-new'
                        }}
                        slidesPerView={8}
                        spaceBetween={12}
                        breakpoints={{
                            320: {
                                slidesPerView: 2.5,
                                spaceBetween: 8
                            },
                            480: {
                                slidesPerView: 3.5,
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 5,
                                spaceBetween: 12
                            },
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 12
                            },
                            1440: {
                                slidesPerView: 8,
                                spaceBetween: 12
                            }
                        }}
                        className='swiper'>
                        {displayMovies.map((movie) => {
                            const isSub = movie.lang.toLowerCase().includes('phụ đề') || movie.lang.toLowerCase().includes('vietsub');
                            const isTm = movie.lang.toLowerCase().includes('thuyết minh');

                            return (
                                <SwiperSlide key={movie.id} className='swiper-slide'>
                                    <div 
                                        className='sw-item-new group/item'
                                        onMouseEnter={(e) => handleMouseEnter(e, movie, movie.topics)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Link className='v-thumbnail block relative rounded-lg overflow-hidden' href={movie.href}>
                                            <div className='mask absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors duration-300'></div>
                                            
                                            <div className='pin-badges'>
                                                {isSub && (
                                                    <span className='is-sub'>P.Sub</span>
                                                )}
                                                {isTm && (
                                                    <span className='is-tm'>T.Minh</span>
                                                )}
                                            </div>

                                            <img
                                                alt={movie.title}
                                                loading='lazy'
                                                src={movie.image}
                                                className='w-full h-auto object-cover transform transition-transform duration-500 group-hover/item:scale-105'
                                            />
                                        </Link>
                                        <div className='info-new mt-3'>
                                            <h4 className='item-title text-white text-sm font-bold mb-0.5 line-clamp-1 group-hover/item:text-[#fcc419] transition-colors'>
                                                <Link title={movie.title} href={movie.href}>
                                                    {movie.title}
                                                </Link>
                                            </h4>
                                            <div className='alias-title text-gray-400 text-xs line-clamp-1'>
                                                {movie.aliasTitle}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
