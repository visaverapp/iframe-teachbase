import {Cue} from "@/types/playlistTypes";

export interface VideoFragmentCardProps {
  // fragment: VideoWithFragments;
  fragment: Cue;
  goToTime?: (time: number) => void;
  videoPreview?: string | null;
}

export interface PlaylistCardStyleProps {
  bgImage: string | null;
}