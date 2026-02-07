'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MovieDetail, Server } from '@/types/movie';
import { Play, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EpisodesListProps {
    movie: MovieDetail;
    episodes: Server[];
}

export default function EpisodesList({ movie, episodes = [] }: EpisodesListProps) {
    const searchParams = useSearchParams();
    const currentEp = searchParams.get('ep');
    const currentSv = searchParams.get('sv');
    
    // State to toggle between "Server Cards" view and "Episode List" view
    const [showEpisodes, setShowEpisodes] = useState(false);
    const [activeServer, setActiveServer] = useState(0);
    const [isCollapsed, ] = useState(false);

    // Auto-show episodes if there's a current episode in the URL
    useEffect(() => {
        if (currentEp) {
            setShowEpisodes(true);
            
            // If sv parameter exists and is valid, use it
            if (currentSv) {
                const serverIdx = parseInt(currentSv);
                if (!isNaN(serverIdx) && serverIdx >= 0 && serverIdx < episodes.length) {
                    setActiveServer(serverIdx);
                    return;
                }
            }
            for (let i = 0; i < episodes.length; i++) {
                if (episodes[i].server_data.some(e => e.slug === currentEp)) {
                    setActiveServer(i);
                    break; 
                }
            }
        }
    }, [currentEp, currentSv, episodes]);

    // Safeguard against undefined episodes
    if (!episodes || !Array.isArray(episodes) || episodes.length === 0) {
        return (
            <div className='p-4 text-center text-gray-400'>
                Danh sách tập đang được cập nhật...
            </div>
        );
    }

    const currentServer = episodes[activeServer];
    const episodeList = currentServer?.server_data || [];

    // VIEW 1: Old UI (Server Cards)
    if (!showEpisodes) {
        return (
            <div className='cg-body-box is-eps'>
                <div className='box-header'>
                    <div className='heading-md mb-0'>Các bản chiếu</div>
                </div>
                <div className='box-body !p-0'>
                    <div className='de-type'>
                        {episodes.map((server, idx) => {
                            const isTm = server.server_name.toLowerCase().includes('thuyết minh');
                            const isLt = server.server_name.toLowerCase().includes('lồng tiếng');
                            const iconType = isLt ? 'lt' : (isTm ? 'tm' : 'pd');
                            
                            return (
                                <div 
                                    key={idx} 
                                    className={cn('item cursor-pointer', iconType)} 
                                    onClick={() => {
                                        setActiveServer(idx);
                                        setShowEpisodes(true);
                                    }}
                                >
                                    <div className='m-thumbnail'>
                                        <img
                                            alt={movie.name}
                                            loading='lazy'
                                            src={movie.poster_url?.startsWith('http') ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`}
                                        />
                                    </div>
                                    <div className='info'>
                                        <div className='ver line-center'>
                                            <div className='inc-icon icon-20'>
                                                <img src={`https://www.rophim.me/images/icons/${iconType}.svg`} alt={iconType} />
                                            </div>
                                            <span>{server.server_name.replace('#Hà Nội ', '')}</span>
                                        </div>
                                        <div className='media-title lim-2 mb-0'>{movie.name}</div>
                                        <div className='btn btn-sm btn-light'>Xem bản này</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // VIEW 2: New UI (Episode List)
    return (
        <div className='cg-body-box is-eps !bg-transparent !p-0'>
            {/* Header controls matching the image */}
            <div className='flex flex-wrap items-center justify-between mb-6 gap-4'>
                <div className='flex items-center gap-4'>
                    <button 
                        className='flex items-center gap-2 text-gray-400 hover:text-white transition-colors mr-2'
                        onClick={() => setShowEpisodes(false)}
                        title="Quay lại chọn server"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className='w-[1px] h-6 bg-white/10 hidden sm:block'></div>
                    <div className='flex gap-2 overflow-x-auto pb-1 no-scrollbar'>
                         {episodes.map((server, idx) => {
                             const isActive = activeServer === idx;
                             return (
                                 <button 
                                    key={idx} 
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all border ${
                                        isActive 
                                        ? 'bg-white/10 border-white/20 text-white' 
                                        : 'bg-transparent border-transparent text-gray-400 hover:text-white'
                                    }`}
                                    onClick={() => setActiveServer(idx)}
                                 >
                                     <div className='opacity-60'>
                                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"/></svg>
                                     </div>
                                     <span>{server.server_name.replace('#Hà Nội ', '')}</span>
                                 </button>
                             );
                         })}
                    </div>
                </div>
                
            </div>

            {/* Episode Grid */}
            <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-[2000px]'}`}>
                <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'>
                    {episodeList.map((ep, idx) => {
                         // Check active based on slug AND matching server via URL
                         // Or if we are just browsing the list (no currentEp), highlight nothing or valid
                         const isActive = currentEp === ep.slug && 
                                          (currentSv ? parseInt(currentSv) === activeServer : true);

                        return (
                            <Link 
                                key={idx} 
                                href={`/xem-phim/${movie.slug}?ep=${ep.slug}&sv=${activeServer}`}
                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                                    isActive 
                                    ? 'bg-primary-color text-black font-medium' 
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Play size={12} fill="currentColor" stroke="none" />
                                <span className='truncate'>{ep.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
