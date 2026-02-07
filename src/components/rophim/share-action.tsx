'use client';

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareActionProps {
    variant?: 'default' | 'watch';
}

export default function ShareAction({ variant = 'default' }: ShareActionProps) {
    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            return toast.success('Đã sao chép liên kết vào bộ nhớ tạm!');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
            toast.error('Không thể sao chép liên kết.');
        });
    };

    if (variant === 'watch') {
        return (
            <div className='item item-share' onClick={handleShare} style={{ cursor: 'pointer' }}>
                <div className='inc-icon icon-12'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='17'
                        height='17'
                        viewBox='0 0 17 17'
                        fill='none'>
                        <path
                            d='M16.3628 0.651489C15.946 0.223669 15.3291 0.0642849 14.7538 0.232058L1.34002 4.13277C0.733102 4.30139 0.302926 4.78541 0.187045 5.4003C0.0686637 6.02609 0.482166 6.82049 1.02239 7.15268L5.2166 9.73051C5.64678 9.99475 6.20201 9.92848 6.55799 9.56945L11.3608 4.73676C11.6026 4.4851 12.0027 4.4851 12.2445 4.73676C12.4862 4.98003 12.4862 5.37429 12.2445 5.62595L7.43334 10.4595C7.07653 10.8177 7.00984 11.3755 7.27245 11.8084L9.83516 16.0446C10.1353 16.548 10.6522 16.8332 11.2191 16.8332C11.2858 16.8332 11.3608 16.8332 11.4275 16.8248C12.0777 16.7409 12.5946 16.2963 12.7864 15.6671L16.763 2.2705C16.9381 1.70007 16.7797 1.07931 16.3628 0.651489Z'
                            fill='currentColor'></path>
                    </svg>
                </div>
                <span>Chia sẻ</span>
            </div>
        );
    }

    return (
        <div className='item item-share'>
            <a className='item-v' title='Chia sẻ' onClick={handleShare} style={{ cursor: 'pointer' }}>
                <div className='inc-icon icon-16'>
                    <Share2 size={16} />
                </div>
                <span>Chia sẻ</span>
            </a>
        </div>
    );
}

