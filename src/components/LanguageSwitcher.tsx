
import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/data/albums";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useYoutubeSearch from "@/hooks/useYoutubeSearch";

interface LanguageSwitcherProps {
  song: Song;
  currentLanguage: string;
  onLanguageSwitch: (language: string, youtubeId?: string) => void;
}

const LanguageSwitcher = ({ song, currentLanguage, onLanguageSwitch }: LanguageSwitcherProps) => {
  const { searchAlternateVersion, isLoading } = useYoutubeSearch();
  const { toast } = useToast();

  const handleLanguageSwitch = async (language: string) => {
    if (language === currentLanguage) return;
    
    try {
      const result = await searchAlternateVersion(song, language);
      
      if (result) {
        onLanguageSwitch(language, result.youtubeId);
        
        toast({
          title: "Language Switched",
          description: `Now playing ${song.title} in ${language}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "No Version Found",
          description: `Couldn't find ${song.title} in ${language}. Try another language.`,
        });
        onLanguageSwitch(currentLanguage);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-transparent border-yt-dark-gray text-white hover:bg-yt-dark-gray hover:text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Languages className="h-4 w-4 mr-2" />
              {currentLanguage}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-yt-dark-gray border-yt-dark-gray text-white w-48">
        <DropdownMenuLabel>Switch Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {song.languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleLanguageSwitch(language)}
            disabled={language === currentLanguage || isLoading}
            className={language === currentLanguage 
              ? "bg-yt-black pointer-events-none" 
              : "cursor-pointer hover:bg-yt-black"}
          >
            {language}
            {language === currentLanguage && " (current)"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
