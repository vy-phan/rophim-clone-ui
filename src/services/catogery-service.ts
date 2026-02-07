import { Category, MovieListResponse } from "@/types/movie";
import { apiClient } from "./api-client";

export const CatogeryService = {
  /**
   * Lấy danh sách tất cả thể loại
   */
  getAllGenres(): Promise<Category[]> {
    return apiClient.get('/the-loai');
  },

  /**
   * Lấy danh sách phim theo thể loại (API v1)
   */
  getMoviesByGenre(genreSlug: string, params: {
    page?: number;
    sort_field?: string;
    sort_type?: string;
    sort_lang?: string;
    country?: string;
    year?: string | number;
    limit?: number;
  }): Promise<MovieListResponse> {
    return apiClient.get<MovieListResponse>(`/v1/api/the-loai/${genreSlug}`, {
      params: params as any,
    });
  },
};
