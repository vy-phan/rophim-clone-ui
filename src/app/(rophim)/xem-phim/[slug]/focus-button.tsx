'use client';

import { useFocusMod } from '@/hooks/use-focus-mod';
import { cn } from '@/lib/utils';

export default function FocusModButton() {
    const { isFocusMod, toggleFocusMod } = useFocusMod();

    return (
        <div
            className={cn('item item-focus toggle-basic-label cursor-pointer', isFocusMod && 'is-on')}
            onClick={toggleFocusMod}>
            <span>Rạp phim</span>
            <div className='toggle-basic'></div>
        </div>
    );
}
