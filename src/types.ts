export interface Video {
  _id: string;
  title: string;
  createdAt: string;
  youtubeVideoId: string;
}

export interface Segment {
  utf8: string;
}

export interface Transcript {
  dDurationMs: number;
  segs: Segment[];
  tStartMs: number;
}
