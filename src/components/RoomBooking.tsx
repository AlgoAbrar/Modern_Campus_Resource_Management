import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Building,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { useData } from "./DataContext";

interface Room {
  id: string;
  capacity: number;
  building: string;
  floor: string;
  buildingType: "paranoma" | "nexas";
}

interface Booking {
  id: string;
  roomId: string;
  date: Date;
  startTime: string;
  endTime: string;
  teacherName: string;
  purpose: string;
}

const ALL_ROOMS: Room[] = [
  // Paranoma Building - Student Classrooms
  {
    id: "P-202",
    capacity: 45,
    building: "Paranoma",
    floor: "2nd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-205",
    capacity: 40,
    building: "Paranoma",
    floor: "2nd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-206",
    capacity: 50,
    building: "Paranoma",
    floor: "2nd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-207",
    capacity: 42,
    building: "Paranoma",
    floor: "2nd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-209",
    capacity: 38,
    building: "Paranoma",
    floor: "2nd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-210",
    capacity: 44,
    building: "Paranoma",
    floor: "2nd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-211",
    capacity: 46,
    building: "Paranoma",
    floor: "2nd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-304",
    capacity: 35,
    building: "Paranoma",
    floor: "3rd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-307",
    capacity: 35,
    building: "Paranoma",
    floor: "3rd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-308",
    capacity: 42,
    building: "Paranoma",
    floor: "3rd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-314",
    capacity: 38,
    building: "Paranoma",
    floor: "3rd Floor",
    buildingType: "paranoma",
  },
  {
    id: "P-713",
    capacity: 48,
    building: "Paranoma",
    floor: "7th Floor",
    buildingType: "paranoma",
  },

  // Nexas Building - Faculty Rooms
  {
    id: "N-101",
    capacity: 20,
    building: "Nexas",
    floor: "1st Floor",
    buildingType: "nexas",
  },
  {
    id: "N-102",
    capacity: 15,
    building: "Nexas",
    floor: "1st Floor",
    buildingType: "nexas",
  },
  {
    id: "N-103",
    capacity: 12,
    building: "Nexas",
    floor: "1st Floor",
    buildingType: "nexas",
  },
  {
    id: "N-104",
    capacity: 18,
    building: "Nexas",
    floor: "1st Floor",
    buildingType: "nexas",
  },
  {
    id: "N-105",
    capacity: 16,
    building: "Nexas",
    floor: "1st Floor",
    buildingType: "nexas",
  },
  {
    id: "N-106",
    capacity: 22,
    building: "Nexas",
    floor: "1st Floor",
    buildingType: "nexas",
  },
  {
    id: "N-201",
    capacity: 25,
    building: "Nexas",
    floor: "2nd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-202",
    capacity: 18,
    building: "Nexas",
    floor: "2nd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-203",
    capacity: 14,
    building: "Nexas",
    floor: "2nd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-204",
    capacity: 20,
    building: "Nexas",
    floor: "2nd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-205",
    capacity: 16,
    building: "Nexas",
    floor: "2nd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-206",
    capacity: 24,
    building: "Nexas",
    floor: "2nd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-301",
    capacity: 30,
    building: "Nexas",
    floor: "3rd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-302",
    capacity: 28,
    building: "Nexas",
    floor: "3rd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-303",
    capacity: 15,
    building: "Nexas",
    floor: "3rd Floor",
    buildingType: "nexas",
  },
  {
    id: "N-304",
    capacity: 26,
    building: "Nexas",
    floor: "3rd Floor",
    buildingType: "nexas",
  },
];

