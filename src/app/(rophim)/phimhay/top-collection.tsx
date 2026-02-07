'use client';

import Link from 'next/link';

import { decodeHtmlEntities } from '@/lib/utils';
import { useMovieHover } from '@/hooks/use-movie-hover';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Movie {
    id: string;
    title: string;
    aliasTitle: string;
    image: string;
    href: string;
    rating: string;
    part: string;
    episode: string;
    pinPd?: string;
    pinTm?: string;
    pinLt?: string;
    topics?: string[];
}

const topMovies: Movie[] = [
    {
        id: '1',
        title: 'Triều Tuyết Lục',
        aliasTitle: "Coroner's Diary",
        image: 'https://static.nutscdn.com/vimg/400-0/7bebe88e9cf2728dc85f89fdc4c61e28.jpg',
        href: '/phim/trieu-tuyet-luc.qC4bu5Br',
        rating: 'T13',
        part: 'Phần 1',
        episode: 'Tập 12',
        pinPd: '12',
        pinTm: '12'
    },
    {
        id: '2',
        title: 'Ngưu Lang Chức Nữ',
        aliasTitle: 'Head Over Heels',
        image: 'https://static.nutscdn.com/vimg/400-0/05a7b43d57bc949bd389ffd24a34f1d0.jpg',
        href: '/phim/nguu-lang-chuc-nu.4tDukPxp',
        rating: 'T13',
        part: 'Phần 1',
        episode: 'Tập 8',
        pinPd: '8',
        pinTm: '4'
    },
    {
        id: '3',
        title: 'Chị Đại Học Đường',
        aliasTitle: 'Bitch x Rich',
        image: 'https://static.nutscdn.com/vimg/400-0/5cd13d588fb7730a306c61c39537ecdc.jpg',
        href: '/phim/chi-dai-hoc-duong.2U8nbg',
        rating: 'T16',
        part: 'Phần 2',
        episode: 'Tập 4',
        pinPd: '4'
    },
    {
        id: '4',
        title: 'S-Line: Sợi Chỉ Tử Thần',
        aliasTitle: 'S Line',
        image: 'https://static.nutscdn.com/vimg/400-0/bdd0c99f584cf77878b7b0e8e4a8275e.jpg',
        href: '/phim/s-line-soi-chi-tu-than.EWshEBoz',
        rating: 'T18',
        part: 'Phần 1',
        episode: 'Tập 2',
        pinPd: '2'
    },
    {
        id: '5',
        title: 'Anh Đào Hổ Phách',
        aliasTitle: 'Our Generation',
        image: 'https://static.nutscdn.com/vimg/400-0/594049aa2c8862b9d1e1d10b6660e2a2.jpg',
        href: '/phim/anh-dao-ho-phach.F3QXRdxW',
        rating: 'T13',
        part: 'Phần 1',
        episode: 'Tập 6',
        pinPd: '6'
    },
    {
        id: '6',
        title: 'Kiện Tướng',
        aliasTitle: 'Good Boy',
        image: 'https://static.nutscdn.com/vimg/400-0/7a6d6a456fe14c149ea625fd0178d38e.jpg',
        href: '/phim/kien-tuong.vDFJBjKv',
        rating: 'T16',
        part: 'Phần 1',
        episode: 'Tập 14',
        pinPd: '14',
        pinTm: '11'
    },
    {
        id: '7',
        title: 'Thư Quyển Nhất Mộng',
        aliasTitle: 'A Dream Within a Dream',
        image: 'https://static.nutscdn.com/vimg/400-0/a9f85e0911d4873c0f5a61b95325986c.webp',
        href: '/phim/thu-quyen-nhat-mong.0K8gX7R4',
        rating: 'T13',
        part: 'Phần 1',
        episode: 'Tập 40',
        pinPd: '40',
        pinTm: '40'
    },
    {
        id: '8',
        title: 'Tôi Đã Cướp Mất Đêm Đầu Tiên Của Nam Chính',
        aliasTitle: 'The First Night with the Duke',
        image: 'https://static.nutscdn.com/vimg/400-0/fb3e9bd8372cee8e58c5146f767ae2b4.jpg',
        href: '/phim/toi-da-cuop-mat-dem-dau-tien-cua-nam-chinh.Rq52P7bP',
        rating: 'T13',
        part: 'Phần 1',
        episode: 'Tập 11',
        pinPd: '11',
        pinTm: '10'
    },
    {
        id: '9',
        title: 'Trò Chơi Con Mực',
        aliasTitle: 'Squid Game',
        image: 'https://static.nutscdn.com/vimg/400-0/a5ce707a117b83bb3b6bacde3be7d4df.jpg',
        href: '/phim/tro-choi-con-muc.zevi3D3N',
        rating: 'T13',
        part: 'Phần 3',
        episode: 'Tập 6',
        pinPd: '6',
        pinLt: '6'
    },
    {
        id: '10',
        title: 'Đào Hoa Ánh Giang Sơn',
        aliasTitle: "The Princess's Gambit",
        image: 'https://static.nutscdn.com/vimg/400-0/b6c588f9ee44e20bac0307be9f4d367d.jpg',
        href: '/phim/dao-hoa-anh-giang-son.IT34GZKw',
        rating: 'T13',
        part: 'Phần 1',
        episode: 'Tập 36',
        pinPd: '36',
        pinTm: '31'
    }
];

