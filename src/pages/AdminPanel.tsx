import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
  Users,
  MessageSquare,
  Download,
  MoreVertical,
  Ban,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Bell,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "banned";
  joinDate: string;
  totalSwaps: number;
  rating: number;
  reports: number;
}

interface SwapActivity {
  id: string;
  userA: string;
  userB: string;
  skillA: string;
  skillB: string;
  status: "active" | "completed" | "cancelled";
  date: string;
}

interface Report {
  id: string;
  reportedUser: string;
  reportedBy: string;
  reason: string;
  description: string;
  status: "pending" | "resolved" | "dismissed";
  date: string;
}

export default function AdminPanel() {
  const { toast } = useToast();
  
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@example.com",
      status: "active",
      joinDate: "2024-01-15",
      totalSwaps: 23,
      rating: 4.9,
      reports: 0,
    },
    {
      id: "2",
      name: "Marcus Thompson",
      email: "marcus@example.com",
      status: "active",
      joinDate: "2024-01-10",
      totalSwaps: 18,
      rating: 4.7,
      reports: 1,
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      email: "elena@example.com",
      status: "suspended",
      joinDate: "2024-01-05",
      totalSwaps: 31,
      rating: 4.8,
      reports: 3,
    },
  ]);

  const [swapActivities] = useState<SwapActivity[]>([
    {
      id: "1",
      userA: "Sarah Chen",
      userB: "John Doe",
      skillA: "React",
      skillB: "UI/UX Design",
      status: "active",
      date: "2024-01-15",
    },
    {
      id: "2",
      userA: "Marcus Thompson",
      userB: "Elena Rodriguez",
      skillA: "Photography",
      skillB: "Spanish",
      status: "completed",
      date: "2024-01-14",
    },
    {
      id: "3",
      userA: "David Kim",
      userB: "Jennifer Wu",
      skillA: "Guitar",
      skillB: "Graphic Design",
      status: "cancelled",
      date: "2024-01-13",
    },
  ]);

  const [reports] = useState<Report[]>([
    {
      id: "1",
      reportedUser: "Marcus Thompson",
      reportedBy: "Sarah Chen",
      reason: "Inappropriate content",
      description: "User posted offensive messages during skill exchange session.",
      status: "pending",
      date: "2024-01-16",
    },
    {
      id: "2",
      reportedUser: "Elena Rodriguez",
      reportedBy: "David Kim",
      reason: "No-show",
      description: "User didn't show up for scheduled skill exchange session without notice.",
      status: "resolved",
      date: "2024-01-15",
    },
  ]);

  const [notification, setNotification] = useState("");

  const handleSendNotification = () => {
    if (notification.trim()) {
      toast({
        title: "Notification Sent",
        description: "Global notification has been sent to all users.",
      });
      setNotification("");
    }
  };

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Download Started",
      description: `${reportType} report is being generated and will be downloaded shortly.`,
    });
  };

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: `User ${action}`,
      description: `User has been ${action.toLowerCase()} successfully.`,
    });
  };

  const handleReportAction = (reportId: string, action: string) => {
    toast({
      title: `Report ${action}`,
      description: `Report has been ${action.toLowerCase()} successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-status-success text-white";
      case "suspended":
        return "bg-status-warning text-white";
      case "banned":
        return "bg-status-error text-white";
      case "completed":
        return "bg-status-success text-white";
      case "cancelled":
        return "bg-status-error text-white";
      case "pending":
        return "bg-status-pending text-white";
      case "resolved":
        return "bg-status-success text-white";
      case "dismissed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const stats = {
    totalUsers: users.length,
    activeSwaps: swapActivities.filter(s => s.status === "active").length,
    pendingReports: reports.filter(r => r.status === "pending").length,
    completedSwaps: swapActivities.filter(s => s.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Admin Panel</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitor and manage the SkillSwap platform
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-neon-blue">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-neon-blue" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Swaps</p>
                    <p className="text-2xl font-bold text-neon-teal">{stats.activeSwaps}</p>
                  </div>
                  <Activity className="h-8 w-8 text-neon-teal" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Reports</p>
                    <p className="text-2xl font-bold text-status-warning">{stats.pendingReports}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-status-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Swaps</p>
                    <p className="text-2xl font-bold text-status-success">{stats.completedSwaps}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-status-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card border border-card-border">
              <TabsTrigger value="users" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
                Users
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
                Activity
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="card-glass border-card-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-neon-blue" />
                    User Management
                  </CardTitle>
                  <Button
                    onClick={() => handleDownloadReport("Users")}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Swaps</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.totalSwaps}</TableCell>
                          <TableCell>⭐ {user.rating}</TableCell>
                          <TableCell>
                            {user.reports > 0 ? (
                              <span className="text-status-warning">{user.reports}</span>
                            ) : (
                              user.reports
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="card-glass border-card-border">
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "Suspended")}
                                >
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  Suspend
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "Banned")}
                                  className="text-status-error"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Ban
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "Activated")}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="card-glass border-card-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-neon-teal" />
                    Swap Activity
                  </CardTitle>
                  <Button
                    onClick={() => handleDownloadReport("Activity")}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User A</TableHead>
                        <TableHead>Skill A</TableHead>
                        <TableHead>User B</TableHead>
                        <TableHead>Skill B</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {swapActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.userA}</TableCell>
                          <TableCell>
                            <Badge className="bg-neon-teal/10 text-neon-teal border-neon-teal/30">
                              {activity.skillA}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{activity.userB}</TableCell>
                          <TableCell>
                            <Badge className="bg-neon-purple/10 text-neon-purple border-neon-purple/30">
                              {activity.skillB}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{activity.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card className="card-glass border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-status-warning" />
                    User Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reports.map((report) => (
                    <Card key={report.id} className="border border-card-border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              Report against {report.reportedUser}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Reported by {report.reportedBy} on {report.date}
                            </p>
                          </div>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium text-muted-foreground">Reason:</p>
                          <p className="text-sm text-foreground">{report.reason}</p>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium text-muted-foreground">Description:</p>
                          <p className="text-sm text-foreground">{report.description}</p>
                        </div>

                        {report.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleReportAction(report.id, "Resolved")}
                              variant="neon"
                              size="sm"
                            >
                              Resolve
                            </Button>
                            <Button
                              onClick={() => handleReportAction(report.id, "Dismissed")}
                              variant="outline"
                              size="sm"
                            >
                              Dismiss
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="card-glass border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-neon-purple" />
                    Send Global Notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification">Notification Message</Label>
                    <Textarea
                      id="notification"
                      placeholder="Enter a message to send to all users..."
                      value={notification}
                      onChange={(e) => setNotification(e.target.value)}
                      className="bg-card border-card-border focus:border-neon-blue min-h-[120px]"
                    />
                  </div>
                  
                  <Button
                    onClick={handleSendNotification}
                    disabled={!notification.trim()}
                    variant="neon"
                    size="lg"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                  
                  <div className="mt-6 p-4 bg-card rounded-lg border border-card-border">
                    <h4 className="font-medium text-foreground mb-2">Recent Notifications</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Maintenance scheduled for tomorrow 2:00 AM - 4:00 AM PST</p>
                      <p>• New skill categories added: Digital Marketing, Video Editing</p>
                      <p>• Platform update v2.1 deployed successfully</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}