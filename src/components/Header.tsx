import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Menu, Building2, Globe, LogOut, User } from 'lucide-react';
import { ThemeControls } from './ThemeControls';
import { useAuth } from './AuthContext';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
  onLoginClick: () => void;
}

export function Header({ scrollToSection, onLoginClick }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Room Status', id: 'room-status' },
    { label: 'Organizer', id: 'organizer' },
    { label: 'Report Problem', id: 'report-problem' },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'teacher': return 'bg-blue-100 text-blue-700';
      case 'cr': return 'bg-green-100 text-green-700';
      case 'authority': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink">
            <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--theme-primary)] flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg font-semibold text-foreground truncate">
                CSE Smart Classroom
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Manager
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-gray-700 hover:text-[var(--theme-primary)] transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 rounded-md px-2 py-1"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <ThemeControls />
            <Select>
              <SelectTrigger className="w-24 lg:w-28 h-9">
                <Globe className="h-4 w-4 mr-1" />
                <SelectValue placeholder="EN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
            
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted max-w-xs">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{user.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${getRoleBadgeColor(user.role || '')}`}>
                    {user.role?.toUpperCase()}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className="font-medium focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={onLoginClick}
                className="font-medium focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
              >
                Log in
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {isAuthenticated && user ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
                className="font-medium h-9 px-3"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLoginClick}
                className="font-medium h-9 px-3"
              >
                Log in
              </Button>
            )}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {isAuthenticated && user && (
                    <div className="pb-4 border-b">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${getRoleBadgeColor(user.role || '')}`}>
                        {user.role?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {isAuthenticated && navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="text-left text-lg font-medium text-gray-700 hover:text-[var(--theme-primary)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2 rounded-md px-2 py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-4 border-t space-y-4">
                    <ThemeControls orientation="vertical" />
                    <Select>
                      <SelectTrigger className="w-full h-11">
                        <Globe className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}