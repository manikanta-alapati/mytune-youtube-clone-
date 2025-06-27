import { create } from "zustand";
import { Song } from "@/data/albums";

interface PlayerState {
  playlist: Song[];
  currentSong: Song | null;
  setPlaylist: (songs: Song[]) => void;
  playSong: (song: Song) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  playlist: [],
  currentSong: null,
  setPlaylist: (songs) => set({ playlist: songs }),
  playSong: (song) => set({ currentSong: song }),
}));
