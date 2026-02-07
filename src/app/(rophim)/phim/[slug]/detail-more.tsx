'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MovieDetail } from '@/types/movie';

export default function DetailMore({ movie }: { movie: MovieDetail }) {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div
                id='toggle-detail'
                className='btn btn-block btn-basic primary-text mb-2'
                onClick={() => setShowDetail((v) => !v)}
                style={{ cursor: 'pointer' }}>
                <span>Thông tin phim</span>
                {showDetail ? (
                    <ChevronUp className='ms-2 inline' size={18} />
                ) : (
                    <ChevronDown className='ms-2 inline' size={18} />
                )}
            </div>
            <div className={cn('detail-more', showDetail && 'show')}>
                <div className='hl-tags'>
                    <div className='tag-imdb'>
                        <span>{movie.tmdb?.vote_average || '8.0'}</span>
                    </div>
                    <div className='tag-model'>
                        <span className='last'>
                            <strong>{movie.quality || 'FHD'}</strong>
                        </span>
                    </div>
                    <div className='tag-classic'>
                        <span>{movie.year}</span>
                    </div>
                    <div className='tag-classic'>
                        <span>{movie.time || 'N/A'}</span>
                    </div>
                    <div className='tag-classic'>{movie.quality || 'FHD'}</div>
                </div>
                <div className='hl-tags'>
                    {movie.category?.map((cat) => (
                        <a key={cat.slug} className='tag-topic' href={`/the-loai/${cat.slug}`}>
                            {cat.name}
                        </a>
                    ))}
                </div>
                <div className='detail-line'>
                    <div className='de-title d-block mb-2'>Giới thiệu:</div>
                    <div className='description'>
                        {movie.content || 'Đang cập nhật nội dung...'}
                    </div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Thời lượng:</div>
                    <div className='de-value'>{movie.time || 'N/A'}</div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Quốc gia:</div>
                    <div className='de-value'>
                        {movie.country?.map((c, idx) => (
                            <span key={c.slug}>
                                <a href={`/quoc-gia/${c.slug}`}>{c.name}</a>
                                {idx < (movie.country?.length || 0) - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Networks:</div>
                    <div className='de-value'>
                        <span>
                            <a title='Unknown' href='#'>
                                Unknown
                            </a>
                        </span>
                    </div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Sản xuất:</div>
                    <div className='de-value'>
                        <span>
                            <a href='#'>Unknown</a>
                        </span>
                    </div>
                </div>
                <div className='detail-line d-flex'>
                    <div className='de-title'>Đạo diễn:</div>
                    <div className='de-value'>
                        {movie.director?.map((d, idx) => (
                            <span key={d}>
                                <a title={d} href='#'>
                                    {d}
                                </a>
                                {idx < (movie.director?.length || 0) - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