interface TopCollectionProps {
    initialMovies?: any[];
    titleMovies: string;
}

export default function TopCollection({ initialMovies = [], titleMovies }: TopCollectionProps) {
    const { handleMouseEnter, handleMouseLeave } = useMovieHover();

    // Map initialMovies (API items) to internal Movie format
    const displayMovies: Movie[] = initialMovies.length > 0 
        ? initialMovies.map((item: any) => {
            const episodeNum = item.episode_current?.match(/\d+/)?.[0] || '';
            const isVietsub = item.lang?.toLowerCase().includes('vietsub');
            const isThuyetMinh = item.lang?.toLowerCase().includes('thuyết minh');
            const isLongTieng = item.lang?.toLowerCase().includes('lồng tiếng');

            return {
                id: item._id,
                title: decodeHtmlEntities(item.name),
                aliasTitle: decodeHtmlEntities(item.origin_name),
                image: `https://phimimg.com/${item.poster_url}`,
                href: `/phim/${item.slug}`,
                rating: item.quality || 'FHD',
                part: item.category?.[0]?.name || item.year?.toString() || '2026',
                episode: item.episode_current || '',
                pinPd: isVietsub ? episodeNum : undefined,
                pinTm: isThuyetMinh ? episodeNum : undefined,
                pinLt: isLongTieng ? episodeNum : undefined,
                topics: item.category?.map((c: any) => c.name) || []
            };
        })
        : topMovies;

    return (
        <div className='cards-row cards-slide wide overflow-hidden'>
            <div className='row-header'>
                <h2 className='category-name'>{titleMovies}</h2>
            </div>
            <div className='row-content'>
                <div className='cards-slide-wrapper top-up'>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.sw-next',
                            prevEl: '.sw-prev'
                        }}
                        slidesPerView={6}
                        spaceBetween={16}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 8
                            },
                            480: {
                                slidesPerView: 3,
                                spaceBetween: 12
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 14
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 16
                            },
                            1280: {
                                slidesPerView: 6,
                                spaceBetween: 16
                            }
                        }}
                        className='swiper'>
                        {displayMovies.map((movie, index) => {
                            const topics = movie.topics || ['Phim Mới', 'Phim Hay'];

                            return (
                                <SwiperSlide key={movie.id} className='swiper-slide'>
                                    <div
                                        className='sw-item'
                                        onMouseEnter={(e) => handleMouseEnter(e, movie, topics)}
                                        onMouseLeave={handleMouseLeave}>
                                        <Link className='v-thumbnail' href={movie.href}>
                                            <div className='mask'></div>
                                            <div className='pin-new m-pin-new'>
                                                {movie.pinPd && (
                                                    <div className='line-center line-pd'>
                                                        <span></span>
                                                        <strong>{movie.pinPd}</strong>
                                                    </div>
                                                )}
                                                {movie.pinTm && (
                                                    <div className='line-center line-tm'>
                                                        <span></span>
                                                        <strong>{movie.pinTm}</strong>
                                                    </div>
                                                )}
                                                {movie.pinLt && (
                                                    <div className='line-center line-lt'>
                                                        <span></span>
                                                        <strong>{movie.pinLt}</strong>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <img
                                                    alt={`Xem Phim ${movie.title} Vietsub HD Online - Rophim`}
                                                    loading='lazy'
                                                    src={movie.image}
                                                />
                                            </div>
                                        </Link>
                                        <div className='info info-v w-chart'>
                                            <div className='number'>{index + 1}</div>
                                            <h4 className='item-title lim-1'>
                                                <Link title={movie.title} href={movie.href}>
                                                    {movie.title}
                                                </Link>
                                            </h4>
                                            <div className='alias-title lim-1'>{movie.aliasTitle}</div>
                                            <div className='info-line'>
                                                <div className='tag-small'>
                                                    <strong>{movie.rating}</strong>
                                                </div>
                                                <div className='tag-small'>{movie.part}</div>
                                                <div className='tag-small'>{movie.episode}</div>
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
