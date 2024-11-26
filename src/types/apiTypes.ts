export interface BaseParams {
  pageSize?: number;
  page?: number;
}

export interface PlaylistParams extends BaseParams {
  title?: string;
  description?: string;
  videoDescription?: string;
  videoTitle?: string;
  hash?: string;
}

export interface VideoParams extends BaseParams {
  title?: string;
  description?: string;
}

export interface GetList<T> {
  count: number;
  next: null | number;
  previous: null | number;
  results: T[];
}