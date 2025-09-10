import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './components/AuthProvider';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RoomStatusSection } from './components/RoomStatusSection';
import { OrganizerSection } from './components/OrganizerSection';
import { ReportProblemSection } from './components/ReportProblemSection';
import { RoleCallouts } from './components/RoleCallouts';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login'>('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Height of sticky header
      const targetPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleShowLogin = () => {
    setCurrentPage('login');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleLogin = (role: string, user: any) => {
    setCurrentPage('home');
    // Login is handled by AuthProvider
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          {currentPage === 'login' ? (
            <LoginPage 
              onLogin={handleLogin}
              onBackToHome={handleBackToHome}
            />
          ) : (
            <>
              <Header 
                scrollToSection={scrollToSection} 
                onShowLogin={handleShowLogin}
              />
              <main>
                <HeroSection scrollToSection={scrollToSection} />
                <RoomStatusSection scrollToSection={scrollToSection} />
                <OrganizerSection />
                <ReportProblemSection />
                <RoleCallouts onShowLogin={handleShowLogin} />
              </main>
              <Footer scrollToSection={scrollToSection} />
            </>
          )}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}