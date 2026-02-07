'use client';

import { useState } from 'react';
import Link from 'next/link';
import EpisodesList from '@/components/rophim/episodes-list';
import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { MovieDetail, Server } from '@/types/movie';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/registry/new-york-v4/ui/dialog';

interface ContentGapProps {
    movie: MovieDetail;
    episodes: Server[];
}

export default function ContentGap({ movie, episodes }: ContentGapProps) {
    const [activeTab, setActiveTab] = useState<'episodes' | 'gallery' | 'suggestion'>('episodes');

    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('youtube.com/embed')) return url;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
        }

        return url;
    };

    return (
        <div className='content-gap'>
            <div className='cg-body'>
                <TabsPrimitive.Root value={activeTab} onValueChange={setActiveTab as any} className='cg-tabs'>
                    <TabsPrimitive.List className='v-tabs nav nav-tabs mb-0 flex' role='tablist'>
                        <TabsPrimitive.Trigger
                            value='episodes'
                            className={cn('nav-link', activeTab === 'episodes' && 'active')}
                            role='tab'
                            aria-selected={activeTab === 'episodes'}
                            tabIndex={0}>
                            Tập phim
                        </TabsPrimitive.Trigger>
                        <TabsPrimitive.Trigger
                            value='gallery'
                            className={cn('nav-link', activeTab === 'gallery' && 'active')}
                            role='tab'
                            aria-selected={activeTab === 'gallery'}
                            tabIndex={0}>
                            Gallery
                        </TabsPrimitive.Trigger>
                        <TabsPrimitive.Trigger
                            value='suggestion'
                            className={cn('nav-link', activeTab === 'suggestion' && 'active')}
                            role='tab'
                            aria-selected={activeTab === 'suggestion'}
                            tabIndex={0}>
                            Đề xuất
                        </TabsPrimitive.Trigger>
                    </TabsPrimitive.List>
                    <TabsPrimitive.Content value='episodes' className='tab-content px-5 fade tab-pane active show'>
                        <EpisodesList movie={movie} episodes={episodes} />
                    </TabsPrimitive.Content>
                    <TabsPrimitive.Content value='gallery' className='tab-content px-5 fade tab-pane active show'>
                        <div className='cg-body-box is-gallery'>
                            {movie.trailer_url && (
                                <div className='mb-10'>
                                    <div className='box-header mb-4'>
                                        <div className='heading-md mb-0 text-white font-bold'>Videos</div>
                                    </div>
                                    <div className='box-body !p-0'>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className='video-item group cursor-pointer block'>
                                                        <div className='relative aspect-video rounded-xl overflow-hidden bg-[#2f3346]'>
                                                            <img 
                                                                src={movie.thumb_url?.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`} 
                                                                alt={`${movie.name} Trailer`}
                                                                className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500' 
                                                            />
                                                            <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:bg-black/20 transition-all'>
                                                                <div className='w-14 h-14 rounded-full border-2 border-white flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:scale-110 transition-transform'>
                                                                    <div className='text-white'>
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mt-3 text-white font-medium text-lg'>Trailer chính thức</div>
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className=" p-0 border-none bg-transparent shadow-none overflow-hidden">
                                                    <DialogHeader className="sr-only">
                                                        <DialogTitle>{movie.name} - Trailer</DialogTitle>
                                                    </DialogHeader>
                                                    <div className='relative aspect-video w-full rounded-2xl overflow-hidden bg-black'>
                                                        <iframe 
                                                            src={getEmbedUrl(movie.trailer_url as string)} 
                                                            title={`${movie.name} Trailer`}
                                                            className="absolute inset-0 w-full h-full"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className='box-header mb-4'>
                                    <div className='heading-md mb-0 text-white font-bold'>Ảnh</div>
                                </div>
                                <div className='box-body !p-0'>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className='photo-item group cursor-pointer'>
                                                    <div className='relative aspect-[2/3] rounded-xl overflow-hidden bg-[#2f3346]'>
                                                        <img 
                                                            src={movie.poster_url?.startsWith('http') ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`} 
                                                            alt={`${movie.name} Poster`}
                                                            className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500' 
                                                        />
                                                    </div>
                                                    <div className='mt-2 text-gray-400 text-sm'>Poster</div>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[90vw] md:max-w-2xl p-0 border-none bg-transparent shadow-none">
                                                <DialogHeader className="sr-only">
                                                    <DialogTitle>{movie.name} - Poster</DialogTitle>
                                                </DialogHeader>
                                                <div className='relative overflow-hidden rounded-2xl'>
                                                    <img 
                                                        src={movie.poster_url?.startsWith('http') ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`} 
                                                        alt={`${movie.name} Poster`}
                                                        className='w-full h-auto max-h-[85vh] object-contain shadow-2xl'
                                                    />
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className='photo-item group cursor-pointer'>
                                                    <div className='relative aspect-video rounded-xl overflow-hidden bg-[#2f3346] h-fit md:h-auto'>
                                                        <img 
                                                            src={movie.thumb_url?.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`} 
                                                            alt={`${movie.name} Banner`}
                                                            className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500' 
                                                        />
                                                    </div>
                                                    <div className='mt-2 text-gray-400 text-sm'>Banner</div>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[95vw] md:max-w-5xl p-0 border-none bg-transparent shadow-none">
                                                <DialogHeader className="sr-only">
                                                    <DialogTitle>{movie.name} - Banner</DialogTitle>
                                                </DialogHeader>
                                                <div className='relative overflow-hidden rounded-2xl'>
                                                    <img 
                                                        src={movie.thumb_url?.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`} 
                                                        alt={`${movie.name} Banner`}
                                                        className='w-full h-auto max-h-[85vh] object-contain shadow-2xl'
                                                    />
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsPrimitive.Content>
                    <TabsPrimitive.Content value='suggestion' className='tab-content px-5 fade tab-pane active show'>
                        <div className='cg-body-box is-suggest'>
                            <div className='box-header'>
                                <div className='heading-md mb-0'>Có thể bạn sẽ thích</div>
                            </div>
                            <div className='box-body'>
                                <div className='cards-grid-wrapper de-suggest'>
                                    <div className='sw-item'>
                                        <Link className='v-thumbnail' href='#'>
                                            <div className='pin-new'>
                                                <div className='line-center line-coming'>
                                                    <strong>Sắp chiếu</strong>
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    alt='Gợi ý 1'
                                                    loading='lazy'
                                                    src='https://images2.thanhnien.vn/528068263637045248/2024/2/20/special-poster-2-mai-17084211313531000860296.jpg'
                                                />
                                            </div>
                                        </Link>
                                        <div className='info'>
                                            <h4 className='item-title lim-1'>
                                                <Link title='Phim Gợi Ý 1' href='#'>Phim Gợi Ý 1</Link>
                                            </h4>
                                            <h4 className='alias-title lim-1'>
                                                <Link title='Suggested Movie 1' href='#'>Suggested Movie 1</Link>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className='sw-item'>
                                        <Link className='v-thumbnail' href='#'>
                                            <div className='pin-new m-pin-new'>
                                                <div className='line-center line-pd'>P.Đề</div>
                                            </div>
                                            <div>
                                                <img
                                                    alt='Gợi ý 2'
                                                    loading='lazy'
                                                    src='https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/c/g/cgv_350x495_1_1.jpg'
                                                />
                                            </div>
                                        </Link>
                                        <div className='info'>
                                            <h4 className='item-title lim-1'>
                                                <Link title='Phim Gợi Ý 2' href='#'>Phim Gợi Ý 2</Link>
                                            </h4>
                                            <h4 className='alias-title lim-1'>
                                                <Link title='Suggested Movie 2' href='#'>Suggested Movie 2</Link>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className='sw-item'>
                                        <Link className='v-thumbnail' href='#'>
                                            <div className='pin-new m-pin-new'>
                                                <div className='line-center line-pd'>P.Đề</div>
                                            </div>
                                            <div>
                                                <img
                                                    alt='Gợi ý 3'
                                                    loading='lazy'
                                                    src='https://phimapi.com/image.php?url=https%3A%2F%2Fphimimg.com%2Fupload%2Fvod%2F20250722-1%2F66ee196318069c6ede9450a5f76a4648.jpg'
                                                />
                                            </div>
                                        </Link>
                                        <div className='info'>
                                            <h4 className='item-title lim-1'>
                                                <Link title='Phim Gợi Ý 3' href='#'>Phim Gợi Ý 3</Link>
                                            </h4>
                                            <h4 className='alias-title lim-1'>
                                                <Link title='Suggested Movie 3' href='#'>Suggested Movie 3</Link>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsPrimitive.Content>
                </TabsPrimitive.Root>
            </div>
        </div>
    );
}
