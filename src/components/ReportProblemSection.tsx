import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

// Only Paranoma building rooms - students cannot file complaints for Nexas (faculty) rooms
const PARANOMA_ROOM_OPTIONS = [
  'P-202', 'P-205', 'P-206', 'P-207', 'P-209', 'P-210', 'P-211', 
  'P-304', 'P-307', 'P-308', 'P-314', 'P-713'
];

const ISSUE_CATEGORIES = [
  'Projector',
  'PCs',
  'Fan/Light',
  'Cleanliness',
  'Other'
];

export function ReportProblemSection() {
  const [formData, setFormData] = useState({
    room: '',
    category: '',
    description: '',
    hideIdentity: true,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        room: '',
        category: '',
        description: '',
        hideIdentity: true,
      });
      setShowSuccess(false);
    }, 3000);
  };

  const handleReset = () => {
    setFormData({
      room: '',
      category: '',
      description: '',
      hideIdentity: true,
    });
    setShowSuccess(false);
  };

  const isFormValid = formData.room && formData.category && formData.description.trim();

  return (
    <section id="report-problem" className="py-16 bg-muted/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Report a Problem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Students and CRs can report issues anonymously for Paranoma building classrooms. We'll forward your concerns to the appropriate authority.
          </p>
        </div>

        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[var(--warning-amber)]" />
              Anonymous Complaint Form
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {showSuccess ? (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800 font-medium">
                  Thanks! Your report has been sent to the authority. They will investigate and take appropriate action.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Room Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="room" className="font-medium text-foreground">
                      Room <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.room} 
                      onValueChange={(value) => handleInputChange('room', value)}
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2">
                        <SelectValue placeholder="Select room (Paranoma only)" />
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
                    <Label htmlFor="category" className="font-medium text-foreground">
                      Issue Category <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2">
                        <SelectValue placeholder="Select category" />
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
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium text-foreground">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="resize-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
                  />
                </div>

                {/* Photo Upload Placeholder */}
                <div className="space-y-2">
                  <Label className="font-medium text-foreground">
                    Optional Photo
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      <Button variant="link" className="p-0 h-auto text-[var(--theme-primary)] font-medium">
                        Click to upload
                      </Button>
                      {' '}or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 5MB (Coming Soon)
                    </p>
                  </div>
                </div>

                {/* Privacy Option */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Checkbox
                    id="hideIdentity"
                    checked={formData.hideIdentity}
                    onCheckedChange={(checked) => handleInputChange('hideIdentity', checked as boolean)}
                    className="mt-0.5 focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor="hideIdentity" 
                      className="font-medium text-foreground cursor-pointer"
                    >
                      Hide my name
                    </Label>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      We will send this report to the authority without your personal details. 
                      Your privacy is protected.
                    </p>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={!isFormValid || isSubmitting}
                    className="flex-1 font-medium focus:ring-2 focus:ring-[var(--theme-primary)] focus:ring-offset-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleReset}
                    className="flex-1 font-medium focus:ring-2 focus:ring-muted-foreground focus:ring-offset-2"
                  >
                    Reset
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}