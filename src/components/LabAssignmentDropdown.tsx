import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { AlertTriangle, UserCheck } from 'lucide-react';

interface LabAssignmentDropdownProps {
  userRole: 'student' | 'cr' | 'authority';
  currentAssignee?: string;
  onAssign: (assistantId: string) => void;
  className?: string;
}

const LAB_ASSISTANTS = [
  'Md. Harun-Or-Rashid',
  'Md. Nahidul Islam', 
  'Md. Rakibul Hasan',
  'Md. Enamul Haque',
  'Md. Wakibul Islam',
  'Zayed Hossain',
  'Md. Shahinur Islam',
  'Md. Masud Rana'
];

export function LabAssignmentDropdown({ 
  userRole, 
  currentAssignee, 
  onAssign, 
  className = '' 
}: LabAssignmentDropdownProps) {
  
  // Students can only view, no assignment capability
  if (userRole === 'student') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserCheck className="h-4 w-4" />
          <span>Assigned to: {currentAssignee || 'Not assigned'}</span>
        </div>
      </div>
    );
  }

  // CR can assign only in emergency cases
  const canAssign = userRole === 'authority' || userRole === 'cr';
  const isEmergencyOnly = userRole === 'cr';

  return (
    <div className={`space-y-2 ${className}`}>
      {isEmergencyOnly && (
        <div className="flex items-center gap-2 text-sm text-[var(--warning-amber)]">
          <AlertTriangle className="h-4 w-4" />
          <span>Class Representatives can issue commands only in urgent cases.</span>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <Select value={currentAssignee || ''} onValueChange={onAssign} disabled={!canAssign}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select Lab Assistant" />
          </SelectTrigger>
          <SelectContent>
            {LAB_ASSISTANTS.map((assistant) => (
              <SelectItem key={assistant} value={assistant}>
                {assistant}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {currentAssignee && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAssign('')}
            disabled={!canAssign}
          >
            Clear
          </Button>
        )}
      </div>
      
      {userRole === 'authority' && (
        <p className="text-sm text-muted-foreground">
          Only Authority can confirm resolution status.
        </p>
      )}
    </div>
  );
}