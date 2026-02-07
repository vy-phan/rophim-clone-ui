'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="main-footer">
            {/* Background Watermark Logo */}
            <div className="footer-watermark">
                <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 20 C 30 20, 20 30, 20 50 C 20 70, 30 80, 50 80 C 70 80, 80 70, 80 50 C 80 30, 70 20, 50 20 Z M40 35 L70 50 L40 65 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            <div className="footer-container">
                {/* Patriotic Badge */}
                <div className="patriotic-badge">
                    <div className="patriotic-flag-icon">
                        <img src="/images/vn_flag.svg" alt="VN Flag" />
                    </div>
                    <span>Hoàng Sa & Trường Sa là của Việt Nam!</span>
                </div>

                <div className="footer-top-row">
                    {/* Logo */}
                    <div className="footer-logo-box">
                        <Image src="/images/rophim-logo.svg" alt="RoPhim Logo" width={180} height={60} />
                    </div>

                    {/* Social Icons */}
                    <div className="social-icons-group">
                        <a href="#" className="social-item"><Send size={18} /></a>
                        <a href="#" className="social-item"><DiscordIcon /></a>
                        <a href="#" className="social-item"><TwitterIcon /></a>
                        <a href="#" className="social-item"><Facebook size={18} /></a>
                        <a href="#" className="social-item"><TikTokIcon /></a>
                        <a href="#" className="social-item"><Youtube size={18} /></a>
                        <a href="#" className="social-item"><ThreadsIcon /></a>
                        <a href="#" className="social-item"><Instagram size={18} /></a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="footer-nav-links">
                    <Link href="/faq">Hỏi-Đáp</Link>
                    <Link href="/privacy">Chính sách bảo mật</Link>
                    <Link href="/terms">Điều khoản sử dụng</Link>
                    <Link href="/about">Giới thiệu</Link>
                    <Link href="/contact">Liên hệ</Link>
                </div>

                {/* Description Text */}
                <div className="footer-desc-text">
                    RoPhim - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ... đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
                </div>

                {/* Copyright */}
                <div className="footer-copyright-text">
                    © 2025 RoPhim
                </div>
            </div>
        </footer>
    );
};

// Custom SVG Icons to match brand designs
const DiscordIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01a13.921 13.921 0 0 0 12.01 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
);

const TwitterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TikTokIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-4.17.07-8.33.07-12.5z" />
    </svg>
);

const ThreadsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.821 10.507c.046-.35.07-.71.07-1.077 0-2.327-1.481-4.043-3.896-4.043-2.4 0-3.9 1.716-3.9 4.043 0 .367.025.728.071 1.077h7.655zm-7.653 1.986c.153 2.015 1.611 3.193 3.753 3.193 1.258 0 2.22-.303 2.837-.872.247-.225.434-.485.565-.776h2.153c-.313 1.018-.944 1.833-1.892 2.445-1.026.666-2.316 1.023-3.654 1.023-4.108 0-6.195-2.288-6.195-5.975 0-3.614 2.115-5.975 6.195-5.975 4.043 0 6.136 2.476 6.136 5.864 0 .428-.033.858-.098 1.282h-9.8zm2.846-9.15c-6.845 0-11.458 4.613-11.458 11.458s4.613 11.458 11.458 11.458 11.458-4.613 11.458-11.458-4.613-11.458-11.458-11.458zm0 20.916c-5.26 0-9.458-4.198-9.458-9.458s4.198-9.458 9.458-9.458 9.458 4.198 9.458 9.458-4.198 9.458-9.458 9.458z" />
    </svg>
);

export default Footer;
