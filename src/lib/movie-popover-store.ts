import { create } from 'zustand';

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

interface MoviePopoverState {
    isVisible: boolean;
    movie: Movie | null;
    position: { x: number; y: number };
    topics: string[];
    hovered: boolean;
    showPopover: (movie: Movie, position: { x: number; y: number }, topics: string[]) => void;
    hidePopover: () => void;
    setHovered: (hovered: boolean) => void;
}

export const useMoviePopoverStore = create<MoviePopoverState>((set) => ({
    isVisible: false,
    movie: null,
    position: { x: 0, y: 0 },
    topics: [],
    hovered: false,
    showPopover: (movie, position, topics) =>
        set({
            isVisible: true,
            movie,
            position,
            topics
        }),
    hidePopover: () =>
        set((state) => {
            if (!state.hovered) {
                return {
                    isVisible: false,
                    movie: null,
                    position: { x: 0, y: 0 },
                    topics: []
                };
            }

            return {};
        }),
    setHovered: (hovered) => set({ hovered })
}));
