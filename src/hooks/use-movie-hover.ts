import { useCallback, useRef } from 'react';

import { useMoviePopoverStore } from '@/lib/movie-popover-store';

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
}

const TIMEOUT_MOUSE_LEAVE = 500;
const TIMEOUT_MOUSE_ENTER = 300; // Delay before showing popover

export const useMovieHover = () => {
    const { showPopover, hidePopover, setHovered } = useMoviePopoverStore();
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);
    const showTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent, movie: Movie, topics: string[]) => {
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
            }
            if (showTimeout.current) {
                clearTimeout(showTimeout.current);
            }
            hidePopover();
            setHovered(true);
            const rect = event.currentTarget.getBoundingClientRect();
            const popoverWidth = 420;
            const popoverHeight = 400;

            let x = rect.left + rect.width / 2 - popoverWidth / 2;
            let y = rect.top + rect.height / 2 - popoverHeight / 2;

            if (x < 10) x = 10;
            if (x + popoverWidth > window.innerWidth - 10) {
                x = window.innerWidth - popoverWidth - 10;
            }
            if (y < 10) y = 10;
            if (y + popoverHeight > window.innerHeight - 10) {
                y = window.innerHeight - popoverHeight - 10;
            }

            showTimeout.current = setTimeout(() => {
                showPopover(movie, { x, y }, topics);
            }, TIMEOUT_MOUSE_ENTER);
        },
        [showPopover, setHovered]
    );

    const handleMouseLeave = useCallback(() => {
        setHovered(false);
        if (showTimeout.current) {
            clearTimeout(showTimeout.current);
        }
        hideTimeout.current = setTimeout(() => {
            hidePopover();
        }, TIMEOUT_MOUSE_LEAVE);
    }, [hidePopover, setHovered]);

    return {
        handleMouseEnter,
        handleMouseLeave
    };
};
