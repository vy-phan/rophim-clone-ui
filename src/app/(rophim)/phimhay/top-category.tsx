'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/movie';

interface TopCategoryProps {
    genres: Category[];
}

const cardColors = [
    '#3b59d9', // Blue
    '#1d8a70', // Teal/Green
    '#826ab4', // Purple
    '#cc8266', // Copper/Orange
    '#a83d3d', // Red/Rust
    '#6e77a1', // Greyish Blue
];

export default function TopCategory({ genres = [] }: TopCategoryProps) {
    // Show top 6 genres and a "more" card
    const displayGenres = genres.slice(0, 6);
    const moreCount = genres.length > 6 ? genres.length - 6 : 1; // Fallback to +1 if not enough but we want the card

    return (
        <section className="top-category-section wide">
            <h2 className="category-name">Bạn đang quan tâm gì?</h2>
            <div className="category-container">
                <div className="category-grid">
                    {displayGenres.map((genre, index) => (
                        <Link 
                            key={genre._id} 
                            href={`/the-loai/${genre.slug}`}
                            className="category-card"
                            style={{ backgroundColor: cardColors[index % cardColors.length] }}
                        >
                            <div className="card-main">
                                <h3 className="genre-title">{genre.name}</h3>
                                <div className="card-footer">
                                    <span>Xem chủ đề</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m9 18 6-6-6-6"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                    
                    <Link href="/the-loai" className="category-card more-card">
                        <div className="card-main">
                            <h3 className="genre-title">+{moreCount} chủ đề</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
