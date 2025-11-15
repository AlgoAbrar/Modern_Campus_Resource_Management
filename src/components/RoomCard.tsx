import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Users, MapPin, AlertCircle, Eye, Shield } from 'lucide-react';

interface RoomCardProps {
  roomId: string;
  status: 'empty' | 'in-use';
  capacity: number;
  building: string;
  floor: string;
  isFacultyOnly?: boolean;
  onViewDetails: () => void;
  onReportIssue: () => void;
}

export function RoomCard({ 
  roomId, 
  status, 
  capacity, 
  building, 
  floor, 
  isFacultyOnly = false,
  onViewDetails, 
  onReportIssue 
}: RoomCardProps) {
  const isEmpty = status === 'empty';
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isFacultyOnly ? 'Faculty Room' : roomId}
            </h3>
            {isFacultyOnly && (
              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300 font-medium">
                <Shield className="h-3 w-3 mr-1" />
                Faculty Only
              </Badge>
            )}
          </div>
          <Badge 
            variant={isEmpty ? "default" : "secondary"}
            className={`${
              isEmpty 
                ? 'bg-[var(--success-green)] text-white hover:bg-[var(--success-green)]/90' 
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            } font-medium`}
          >
            {isEmpty ? 'Empty' : 'In Use'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{capacity} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{building} - {floor}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 font-medium text-sm h-9 focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
            onClick={onViewDetails}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {!isFacultyOnly && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 font-medium text-sm h-9 text-[var(--warning-amber)] hover:text-[var(--warning-amber)] hover:bg-amber-50 focus:ring-2 focus:ring-[var(--warning-amber)] focus:ring-offset-2"
              onClick={onReportIssue}
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              Report Issue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}