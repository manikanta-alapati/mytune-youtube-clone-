
import { Link } from "react-router-dom";
import { Album } from "@/data/albums";
import { Play, Music } from "lucide-react";

interface AlbumCardProps {
  album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  // Function to handle missing images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg"; // Default placeholder image from public folder
    e.currentTarget.classList.add("bg-yt-dark-gray");
  };

  return (
    <Link to={`/album/${album.id}`} className="group">
      <div className="yt-card hover:scale-105 transition-all duration-300 relative">
        <div className="relative overflow-hidden rounded-lg aspect-square">
          <img
            src={album.coverImage}
            alt={album.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="bg-yt-red p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white truncate">{album.title}</h3>
          <p className="text-yt-light-gray text-sm truncate">{album.artist}</p>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