// Generate time slots (8 AM to 5 PM, 1-hour intervals)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 17; hour++) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;
    slots.push({ startTime, endTime, label: `${startTime} - ${endTime}` });
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export function RoomBooking() {
  const { user } = useAuth();
  const { bookings, addBooking } = useData();
  const [selectedBuilding, setSelectedBuilding] = useState<
    "paranoma" | "nexas"
  >("paranoma");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [purpose, setPurpose] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredRooms = ALL_ROOMS.filter(
    (room) => room.buildingType === selectedBuilding
  );

  const handleBookRoom = () => {
    if (
      !selectedRoom ||
      !selectedDate ||
      !selectedTimeSlot ||
      !purpose ||
      !user
    ) {
      return;
    }

    const [startTime, endTime] = selectedTimeSlot.split(" - ");

    addBooking({
      roomId: selectedRoom,
      date: selectedDate,
      startTime,
      endTime,
      teacherName: user.name,
      purpose,
    });

    setShowSuccess(true);

    // Reset form
    setTimeout(() => {
      setSelectedRoom("");
      setSelectedDate(undefined);
      setSelectedTimeSlot("");
      setPurpose("");
      setShowSuccess(false);
    }, 3000);
  };

  const getBookingsForRoom = (roomId: string) => {
    return bookings.filter((b) => b.roomId === roomId);
  };

  const isTimeSlotBooked = (timeSlot: string) => {
    if (!selectedRoom || !selectedDate) return false;

    const [startTime] = timeSlot.split(" - ");
    return bookings.some(
      (b) =>
        b.roomId === selectedRoom &&
        format(b.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") &&
        b.startTime === startTime
    );
  };

  const selectedRoomDetails = ALL_ROOMS.find((r) => r.id === selectedRoom);

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Room Booking System
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Welcome, {user?.name}. Book classrooms and faculty rooms for your
            sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Book a Room
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {showSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium">
                      Room booked successfully! Your booking has been confirmed.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Building Selection */}
                <Tabs
                  value={selectedBuilding}
                  onValueChange={(value) => {
                    setSelectedBuilding(value as "paranoma" | "nexas");
                    setSelectedRoom("");
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2 h-auto">
                    <TabsTrigger
                      value="paranoma"
                      className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm"
                    >
                      <Building className="h-4 w-4 flex-shrink-0" />
                      <span>Paranoma</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="nexas"
                      className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm"
                    >
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span>Nexas</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value={selectedBuilding}
                    className="space-y-4 mt-4"
                  >
                    {/* Room Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="room">Select Room</Label>
                      <Select
                        value={selectedRoom}
                        onValueChange={setSelectedRoom}
                      >
                        <SelectTrigger id="room" className="h-11 sm:h-10">
                          <SelectValue placeholder="Choose a room" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredRooms.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.id} - {room.floor} (Capacity:{" "}
                              {room.capacity})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Selected Room Details */}
                    {selectedRoomDetails && (
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="truncate">
                                {selectedRoomDetails.building} -{" "}
                                {selectedRoomDetails.floor}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span>
                                Capacity: {selectedRoomDetails.capacity} seats
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Date Selection */}
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left h-11 sm:h-10"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate
                              ? format(selectedDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Slot Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="timeslot">
                        Select Time Slot (1 Hour)
                      </Label>
                      <Select
                        value={selectedTimeSlot}
                        onValueChange={setSelectedTimeSlot}
                        disabled={!selectedRoom || !selectedDate}
                      >
                        <SelectTrigger id="timeslot" className="h-11 sm:h-10">
                          <SelectValue placeholder="Choose time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((slot) => {
                            const isBooked = isTimeSlotBooked(slot.label);
                            return (
                              <SelectItem
                                key={slot.label}
                                value={slot.label}
                                disabled={isBooked}
                              >
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {slot.label}
                                  {isBooked && (
                                    <Badge variant="secondary" className="ml-2">
                                      Booked
                                    </Badge>
                                  )}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Purpose */}
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Purpose</Label>
                      <Select value={purpose} onValueChange={setPurpose}>
                        <SelectTrigger id="purpose" className="h-11 sm:h-10">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lecture">Lecture</SelectItem>
                          <SelectItem value="Lab Session">
                            Lab Session
                          </SelectItem>
                          <SelectItem value="Tutorial">Tutorial</SelectItem>
                          <SelectItem value="Exam">Exam</SelectItem>
                          <SelectItem value="Meeting">
                            Faculty Meeting
                          </SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full h-11 sm:h-10"
                      onClick={handleBookRoom}
                      disabled={
                        !selectedRoom ||
                        !selectedDate ||
                        !selectedTimeSlot ||
                        !purpose
                      }
                    >
                      Confirm Booking
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* My Bookings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  My Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
                  {bookings.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No bookings yet
                    </p>
                  ) : (
                    bookings.map((booking) => (
                      <Card key={booking.id} className="bg-muted/50">
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold truncate">
                                {booking.roomId}
                              </span>
                              <Badge
                                variant="secondary"
                                className="flex-shrink-0 text-xs"
                              >
                                {booking.purpose}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">
                                  {format(booking.date, "PPP")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 flex-shrink-0" />
                                <span>
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
