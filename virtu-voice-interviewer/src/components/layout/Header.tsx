import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic, User, BarChart2, LogOut, Calendar, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ui/theme-provider";

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-white shadow-sm dark:bg-gray-900">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <Mic className="h-6 w-6 text-interview-primary" />
            <span className="ml-2 text-xl font-bold tracking-tight text-interview-primary">
              VirtuVoice
            </span>
          </div>
        </Link>
        
        {user ? (
          <>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/new-interview">
                <Button variant="ghost" className="text-gray-700 hover:text-interview-primary dark:text-gray-300">
                  Schedule Interview
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-gray-700 hover:text-interview-primary dark:text-gray-300">
                  <BarChart2 className="mr-1 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="text-gray-700 hover:text-interview-primary dark:text-gray-300">
                  <User className="mr-1 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Link to="/interviews">
                <Button variant="ghost" className="text-gray-700 hover:text-interview-primary dark:text-gray-300">
                  <Calendar className="mr-1 h-4 w-4" />
                  Interviews
                </Button>
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Link to="/new-interview">
                <Button className="bg-interview-primary hover:bg-interview-secondary">
                  <Calendar className="mr-1 h-4 w-4" />
                  Schedule Interview
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => signOut()} className="text-gray-700 dark:text-gray-300">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Link to="/auth">
              <Button className="bg-interview-primary hover:bg-interview-secondary">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;