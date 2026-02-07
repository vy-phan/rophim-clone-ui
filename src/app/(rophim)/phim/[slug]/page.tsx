import { MovieService } from '@/services/movie-service';
import Link from 'next/link';
import Actors from '@/components/rophim/actors';
import CommentArea from '@/components/rophim/comment-area';
import ContentGap from './content-gap';
import DetailMore from './detail-more';
import { Heart, MessageCircle, Play, Share2 } from 'lucide-react';
import ShareAction from '../../../../components/rophim/share-action';

export default async function PhimPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const response = await MovieService.getMovieDetail(slug);

    if (!response.status) {
        return <div className='p-10 text-center text-white'>Không tìm thấy phim</div>;
    }

    const { movie, episodes } = response;

    return (
        <>
            <div className='top-detail-wrap'>
                <div
                    className='background-fade'
                    style={{
                        backgroundImage: `url("${movie.poster_url?.startsWith('http') ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`}")`
                    }}></div>
                <div className='cover-fade'>
                    <div
                        className='cover-image'
                        style={{
                            backgroundImage: `url("${movie.thumb_url?.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`}")`
                        }}></div>
                </div>
            </div>
            <div id='wrapper' className='wrapper-w-slide'>
                <div className='detail-container'>
                    <div className='dc-side'>
                        <div className='ds-info'>
                            <div className='v-thumb-l mb-3'>
                                <div className='v-thumbnail'>
                                    <img
                                        alt={movie.name}
                                        loading='lazy'
                                        src={movie.poster_url?.startsWith('http') ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`}
                                    />
                                </div>
                            </div>
                            <h2 className='heading-md media-name'>{movie.name}</h2>
                            <div className='alias-name'>{movie.origin_name}</div>
                            <DetailMore movie={movie} />
                        </div>
                        {/* Top phim tuần này */}
                        <div className='child-box child-top'>
                            <div className='child-header'>
                                <div className='inc-icon'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='25'
                                        viewBox='0 0 24 25'
                                        fill='none'>
                                        <g clipPath='url(#clip0_137_1522)'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M1.88063 16.9893C1.85433 14.5926 3.02764 11.8941 5.01236 10.0083C6.37475 8.71478 9.24978 6.77138 13.4408 7.83575L12.9199 8.87882C12.8072 9.09921 12.5893 9.25197 12.3376 9.28829L8.75391 9.81296C8.44337 9.84426 8.15161 9.98951 7.93247 10.2199C7.67577 10.4879 7.53929 10.8385 7.54805 11.2092C7.55682 11.5761 7.70708 11.9154 7.97004 12.1646L10.5758 14.6715C10.7536 14.838 10.835 15.0847 10.7937 15.3289L10.7499 15.5793C8.00009 14.1844 4.54279 15.2888 1.88063 16.9893ZM23.5748 12.1671C23.799 11.9555 23.9455 11.6675 23.988 11.3532C24.0356 10.9863 23.938 10.6244 23.7151 10.3351C23.4909 10.0459 23.1666 9.86054 22.8047 9.81421L19.2097 9.28829C18.958 9.25197 18.7401 9.09921 18.6299 8.88133L17.0221 5.66319L17.0208 5.66069C16.8869 5.39773 16.6777 5.19112 16.4198 5.06214C16.0867 4.88934 15.7085 4.85678 15.3517 4.96823C14.9935 5.07967 14.7018 5.32635 14.5277 5.66319L14.2986 6.12275C10.4356 5.00955 6.58762 5.92114 3.71885 8.64591C0.810006 11.4095 -0.591196 15.5255 0.233998 18.8876C0.310382 19.1982 0.539533 19.4473 0.841311 19.5513C0.941486 19.5863 1.04417 19.6026 1.14685 19.6026C1.35471 19.6026 1.56132 19.5325 1.72912 19.3998C3.68629 17.8521 7.69831 15.7096 10.3216 17.4977C10.3492 17.5165 10.3805 17.519 10.4093 17.5352L10.1776 18.8601C10.1275 19.1493 10.1776 19.4599 10.3216 19.7366C10.6797 20.4128 11.5225 20.672 12.2012 20.3189L15.4143 18.6547C15.6384 18.537 15.9101 18.5357 16.1343 18.6535L19.3562 20.3226C19.5703 20.4266 19.7919 20.4792 20.0098 20.4792C20.0812 20.4792 20.1513 20.4729 20.2202 20.4616C20.9778 20.3326 21.4949 19.6164 21.371 18.8601L20.7574 15.3289C20.7148 15.0835 20.795 14.838 20.9765 14.669L23.5748 12.1671Z'
                                                fill='currentColor'></path>
                                        </g>
                                    </svg>
                                </div>
                                <span>Top phim tuần này</span>
                            </div>
                            <div className='child-content'>
                                <div className='cc-top'>
                                    {/* Fake items as requested for top week */}
                                    <div className='item'>
                                        <div className='position'>1</div>
                                        <div className='h-item'>
                                            <div className='v-thumb-m'>
                                                <Link className='v-thumbnail' href='#'>
                                                    <img
                                                        alt='Thư Quyển Nhất Mộng'
                                                        src='https://static.nutscdn.com/vimg/300-0/a9f85e0911d4873c0f5a61b95325986c.webp'
                                                    />
                                                </Link>
                                            </div>
                                            <div className='info'>
                                                <h4 className='item-title lim-2'>
                                                    <Link title='Thư Quyển Nhất Mộng' href='#'>
                                                        Thư Quyển Nhất Mộng
                                                    </Link>
                                                </h4>
                                                <div className='alias-title lim-1 mb-2'>A Dream Within a Dream</div>
                                                <div className='info-line'>
                                                    <div className='tag-small'><strong>T13</strong></div>
                                                    <div className='tag-small'>Phần 1</div>
                                                    <div className='tag-small'>Tập 40</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className='position'>2</div>
                                        <div className='h-item'>
                                            <div className='v-thumb-m'>
                                                <Link className='v-thumbnail' href='#'>
                                                    <img
                                                        alt='Kiện Tướng'
                                                        src='https://static.nutscdn.com/vimg/300-0/7a6d6a456fe14c149ea625fd0178d38e.jpg'
                                                    />
                                                </Link>
                                            </div>
                                            <div className='info'>
                                                <h4 className='item-title lim-2'>
                                                    <Link title='Kiện Tướng' href='#'>Kiện Tướng</Link>
                                                </h4>
                                                <div className='alias-title lim-1 mb-2'>Good Boy</div>
                                                <div className='info-line'>
                                                    <div className='tag-small'><strong>T16</strong></div>
                                                    <div className='tag-small'>Phần 1</div>
                                                    <div className='tag-small'>Tập 14</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className='position'>3</div>
                                        <div className='h-item'>
                                            <div className='v-thumb-m'>
                                                <Link className='v-thumbnail' href='#'>
                                                    <img
                                                        alt='Ngưu Lang Chức Nữ'
                                                        src='https://static.nutscdn.com/vimg/300-0/dae02bd86bbe90c51c89cca05aa4b783.jpg'
                                                    />
                                                </Link>
                                            </div>
                                            <div className='info'>
                                                <h4 className='item-title lim-2'>
                                                    <Link title='Ngưu Lang Chức Nữ' href='#'>Ngưu Lang Chức Nữ</Link>
                                                </h4>
                                                <div className='alias-title lim-1 mb-2'>Head Over Heels</div>
                                                <div className='info-line'>
                                                    <div className='tag-small'><strong>T13</strong></div>
                                                    <div className='tag-small'>Phần 1</div>
                                                    <div className='tag-small'>Tập 8</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Diễn viên */}
                        <Actors actors={movie.actor} />
                    </div>
                    <div className='dc-main'>
                        <div className='dm-bar'>
                            <div className='elements'>
                                <Link
                                    className='btn btn-xl btn-rounded button-play flex-shrink-0'
                                    href={`/xem-phim/${movie.slug}`}>
                                    <Play size={20} style={{ marginRight: 8 }} />
                                    <span>Xem Ngay</span>
                                </Link>
                                <div className='touch-group flex-grow-1'>
                                    <div className='is-left flex-grow-1'>
                                        <div className='item item-like'>
                                            <a className='item-v'>
                                                <div className='inc-icon icon-16'>
                                                    <Heart size={16} />
                                                </div>
                                                <span>Yêu thích</span>
                                            </a>
                                        </div>
                                        <div className='dropdown'>
                                            <div className='item item-playlist'>
                                                <a className='item-v'>
                                                    <div className='inc-icon icon-16'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='100'
                                                            height='100'
                                                            viewBox='0 0 100 100'
                                                            fill='none'>
                                                            <path
                                                                d='M89.7273 41.6365H58.3635V10.2727C58.3635 6.81018 55.5534 4 52.0908 4H47.9092C44.4466 4 41.6365 6.81018 41.6365 10.2727V41.6365H10.2727C6.81018 41.6365 4 44.4466 4 47.9092V52.0908C4 55.5534 6.81018 58.3635 10.2727 58.3635H41.6365V89.7273C41.6365 93.1898 44.4466 96 47.9092 96H52.0908C55.5534 96 58.3635 93.1898 58.3635 89.7273V58.3635H89.7273C93.1898 58.3635 96 55.5534 96 52.0908V47.9092C96 44.4466 93.1898 41.6365 89.7273 41.6365Z'
                                                                fill='currentColor'></path>
                                                        </svg>
                                                    </div>
                                                    <span>Thêm vào</span>
                                                </a>
                                            </div>
                                        </div>
                                        <ShareAction />
                                        <div className='item item-comment'>
                                            <a className='item-v'>
                                                <div className='inc-icon icon-16'>
                                                    <MessageCircle size={16} />
                                                </div>
                                                <span>Bình luận</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='is-right'>
                                        <div className='v-rating'>
                                            <div className='ro-rating'>
                                                <div className='ro-icon'></div>
                                                <span className='point'>{movie.tmdb?.vote_average || '0.0'}</span>
                                                <span className='a-rate'>Đánh giá</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ContentGap movie={movie} episodes={episodes} />
                        <CommentArea />
                    </div>
                </div>
            </div>
        </>
    );
}
