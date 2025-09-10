import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronRight, Clock, User, CheckCircle } from 'lucide-react';

interface HistoryEntry {
  id: string;
  date: string;
  action: string;
  user: string;
  role: 'student' | 'cr' | 'authority';
  assignedTo?: string;
  status: 'reported' | 'assigned' | 'confirmed' | 'resolved';
}

interface HistoryTimelineProps {
  roomId: string;
  entries: HistoryEntry[];
  className?: string;
}

export function HistoryTimeline({ roomId, entries, className = '' }: HistoryTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'authority': return 'bg-red-100 text-red-800';
      case 'cr': return 'bg-orange-100 text-orange-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (entries.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">No history available for {roomId}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 mb-3 p-0 h-auto font-medium"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Clock className="h-4 w-4" />
          History ({entries.length} entries)
        </Button>

        {isExpanded && (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div key={entry.id} className="relative">
                {/* Timeline line */}
                {index < entries.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-6 bg-border"></div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    {entry.status === 'resolved' ? (
                      <CheckCircle className="h-4 w-4 text-[var(--success-green)]" />
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(entry.status)}`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getRoleColor(entry.role)}`}>
                        {entry.role.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    
                    <p className="text-sm text-foreground">{entry.action}</p>
                    
                    {entry.assignedTo && (
                      <div className="flex items-center gap-1 mt-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Assigned to: {entry.assignedTo}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}