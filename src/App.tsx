import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { DataProvider } from "./components/DataContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { RoomStatusSection } from "./components/RoomStatusSection";
import { OrganizerSection } from "./components/OrganizerSection";
import { ReportProblemSection } from "./components/ReportProblemSection";
import { RoleCallouts } from "./components/RoleCallouts";
import { Footer } from "./components/Footer";
import { LoginPage } from "./components/LoginPage";
import { RoomBooking } from "./components/RoomBooking";
import { IssueReporting } from "./components/IssueReporting";
import { PastIssues } from "./components/PastIssues";
import { Toaster } from "./components/Toaster";

function MainContent() {
  const { user, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Height of sticky header
      const targetPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // Show login page when user clicks login button
  if (showLogin && !isAuthenticated) {
    return <LoginPage onBack={() => setShowLogin(false)} />;
  }

  // Role-based content after authentication
  if (isAuthenticated && user) {
    if (user.role === "teacher") {
      return (
        <div className="min-h-screen bg-background">
          <Header
            scrollToSection={scrollToSection}
            onLoginClick={() => setShowLogin(true)}
          />
          <main>
            <RoomBooking />
          </main>
        </div>
      );
    }

    if (user.role === "cr") {
      return (
        <div className="min-h-screen bg-background">
          <Header
            scrollToSection={scrollToSection}
            onLoginClick={() => setShowLogin(true)}
          />
          <main>
            <IssueReporting />
          </main>
        </div>
      );
    }

    if (user.role === "authority") {
      return (
        <div className="min-h-screen bg-background">
          <Header
            scrollToSection={scrollToSection}
            onLoginClick={() => setShowLogin(true)}
          />
          <main>
            <PastIssues />
          </main>
        </div>
      );
    }
  }

  // Default public homepage (for everyone before login)
  return (
    <div className="min-h-screen bg-background">
      <Header
        scrollToSection={scrollToSection}
        onLoginClick={() => setShowLogin(true)}
      />
      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <RoomStatusSection scrollToSection={scrollToSection} />
        <OrganizerSection />
        <ReportProblemSection />
        <RoleCallouts />
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <MainContent />
          <Toaster />
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}
