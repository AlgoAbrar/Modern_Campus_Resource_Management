import { createContext, useContext, useState, ReactNode } from "react";

export interface Issue {
  id: string;
  roomId: string;
  category: string;
  description: string;
  reportedBy: string;
  reportedByRole: "student" | "cr";
  reportedAt: Date;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  assignedTo?: string;
  resolvedAt?: Date;
  resolution?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  date: Date;
  startTime: string;
  endTime: string;
  teacherName: string;
  purpose: string;
}

interface DataContextType {
  issues: Issue[];
  addIssue: (issue: Omit<Issue, "id">) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  getActiveIssues: () => Issue[];
  getIssuesByRoom: (roomId: string) => Issue[];
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id">) => void;
  getBookingsByRoom: (roomId: string) => Booking[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial sample data
const INITIAL_ISSUES: Issue[] = [
  {
    id: "ISS-001",
    roomId: "P-202",
    category: "Fan/Light",
    description:
      "Ceiling fan in the back corner is not working properly. Making unusual noise.",
    reportedBy: "Anonymous Student",
    reportedByRole: "student",
    reportedAt: new Date("2024-10-15"),
    status: "resolved",
    priority: "medium",
    assignedTo: "Md. Harun-Or-Rashid",
    resolvedAt: new Date("2024-10-18"),
    resolution: "Fan motor replaced. Tested and working normally.",
  },
  {
    id: "ISS-002",
    roomId: "P-205",
    category: "Projector",
    description:
      "Projector not displaying properly. Image is very dim even with lights off.",
    reportedBy: "Md. Rahman",
    reportedByRole: "cr",
    reportedAt: new Date("2024-10-20"),
    status: "in-progress",
    priority: "high",
    assignedTo: "Md. Nahidul Islam",
  },
  {
    id: "ISS-003",
    roomId: "P-307",
    category: "PCs",
    description:
      "3 computers in the lab are not booting up. Blue screen error.",
    reportedBy: "Fatima Islam",
    reportedByRole: "cr",
    reportedAt: new Date("2024-10-22"),
    status: "pending",
    priority: "high",
  },
  {
    id: "ISS-004",
    roomId: "P-314",
    category: "Cleanliness",
    description: "Classroom needs deep cleaning. Dusty boards and desks.",
    reportedBy: "Anonymous Student",
    reportedByRole: "student",
    reportedAt: new Date("2024-10-10"),
    status: "resolved",
    priority: "low",
    resolvedAt: new Date("2024-10-12"),
    resolution: "Cleaning staff completed deep cleaning.",
  },
  {
    id: "ISS-005",
    roomId: "P-206",
    category: "Air Conditioning",
    description: "AC is not cooling properly. Room temperature is very high.",
    reportedBy: "Md. Khan",
    reportedByRole: "cr",
    reportedAt: new Date("2024-11-01"),
    status: "in-progress",
    priority: "high",
    assignedTo: "Md. Harun-Or-Rashid",
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addIssue = (issue: Omit<Issue, "id">) => {
    const newIssue: Issue = {
      ...issue,
      id: `ISS-${Date.now()}`,
    };
    setIssues((prev) => [newIssue, ...prev]);
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, ...updates } : issue))
    );
  };

  const getActiveIssues = () => {
    return issues.filter((issue) => issue.status !== "resolved");
  };

  const getIssuesByRoom = (roomId: string) => {
    return issues.filter((issue) => issue.roomId === roomId);
  };

  const addBooking = (booking: Omit<Booking, "id">) => {
    const newBooking: Booking = {
      ...booking,
      id: `BKG-${Date.now()}`,
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const getBookingsByRoom = (roomId: string) => {
    return bookings.filter((booking) => booking.roomId === roomId);
  };

  return (
    <DataContext.Provider
      value={{
        issues,
        addIssue,
        updateIssue,
        getActiveIssues,
        getIssuesByRoom,
        bookings,
        addBooking,
        getBookingsByRoom,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
