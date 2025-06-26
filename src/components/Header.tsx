
import { Search, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}


const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {

  return (
    <header className="sticky top-0 z-50 bg-yt-black border-b border-yt-dark-gray p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-yt-red p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M8 17.749L19 11.999 8 6.249v11.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold hidden sm:inline">MyTune</span>
          </Link>
        </div>

        <div className="md:flex relative flex-1 max-w-xl mx-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-yt-light-gray" />
          </div>
          <Input
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="pl-10 pr-4 py-2 w-full bg-yt-dark-gray border-none text-white text-sm focus-visible:ring-yt-purple"
  placeholder="Search songs, artists, albums..."
/>


        </div>

        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-yt-dark-gray">
              <Home className="h-5 w-5 hidden md:block" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
