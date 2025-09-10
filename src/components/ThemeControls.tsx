import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeControlsProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function ThemeControls({ className = '', orientation = 'horizontal' }: ThemeControlsProps) {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme();

  const containerClass = orientation === 'horizontal' 
    ? 'flex items-center gap-3' 
    : 'flex flex-col gap-3';

  return (
    <div className={`${containerClass} ${className}`}>
      {/* Dark/Light Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-2 focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* Theme Selector */}
      <Select value={colorTheme} onValueChange={(value: 'blue' | 'purple') => setColorTheme(value)}>
        <SelectTrigger className="w-32 h-9">
          <Palette className="h-4 w-4 mr-1" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="blue">Blue Theme</SelectItem>
          <SelectItem value="purple">Purple Theme</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}