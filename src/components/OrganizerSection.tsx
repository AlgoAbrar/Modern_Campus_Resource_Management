import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ChevronDown, ChevronRight, Monitor, Computer, Fan, Lightbulb, Info } from 'lucide-react';
import { LabAssignmentDropdown } from './LabAssignmentDropdown';
import { HistoryTimeline } from './HistoryTimeline';

interface EquipmentStatus {
  type: 'projector' | 'pcs' | 'fan-light';
  label: string;
  status: 'working' | 'issue';
  icon: React.ReactNode;
}

interface RoomOrganizer {
  roomId: string;
  equipment: EquipmentStatus[];
  assignedTo?: string;
  buildingType: 'paranoma' | 'nexas';
  isFacultyOnly?: boolean;
}

interface HistoryEntry {
  id: string;
  date: string;
  action: string;
  user: string;
  role: 'student' | 'cr' | 'authority';
  assignedTo?: string;
  status: 'reported' | 'assigned' | 'confirmed' | 'resolved';
}

const SAMPLE_ORGANIZER_DATA: RoomOrganizer[] = [
  {
    roomId: 'P-202',
    buildingType: 'paranoma',
    assignedTo: 'Md. Harun-Or-Rashid',
    equipment: [
      { type: 'projector', label: 'Projector', status: 'working', icon: <Monitor className="h-4 w-4" /> },
      { type: 'pcs', label: 'PCs', status: 'working', icon: <Computer className="h-4 w-4" /> },
      { type: 'fan-light', label: 'Fan/Light', status: 'issue', icon: <Lightbulb className="h-4 w-4" /> },
    ]
  },
  {
    roomId: 'P-205',
    buildingType: 'paranoma',
    equipment: [
      { type: 'projector', label: 'Projector', status: 'issue', icon: <Monitor className="h-4 w-4" /> },
      { type: 'pcs', label: 'PCs', status: 'working', icon: <Computer className="h-4 w-4" /> },
      { type: 'fan-light', label: 'Fan/Light', status: 'working', icon: <Fan className="h-4 w-4" /> },
    ]
  },
  {
    roomId: 'P-307',
    buildingType: 'paranoma',
    assignedTo: 'Md. Nahidul Islam',
    equipment: [
      { type: 'projector', label: 'Projector', status: 'working', icon: <Monitor className="h-4 w-4" /> },
      { type: 'pcs', label: 'PCs', status: 'issue', icon: <Computer className="h-4 w-4" /> },
      { type: 'fan-light', label: 'Fan/Light', status: 'working', icon: <Fan className="h-4 w-4" /> },
    ]
  },
  {
    roomId: 'P-314',
    buildingType: 'paranoma',
    equipment: [
      { type: 'projector', label: 'Projector', status: 'working', icon: <Monitor className="h-4 w-4" /> },
      { type: 'pcs', label: 'PCs', status: 'working', icon: <Computer className="h-4 w-4" /> },
      { type: 'fan-light', label: 'Fan/Light', status: 'working', icon: <Fan className="h-4 w-4" /> },
    ]
  },
];

const SAMPLE_HISTORY_DATA: Record<string, HistoryEntry[]> = {
  'P-202': [
    {
      id: '1',
      date: 'Aug 28, 2025',
      action: 'Reported fan not working properly',
      user: 'Anonymous Student',
      role: 'student',
      status: 'reported'
    },
    {
      id: '2',
      date: 'Aug 28, 2025',
      action: 'Assigned to lab assistant for repair',
      user: 'Dr. Rahman',
      role: 'authority',
      assignedTo: 'Md. Harun-Or-Rashid',
      status: 'assigned'
    }
  ],
  'P-205': [
    {
      id: '3',
      date: 'Aug 27, 2025',
      action: 'Projector showing blue screen',
      user: 'Rajesh Kumar (CR)',
      role: 'cr',
      status: 'reported'
    }
  ],
  'P-307': [
    {
      id: '4',
      date: 'Aug 26, 2025',
      action: 'Multiple PC units not booting',
      user: 'Anonymous Student',
      role: 'student',
      status: 'reported'
    },
    {
      id: '5',
      date: 'Aug 26, 2025',
      action: 'Emergency assignment by CR',
      user: 'Fatima Ali (CR)',
      role: 'cr',
      assignedTo: 'Md. Nahidul Islam',
      status: 'assigned'
    },
    {
      id: '6',
      date: 'Aug 27, 2025',
      action: 'Assignment confirmed by authority',
      user: 'Prof. Sharma',
      role: 'authority',
      status: 'confirmed'
    }
  ]
};

