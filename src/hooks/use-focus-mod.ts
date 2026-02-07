import { useEffect } from 'react';

import { create } from 'zustand';

interface FocusModState {
    isFocusMod: boolean;
    toggleFocusMod: () => void;
}

const useFocusModStore = create<FocusModState>((set, get) => ({
    isFocusMod: false,
    toggleFocusMod: () => {
        set((state) => ({ isFocusMod: !state.isFocusMod }));
    }
}));

export function useFocusMod() {
    const isFocusMod = useFocusModStore((state) => state.isFocusMod);
    const toggleFocusMod = useFocusModStore((state) => state.toggleFocusMod);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (isFocusMod) {
                document.body.classList.add('focus-mod');
            } else {
                document.body.classList.remove('focus-mod');
            }
        }
    }, [isFocusMod]);

    return { isFocusMod, toggleFocusMod };
}
