export interface AudioGuide {
  id: string;
  locationId: string;
  title: string;
  description: string;
  duration: number; // in seconds
  audioUrl: string;
  transcript: string;
  language: string;
  narrator: string;
  points: number;
  completed: boolean;
}

export interface AudioTrack {
  id: string;
  title: string;
  duration: number;
  audioUrl: string;
  isPlaying: boolean;
  currentTime: number;
}

export interface AudioPlaylist {
  id: string;
  locationId: string;
  title: string;
  tracks: AudioTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  totalDuration: number;
}
