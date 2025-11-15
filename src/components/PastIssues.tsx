import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Search,
  Filter,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { useData, type Issue } from "./DataContext";

export function PastIssues() {
  const { user } = useAuth();
  const { issues } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "in-progress" | "resolved"
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "low" | "medium" | "high"
  >("all");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || issue.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const handleViewDetails = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailsOpen(true);
  };

  const stats = {
    total: issues.length,
    pending: issues.filter((i) => i.status === "pending").length,
    inProgress: issues.filter((i) => i.status === "in-progress").length,
    resolved: issues.filter((i) => i.status === "resolved").length,
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Issue Management Dashboard
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Welcome, {user?.name}. View and manage all reported classroom
            issues.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card>
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
              <div className="text-center">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-muted-foreground" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.total}
                </div>
                <p className="text-xs text-muted-foreground">Total Issues</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
              <div className="text-center">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.pending}
                </div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
              <div className="text-center">
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.inProgress}
                </div>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
              <div className="text-center">
                <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-green-600" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.resolved}
                </div>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Room ID, category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 sm:h-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm">
                  Status
                </Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value: any) => setStatusFilter(value)}
                >
                  <SelectTrigger id="status" className="h-11 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm">
                  Priority
                </Label>
                <Select
                  value={priorityFilter}
                  onValueChange={(value: any) => setPriorityFilter(value)}
                >
                  <SelectTrigger id="priority" className="h-11 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues Table/Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">All Issues</CardTitle>
            <CardDescription className="text-sm">
              {filteredIssues.length} issue
              {filteredIssues.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden lg:block rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">ID</TableHead>
                    <TableHead className="whitespace-nowrap">Room</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Category
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Reported By
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Priority
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Assigned To
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No issues found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredIssues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-medium">
                          {issue.id}
                        </TableCell>
                        <TableCell>{issue.roomId}</TableCell>
                        <TableCell>{issue.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{issue.reportedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {issue.reportedAt.toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(issue.priority)}
                        </TableCell>
                        <TableCell>{getStatusBadge(issue.status)}</TableCell>
                        <TableCell>
                          {issue.assignedTo ? (
                            <span className="text-sm">{issue.assignedTo}</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              Unassigned
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(issue)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {filteredIssues.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No issues found matching your filters
                </div>
              ) : (
                filteredIssues.map((issue) => (
                  <Card key={issue.id} className="bg-muted/30">
                    <CardContent className="pt-4 pb-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-sm">
                              Issue #{issue.id}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              Room {issue.roomId}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(issue)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {getPriorityBadge(issue.priority)}
                          {getStatusBadge(issue.status)}
                          <Badge variant="outline" className="text-xs">
                            {issue.category}
                          </Badge>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3" />
                            <span>Reported by {issue.reportedBy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{issue.reportedAt.toLocaleDateString()}</span>
                          </div>
                          {issue.assignedTo && (
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3" />
                              <span>Assigned to {issue.assignedTo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Issue Details Modal */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent
            className="max-w-2xl mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto"
            aria-describedby={undefined}
          >
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                Issue Details - {selectedIssue?.id}
              </DialogTitle>
            </DialogHeader>
            {selectedIssue && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Room
                    </Label>
                    <p className="font-semibold">{selectedIssue.roomId}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Category
                    </Label>
                    <p className="font-semibold">{selectedIssue.category}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Priority
                    </Label>
                    <div className="mt-1">
                      {getPriorityBadge(selectedIssue.priority)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Status
                    </Label>
                    <div className="mt-1">
                      {getStatusBadge(selectedIssue.status)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Reported By
                    </Label>
                    <p className="text-sm">{selectedIssue.reportedBy}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Reported On
                    </Label>
                    <p className="text-sm">
                      {selectedIssue.reportedAt.toLocaleDateString()}
                    </p>
                  </div>
                  {selectedIssue.assignedTo && (
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Assigned To
                      </Label>
                      <p className="text-sm">{selectedIssue.assignedTo}</p>
                    </div>
                  )}
                  {selectedIssue.resolvedAt && (
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Resolved On
                      </Label>
                      <p className="text-sm">
                        {selectedIssue.resolvedAt.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Description
                  </Label>
                  <p className="mt-1 text-sm">{selectedIssue.description}</p>
                </div>
                {selectedIssue.resolution && (
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Resolution
                    </Label>
                    <Card className="mt-1 bg-green-50 border-green-200">
                      <CardContent className="pt-4">
                        <p className="text-sm">{selectedIssue.resolution}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