export function OrganizerSection() {
  const [openRooms, setOpenRooms] = useState<Set<string>>(new Set());
  const [userRole] = useState<'student' | 'cr' | 'authority'>('student'); // Mock user role
  const [assignments, setAssignments] = useState<Record<string, string>>({
    'P-202': 'Md. Harun-Or-Rashid',
    'P-307': 'Md. Nahidul Islam'
  });

  const toggleRoom = (roomId: string) => {
    const newOpenRooms = new Set(openRooms);
    if (newOpenRooms.has(roomId)) {
      newOpenRooms.delete(roomId);
    } else {
      newOpenRooms.add(roomId);
    }
    setOpenRooms(newOpenRooms);
  };

  const handleAssignment = (roomId: string, assistantId: string) => {
    setAssignments(prev => ({
      ...prev,
      [roomId]: assistantId
    }));
  };

  // Filter out resolved issues - only show active issues (reported, assigned, confirmed)
  const getActiveHistory = (roomId: string) => {
    const history = SAMPLE_HISTORY_DATA[roomId] || [];
    return history.filter(entry => entry.status !== 'resolved');
  };

  return (
    <section id="organizer" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Classroom Organizer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quickly see whether essential classroom equipment is working properly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {SAMPLE_ORGANIZER_DATA.map((room) => (
            <Card key={room.roomId} className="border border-border">
              <Collapsible 
                open={openRooms.has(room.roomId)} 
                onOpenChange={() => toggleRoom(room.roomId)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg font-semibold text-foreground">
                          Room {room.roomId}
                        </CardTitle>
                        {room.isFacultyOnly && (
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            Faculty Only
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {room.equipment.filter(eq => eq.status === 'issue').length > 0 
                            ? `${room.equipment.filter(eq => eq.status === 'issue').length} issue(s)`
                            : 'All working'
                          }
                        </span>
                        {openRooms.has(room.roomId) ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    {/* Equipment Status */}
                    {room.equipment.map((equipment) => (
                      <div key={equipment.type} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-muted-foreground">
                            {equipment.icon}
                          </div>
                          <span className="font-medium text-foreground">
                            {equipment.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={equipment.status === 'working' ? 'default' : 'destructive'}
                            className={`font-medium ${
                              equipment.status === 'working' 
                                ? 'bg-[var(--success-green)] text-white hover:bg-[var(--success-green)]/90'
                                : 'bg-[var(--alert-red)] text-white hover:bg-[var(--alert-red)]/90'
                            }`}
                          >
                            {equipment.status === 'working' ? 'Working' : 'Issue'}
                          </Badge>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">Only CR/Admin can update status</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ))}

                    {/* Lab Assistant Assignment */}
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-3">Lab Assistant Assignment</h4>
                      <LabAssignmentDropdown
                        userRole={userRole}
                        currentAssignee={assignments[room.roomId]}
                        onAssign={(assistantId) => handleAssignment(room.roomId, assistantId)}
                      />
                    </div>

                    {/* History Timeline - Only show active (non-resolved) issues */}
                    <HistoryTimeline
                      roomId={room.roomId}
                      entries={getActiveHistory(room.roomId)}
                      className="mt-4"
                    />
                    
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        <span>
                          <strong>Students (view-only):</strong> You can see the status but cannot update it.{' '}
                          <Button variant="link" className="p-0 h-auto text-blue-800 dark:text-blue-200 underline font-medium">
                            Login as CR/Admin to update
                          </Button>
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}