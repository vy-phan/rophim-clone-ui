'use client';

import React, { useEffect, useState, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import logo from './assets/logo.svg';
import { ChevronDown, Search, User, X, Loader2 } from 'lucide-react';
import { MovieService } from '@/services/movie-service';
import { MovieItem } from '@/types/movie';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const countries = [
        { name: 'Trung Quốc', slug: 'trung-quoc' },
        { name: 'Thái Lan', slug: 'thai-lan' },
        { name: 'Hồng Kông', slug: 'hong-kong' },
        { name: 'Pháp', slug: 'phap' },
        { name: 'Đức', slug: 'duc' },
        { name: 'Hà Lan', slug: 'ha-lan' },
        { name: 'Mexico', slug: 'mexico' },
        { name: 'Thụy Điển', slug: 'thuy-dien' },
        { name: 'Philippines', slug: 'philippines' },
        { name: 'Đan Mạch', slug: 'dan-mach' },
        { name: 'Thụy Sĩ', slug: 'thuy-si' },
        { name: 'Ukraina', slug: 'ukraina' },
        { name: 'Hàn Quốc', slug: 'han-quoc' },
        { name: 'Âu Mỹ', slug: 'au-my' },
        { name: 'Ấn Độ', slug: 'an-do' },
        { name: 'Canada', slug: 'canada' },
        { name: 'Tây Ban Nha', slug: 'tay-ban-nha' },
        { name: 'Indonesia', slug: 'indonesia' },
        { name: 'Ba Lan', slug: 'ba-lan' },
        { name: 'Malaysia', slug: 'malaysia' },
        { name: 'Bồ Đào Nha', slug: 'bo-dao-nha' },
        { name: 'UAE', slug: 'uae' },
        { name: 'Châu Phi', slug: 'chau-phi' },
        { name: 'Ả Rập Xê Út', slug: 'a-rap-xe-ut' },
        { name: 'Nhật Bản', slug: 'nhat-ban' },
        { name: 'Đài Loan', slug: 'dai-loan' },
        { name: 'Anh', slug: 'anh' },
        { name: 'Thổ Nhĩ Kỳ', slug: 'tho-nhi-ky' },
        { name: 'Nga', slug: 'nga' },
        { name: 'Úc', slug: 'uc' },
        { name: 'Brazil', slug: 'brazil' },
        { name: 'Ý', slug: 'y' },
        { name: 'Na Uy', slug: 'na-uy' },
        { name: 'Nam Phi', slug: 'nam-phi' },
        { name: 'Việt Nam', slug: 'viet-nam' },
        { name: 'Quốc Gia Khác', slug: 'quoc-gia-khac' },
    ];

    const categories = [
        { name: 'Hành Động', slug: 'hanh-dong' },
        { name: 'Cổ Trang', slug: 'co-trang' },
        { name: 'Chiến Tranh', slug: 'chien-tranh' },
        { name: 'Viễn Tưởng', slug: 'vien-tuong' },
        { name: 'Kinh Dị', slug: 'kinh-di' },
        { name: 'Tài Liệu', slug: 'tai-lieu' },
        { name: 'Bí Ẩn', slug: 'bi-an' },
        { name: 'Phim 18+', slug: 'phim-18' },
        { name: 'Tình Cảm', slug: 'tinh-cam' },
        { name: 'Tâm Lý', slug: 'tam-ly' },
        { name: 'Thể Thao', slug: 'the-thao' },
        { name: 'Phiêu Lưu', slug: 'phieu-luu' },
        { name: 'Âm Nhạc', slug: 'am-nhac' },
        { name: 'Gia Đình', slug: 'gia-dinh' },
        { name: 'Học Đường', slug: 'hoc-duong' },
        { name: 'Hài Hước', slug: 'hai-huoc' },
        { name: 'Hình Sự', slug: 'hinh-su' },
        { name: 'Võ Thuật', slug: 'vo-thuat' },
        { name: 'Khoa Học', slug: 'khoa-hoc' },
        { name: 'Thần Thoại', slug: 'than-thoai' },
        { name: 'Chính Kịch', slug: 'chinh-kich' },
        { name: 'Kinh Điển', slug: 'kinh-dien' },
        { name: 'Phim Ngắn', slug: 'phim-ngan' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [searchResults, setSearchResults] = useState<MovieItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const res = await MovieService.searchMovies(searchQuery, 6);
                    if (res.status === 'success') {
                        setSearchResults(res.data.items);
                        setShowResults(true);
                    }
                } catch (error) {
                    console.error('Search error:', error);
                    setSearchResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            setShowResults(false);
            router.push(`/tim-kiem?keyword=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen((open) => !open);
        setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen((open) => !open);
        setIsMenuOpen(false);
    };

    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={cn('fly', isFixed && 'fixed', className)}>
            <div className='header-elements'>
                {/* Mobile Menu Toggle */}
                <div className={cn('for-mobile menu-toggle', isMenuOpen && 'toggled')}>
                    <div className='icon-menu' onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {/* Mobile Search Toggle */}
                <div className={cn('for-mobile search-toggle', isSearchOpen && 'toggled')}>
                    <div className='icon-search' onClick={toggleSearch}>
                        <span></span>
                        <span></span>
                        <Search size={18} strokeWidth={2.5} />
                    </div>
                </div>
                {/* Logo */}
                <Link id='logo' title='Rophim' href='/phimhay'>
                    <Image src={logo} alt='RoPhim' width={120} height={40} priority />
                </Link>
                {/* Search Bar */}
                <div id='search' ref={searchRef} className={isSearchOpen ? 'active' : ''}>
                    <form onSubmit={handleSearch} className='search-elements'>
                        <div className='search-icon'>
                            {isLoading ? (
                                <Loader2 size={18} strokeWidth={2.5} className='animate-spin' />
                            ) : (
                                <Search size={18} strokeWidth={2.5} />
                            )}
                        </div>
                        <input
                            id='main-search'
                            className='search-input'
                            placeholder='Tìm kiếm phim'
                            autoComplete='off'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.trim().length >= 2 && setShowResults(true)}
                        />
                        {searchQuery && (
                            <div className='remove-icon' onClick={() => {
                                setSearchQuery('');
                                setSearchResults([]);
                                setShowResults(false);
                            }} style={{ display: 'block' }}>
                                <X size={18} strokeWidth={2.5} />
                            </div>
                        )}
                    </form>

                    {showResults && searchResults.length > 0 && (
                        <div className='search-modal'>
                            <div className='show-group'>
                                <div className='group-title'>Danh sách phim</div>
                                <div className='group-list'>
                                    {searchResults.map((movie) => (
                                        <Link 
                                            key={movie._id} 
                                            href={`/phim/${movie.slug}`} 
                                            className='s-item'
                                            onClick={() => setShowResults(false)}
                                        >
                                            <div className='v-thumbnail'>
                                                <img 
                                                    src={movie.thumb_url.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`} 
                                                    alt={movie.name}
                                                />
                                            </div>
                                            <div className='info'>
                                                <div className='item-title'>{movie.name}</div>
                                                <div className='item-subtitle'>{movie.origin_name}</div>
                                                <div className='item-meta'>
                                                    {movie.year}
                                                    <span className='dot'></span>
                                                    {movie.episode_current || 'Full'}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link 
                                    href={`/tim-kiem?keyword=${encodeURIComponent(searchQuery)}`}
                                    className='view-all'
                                    onClick={() => setShowResults(false)}
                                >
                                    Toàn bộ kết quả
                                </Link>
                            </div>
                        </div>
                    )}

                    {showResults && searchQuery.trim().length >= 2 && searchResults.length === 0 && !isLoading && (
                        <div className='search-modal'>
                            <div className='p-4 text-center text-gray-400 text-sm'>Không tìm thấy phim nào phù hợp</div>
                        </div>
                    )}
                </div>
                {/* Main Navigation and User Section */}
                <div className={cn('el-group', isMenuOpen && 'toggled')}>
                    {/* Main Menu */}
                    <div id='main_menu'>
                        <div className='menu-item'>
                            <Link title='Chủ đề' href='/chu-de'>
                                Chủ Đề
                            </Link>
                        </div>
                        <div className='menu-item menu-item-sub'>
                            <div className='season-dropdown dropdown'>
                                <a>
                                    Thể loại
                                    <ChevronDown size={16} className='ms-2 inline' />
                                </a>
                                <div className='dropdown-menu country-dropdown-menu'>
                                    <div className='category-grid'>
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                href={`/the-loai/${cat.slug}`}
                                                className='dropdown-item country-item'
                                                title={cat.name}>
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='menu-item'>
                            <Link title='Phim lẻ' href='/phim-le'>
                                Phim Lẻ
                            </Link>
                        </div>
                        <div className='menu-item'>
                            <Link title='Phim bộ' href='/phim-bo'>
                                Phim Bộ
                            </Link>
                        </div>
                        <div className='menu-item'>
                            <Link title='Xem Chung' href='/xem-chung'>
                                <span className='new me-2'></span>
                                Xem Chung
                            </Link>
                        </div>
                        <div className='menu-item menu-item-sub'>
                            <div className='season-dropdown dropdown'>
                                <a>
                                    Quốc gia
                                    <ChevronDown size={16} className='ms-2 inline' />
                                </a>
                                <div className='dropdown-menu country-dropdown-menu'>
                                    <div className='country-grid'>
                                        {countries.map((country) => (
                                            <Link
                                                key={country.slug}
                                                href={`/quoc-gia/${country.slug}`}
                                                className='dropdown-item country-item'
                                                title={country.name}>
                                                {country.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='menu-item'>
                            <Link title='Diễn viên' href='/dien-vien'>
                                Diễn Viên
                            </Link>
                        </div>
                        <div className='menu-item'>
                            <Link title='Lịch chiếu' href='/lich-chieu'>
                                Lịch chiếu
                            </Link>
                        </div>
                    </div>
                    <div className='flex-grow-1'></div>
                    {/* App Download */}
                    <div className='app-download'>
                        <div className='dropdown'>
                            <a className='app-download-button'>
                                <div className='inc-icon'>
                                    <svg
                                        id='Pc'
                                        width={24}
                                        height={24}
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M10.9998 16.8992C11.1655 16.8992 11.2998 16.7649 11.2998 16.5992V11.5982C11.2998 9.28322 13.1838 7.39922 15.4998 7.39922H18.7998C18.9238 7.39922 19.0446 7.41106 19.1616 7.43327C19.3745 7.47368 19.5998 7.32682 19.5998 7.11012V6.69922C19.5998 6.67022 19.5968 6.64022 19.5918 6.61222C19.2488 4.66722 17.4468 3.19922 15.4008 3.19922H6.79982C4.42882 3.19922 2.49982 5.12822 2.49982 7.49922V12.5982C2.49982 14.9692 4.42882 16.8992 6.79982 16.8992H8.24282L7.86182 19.2492H5.85982C5.44582 19.2492 5.10982 19.5852 5.10982 19.9992C5.10982 20.4132 5.44582 20.7492 5.85982 20.7492H10.7598C11.1738 20.7492 11.5098 20.4132 11.5098 19.9992C11.5098 19.5852 11.1738 19.2492 10.7598 19.2492H9.38082L9.76182 16.8992H10.9998Z'
                                            fill='currentColor'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M17.1912 18.4564C16.7712 18.4564 16.4302 18.1154 16.4302 17.6954C16.4302 17.2754 16.7712 16.9344 17.1912 16.9344C17.6112 16.9344 17.9522 17.2754 17.9522 17.6954C17.9522 18.1154 17.6112 18.4564 17.1912 18.4564ZM18.8002 8.90039H15.5002C14.0362 8.90039 12.8002 10.1364 12.8002 11.5994V18.0994C12.8002 19.5884 14.0112 20.7994 15.5002 20.7994H18.8002C20.2892 20.7994 21.5002 19.5884 21.5002 18.0994V11.5994C21.5002 10.1364 20.2642 8.90039 18.8002 8.90039Z'
                                            fill='#ffffff'
                                        />
                                    </svg>
                                </div>
                                <div className='text text-light'>
                                    <span>Tải ứng dụng</span>
                                    <strong>RoPhim</strong>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* User Section */}
                    <div id='main_user'>
                        <a className='button-user button-login'>
                            <div className='line-center'>
                                <User size={18} className='ms-1' />
                                <span>Thành viên</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className='mobile-menu-overlay' onClick={toggleMenu}>
                    <div className='mobile-menu-content' onClick={(e) => e.stopPropagation()}>
                        {/* Mobile menu content would go here */}
                    </div>
                </div>
            )}
            {/* Search Modal */}
            {isSearchOpen && (
                <div className='search-modal' onClick={toggleSearch}>
                    <div className='search-modal-content' onClick={(e) => e.stopPropagation()}>
                        {/* Search results would go here */}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
