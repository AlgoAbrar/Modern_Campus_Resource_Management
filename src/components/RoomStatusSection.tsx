import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { RoomCard } from './RoomCard';
import { Search, Clock, Building, Users } from 'lucide-react';

interface Room {
  id: string;
  status: 'empty' | 'in-use';
  capacity: number;
  building: string;
  floor: string;
  buildingType: 'paranoma' | 'nexas';
  isFacultyOnly?: boolean;
}

interface RoomStatusSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const SAMPLE_ROOMS: Room[] = [
  // Paranoma Building - Student Classrooms
  { id: 'P-202', status: 'empty', capacity: 45, building: 'Paranoma', floor: '2nd Floor', buildingType: 'paranoma' },
  { id: 'P-205', status: 'in-use', capacity: 40, building: 'Paranoma', floor: '2nd Floor', buildingType: 'paranoma' },
  { id: 'P-206', status: 'empty', capacity: 50, building: 'Paranoma', floor: '2nd Floor', buildingType: 'paranoma' },
  { id: 'P-207', status: 'in-use', capacity: 42, building: 'Paranoma', floor: '2nd Floor', buildingType: 'paranoma' },
  { id: 'P-209', status: 'empty', capacity: 38, building: 'Paranoma', floor: '2nd Floor', buildingType: 'paranoma' },
  { id: 'P-210', status: 'in-use', capacity: 44, building: 'Paranoma', floor: '2nd Floor', buildingType: 'paranoma' },
  { id: 'P-211', status: 'empty', capacity: 46, building: 'Paranoma', floor: '2nd Floor', buildingType: 'paranoma' },
  { id: 'P-304', status: 'in-use', capacity: 35, building: 'Paranoma', floor: '3rd Floor', buildingType: 'paranoma' },
  { id: 'P-307', status: 'empty', capacity: 35, building: 'Paranoma', floor: '3rd Floor', buildingType: 'paranoma' },
  { id: 'P-308', status: 'in-use', capacity: 42, building: 'Paranoma', floor: '3rd Floor', buildingType: 'paranoma' },
  { id: 'P-314', status: 'empty', capacity: 38, building: 'Paranoma', floor: '3rd Floor', buildingType: 'paranoma' },
  { id: 'P-713', status: 'empty', capacity: 48, building: 'Paranoma', floor: '7th Floor', buildingType: 'paranoma' },
  
  // Nexas Building - Faculty Rooms
  { id: 'N-101', status: 'in-use', capacity: 20, building: 'Nexas', floor: '1st Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-102', status: 'empty', capacity: 15, building: 'Nexas', floor: '1st Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-103', status: 'empty', capacity: 12, building: 'Nexas', floor: '1st Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-104', status: 'in-use', capacity: 18, building: 'Nexas', floor: '1st Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-105', status: 'empty', capacity: 16, building: 'Nexas', floor: '1st Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-106', status: 'in-use', capacity: 22, building: 'Nexas', floor: '1st Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-201', status: 'in-use', capacity: 25, building: 'Nexas', floor: '2nd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-202', status: 'empty', capacity: 18, building: 'Nexas', floor: '2nd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-203', status: 'empty', capacity: 14, building: 'Nexas', floor: '2nd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-204', status: 'in-use', capacity: 20, building: 'Nexas', floor: '2nd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-205', status: 'empty', capacity: 16, building: 'Nexas', floor: '2nd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-206', status: 'in-use', capacity: 24, building: 'Nexas', floor: '2nd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-301', status: 'empty', capacity: 30, building: 'Nexas', floor: '3rd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-302', status: 'in-use', capacity: 28, building: 'Nexas', floor: '3rd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-303', status: 'empty', capacity: 15, building: 'Nexas', floor: '3rd Floor', buildingType: 'nexas', isFacultyOnly: true },
  { id: 'N-304', status: 'in-use', capacity: 26, building: 'Nexas', floor: '3rd Floor', buildingType: 'nexas', isFacultyOnly: true },
];

