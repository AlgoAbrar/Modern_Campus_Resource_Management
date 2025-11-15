import { Button } from './ui/button';
import { Building2, Users, AlertCircle, Monitor } from 'lucide-react';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section id="hero" className="bg-gradient-to-b from-blue-50 to-background dark:from-blue-900/20 dark:to-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Know which CSE classrooms are{' '}
            <span className="text-[var(--theme-primary)]">free right now</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Real-time room availability, quick organizer checks, and anonymous problem 
            reporting for the Computer Science & Engineering department.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="font-medium px-8 py-3 h-auto text-base focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
              onClick={() => scrollToSection('room-status')}
            >
              Check Room Availability
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-medium px-8 py-3 h-auto text-base focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
              onClick={() => scrollToSection('report-problem')}
            >
              Report a Problem (Anonymous)
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mb-3">
                <Building2 className="h-8 w-8 text-[var(--theme-primary)]" />
              </div>
              <span className="text-sm font-medium text-foreground">Room Status</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mb-3">
                <Monitor className="h-8 w-8 text-[var(--success-green)]" />
              </div>
              <span className="text-sm font-medium text-foreground">Equipment Check</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mb-3">
                <AlertCircle className="h-8 w-8 text-[var(--warning-amber)]" />
              </div>
              <span className="text-sm font-medium text-foreground">Report Issues</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mb-3">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-foreground">Role-Based Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}