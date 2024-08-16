declare module YT {
  // export interface Player {}
  enum PlayerState {
    PLAYING = 1
  }

  interface PlayerVars {
    controls?: 0 | 1;
    modestbranding?: 0 | 1;
    iv_load_policy?: number;
  }

  interface PlayerOptions {
    height: string;
    width: string;
    videoId: string;
    border: string;
    playerVars?: PlayerVars;
    events: {
      onReady: (event: Event) => void;
      onStateChange: (event: Event) => void;
    };
  }
  class Player {
    constructor(id: string, options: PlayerOptions);
    getCurrentTime(): number;
    videoTitle: string;
    playVideo(): void;
    pauseVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
  }
}
