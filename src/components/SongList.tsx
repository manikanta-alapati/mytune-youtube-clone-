import { useState } from "react";
import { Play, Clock } from "lucide-react";
import { Song } from "@/data/albums";
import LanguageSwitcher from "./LanguageSwitcher";

interface SongListProps {
  songs: Song[];
  onSongSelect: (song: Song, youtubeId?: string) => void;
  currentSongId?: string;
}

const SongList = ({ songs, onSongSelect, currentSongId }: SongListProps) => {
  const [currentLanguages, setCurrentLanguages] = useState<Record<string, string>>(
    songs.reduce((acc, song) => {
      acc[song.id] = song.languages[0] || "Unknown";
      return acc;
    }, {} as Record<string, string>)
  );

  const handleLanguageSwitch = (songId: string, language: string, youtubeId?: string) => {
    setCurrentLanguages(prev => ({
      ...prev,
      [songId]: language
    }));

    const song = songs.find(s => s.id === songId);
    if (song) {
      onSongSelect(song, youtubeId);
    }
  };

  return (
    <div className="bg-yt-black rounded-lg overflow-hidden border border-yt-dark-gray">
      {/* Header */}
      <div className="grid grid-cols-12 py-2 px-4 border-b border-yt-dark-gray text-yt-light-gray text-sm font-medium">
        <div className="col-span-1">#</div>
        <div className="col-span-6">TITLE</div>
        <div className="col-span-5 flex justify-between items-center">
          <span>LANGUAGE</span>
          <Clock className="h-4 w-4" />
        </div>
      </div>

      {/* Songs */}
      <div className="divide-y divide-yt-dark-gray">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className={`grid grid-cols-12 py-3 px-4 items-center hover:bg-yt-dark-gray group ${
              currentSongId === song.id ? "bg-yt-dark-gray/50" : ""
            }`}
          >
            {/* Number or playing bars */}
            <div className="col-span-1 text-yt-light-gray group-hover:text-white">
              {currentSongId === song.id ? (
                <div className="w-5 h-5 animate-pulse flex items-center justify-center">
                  <span className="bg-yt-red w-1 h-4 mx-0.5 animate-pulse-scale"></span>
                  <span className="bg-yt-red w-1 h-3 mx-0.5 animate-pulse-scale animation-delay-200"></span>
                  <span className="bg-yt-red w-1 h-5 mx-0.5 animate-pulse-scale animation-delay-400"></span>
                </div>
              ) : (
                <div className="relative">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button
                    className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    onClick={() => onSongSelect(song)}
                    aria-label={`Play ${song.title}`}
                  >
                    <Play className="h-4 w-4 fill-white text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Title + artist */}
            <div className="col-span-6">
              <h3 className="font-medium text-white truncate">{song.title}</h3>
              <p className="text-yt-light-gray text-sm truncate">{song.artist}</p>
            </div>

           {/* Language + duration responsive layout */}
           <div className="col-span-5 flex items-center justify-between gap-2">
  <LanguageSwitcher
    song={song}
    currentLanguage={currentLanguages[song.id]}
    onLanguageSwitch={(language, youtubeId) =>
      handleLanguageSwitch(song.id, language, youtubeId)
    }
  />
<span className="text-yt-light-gray text-sm pr-1 hidden md:inline">{song.duration}</span>
</div>



          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
