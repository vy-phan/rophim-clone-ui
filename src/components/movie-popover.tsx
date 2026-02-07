'use client';

import { useEffect, useRef } from 'react';

import Link from 'next/link';

import { useMoviePopoverStore } from '@/lib/movie-popover-store';

import { Play } from 'lucide-react';

export default function MoviePopover() {
    const { isVisible, movie, position, topics, hidePopover, setHovered } = useMoviePopoverStore();
    const popoverRef = useRef<HTMLDivElement>(null);
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                hidePopover();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, hidePopover]);

    if (!isVisible || !movie) {
        return null;
    }

    // Helper for like button SVG
    const HeartSVG = (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <g clipPath='url(#clip0_49_76)'>
                <path
                    d='M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z'
                    fill='currentColor'></path>
            </g>
        </svg>
    );

    // Helper for info button SVG
    const InfoSVG = (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'>
            <g clipPath='url(#clip0_37_55)'>
                <path
                    d='M10 0.75C4.47734 0.75 0 5.22734 0 10.75C0 16.2727 4.47734 20.75 10 20.75C15.5227 20.75 20 16.2727 20 10.75C20 5.22734 15.5227 0.75 10 0.75ZM11.2664 14.9523C11.2664 15.1187 11.2337 15.2833 11.17 15.437C11.1064 15.5906 11.0131 15.7302 10.8955 15.8478C10.7779 15.9654 10.6383 16.0587 10.4846 16.1224C10.331 16.186 10.1663 16.2188 10 16.2188C9.83369 16.2188 9.66901 16.186 9.51537 16.1224C9.36172 16.0587 9.22211 15.9654 9.10452 15.8478C8.98692 15.7302 8.89364 15.5906 8.82999 15.437C8.76635 15.2833 8.73359 15.1187 8.73359 14.9523V9.88633C8.73359 9.72002 8.76635 9.55534 8.82999 9.4017C8.89364 9.24805 8.98692 9.10844 9.10452 8.99084C9.22211 8.87325 9.36172 8.77996 9.51537 8.71632C9.66901 8.65268 9.83369 8.61992 10 8.61992C10.1663 8.61992 10.331 8.65268 10.4846 8.71632C10.6383 8.77996 10.7779 8.87325 10.8955 8.99084C11.0131 9.10844 11.1064 9.24805 11.17 9.4017C11.2337 9.55534 11.2664 9.72002 11.2664 9.88633V14.9523ZM10 7.81406C9.74953 7.81406 9.50468 7.73979 9.29642 7.60063C9.08816 7.46148 8.92584 7.26369 8.82999 7.03229C8.73414 6.80088 8.70906 6.54625 8.75793 6.30059C8.80679 6.05493 8.92741 5.82928 9.10452 5.65217C9.28163 5.47506 9.50728 5.35445 9.75294 5.30558C9.9986 5.25672 10.2532 5.2818 10.4846 5.37765C10.716 5.4735 10.9138 5.63582 11.053 5.84408C11.1921 6.05234 11.2664 6.29718 11.2664 6.54766C11.2665 6.71398 11.2337 6.87868 11.1701 7.03235C11.1065 7.18602 11.0132 7.32565 10.8956 7.44326C10.778 7.56086 10.6384 7.65414 10.4847 7.71777C10.331 7.78139 10.1663 7.81411 10 7.81406Z'
                    fill='currentColor'></path>
            </g>
        </svg>
    );

    // Helper for play icon
    const PlayIcon = (
        <i
            className='fa-solid fa-play'
            style={{ marginRight: 4, fontSize: 14, display: 'inline-block', verticalAlign: 'middle' }}
        />
    );

    // Fallbacks for tags
    const imdbRating = '8.6';
    const year = new Date().getFullYear();
    const part = movie.part || '';
    const episode = movie.episode || '';

    return (
        <div
            ref={popoverRef}
            id='hover-tooltip'
            className='demo-tip'
            style={{
                zIndex: 99,
                position: 'fixed',
                top: position.y,
                left: position.x,
                animation: '0.3s forwards qtip-animation',
                opacity: 1,
                width: 420,
                height: 400,
                pointerEvents: 'auto'
            }}
            onMouseEnter={() => {
                if (hideTimeout.current) clearTimeout(hideTimeout.current);
                setHovered(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
                hideTimeout.current = setTimeout(() => {
                    hidePopover();
                }, 100);
            }}>
            <div className='sw-tip'>
                <div
                    className='media-teaser'
                    style={{
                        backgroundImage: `url(${movie.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        height: '200px'
                    }}>
                    <div className='info'>
                        <div className='media-title-image'>
                            <img alt={movie.title} src={movie.image} />
                        </div>
                    </div>
                    <div className='ratio ratio-16x9' />
                </div>
                <div className='media-item'>
                    <div className='video-title-group'>
                        <div className='media-title'>{movie.title}</div>
                        <div className='alias-title'>{movie.aliasTitle}</div>
                    </div>
                    <div className='touch-group'>
                        <Link className='btn btn-block btn-primary' href={movie.href}>
                            <Play size={14} />
                            Xem ngay
                        </Link>
                        <a className='btn btn-outline'>
                            <div className='inc-icon icon-14'>{HeartSVG}</div>
                            <span>Thích</span>
                        </a>
                        <Link className='btn btn-outline' href={movie.href}>
                            <div className='inc-icon icon-14'>{InfoSVG}</div>
                            <span>Chi tiết</span>
                        </Link>
                    </div>
                    <div className='hl-tags'>
                        <div className='tag-imdb'>
                            <span>{imdbRating}</span>
                        </div>
                        <div className='tag-model'>
                            <span className='last'>
                                <strong>{movie.rating}</strong>
                            </span>
                        </div>
                        <div className='tag-classic'>
                            <span>{year}</span>
                        </div>
                        <div className='tag-classic'>
                            <span>{part}</span>
                        </div>
                        <div className='tag-classic'>
                            <span>{episode}</span>
                        </div>
                    </div>
                    {topics.length > 0 && (
                        <div className='hl-tags'>
                            {topics.slice(0, 6).map((topic, idx) => (
                                <div className='tag-topic' key={idx}>
                                    {topic}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
