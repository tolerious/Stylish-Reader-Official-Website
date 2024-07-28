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

export enum PlayerState {
  NotStarted = -1,
  Ended = 0,
  Playing = 1,
  Paused = 2,
  Buffering = 3,
  Inserted = 5
}
