import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Rổ Phim',
    description: 'Xem phim mới, phim hay, phim Hd online trực tuyến miễn phí trên rophim-ui-fake.vercel.app. Rổ phim, kho phim khổng lồ, phim lồng tiếng, phim vietsub. Cập nhật mỗi ngày.',
    icons: {
        icon: '/logo.svg',
        apple: '/logo.svg'
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body className={`base-load`}>
                <ThemeProvider attribute='class'>
                    {/* <NavigationBar /> */}
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
