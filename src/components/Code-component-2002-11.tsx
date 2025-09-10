import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  role: 'admin' | 'cr' | 'student';
  email?: string;
  employeeId?: string;
  class?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: string, userData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: string, userData: any) => {
    setUser({
      name: userData.name,
      role: role as 'admin' | 'cr' | 'student',
      email: userData.email,
      employeeId: userData.employeeId,
      class: userData.class
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}