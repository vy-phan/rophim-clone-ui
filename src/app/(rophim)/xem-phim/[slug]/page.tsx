import { MovieService } from '@/services/movie-service';
import Link from 'next/link';
import FocusModButton from './focus-button';
import WatchContainer from './watch-container';
import { ArrowLeft } from 'lucide-react';
import ShareAction from '../../../../components/rophim/share-action';

export default async function XemPhimPage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ slug: string }>, 
    searchParams: Promise<{ ep?: string, sv?: string }> 
}) {
    const { slug } = await params;
    const { ep, sv } = await searchParams;
    const response = await MovieService.getMovieDetail(slug);

    if (!response.status) {
        return <div className='p-10 text-center text-white'>Không tìm thấy phim</div>;
    }

    const { movie, episodes } = response;
    
    // Find the correct episode link
    let activeEpisodeLink = '';
    
    if (episodes && episodes.length > 0) {
        // 1. Try to find based on specific server index if provided
        if (sv) {
            const serverIdx = parseInt(sv);
            if (!isNaN(serverIdx) && serverIdx >= 0 && serverIdx < episodes.length) {
                const targetServer = episodes[serverIdx];
                // If ep is provided, look for it in this server
                if (ep) {
                    const found = targetServer.server_data.find(e => e.slug === ep);
                    if (found) {
                        activeEpisodeLink = found.link_embed;
                    }
                } else {
                    // No ep provided, but server is provided -> take first ep of this server
                    activeEpisodeLink = targetServer.server_data[0]?.link_embed || '';
                }
            }
        }

        // 2. If still no link found (invalid sv, or ep not found in sv, or no sv provided)
        if (!activeEpisodeLink && ep) {
            // Try to find the episode by slug across all servers (FIRST MATCH)
            for (const server of episodes) {
                const found = server.server_data.find(e => e.slug === ep);
                if (found) {
                    activeEpisodeLink = found.link_embed;
                    break;
                }
            }
        }
        // 3. Absolute fallback to first episode of first server
        if (!activeEpisodeLink && episodes?.[0]?.server_data?.[0]) {
            activeEpisodeLink = episodes[0].server_data[0].link_embed || '';
        }
    }

    return (
        <>
            <div id='wrapper' className='makeup wrapper-watch'>
                <div className='watch-player'>
                    <div className='wp-bread line-center'>
                        <Link className='btn btn-circle btn-outline me-2' href={`/phim/${movie.slug}`}>
                            <ArrowLeft />
                        </Link>
                        <h2 className='heading-sm page-name !mb-0'>Xem phim {movie.name}</h2>
                    </div>
                    <div className='player-ratio'>
                        <div className='aspect-video'>
                            <iframe
                                className='h-full w-full'
                                src={activeEpisodeLink || undefined}
                                allowFullScreen
                            />
                        </div>
                        <div className='line-center player-control'>
                            <div className='line-center control-items'>
                                <div className='item item-like'>
                                    <div className='inc-icon icon-12'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'>
                                            <g clipPath='url(#clip0_49_76)'>
                                                <path
                                                    d='M10 18.1432L1.55692 9.82794C0.689275 8.97929 0.147406 7.85276 0.0259811 6.64517C-0.0954433 5.43759 0.211298 4.22573 0.892612 3.22133C4.99987 -2.24739 10 4.10278 10 4.10278C10 4.10278 15.0001 -2.24739 19.1074 3.22133C19.7887 4.22573 20.0954 5.43759 19.974 6.64517C19.8526 7.85276 19.3107 8.97929 18.4431 9.82794L10 18.1432Z'
                                                    fill='currentColor'></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <span>Yêu thích</span>
                                </div>
                                <div className='dropdown'>
                                    <div>
                                        <div className='item-playlist'>
                                            <div className='item'>
                                                <div className='inc-icon icon-12'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='100'
                                                        height='100'
                                                        viewBox='0 0 100 100'
                                                        fill='none'>
                                                        <path
                                                            d='M89.7273 41.6365H58.3635V10.2727C58.3635 6.81018 55.5534 4 52.0908 4H47.9092C44.4466 4 41.6365 6.81018 41.6365 10.2727V41.6365H10.2727C6.81018 41.6365 4 44.4466 4 47.9092V52.0908C4 55.5534 6.81018 58.3635 10.2727 58.3635H41.6365V89.7273C41.6365 93.1898 44.4466 96 47.9092 96H52.0908C55.5534 96 58.3635 93.1898 58.3635 89.7273V58.3635H89.7273C93.1898 58.3635 96 55.5534 96 52.0908V47.9092C96 44.4466 93.1898 41.6365 89.7273 41.6365Z'
                                                            fill='currentColor'></path>
                                                    </svg>
                                                </div>
                                                <span>Thêm vào</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <FocusModButton />
                                <ShareAction variant='watch' />
                                <a className='item item-w2g' href={`/xem-chung/tao-phong/${movie.slug}`}>
                                    <div className='inc-icon icon-14'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='512'
                                            height='512'
                                            viewBox='0 0 512 512'
                                            fill='none'
                                            className='mdl-js'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M55.5454 244.888C55.5454 191.748 76.6647 140.785 114.257 103.21C151.85 65.6346 202.836 44.5251 256 44.5251C309.163 44.5251 360.149 65.6346 397.744 103.21C435.335 140.785 456.454 191.748 456.454 244.888C456.49 271.204 451.323 297.27 441.247 321.584C431.173 345.898 416.388 367.981 397.744 386.567C395.616 388.62 393.919 391.075 392.752 393.792C391.585 396.508 390.97 399.429 390.946 402.385C390.919 405.342 391.483 408.274 392.603 411.01C393.723 413.744 395.376 416.231 397.467 418.322C399.559 420.412 402.044 422.064 404.782 423.184C407.519 424.304 410.452 424.867 413.41 424.84C416.368 424.816 419.29 424.201 422.007 423.035C424.725 421.868 427.184 420.172 429.237 418.045C452.018 395.328 470.085 368.338 482.4 338.622C494.717 308.907 501.035 277.053 501 244.888C501 109.643 391.307 0 256 0C120.693 0 11 109.643 11 244.888C11 312.498 38.44 373.765 82.7627 418.045C86.9633 422.1 92.5894 424.344 98.4293 424.293C104.269 424.244 109.855 421.902 113.985 417.774C118.115 413.646 120.457 408.063 120.508 402.225C120.558 396.387 118.314 390.764 114.256 386.567C95.6118 367.984 80.8265 345.9 70.7508 321.584C60.6751 297.27 55.5076 271.206 55.5454 244.888ZM144.636 244.888C144.64 226.583 149.159 208.563 157.794 192.422C166.428 176.28 178.912 162.516 194.139 152.349C209.367 142.181 226.867 135.924 245.091 134.131C263.317 132.338 281.7 135.065 298.619 142.07C315.537 149.075 330.467 160.142 342.084 174.291C353.701 188.44 361.648 205.235 365.223 223.186C368.796 241.139 367.885 259.694 362.57 277.211C357.256 294.728 347.703 310.664 334.756 323.608C330.698 327.807 328.453 333.431 328.504 339.268C328.556 345.103 330.899 350.687 335.028 354.815C339.157 358.942 344.743 361.285 350.583 361.336C356.423 361.387 362.049 359.143 366.25 355.086C388.053 333.293 402.9 305.525 408.913 275.296C414.929 245.066 411.84 213.733 400.04 185.259C388.24 156.784 368.254 132.446 342.616 115.324C316.978 98.2006 286.834 89.0614 256 89.0614C225.166 89.0614 195.022 98.2006 169.383 115.324C143.744 132.446 123.761 156.784 111.960 185.259C100.159 213.733 97.0709 245.066 103.085 275.296C109.1 305.525 123.947 333.293 145.75 355.086C147.805 357.213 150.262 358.909 152.980 360.076C155.697 361.242 158.620 361.857 161.577 361.883C164.534 361.908 167.467 361.345 170.204 360.225C172.942 359.107 175.428 357.453 177.520 355.362C179.611 353.272 181.265 350.787 182.385 348.051C183.504 345.315 184.068 342.383 184.042 339.428C184.017 336.472 183.402 333.551 182.235 330.835C181.068 328.119 179.371 325.661 177.244 323.608C166.884 313.284 158.670 301.013 153.074 287.503C147.478 273.994 144.610 259.509 144.636 244.888ZM311.682 244.888C311.682 259.649 305.815 273.804 295.374 284.241C284.930 294.681 270.767 300.543 256 300.543C241.233 300.543 227.070 294.681 216.626 284.241C206.185 273.804 200.318 259.649 200.318 244.888C200.318 230.128 206.185 215.970 216.626 205.533C227.070 195.095 241.233 189.231 256 189.231C270.767 189.231 284.930 195.095 295.374 205.533C305.815 215.970 311.682 230.128 311.682 244.888ZM204.171 367.198C203.706 360.109 204.701 353 207.095 346.312C209.490 339.622 213.232 333.495 218.090 328.312C222.947 323.127 228.821 318.993 235.340 316.167C241.861 313.342 248.893 311.884 256 311.884C263.107 311.884 270.139 313.342 276.660 316.167C283.179 318.993 289.053 323.127 293.910 328.312C298.768 333.495 302.510 339.622 304.904 346.312C307.298 353 308.294 360.109 307.829 367.198L300.657 470.407C299.859 481.699 294.806 492.272 286.520 499.989C278.233 507.708 267.328 512 256 512C244.672 512 233.767 507.708 225.480 499.989C217.194 492.272 212.140 481.699 211.343 470.407L204.171 367.198Z'
                                                fill='#AAAAAA'
                                            />
                                        </svg>
                                    </div>
                                    <span>Xem chung</span>
                                </a>
                                <div className='flex-grow-1'></div>
                                <div className='item item-report'>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <svg
                                            width='16'
                                            height='16'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            style={{ display: 'inline', verticalAlign: 'middle' }}>
                                            <path
                                                d='M4 22h16M7 22V4a2 2 0 0 1 2-2h2.5a2 2 0 0 1 1.6.8l5.5 7.4a2 2 0 0 1 0 2.4l-5.5 7.4a2 2 0 0 1-1.6.8H7'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        <span style={{ marginLeft: 4 }}>Báo lỗi</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <WatchContainer movie={movie} episodes={episodes} />
            </div>
        </>
    );
}
