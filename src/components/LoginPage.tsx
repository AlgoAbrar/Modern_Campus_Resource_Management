import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useAuth, type UserRole } from "./AuthContext";
import {
  GraduationCap,
  UserCheck,
  Shield,
  AlertCircle,
  LogIn,
  ArrowLeft,
} from "lucide-react";

interface LoginPageProps {
  onBack?: () => void;
}

export function LoginPage({ onBack }: LoginPageProps) {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(email, password, selectedRole);

    if (!success) {
      setError("Invalid credentials. Please check your email and password.");
    }

    setIsLoading(false);
  };

  const getDemoCredentials = (role: UserRole) => {
    switch (role) {
      case "teacher":
        return { email: "teacher@cse.edu", password: "teacher123" };
      case "cr":
        return { email: "cr@cse.edu", password: "cr123" };
      case "authority":
        return { email: "admin@cse.edu", password: "admin123" };
      default:
        return { email: "", password: "" };
    }
  };

  const fillDemoCredentials = () => {
    const creds = getDemoCredentials(selectedRole);
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-4xl">
        {/* Back Button */}
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-4 h-9 sm:h-10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Button>
        )}

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-[var(--theme-primary)]" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Modern Campus Management
            </h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">
            Computer Science & Engineering Department
          </p>
        </div>

        {/* Role Selection & Login */}
        <Card className="border-2 border-border shadow-xl">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl">
              Sign In to Your Account
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Select your role and enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <Tabs
              value={selectedRole || "teacher"}
              onValueChange={(value) => setSelectedRole(value as UserRole)}
            >
              <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 h-auto">
                <TabsTrigger
                  value="teacher"
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Teacher</span>
                </TabsTrigger>
                <TabsTrigger
                  value="cr"
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>CR</span>
                </TabsTrigger>
                <TabsTrigger
                  value="authority"
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm"
                >
                  <Shield className="h-4 w-4" />
                  <span>Authority</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11 sm:h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11 sm:h-10"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 sm:h-10"
                  disabled={isLoading}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 sm:h-10"
                  onClick={fillDemoCredentials}
                  disabled={isLoading}
                >
                  Fill Demo Credentials
                </Button>
              </form>

              {/* Role-specific Info */}
              <TabsContent value="teacher" className="mt-4 sm:mt-6">
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4">
                    <h4 className="font-semibold text-sm mb-2">
                      Teacher Access
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• Book classrooms and faculty rooms</li>
                      <li>• View real-time room availability</li>
                      <li>• Manage time slots (1-hour intervals)</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">
                      Demo: teacher@cse.edu / teacher123
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cr" className="mt-4 sm:mt-6">
                <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4">
                    <h4 className="font-semibold text-sm mb-2">
                      Class Representative Access
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• Report classroom issues</li>
                      <li>• Submit equipment problems</li>
                      <li>• Track issue status</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">
                      Demo: cr@cse.edu / cr123
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="authority" className="mt-4 sm:mt-6">
                <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4">
                    <h4 className="font-semibold text-sm mb-2">
                      Authority Access
                    </h4>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      <li>• View all past issues and history</li>
                      <li>• Assign lab assistants to problems</li>
                      <li>• Monitor resolution progress</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">
                      Demo: admin@cse.edu / admin123
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Guest Access Info */}
        <div className="text-center mt-4 sm:mt-6 px-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Students can access the homepage without login to view room status
            and submit anonymous complaints
          </p>
        </div>
      </div>
    </div>
  );
}
