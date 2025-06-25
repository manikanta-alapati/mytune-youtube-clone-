
import { useState } from "react";
import { Song, Album, getAlbumById } from "@/data/albums";

interface SearchResult {
  youtubeId: string;
  title: string;
  thumbnail: string;
}

// Structured metadata mapping for accurate language switching
const languageVersionsMap: Record<string, Record<string, string>> = {
  // RRR songs
  "rrr-1": { // Naatu Naatu
    "Telugu": "OsU0CGZoV8E",
    "Hindi": "zInzdvr9pnM",
    "Tamil": "PsRka-zMTqo",
    "Malayalam": "OUteHBP-8No",
    "Kannada": "_2N8FydjCIU"
  },
  "rrr-2": { // Dosti
    "Telugu": "zv4_PlC9gMg",
    "Hindi": "_XSrkAJ_V8g",
    "Tamil": "0p4mGx7QIU0",
    "Malayalam": "XNiS6xThffY",
    "Kannada": "wwUig_OYmOU"
  },
  "rrr-3": { // Komuram Bheemudo
    "Telugu": "eiaVN1Wd1e4",
    "Hindi": "wstzWvVNUQU",
    "Tamil": "Wb-KYXJ0-t0",
    "Malayalam":"9nNo8zWrKNk",
    "Kannada":"x5CvdCypFmo"
  },
  "rrr-4": { // Raamam Raaghavam
    "Telugu": "Cn-o7RzUPpU",
    "Hindi": "mGqOl-WzMfk"
  },
  "rrr-5": { // Ethara Jenda
    "Telugu": "ccbp0_ZqMBY",
    "Hindi": "2cyzCReoNgU",
    "Tamil": "34D6tJaTolY",
    "Malayalam":"IvfhpMYxbJM",
    "Kannada":"5JqYCVyR9bQ"
  },

  // Baahubali songs
  "baahubali-1": { // Mamathala Thalli
    "Telugu": "12fcHpwLKl4",
    "Hindi": "jjWWuEWCBas",
    "Tamil": "y6GZX_Pkj2Q"
  },
  "baahubali-2": { // Dhivara
    "Telugu": "F67EVY_sg4E",
    "Hindi": "_2clW8Zxq88",
    "Tamil": "E8m57zr0ks0"
  },
  "baahubali-3": { // Pacha Bottesi
    "Telugu": "xnJ4RTodr3g",
    "Hindi": "l-i8YFGoMPQ",
    "Tamil": "qIef34bj_xY"
  },

  // KGF songs
  "kgf-1": { // Dheera Dheera
    "Kannada": "IuS4LL_ALrU",
    "Hindi": "b0eoIPALte4",
    "Tamil": "gWcILbCt1zA",
    "Telugu": "pHl_MjgPiZo"
  },
  "kgf-2": { // salaam Rocky Bhai
    "Kannada": "TnyWMhSqyjY",
    "Hindi": "6Hvc-xpNTME",
    "Tamil": "xDBm7fg3w_8",
    "Telugu":"1qyfqZ8zh4k"
  },
  "kgf-3": { // Dochey
    "Kannada": "xu3IdW8Q6Yw",
    "Hindi": "1BVgpX4w0Wk",
    "Tamil": "xu3IdW8Q6Yw",
    "Telugu": "KR4J6HoLAbs"
  },

  // Pushpa songs
  "pushpa-1": { // Srivalli
    "Telugu": "txHO7PLGE3o",
    "Hindi": "hcMzwMrr1tE",
    "Tamil": "E7IqglHfpQg",
    "Malayalam": "hv0ua_mQ1wM", 
    "Kannada": "plCXIG-qwB8"
  },
  "pushpa-2": { // Saami Saami
    "Telugu": "ZAnN6groJw",
    "Hindi": "vdY5SFZBgnk",
    "Tamil": "GfSgBLjFFSo",
    "Malayalam": "ZAvdyVuUZ8Q",
    "Kannada":"0rO3apKZGmw"
  },
  "pushpa-3": { // Oo Antava
    "Telugu": "u_wB6byrl5k",
    "Hindi": "sqmNziU3OxQ",
    "Tamil": "w78XpGt-IPQ",
    "Malayalam": "lcEeZf1fDU0",
    "Kannada":"iNvewS_fQBc"
  },
  "pushpa-4": { // Ey bidda
    "Telugu": "jGetqo_SC9U",
    "Hindi": "BJahIa255qc",
    "Tamil": "xs52MuNuLa0",
    "Malayalam": "K-_U0SGDfDs",
    "Kannada":"ErUd4LiS1cU"
  },
  "pushpa-5": { // daakko dakko meka
    "Telugu": "pc_784hcQxI",
    "Hindi": "BJahIa255qc",
    "Tamil": "hp3WmuacYD8",
    "Malayalam": "sgKifR54hiI",
    "Kannada":"oaeydfdYTc"
  },
  // Waka Waka (as requested)
  "worldcup-1": { // Waka Waka
    "English": "pRpeEdMmmQ0",
    "Spanish": "dzsuE5ugxf4"
  }
};

// In a real application, this would call the YouTube Data API
// This is now using our structured metadata mapping approach
const useYoutubeSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAlternateVersion = async (
    song: Song, 
    targetLanguage: string
  ): Promise<SearchResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get album information to enhance the result title
      const albumId = song.id.split('-')[0]; // Extract album ID from song ID (e.g., "rrr-1" -> "rrr")
      const album = getAlbumById(albumId);
      
      if (!album) {
        throw new Error("Album information not found");
      }
      
      // Simulate API call delay for realistic user experience
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if we have a mapping for this song and language
      if (languageVersionsMap[song.id] && languageVersionsMap[song.id][targetLanguage]) {
        const youtubeId = languageVersionsMap[song.id][targetLanguage];
        
        return {
          youtubeId,
          title: `${song.title} (${targetLanguage} Version) - ${album.title}`,
          thumbnail: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
        };
      } else {
        setError(`Could not find ${song.title} from ${album.title} in ${targetLanguage}`);
        return null;
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("An error occurred while searching. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    searchAlternateVersion,
    isLoading,
    error
  };
};

export default useYoutubeSearch;
