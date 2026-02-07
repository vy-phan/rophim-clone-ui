import { apiClient } from './api-client';
import { MovieDetailResponse, MovieListResponse } from '@/types/movie';

export const MovieService = {
  /**
   * Lấy danh sách phim mới cập nhật
   * @param page Trang hiện tại
   */
  getLatestMovies(page: number = 1): Promise<MovieListResponse> {
    return apiClient.get<MovieListResponse>('/danh-sach/phim-moi-cap-nhat', {
      params: { page },
    });
  },

  /**
   * Lấy chi tiết phim qua slug
   * @param slug Slug của phim
   */
  getMovieDetail(slug: string): Promise<MovieDetailResponse> {
    return apiClient.get<MovieDetailResponse>(`/phim/${slug}`);
  },

  /**
   * Tìm kiếm phim
   * @param keyword Từ khóa tìm kiếm
   * @param limit Số lượng kết quả
   */
  searchMovies(keyword: string, limit: number = 10): Promise<MovieListResponse> {
    return apiClient.get<MovieListResponse>('/v1/api/tim-kiem', {
      params: { keyword, limit },
    });
  },

  /**
   * Lấy danh sách phim theo danh mục (Sử dụng API v1 cho phân loại tốt hơn)
   */
  getMoviesByCategory(categorySlug: string, page: number = 1): Promise<MovieListResponse> {
    return apiClient.get<MovieListResponse>(`/v1/api/danh-muc/${categorySlug}`, {
      params: { page },
    });
  },
  /**
   * Lấy danh sách phim theo bộ lọc (API v1)
   */
  getMoviesByFilter(typeList: string, params: {
    page?: number;
    sort_field?: string;
    sort_type?: string;
    sort_lang?: string;
    category?: string;
    country?: string;
    year?: string | number;
    limit?: number;
  }): Promise<MovieListResponse> {
    return apiClient.get<MovieListResponse>(`/v1/api/danh-sach/${typeList}`, {
      params: params as any,
    });
  },
};
