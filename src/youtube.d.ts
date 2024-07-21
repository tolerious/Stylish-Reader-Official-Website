declare module YT {
  // export interface Player {}
  enum PlayerState {
    PLAYING = 1
  }

  interface PlayerOptions {
    height: string;
    width: string;
    videoId: string;
    events: {
      onReady: (event: Event) => void;
      onStateChange: (event: Event) => void;
    };
  }
  class Player {
    constructor(id: string, options: PlayerOptions);
    getCurrentTime(): number;
    videoTitle: string;
  }
}
