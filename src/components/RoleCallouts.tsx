import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Shield, UserCheck, Eye } from "lucide-react";

const roles = [
  {
    title: "Admin/Authority",
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    description:
      "Full system access to manage classrooms and oversee operations",
    features: [
      "Manage all room statuses",
      "View and respond to all issues",
      "Update equipment status",
      "Access analytics and reports",
    ],
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    buttonText: "Admin Login",
    buttonVariant: "default" as const,
  },
  {
    title: "Class Representative",
    icon: <UserCheck className="h-8 w-8 text-blue-600" />,
    description: "Manage classroom status and help maintain equipment",
    features: [
      "Update organizer statuses",
      "Submit detailed complaints",
      "View assigned room data",
      "Coordinate with students",
    ],
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    buttonText: "CR Login",
    buttonVariant: "default" as const,
  },
  {
    title: "Student (View-Only)",
    icon: <Eye className="h-8 w-8 text-green-600" />,
    description: "Check availability and report issues anonymously",
    features: [
      "Check room availability",
      "View equipment status",
      "Submit anonymous complaints",
      "Get real-time updates",
    ],
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    buttonText: "Learn More",
    buttonVariant: "outline" as const,
  },
];

export function RoleCallouts() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Access Levels
          </h2>
          <p className="text-lg text-[var(--neutral-gray)] max-w-2xl mx-auto">
            Different roles have different permissions to ensure smooth
            classroom management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`mx-auto w-16 h-16 ${role.bgColor} rounded-full flex items-center justify-center mb-4`}
                >
                  {role.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                  {role.title}
                </CardTitle>
                <p className="text-sm text-[var(--neutral-gray)]">
                  {role.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {role.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button
                    variant={role.buttonVariant}
                    className="w-full font-medium focus:ring-2 focus:ring-[var(--primary-blue)] focus:ring-offset-2"
                  >
                    {role.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need help getting started?
          </h3>
          <p className="text-[var(--neutral-gray)] mb-4">
            Contact your department administrator to get the appropriate access
            level for your role.
          </p>
          <Button variant="outline" className="font-medium">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