export function RoomStatusSection({ scrollToSection }: RoomStatusSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('paranoma');

  const filteredRooms = SAMPLE_ROOMS.filter(room =>
    room.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
    room.buildingType === selectedTab
  );

  const paranomaRooms = SAMPLE_ROOMS.filter(room => room.buildingType === 'paranoma');
  const nexasRooms = SAMPLE_ROOMS.filter(room => room.buildingType === 'nexas');
  
  const getQuickStats = (rooms: Room[]) => {
    const total = rooms.length;
    const empty = rooms.filter(r => r.status === 'empty').length;
    const inUse = rooms.filter(r => r.status === 'in-use').length;
    return { total, empty, inUse };
  };

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setIsDetailsOpen(true);
  };

  const handleReportIssue = (room: Room) => {
    scrollToSection('report-problem');
    // In a real app, we'd prefill the form with the room ID
  };

  return (
    <section id="room-status" className="py-12 sm:py-16 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
            CSE Classroom Status
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Real-time availability of all Computer Science & Engineering department classrooms
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto">
          <Button 
            variant="default" 
            className="flex items-center justify-center gap-2 font-medium px-4 sm:px-6 h-11 sm:h-10 focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
          >
            <Clock className="h-4 w-4" />
            Now
          </Button>
          
          <Button 
            variant="outline" 
            disabled 
            className="flex items-center justify-center gap-2 font-medium px-4 sm:px-6 h-11 sm:h-10"
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Select Time (Coming Soon)</span>
            <span className="sm:hidden">Select Time</span>
          </Button>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by room ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 sm:h-10 focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
            />
          </div>
        </div>

        {/* Building Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6 sm:mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-auto">
            <TabsTrigger value="paranoma" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Building className="h-4 w-4 flex-shrink-0" />
              <span className="text-center">Paranoma<span className="hidden lg:inline"> (Student Rooms)</span></span>
            </TabsTrigger>
            <TabsTrigger value="nexas" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span className="text-center">Nexas<span className="hidden lg:inline"> (Faculty Rooms)</span></span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paranoma">
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
              {(() => {
                const stats = getQuickStats(paranomaRooms);
                return (
                  <>
                    <Badge variant="outline" className="text-xs sm:text-sm py-1.5 sm:py-1 px-3">
                      Total: {stats.total}
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm py-1.5 sm:py-1 px-3 bg-green-50 text-green-700">
                      Empty: {stats.empty}
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm py-1.5 sm:py-1 px-3 bg-red-50 text-red-700">
                      In Use: {stats.inUse}
                    </Badge>
                  </>
                );
              })()}
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  roomId={room.id}
                  status={room.status}
                  capacity={room.capacity}
                  building={room.building}
                  floor={room.floor}
                  isFacultyOnly={room.isFacultyOnly}
                  onViewDetails={() => handleViewDetails(room)}
                  onReportIssue={() => handleReportIssue(room)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nexas">
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
              {(() => {
                const stats = getQuickStats(nexasRooms);
                return (
                  <>
                    <Badge variant="outline" className="text-xs sm:text-sm py-1.5 sm:py-1 px-3">
                      Total: {stats.total}
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm py-1.5 sm:py-1 px-3 bg-green-50 text-green-700">
                      Empty: {stats.empty}
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm py-1.5 sm:py-1 px-3 bg-red-50 text-red-700">
                      In Use: {stats.inUse}
                    </Badge>
                  </>
                );
              })()}
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  roomId={room.id}
                  status={room.status}
                  capacity={room.capacity}
                  building={room.building}
                  floor={room.floor}
                  isFacultyOnly={room.isFacultyOnly}
                  onViewDetails={() => handleViewDetails(room)}
                  onReportIssue={() => handleReportIssue(room)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredRooms.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-base sm:text-lg">
              No rooms found matching \"{searchTerm}\"
            </p>
          </div>
        )}

        {/* Room Details Modal */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-md mx-4 sm:mx-0" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>
                {selectedRoom?.isFacultyOnly ? 'Faculty Room Details' : `Room ${selectedRoom?.id} Details`}
              </DialogTitle>
            </DialogHeader>
            {selectedRoom && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <div className="mt-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        selectedRoom.status === 'empty' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedRoom.status === 'empty' ? 'Empty' : 'In Use'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Capacity:</span>
                    <p className="text-gray-600 mt-1">{selectedRoom.capacity} seats</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Building:</span>
                    <p className="text-gray-600 mt-1">{selectedRoom.building}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Floor:</span>
                    <p className="text-gray-600 mt-1">{selectedRoom.floor}</p>
                  </div>
                </div>
                {!selectedRoom.isFacultyOnly && (
                  <Button 
                    className="w-full font-medium h-11 sm:h-10 focus:ring-2 focus:ring-[var(--warning-amber)] focus:ring-offset-2"
                    variant="outline"
                    onClick={() => {
                      setIsDetailsOpen(false);
                      handleReportIssue(selectedRoom);
                    }}
                  >
                    Report Issue for this Room
                  </Button>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}