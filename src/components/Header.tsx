import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Menu, Building2, Globe, User, LogOut, Settings } from 'lucide-react';
import { ThemeControls } from './ThemeControls';
import { useAuth } from './AuthProvider';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
  onShowLogin: () => void;
}

export function Header({ scrollToSection, onShowLogin }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-[var(--theme-primary)]" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">
                CSE Smart Classroom
              </span>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Manager
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeControls />
            <Select>
              <SelectTrigger className="w-28 h-9">
                <Globe className="h-4 w-4 mr-1" />
                <SelectValue placeholder="EN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <Badge 
                          variant="secondary" 
                          className={user?.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {user?.role === 'admin' ? 'Admin' : 'CR'}
                        </Badge>
                      </div>
                      {user?.class && (
                        <span className="text-xs text-muted-foreground">{user.class}</span>
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      {user?.employeeId && (
                        <p className="text-xs leading-none text-muted-foreground">ID: {user.employeeId}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                onClick={onShowLogin}
                className="font-medium focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
              >
                Log in
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onShowLogin}
                className="font-medium"
              >
                Log in
              </Button>
            )}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-6">
                  {/* User Info for Mobile */}
                  {isAuthenticated && (
                    <div className="pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user?.name}</span>
                            <Badge 
                              variant="secondary" 
                              className={user?.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}
                            >
                              {user?.role === 'admin' ? 'Admin' : 'CR'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                          {user?.class && (
                            <p className="text-sm text-muted-foreground">{user.class}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {navItems.map((item) => (
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
                      <SelectTrigger className="w-full">
                        <Globe className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Mobile Auth Actions */}
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={logout}
                          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="default" 
                        onClick={onShowLogin}
                        className="w-full"
                      >
                        Log in
                      </Button>
                    )}
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