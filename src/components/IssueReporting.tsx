import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useData } from './DataContext';

const PARANOMA_ROOM_OPTIONS = [
  'P-202', 'P-205', 'P-206', 'P-207', 'P-209', 'P-210', 'P-211',
  'P-304', 'P-307', 'P-308', 'P-314', 'P-713'
];

const ISSUE_CATEGORIES = [
  'Projector',
  'PCs',
  'Fan/Light',
  'Furniture',
  'Cleanliness',
  'Air Conditioning',
  'Network/WiFi',
  'Other'
];

export function IssueReporting() {
  const { user } = useAuth();
  const { addIssue, getActiveIssues } = useData();
  const [formData, setFormData] = useState({
    room: '',
    category: '',
    description: '',
    priority: 'medium',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportedIssues = getActiveIssues().filter(
    issue => issue.reportedBy === user?.name || issue.reportedByRole === 'cr'
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    addIssue({
      roomId: formData.room,
      category: formData.category,
      description: formData.description,
      reportedBy: user?.name || 'CR',
      reportedByRole: 'cr',
      reportedAt: new Date(),
      status: 'pending',
      priority: formData.priority as 'low' | 'medium' | 'high',
    });

    setShowSuccess(true);
    setIsSubmitting(false);

    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        room: '',
        category: '',
        description: '',
        priority: 'medium',
      });
      setShowSuccess(false);
    }, 3000);
  };

  const handleReset = () => {
    setFormData({
      room: '',
      category: '',
      description: '',
      priority: 'medium',
    });
    setShowSuccess(false);
  };

  const isFormValid = formData.room && formData.category && formData.description.trim();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Resolved</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Report Classroom Issues</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Welcome, {user?.name}. Submit issues for Paranoma building classrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[var(--warning-amber)]" />
                  Report an Issue
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Fill out the form below to report classroom problems
                </CardDescription>
              </CardHeader>

              <CardContent>
                {showSuccess ? (
                  <Alert className="mb-4 sm:mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium text-sm">
                      Thanks! Your report has been submitted. The authority will investigate and take appropriate action.
                    </AlertDescription>
                  </Alert>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Room Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="room">
                      Classroom <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.room}
                      onValueChange={(value) => handleInputChange('room', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="room" className="h-11 sm:h-10">
                        <SelectValue placeholder="Select a classroom" />
                      </SelectTrigger>
                      <SelectContent>
                        {PARANOMA_ROOM_OPTIONS.map((room) => (
                          <SelectItem key={room} value={room}>
                            {room}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Issue Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Issue Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="category" className="h-11 sm:h-10">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ISSUE_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => handleInputChange('priority', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="priority" className="h-11 sm:h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Can wait</SelectItem>
                        <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                        <SelectItem value="high">High - Urgent attention needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about the issue..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={5}
                      disabled={isSubmitting}
                      className="resize-none min-h-[120px]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      type="submit"
                      className="flex-1 h-11 sm:h-10"
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      disabled={isSubmitting}
                      className="h-11 sm:h-10"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Reported Issues */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">My Reported Issues</CardTitle>
                <CardDescription className="text-sm">Track your submitted reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
                  {reportedIssues.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No issues reported yet
                    </p>
                  ) : (
                    reportedIssues.map((issue) => (
                      <Card key={issue.id} className="bg-muted/50">
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold truncate">{issue.roomId}</span>
                              {getPriorityBadge(issue.priority)}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">{issue.category}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {issue.description}
                            </p>
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-xs text-muted-foreground">
                                {issue.reportedAt.toLocaleDateString()}
                              </span>
                              {getStatusBadge(issue.status)}
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