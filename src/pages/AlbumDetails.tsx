
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import SongList from "@/components/SongList";
import VideoPlayer from "@/components/VideoPlayer";
import { Album, Song, getAlbumById } from "@/data/albums";
import { ArrowLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const AlbumDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [album, setAlbum] = useState<Album | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentYoutubeId, setCurrentYoutubeId] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundAlbum = getAlbumById(id);
      if (foundAlbum) {
        setAlbum(foundAlbum);
        
        // Check if we have a songId in the URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const songId = searchParams.get('songId');
        
        if (songId) {
          // Find the specific song if songId is provided
          const song = foundAlbum.songs.find(s => s.id === songId);
          if (song) {
            setCurrentSong(song);
            setCurrentYoutubeId(song.youtubeId);
          } else {
            // Fallback to first song if specified song not found
            setCurrentSong(foundAlbum.songs[0]);
            setCurrentYoutubeId(foundAlbum.songs[0].youtubeId);
          }
        } else if (!currentSong) {
          // Set the first song as current by default if none is selected
          setCurrentSong(foundAlbum.songs[0]);
          setCurrentYoutubeId(foundAlbum.songs[0].youtubeId);
        }
      } else {
        // Handle album not found
        navigate("/");
      }
    }
  }, [id, navigate, location.search]);
  
  const handleSongSelect = (song: Song, youtubeId?: string) => {
    setCurrentSong(song);
    setCurrentYoutubeId(youtubeId || song.youtubeId);
  };
  
  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };
  
  if (!album) {
    return (
      <div className="min-h-screen bg-yt-black text-white">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-32 h-32 bg-yt-dark-gray rounded-full mb-4"></div>
            <div className="h-6 bg-yt-dark-gray rounded w-48 mb-4"></div>
            <div className="h-4 bg-yt-dark-gray rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yt-black text-white">
      <Header />
      
      <main className="yt-container py-8">
        <Button 
          onClick={() => navigate("/")}
          variant="ghost" 
          className="mb-6 text-white hover:bg-yt-dark-gray"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {currentSong && (
          <section className="mb-10">
            <VideoPlayer 
              song={currentSong} 
              youtubeId={currentYoutubeId} 
            />
          </section>
        )}
        
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {imageError ? (
              <div className="w-48 h-48 bg-yt-dark-gray rounded-lg flex items-center justify-center">
                <Music className="h-12 w-12 text-yt-light-gray" />
              </div>
            ) : (
              <img 
                src={album?.coverImage} 
                alt={album?.title}
                className="w-48 h-48 object-cover rounded-lg shadow-lg" 
                onError={handleImageError}
              />
            )}
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{album?.title}</h1>
              <p className="text-yt-light-gray mb-4">Album by {album?.artist}</p>
              <div className="flex gap-2">
                <Button 
                  className="bg-yt-red hover:bg-red-600"
                  onClick={() => {
                    if (album?.songs.length > 0) {
                      handleSongSelect(album.songs[0]);
                    }
                  }}
                >
                  Play All
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <SongList 
            songs={album?.songs || []} 
            onSongSelect={handleSongSelect}
            currentSongId={currentSong?.id} 
          />
        </section>
      </main>
    </div>
  );
};

export default AlbumDetails;
