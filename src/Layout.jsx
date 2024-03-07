import { Link } from "react-router-dom";
import { useAuth, logout } from "wasp/client/auth";
import { getUsername } from "wasp/auth";
import { useState } from "react";
import "./Main.css";

export const Layout = ({ children }) => {
  const { data: user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="hover:text-gray-200">
            <h1 className="text-3xl font-bold">Song_Pair</h1>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link to="/vote" className="hover:text-gray-200">
              <h2 className="text-xl font-medium underline decoration-transparent hover:decoration-current">Vote</h2>
            </Link>
            <Link to="/leaderboard" className="hover:text-gray-200">
              <h2 className="text-xl font-medium underline decoration-transparent hover:decoration-current">Leaderboard</h2>
            </Link>
            <Link to="/admin" className="hover:text-gray-200">
              <h2 className="text-xl font-medium underline decoration-transparent hover:decoration-current">Add Songs</h2>
            </Link>
            { user ? (
              <span className="flex items-center gap-2">
                Hi, {getUsername(user)}!{' '}
                <button onClick={logout} className="text-xl font-medium underline decoration-transparent hover:decoration-current">
                  (Log out)
                </button>
              </span>
            ) : (
              <Link to="/login" className="hover:text-gray-200">
                <h2 className="text-xl font-medium underline decoration-transparent hover:decoration-current">Log in</h2>
              </Link>
            )}
          </nav>
          <button onClick={handleToggleMenu} className="md:hidden text-3xl">
            ☰
          </button>
        </div>
        <div className={`flex flex-col md:hidden ${isMenuOpen ? 'flex' : 'hidden'} absolute bg-primary-800 w-full z-10 p-4`}>
          <Link to="/vote" className="hover:text-gray-200 text-xl p-2 text-center">
            Vote
          </Link>
          <Link to="/leaderboard" className="hover:text-gray-200 text-xl p-2 text-center">
            Leaderboard
          </Link>
          {user ? (
            <div className="flex flex-col items-center p-2">
              <span>
                Hi, {getUsername(user)}!
              </span>
              <button onClick={logout} className="text-xl underline decoration-transparent hover:decoration-current">
                Log out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-200 text-xl p-2 text-center">
              Log in
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-2 flex-grow">
        {children}
      </main>
      <footer>
        <div className="container mx-auto p-4">
          <p className="text-center text-gray-500 text-sm">
            song_pair ~ Powered by Wasp
          </p>
        </div>
      </footer>
    </div>
  );
};
