

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  youtubeId: string;
  languages: string[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  songs: Song[];
  description?: string; // <- optional to avoid required error
}

export const albums: Album[] = [
  {
    id: "rrr",
    title: "RRR",
    artist: "M.M. Keeravani",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg",
    songs: [
      {
        id: "rrr-1",
        title: "Naatu Naatu",
        artist: "Rahul Sipligunj, Kaala Bhairava",
        duration: "3:34",
        youtubeId: "OsU0CGZoV8E",
        languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"]
      },
      {
        id: "rrr-2",
        title: "Dosti",
        artist: "Hemachandra, M.M. Keeravani",
        duration: "3:50",
        youtubeId: "zv4_PlC9gMg",
        languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"]
      },
      {
        id: "rrr-3",
        title: "Komuram Bheemudo",
        artist: "Kaala Bhairava",
        duration: "3:58",
        youtubeId: "ouKbrNiaPxo",
        languages: ["Telugu", "Hindi", "Tamil","Malayalam", "Kannada"]
      },
      {
        id: "rrr-4",
        title: "Raamam Raaghavam",
        artist: "M.M. Keeravani, Sreeja Burra",
        duration: "4:12",
        youtubeId: "Cn-o7RzUPpU",
        languages: ["Telugu", "Hindi", "Tamil","Malayalam", "Kannada"]
      }
    ]
  },
  {
    id: "baahubali",
    title: "Baahubali: The Beginning",
    artist: "M.M. Keeravani",
    coverImage: "coverImages/Baahubali_The_Beginning_poster.jpg",
    songs: [
      {
        id: "baahubali-1",
        title: "Mamathala Thalli",
        artist: "M.M. Keeravani",
        duration: "4:06",
        youtubeId: "12fcHpwLKl4",
        languages: ["Telugu", "Hindi", "Tamil"]
      },
      {
        id: "baahubali-2",
        title: "Dhivara",
        artist: "Ramya Behara, Deepu",
        duration: "3:45",
        youtubeId: "F67EVY_sg4E",
        languages: ["Telugu", "Hindi", "Tamil"]
      },
      {
        id: "baahubali-3",
        title: "Pacha Bottesi",
        artist: "Karthik, Damini",
        duration: "3:58",
        youtubeId: "xnJ4RTodr3g",
        languages: ["Telugu", "Hindi", "Tamil"]
      }
    ]
  },
  {
    id: "kgf",
    title: "KGF Chapter 1",
    artist: "Ravi Basrur",
    coverImage: "coverImages/kgf_1.jpg",
    songs: [
      {
        id: "kgf-1",
        title: "Dheera Dheera",
        artist: "Ravi Basrur",
        duration: "4:28",
        youtubeId: "1qyfqZ8zh4k",
        languages: ["Telugu","Kannada", "Hindi", "Tamil"]
      },
      {
        id: "kgf-2",
        title: "Salaam Rocky Bhai",
        artist: "Ravi Basrur",
        duration: "4:01",
        youtubeId: "zr9KptlR57Q",
        languages: ["Telugu","Kannada", "Hindi", "Tamil"]
      },
      {
        id: "kgf-3",
        title: "Dochey",
        artist: "Ravi Basrur",
        duration: "3:38",
        youtubeId: "KR4J6HoLAbs",
        languages: ["Telugu","Kannada", "Hindi", "Tamil"]
      }
    ]
  },
  {
    id: "pushpa",
    title: "Pushpa: The Rise",
    artist: "Devi Sri Prasad",
    coverImage: "coverImages/pushpa1.jpg",
    songs: [
      {
        id: "pushpa-1",
        title: "Srivalli",
        artist: "Sid Sriram",
        duration: "3:58",
        youtubeId: "txHO7PLGE3o",
        languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"]
      },
      {
        id: "pushpa-2",
        title: "Saami Saami",
        artist: "Mounika Yadav",
        duration: "3:32",
        youtubeId: "ZAnN6groJw",
        languages: ["Telugu", "Hindi", "Tamil", "Malayalam","Kannada"]
      },
      {
        id: "pushpa-3",
        title: "Oo Antava",
        artist: "Indravathi Chauhan",
        duration: "3:19",
        youtubeId: "u_wB6byrl5k",
        languages: ["Telugu", "Hindi", "Tamil", "Malayalam","Kannada"]
      },
      {
        id: "pushpa-4",
        title: "Ey bidda",
        artist: "Nakash Aziz",
        duration: "3:33",
        youtubeId: "jGetqo_SC9U",
        languages: ["Telugu", "Hindi", "Tamil", "Malayalam","Kannada"]
      },
      {
        id: "pushpa-5",
        title: "Daakko Daakko Meka",
        artist: "Nakash Aziz",
        duration: "3:33",
        youtubeId: "pc_784hcQxI",
        languages: ["Telugu", "Hindi", "Tamil", "Malayalam","Kannada"]
      }
    ]
  },
  {
    id: "worldcup",
    title: "FIFA World Cup: Official Songs",
    artist: "Various Artists",
    coverImage: "coverImages/wakawaka.jpg",
    songs: [
      {
        id: "worldcup-1",
        title: "Waka Waka (This Time for Africa)",
        artist: "Shakira feat. Freshlyground",
        duration: "3:22",
        youtubeId: "pRpeEdMmmQ0",
        languages: ["English", "Spanish"]
      }
    ]
  }
];

export const getAlbumById = (id: string): Album | undefined => {
  return albums.find(album => album.id === id);
};

export const getSongById = (albumId: string, songId: string): Song | undefined => {
  const album = getAlbumById(albumId);
  return album?.songs.find(song => song.id === songId);
};
