export interface CreateVideoType {
  originLink: string;
}

export type StatusType = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE' | 'FAILED';

export interface Video {
  publicId: string;
  title: string;
  videoId: string;
  source: string;
  originLink: string;
  startsFrom: number;
  description: string;
  thumbnailUrl: string;
  purpose: string;
  quizIds: string[];
  transcriptionStatus: StatusType;
  timecodesStatus: StatusType;
  summaryStatus: StatusType;
  quizzStatus: StatusType;
}

export interface TimecodesResponse {
  count: number;
  next: object;
  previous: object;
  results: Results[];
}

export type TimecodesRequest = {
  playlistId?: string;
  videoPublicId: string;
  hash?: string;
};

export type TransformedTimecodesResponse = {
  timecodes: Timecode[];
  publicId: string;
};

export type SummaryResponse = {
  count: number;
  next: string;
  previous: string;
  results: SummaryResponseResults[];
};

export type SummaryResponseResults = {
  markdown: string;
  pdfFile: string;
  publicId: string;
};

export type Results = {
  data: ResultsData;
  publicId: string;
};

type ResultsData = {
  timecodes: Timecode[];
};

export interface Timecode {
  start: number | string;
  text: string;
  title: string;
}

export type SuggestVideoType = Pick<Video, 'title' | 'thumbnailUrl' | 'publicId'>;

export interface PersonalMovie extends Video {
  uploader: {
    id: number;
  };
}

export type CreateMoviesType = Omit<Video, 'id' | 'updated_at'>;

export interface SearchAIMovie extends Omit<PersonalMovie, 'uploader'> {
  score: number;
  timestamp_link: string;
}

export interface SearchAI {
  info: {
    count: number;
    pages: number;
    next: null | number;
    prev: null | number;
  };
  result: SearchAIMovie[];
}

export interface SearchAIBack {
  count: number;
  next: null | string;
  prev: null | string;
  result: SearchAIMovie[];
}
