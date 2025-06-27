import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AlbumCard from "@/components/AlbumCard";
import { albums } from "@/data/albums";
import { Helmet } from "react-helmet";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const trendingAlbums = albums.filter((album) =>
    ["rrr", "kgf", "pushpa"].includes(album.id)
  );

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.songs.some((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredSongs = albums
    .flatMap(album => album.songs.map(song => ({ ...song, albumId: album.id, albumCover: album.coverImage })))
    .filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSongClick = (albumId: string, songId: string) => {
    navigate(`/album/${albumId}?songId=${songId}`);
  };

  return (
    <div className="min-h-screen bg-yt-black text-white">
      <Helmet>
        <title>MyTune – Multilingual Music </title>
        <meta property="og:title" content="MyTune – Multilingual Music App" />
        <meta property="og:description" content="Switch between languages for your favorite movie songs. Built with React + YouTube + AI." />
        <meta property="og:image" content="https://mytune-youtube-clone.vercel.app/coverImages/header.png" />
        <meta property="og:url" content="https://mytune-youtube-clone.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="yt-container py-8">
        {searchQuery ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Search Results – Albums</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-6">Search Results – Songs</h2>
              <div className="bg-yt-dark-gray/30 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSongs.map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-3 p-2 hover:bg-yt-dark-gray rounded-md transition-colors cursor-pointer"
                      onClick={() => handleSongClick(song.albumId, song.id)}
                    >
                      <div className="text-yt-light-gray w-6 text-center">{index + 1}</div>
                      <img
                        src={song.albumCover}
                        alt={song.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{song.title}</h3>
                        <p className="text-yt-light-gray text-sm truncate">{song.artist}</p>
                      </div>
                      <div className="text-yt-light-gray text-sm">{song.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Featured Soundtracks</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Trending Albums</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-gradient-to-r from-yt-purple/20 to-yt-purple/5 rounded-lg p-6 flex gap-4 items-center hover:scale-[1.02] transition-transform cursor-pointer"
                    onClick={() =>
                      navigate(`/album/${album.id}?songId=${album.songs[0]?.id}`)
                    }
                  >
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-bold">{album.title}</h3>
                      <p className="text-yt-light-gray text-sm mb-2">Soundtrack</p>
                      <button className="px-3 py-1 bg-yt-red text-white text-sm rounded-full">
                        Listen Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Top Songs</h2>
              <div className="bg-yt-dark-gray/30 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {albums.flatMap(album => album.songs.slice(0, 1)).map((song, index) => {
                    const album = albums.find(album => album.songs.some(s => s.id === song.id));
                    return (
                      <div
                        key={song.id}
                        className="flex items-center gap-3 p-2 hover:bg-yt-dark-gray rounded-md transition-colors cursor-pointer"
                        onClick={() => handleSongClick(album?.id || "", song.id)}
                      >
                        <div className="text-yt-light-gray w-6 text-center">{index + 1}</div>
                        <img
                          src={album?.coverImage}
                          alt={song.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{song.title}</h3>
                          <p className="text-yt-light-gray text-sm truncate">{song.artist}</p>
                        </div>
                        <div className="text-yt-light-gray text-sm">{song.duration}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
