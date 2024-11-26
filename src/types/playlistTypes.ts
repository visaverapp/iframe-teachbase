import { Video } from './videosTypes';

export interface Category {
  image: string | null;
  name: CategoryName;
  publicId: string;
}

export type CategoryName =
  | 'work'
  | 'languages'
  | 'music'
  | 'education'
  | 'recipes'
  | 'cinema'
  | 'psychology'
  | 'humor'
  | 'sport'
  | 'hobby'
  | 'children';

export type PrivacyType = 'public' | 'private';

export type PlaylistIdType = string | number;

interface Owner {
  publicId: string;
  username: string;
  avatar: string;
}

export interface Playlist {
  availabilityStatus: 'active' | 'bunned';
  category: Category;
  description: string;
  listAiSuggestedVideoPks: string[];
  owner: Owner;
  privacyType: 'public' | 'private';
  status: 'active' | 'deleted' | 'hidden';
  publicId: string;
  purpose: string;
  title: string;
  videos: VideoInPlaylist[];
}

export type VideoInPlaylist = Pick<Video, 'publicId' | 'title' | 'thumbnailUrl'> & { startsFrom?: number };

export interface PlaylistMovie {
  playlist: PlaylistIdType;
  movies: number[];
  // videos: number[];
}

type Description = (string | [])[];

export interface FullSearchResponse {
  playlist: string;
  querywas: string;
  response: VideoWithFragments[];
}
export interface VideoWithFragments {
  publicId: string;
  title: string;
  videoId: string;
  startsFrom: number;
  created: string;
  thumbnailUrl: string;
  originLink: string;
  score: number;
  description: Description[];
  cues: Cue[];
}

export interface Cue {
  timestampLink: string;
  image: string;
  durationS: number;
  content: string;
}
