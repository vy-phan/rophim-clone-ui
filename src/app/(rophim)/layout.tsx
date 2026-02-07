import MoviePopover from '@/components/movie-popover';
import ScrollToTop from '@/components/rophim/scroll-to-top';

import './global.css';
import Header from './header';
import Footer from './footer';
import './homepage.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div id='app'>
                <Header />
                {children}
                <Footer />
                <MoviePopover />
                <ScrollToTop />
            </div>
            <div className='focus-backdrop'></div>
        </>
    );
}
