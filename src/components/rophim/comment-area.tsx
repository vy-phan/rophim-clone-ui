'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { ChevronDown, ChevronUp, MoreHorizontal, Reply } from 'lucide-react';

export default function CommentArea() {
    const [tab, setTab] = useState<'comment' | 'rating'>('comment');

    return (
        <div id='comment-area' className='child-box child-discuss'>
            <div className='child-header'>
                <div className='inc-icon'>
                    {/* Comment SVG from HTML, keep as is for now */}
                    <svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' fill='none'>
                        <g clipPath='url(#clip0_281_3026)'>
                            <path
                                d='M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z'
                                fill='currentColor'></path>
                        </g>
                    </svg>
                </div>
                <span>{tab === 'comment' ? 'Bình luận (70)' : 'Đánh giá (10)'} </span>
                <div className='model-tabs actor-tabs'>
                    <a className={cn('item', tab === 'comment' && 'active')} onClick={() => setTab('comment')}>
                        Bình luận
                    </a>
                    <a className={cn('item', tab === 'rating' && 'active')} onClick={() => setTab('rating')}>
                        Đánh giá
                    </a>
                </div>
            </div>
            <div className='child-content'>
                <div className='discuss-wrap'>
                    {tab === 'comment' && (
                        <div className='my-area'>
                            <div className='ma-via mb-3'>
                                Vui lòng <a className='text-primary'>đăng nhập</a> để tham gia bình luận.
                            </div>
                            <div className='textarea-wrap'>
                                <div className='ma-input'>
                                    <textarea
                                        className='form-control v-form-control v-form-textarea w-full'
                                        rows={4}
                                        cols={3}
                                        maxLength={1000}
                                        placeholder='Viết bình luận'></textarea>
                                    <div className='chac-left'>0 / 1000</div>
                                </div>
                                <div className='line-center d-flex ma-buttons gap-3'>
                                    <div className='v-toggle v-toggle-min line-center'>
                                        <div id='spoil-toggle' className='toggle-x off'>
                                            <span></span>
                                        </div>
                                        <div className='text'>Tiết lộ?</div>
                                    </div>
                                    <div className='flex-grow-1'></div>
                                    <button className='btn btn-basic btn-submit' type='button'>
                                        <span>Gửi</span>
                                        <div className='inc-icon icon-20 ms-1'>
                                            {/* Send SVG from HTML, keep as is for now */}
                                            <svg
                                                fill='none'
                                                height='512'
                                                viewBox='0 0 24 24'
                                                width='512'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='m22.1012 10.5616-19.34831-9.43824c-.1664-.08117-.34912-.12336-.53427-.12336-.67302 0-1.21862.5456-1.21862 1.21862v.03517c0 .16352.02005.32643.05971.48507l1.85597 7.42384c.05069.2028.22214.3526.42986.3757l8.15756.9064c.2829.0314.4969.2705.4969.5552s-.214.5238-.4969.5552l-8.15756.9064c-.20772.0231-.37917.1729-.42986.3757l-1.85597 7.4238c-.03966.1587-.05971.3216-.05971.4851v.0352c0 .673.5456 1.2186 1.21862 1.2186.18515 0 .36787-.0422.53427-.1234l19.34831-9.4382c.5499-.2682.8988-.8265.8988-1.4384s-.3489-1.1702-.8988-1.4384z'
                                                    fill='currentColor'></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='discuss-list'>
                        <div className='d-item d-item-pin' id='cm-1'>
                            <div className='user-avatar'>
                                <img src='/avatar/avatar1.jpg' />
                            </div>
                            <div className='info'>
                                <div className='stick'>
                                    <div className='line-center'>
                                        {/* Thumbtack icon, use MoreHorizontal as placeholder */}
                                        <MoreHorizontal size={14} />
                                        <span>Ghim bởi Rổ</span>
                                    </div>
                                </div>
                                <div className='comment-header'>
                                    <div className='user-name line-center gr-admin'>
                                        <div className='gr-tag'>Admin</div>
                                        <span>Cô 2 Rổ</span>
                                    </div>
                                    <div className='ch-logs'>
                                        <div className='c-time'>một ngày trước</div>
                                    </div>
                                </div>
                                <div className='text'>
                                    Bản CAM hiện tại có nhiều phân đoạn hình và tiếng không khớp. Rổ sẽ cập nhật bản tốt
                                    hơn khi nó ra mắt.
                                </div>
                                <div className='comment-bottom line-center d-flex'>
                                    <div className='group-react line-center'>
                                        <div className='item item-up line-center'>
                                            <ChevronUp size={14} />
                                            <span>22</span>
                                        </div>
                                        <div className='item item-down line-center'>
                                            <ChevronDown size={14} />
                                        </div>
                                    </div>
                                    <button type='button' className='btn btn-xs btn-basic btn-comment'>
                                        <Reply size={14} />
                                        <span>Trả lời</span>
                                    </button>
                                    <div className='dropdown'>
                                        <button type='button' className='btn btn-xs btn-basic btn-menu'>
                                            <MoreHorizontal size={14} />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                </div>
                                <div className='replies-wrap'>
                                    <a className='text-primary replies-toggle'>
                                        <ChevronDown size={14} className='me-1 inline' />3 bình luận
                                    </a>
                                </div>
                            </div>
                        </div>
                        {tab === 'comment' && (
                            <>
                                <div className='d-item' id='cm-2'>
                                    <div className='user-avatar'>
                                        <img src='/avatar/avatar2.jpg' />
                                    </div>
                                    <div className='info'>
                                        <div className='comment-header'>
                                            <div className='user-name line-center gr-free'>
                                                <span>Lê Đỗ Huy</span>
                                            </div>
                                            <div className='ch-logs'>
                                                <div className='c-time'>một giờ trước</div>
                                            </div>
                                        </div>
                                        <div className='text'>
                                            Phim hay rcm mn xem
                                        </div>
                                        <div className='comment-bottom line-center d-flex'>
                                            <div className='group-react line-center'>
                                                <div className='item item-up line-center'>
                                                    <ChevronUp size={14} />
                                                </div>
                                                <div className='item item-down line-center'>
                                                    <ChevronDown size={14} />
                                                </div>
                                            </div>
                                            <button type='button' className='btn btn-xs btn-basic btn-comment'>
                                                <Reply size={14} />
                                                <span>Trả lời</span>
                                            </button>
                                            <div className='dropdown'>
                                                <button type='button' className='btn btn-xs btn-basic btn-menu'>
                                                    <MoreHorizontal size={14} />
                                                    <span>Thêm</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='replies-wrap'>
                                            <a className='text-primary replies-toggle'>
                                                <ChevronDown size={14} className='me-1 inline' />1 bình luận
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-item more py-3'>
                                    <a className='primary-text'>Xem thêm bình luận...</a>
                                </div>
                            </>
                        )}
                        {tab === 'rating' && (
                            <>
                                <div className='d-item' id='cm-68791ca66c1460e5e009e2ba'>
                                    <div className='user-avatar'>
                                        <img src='/images//avatars/pack6/06.jpg' />
                                    </div>
                                    <div className='info'>
                                        <div className='comment-header'>
                                            <div className='rated'>
                                                <span role='img' aria-label='heart eyes'>
                                                    😍
                                                </span>{' '}
                                                Tuyệt vời
                                            </div>
                                            <div className='user-name line-center gr-free'>
                                                <span>
                                                    YuKiLan
                                                    <span
                                                        className='ms-2'
                                                        style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                                                        {/* Infinity icon */}
                                                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                                                            <path
                                                                d='M18.178 15.071a4 4 0 1 0-5.657-5.657l-1.414 1.414a4 4 0 1 0 5.657 5.657l1.414-1.414Z'
                                                                stroke='#0d6efd'
                                                                strokeWidth='2'
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                            />
                                                            <path
                                                                d='M5.822 8.929a4 4 0 1 0 5.657 5.657l1.414-1.414a4 4 0 1 0-5.657-5.657L5.822 8.93Z'
                                                                stroke='#0d6efd'
                                                                strokeWidth='2'
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                            />
                                                        </svg>
                                                    </span>
                                                </span>
                                            </div>
                                            <div className='ch-logs'>
                                                <div className='c-time'>4 phút trước</div>
                                            </div>
                                        </div>
                                        <div className='text'>
                                            <span>TUYỆT TÁC ĐIỆN ẢNH!!!</span>
                                        </div>
                                        <div className='comment-bottom line-center d-flex'>
                                            <div className='group-react line-center'>
                                                <div className='item item-up line-center'>
                                                    {/* CircleUp icon */}
                                                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                                                        <circle
                                                            cx='12'
                                                            cy='12'
                                                            r='10'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                        />
                                                        <path
                                                            d='M8 12l4-4 4 4'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                    </svg>
                                                </div>
                                                <div className='item item-down line-center'>
                                                    {/* CircleDown icon */}
                                                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                                                        <circle
                                                            cx='12'
                                                            cy='12'
                                                            r='10'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                        />
                                                        <path
                                                            d='M16 12l-4 4-4-4'
                                                            stroke='currentColor'
                                                            strokeWidth='2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <button type='button' className='btn btn-xs btn-basic btn-comment'>
                                                <Reply size={14} style={{ verticalAlign: 'middle' }} />
                                                <span>Trả lời</span>
                                            </button>
                                            <div className='dropdown'>
                                                <button type='button' className='btn btn-xs btn-basic btn-menu'>
                                                    <MoreHorizontal size={14} style={{ verticalAlign: 'middle' }} />
                                                    <span>Thêm</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-item more py-3'>
                                    <a className='primary-text'>Xem thêm đánh giá...</a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
