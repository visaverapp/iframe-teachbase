import {api} from './api';

import type {GetList, QuizApiResponse} from '@/types';
import {VideoWithFragments} from "@/types/playlistTypes";
import {SummaryResponse, Timecode, TimecodesRequest, TimecodesResponse, Video} from "@/types/videosTypes";
import {getSearchParamFromURL} from "@/utils/getSearchParamFromURL";

const PATH = 'videos';

export const videosAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getMovieById: build.query<Video, { id: string }>({
      query: ({id}) => ({
        url: `${PATH}/${id}/`,
        method: 'GET',
      }),
      providesTags: [{type: 'videos', id: 'ONE'}],
    }),

    //получение таймкодов к видео в библиотеке
    getTimecodes: build.query<Timecode[], TimecodesRequest & { hash?: string }>({
      query: ({ videoPublicId, hash }) => ({
        url: `${PATH}/${videoPublicId}/timecodes/`,
        method: 'GET',
        params: { linkHash: hash },
      }),
      transformResponse: (response: TimecodesResponse) =>
        (response.results?.[0]?.data?.timecodes ?? [])
          .filter((obj, index) => {
            return (
              index ===
              response.results?.[0]?.data?.timecodes.findIndex((t) => t.start === obj.start || t.text === obj.text)
            );
          })
          .map((timecode) => ({ ...timecode, startOffsetMs: Math.round(Number(timecode.start)) }))
          .sort((a, b) => a.startOffsetMs - b.startOffsetMs),
    }),

    //получение конспекта к видео в библиотеке
    getDocs: build.query<{ pdfFile: string; markdown: string | null }, TimecodesRequest & { hash?: string }>({
      query: ({ videoPublicId, hash }) => ({
        url: `${PATH}/${videoPublicId}/summaries/`,
        method: 'GET',
        params: { linkHash: hash },
      }),
      transformResponse: (response: SummaryResponse) => {
        const result = response.results[0];
        return {
          pdfFile: result.pdfFile,
          markdown: result.markdown,
        };
      },
    }),

    //получение квизов к видео в библиотеке
    getVideoAllQuizzes: build.query<QuizApiResponse, TimecodesRequest & { hash?: string }>({
      query: ({ videoPublicId = '', hash }) => ({
        url: `${PATH}/${videoPublicId}/quizzes/`,
        method: 'GET',
        params: { linkHash: hash },
      }),
      providesTags: (_, __, { videoPublicId }) => [{ type: 'quiz', id: videoPublicId }],
      transformResponse: (response: GetList<QuizApiResponse>) => response.results[0],
    }),

    getFullSearchInVideo: build.query<VideoWithFragments[], Pick<Video, 'videoId'> & { query: string }>({
      query: ({ videoId, query }) => ({
        url: `${PATH}/${videoId}/full_search/`,
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


  }),
});

export const {
  useGetMovieByIdQuery,
  useLazyGetDocsQuery,
  useGetDocsQuery,
  useGetVideoAllQuizzesQuery,
  useGetTimecodesQuery,
} = videosAPI;
