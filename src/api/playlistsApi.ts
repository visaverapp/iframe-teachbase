import { api } from './api';

import type {
  GetList,
  BaseParams,
  PlaylistParams,
} from '@/types';
import {getSearchParamFromURL} from "@/utils/getSearchParamFromURL";
import {
  Playlist,
  VideoWithFragments
} from "@/types/playlistTypes";
import {SuggestVideoType} from "@/types/videosTypes";


const path = 'playlists';

export const playlistsAPI = api.injectEndpoints({
  endpoints: (build) => ({

    getPlaylistById: build.query<Playlist, { id: string } & { params?: PlaylistParams }>({
      query: ({ id, params }) => ({
        url: `${path}/${id}/`,
        method: 'GET',
        params,
      }),
      providesTags: (result, _, { id }) =>
          result
              ? [
                { type: 'playlist' as const, id },
                { type: 'playlist', id: 'one' },
              ]
              : [{ type: 'playlists', id: 'one' }],
    }),

    //-----------------------------------------------------------------------------------------------------------------------------------
    getMyPlaylists: build.query<GetList<Playlist>, { params?: BaseParams }>({
      query: ({ params }) => ({
        url: `${path}/my/`,
        method: 'GET',
        params,
      }),
      // transformResponse: (data: GetList<PersonalPlaylist>) => data.results,
      providesTags: ['personal_playlists'],
    }),

    getFullSearchInPlaylist: build.query<VideoWithFragments[], Pick<Playlist, 'publicId'> & { query: string }>({
      query: ({ publicId, query }) => ({
        url: `${path}/${publicId}/full_search/`,
        method: 'GET',
        params: { query },
      }),

      transformResponse: (data: VideoWithFragments[]) => {
        const dataWithCues = data.filter((video) => video.cues.length > 0);
        return dataWithCues.map((video) => ({
          ...video,
          cues: video.cues.map((cue) => ({ ...cue, timestampLink: getSearchParamFromURL(cue.timestampLink, 't') })),
        }));
      },
    }),

    getSuggestionVideos: build.query<
        SuggestVideoType[],
        Pick<Playlist, 'publicId'> & { previouslySuggestedVideos: string[] }
    >({
      query: ({ publicId, previouslySuggestedVideos }) => ({
        url: `${path}/${publicId}/suggest-video/`,
        method: 'POST',
        body: { previouslySuggestedVideos },
      }),
      keepUnusedDataFor: 9999999999,
    }),

  }),
});

export const {useGetFullSearchInPlaylistQuery, useGetPlaylistByIdQuery } = playlistsAPI;
