import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "teacher" | "cr" | "authority" | null;

export interface User {
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS = {
  teacher: [
    {
      email: "teacher@cse.edu",
      password: "teacher123",
      name: "Ananya Sarkar",
      role: "teacher" as UserRole,
    },
    {
      email: "prof@cse.edu",
      password: "prof123",
      name: "Prof. Sarah Ahmed",
      role: "teacher" as UserRole,
    },
  ],
  cr: [
    {
      email: "cr@cse.edu",
      password: "cr123",
      name: "Md. Rahman",
      role: "cr" as UserRole,
    },
    {
      email: "cr2@cse.edu",
      password: "cr123",
      name: "Fatima Islam",
      role: "cr" as UserRole,
    },
  ],
  authority: [
    {
      email: "admin@cse.edu",
      password: "admin123",
      name: "Dr. Abdullah Rahman",
      role: "authority" as UserRole,
    },
    {
      email: "head@cse.edu",
      password: "head123",
      name: "Dr. Zainab Khan",
      role: "authority" as UserRole,
    },
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!role) return false;

    const users = MOCK_USERS[role];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
