import { create } from "zustand";

const useStreamStore = create((set) => ({
  season: 1,
  episode: 1,
  server: import.meta.env.VITE_APP_STREAM_SERVER1,

  setSeason: (newSeason) =>
    set(() => ({
      season: newSeason,
      episode: 1, 
    })),

  setEpisode: (newEpisode) =>
    set(() => ({
      episode: newEpisode,
    })),

  setServer: (newServer) =>
    set(() => ({
      server: newServer,
    })),
}));

export default useStreamStore;
