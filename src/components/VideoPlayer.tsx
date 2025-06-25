
import { useState, useEffect } from "react";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Song } from "@/data/albums";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  song: Song;
  youtubeId: string;
}

const VideoPlayer = ({ song, youtubeId }: VideoPlayerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      setVolume(0);
    }
  };

  useEffect(() => {
    // Reset scroll position when video changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [youtubeId]);

  return (
    <div className="bg-yt-dark-gray rounded-lg overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&amp;origin=${window.location.origin}&amp;controls=1&amp;rel=0${isMuted ? '&amp;mute=1' : ''}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={song.title}
        ></iframe>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-1">{song.title}</h2>
        <p className="text-yt-light-gray">{song.artist}</p>
        
        <div className="flex items-center gap-4 mt-4">
          <button
            className="text-white hover:text-yt-red transition-colors"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          
          <div className="w-32">
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(vals) => {
                setVolume(vals[0]);
                if (vals[0] > 0 && isMuted) {
                  setIsMuted(false);
                } else if (vals[0] === 0 && !isMuted) {
                  setIsMuted(true);
                }
              }}
              className="cursor-pointer"
            />
          </div>
          
          <button
            className="ml-auto text-white hover:text-yt-red transition-colors flex items-center gap-1"
            onClick={() => window.location.reload()}
            aria-label="Refresh"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
