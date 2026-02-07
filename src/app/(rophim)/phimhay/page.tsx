import { CatogeryService } from '@/services/catogery-service';
import { MovieService } from '@/services/movie-service';
import TopCategory from './top-category';
import TopCollection from './top-collection';
import TopSlider from './top-slider';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import NewMoviesCollection from './new-movies-collection';

export default async function PhimHay() {
    const genres = await CatogeryService.getAllGenres();
    
    const responseKorean = await MovieService.getMoviesByFilter('phim-bo', {
        page: 1,
        sort_field: '_id',
        sort_type: 'asc',
        country: 'han-quoc',
        year: 2026,
        limit: 10
    });

    const responseMovies = await MovieService.getMoviesByFilter('phim-le', {
        page: 1,
        sort_field: '_id',
        sort_type: 'asc',
        year: 2026,
        limit: 10
    });

    const responseAnime = await MovieService.getMoviesByFilter('hoat-hinh', {
        country: 'nhat-ban',
        year: 2026,
        sort_field: 'view',
        sort_type: 'desc',
    });

    const moviesMovies = responseMovies.data?.items || [];
    const moviesKorean = responseKorean.data?.items || [];
    const moviesAnime = responseAnime.data?.items || [];

    return (
        <>
            <TopSlider />
            
            <TopCategory genres={(genres as any).items || genres} />

            <TopCollection initialMovies={moviesKorean} titleMovies='Top 10 Phim Hàn Quốc Hôm Nay' />
            
            <NewMoviesCollection initialMovies={moviesAnime} titleMovies='Kho Tàng Anime Nhật Bản' />
            
            <TopCollection initialMovies={moviesMovies} titleMovies='Top 10 Phim Lẻ Hôm Nay' />
        </>
    );
}
