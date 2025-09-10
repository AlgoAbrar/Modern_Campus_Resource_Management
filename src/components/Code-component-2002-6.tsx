import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: string, user: any) => void;
  onBackToHome: () => void;
}

export function LoginPage({ onLogin, onBackToHome }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    employeeId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { value: 'admin', label: 'Admin/Authority', badge: 'Admin', color: 'bg-red-100 text-red-800' },
    { value: 'cr', label: 'Class Representative', badge: 'CR', color: 'bg-blue-100 text-blue-800' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate required fields
    if (!formData.email || !formData.password || !selectedRole) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (selectedRole === 'admin' && !formData.employeeId) {
      setError('Employee ID is required for Admin/Authority access');
      setIsLoading(false);
      return;
    }

    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock authentication logic
    const mockUsers = {
      admin: {
        email: 'admin@cse.edu',
        password: 'admin123',
        employeeId: 'EMP001',
        name: 'Dr. Sarah Johnson',
        role: 'admin'
      },
      cr: {
        email: 'cr@cse.edu',
        password: 'cr123',
        name: 'Alex Kumar',
        role: 'cr',
        class: 'CSE-4A'
      }
    };

    const user = selectedRole === 'admin' ? mockUsers.admin : mockUsers.cr;
    
    if (formData.email === user.email && formData.password === user.password) {
      if (selectedRole === 'admin' && formData.employeeId !== user.employeeId) {
        setError('Invalid Employee ID');
        setIsLoading(false);
        return;
      }
      
      onLogin(selectedRole, user);
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Home Button */}
        <Button
          variant="ghost"
          onClick={onBackToHome}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl">Sign In</h1>
          <p className="text-muted-foreground">
            Access the Modern Campus Management System
          </p>
        </div>

        {/* Demo Credentials Card */}
        <Card className="p-4 bg-muted/50 border-dashed">
          <h3 className="text-sm font-medium mb-3">Demo Credentials</h3>
          <div className="space-y-2 text-sm">
            <div>
              <Badge className="bg-red-100 text-red-800 mb-1">Admin</Badge>
              <p className="text-xs text-muted-foreground">
                Email: admin@cse.edu | Password: admin123 | ID: EMP001
              </p>
            </div>
            <div>
              <Badge className="bg-blue-100 text-blue-800 mb-1">CR</Badge>
              <p className="text-xs text-muted-foreground">
                Email: cr@cse.edu | Password: cr123
              </p>
            </div>
          </div>
        </Card>

        {/* Login Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Select Role *</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={role.color}>{role.badge}</Badge>
                        <span>{role.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@cse.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Employee ID Field (Admin only) */}
            {selectedRole === 'admin' && (
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="EMP001"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  required
                />
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot your password?
              </Button>
            </div>
          </form>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            Students can access the system without signing in to submit anonymous complaints.
          </p>
        </div>
      </div>
    </div>
  );
}