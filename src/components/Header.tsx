import React from 'react';
import { Menu, Users, Heart, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full z-50 backdrop-blur-lg bg-black/30 border-b border-pink-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col items-start">
              <span className="font-['Russo_One'] text-2xl tracking-tight bg-gradient-to-r from-pink-400 to-pink-600 
                bg-clip-text text-transparent font-bold">TRAP</span>
              <span className="font-['Russo_One'] text-sm tracking-widest text-white/80 -mt-1">HOUSE</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/agents" active={location.pathname === '/agents'}>
              <Users className="w-4 h-4 mr-2" />
              Agents
            </NavLink>
            <NavLink to="/backpage" active={location.pathname === '/backpage'}>
              <FileText className="w-4 h-4 mr-2" />
              Backpage
            </NavLink>
            <NavLink to="/favorites" active={location.pathname === '/favorites'}>
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </NavLink>
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-pink-400 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="py-4 space-y-2">
              <MobileNavLink to="/agents" onClick={() => setIsMenuOpen(false)}>
                <Users className="w-4 h-4 mr-2" />
                Agents
              </MobileNavLink>
              <MobileNavLink to="/backpage" onClick={() => setIsMenuOpen(false)}>
                <FileText className="w-4 h-4 mr-2" />
                Backpage
              </MobileNavLink>
              <MobileNavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      to={to}
      className={`flex items-center text-sm font-medium transition-colors ${
        active ? 'text-pink-400' : 'text-white hover:text-pink-400'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center px-4 py-2 text-white hover:bg-pink-500/10 transition-colors"
    >
      {children}
    </Link>
  );
}