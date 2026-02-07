export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface TMDB {
  type: string;
  id: string;
  season?: number;
  vote_average: number;
  vote_count: number;
}

export interface EpisodeData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Server {
  server_name: string;
  server_data: EpisodeData[];
}

export interface MovieItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  content?: string;
  year: number;
  time?: string;
  episode_current?: string;
  quality?: string;
  lang?: string;
  category?: Category[];
  country?: Country[];
  tmdb?: TMDB;
  type?: string;
  status?: string;
  sub_docquyen?: boolean;
  chieurap?: boolean;
  view?: number;
}

export interface MovieDetail extends MovieItem {
  status: string;
  trailer_url: string;
  episode_total: string;
  notify: string;
  showtimes: string;
  view: number;
  actor: string[];
  director: string[];
  country: Country[];
  episodes: Server[];
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface MovieListResponse {
  status: string;
  data: {
    items: MovieItem[];
    params: {
      pagination: Pagination;
    };
  };
}

export interface MovieDetailResponse {
  status: boolean;
  msg: string;
  movie: MovieDetail;
  episodes: Server[];
}

// Additional helper types for different API endpoints
export interface CategoryListResponse {
  status: string;
  data: {
    items: Category[];
  };
}

export interface CountryListResponse {
  status: string;
  data: {
    items: Country[];
  };
}
