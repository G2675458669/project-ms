export interface Movie {
  id: string;
  title: string;
  titleZh: string;
  genre: string[];
  poster: string;
  overview: string;
  releaseDate: string; // YYYY-MM-DD
}

export type MarkStatus = 'want_to_watch' | 'watching';

export interface UserMark {
  movieId: string;
  status: MarkStatus;
}

export type ViewType = 'home' | 'profile';
