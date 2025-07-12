import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Check,
  X,
  Clock,
  ArrowRight,
  Trash2,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SwapRequest {
  id: string;
  type: "sent" | "received";
  otherUser: {
    name: string;
    avatar: string;
    rating: number;
  };
  mySkill: string;
  theirSkill: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export default function RequestsDashboard() {
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<SwapRequest[]>([
    {
      id: "1",
      type: "sent",
      otherUser: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/80/80",
        rating: 4.9,
      },
      mySkill: "React",
      theirSkill: "UI/UX Design",
      message: "Hi Sarah! I'd love to learn UI/UX design from you. I have 3+ years of React experience and can help you with modern React patterns, hooks, and performance optimization.",
      status: "pending",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      type: "received",
      otherUser: {
        name: "Marcus Thompson",
        avatar: "/api/placeholder/80/80",
        rating: 4.7,
      },
      mySkill: "Node.js",
      theirSkill: "Photography",
      message: "Hey! I'm a professional photographer and would love to learn backend development. I can teach you portrait photography, lighting, and photo editing.",
      status: "pending",
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      id: "3",
      type: "sent",
      otherUser: {
        name: "Elena Rodriguez",
        avatar: "/api/placeholder/80/80",
        rating: 4.8,
      },
      mySkill: "TypeScript",
      theirSkill: "Spanish",
      message: "Hola Elena! I'd love to learn Spanish from a native speaker. I can teach you TypeScript and help with type safety in large applications.",
      status: "accepted",
      createdAt: "2024-01-13T09:15:00Z",
    },
    {
      id: "4",
      type: "received",
      otherUser: {
        name: "David Kim",
        avatar: "/api/placeholder/80/80",
        rating: 4.6,
      },
      mySkill: "Python",
      theirSkill: "Guitar",
      message: "I'm a music teacher and would love to learn Python for data analysis. I can teach you guitar, music theory, and help you develop your musical skills.",
      status: "rejected",
      createdAt: "2024-01-12T14:20:00Z",
    },
  ]);

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: "accepted" as const } : req
      )
    );
    toast({
      title: "Request Accepted!",
      description: "The swap request has been accepted. You can now start coordinating your skill exchange.",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: "rejected" as const } : req
      )
    );
    toast({
      title: "Request Rejected",
      description: "The swap request has been rejected.",
    });
  };

  const handleDeleteRequest = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Deleted",
      description: "The swap request has been removed from your dashboard.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-status-pending text-white";
      case "accepted":
        return "bg-status-success text-white";
      case "rejected":
        return "bg-status-error text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "accepted":
        return <Check className="h-3 w-3" />;
      case "rejected":
        return <X className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const sentRequests = requests.filter(req => req.type === "sent");
  const receivedRequests = requests.filter(req => req.type === "received");

  const RequestCard = ({ request }: { request: SwapRequest }) => (
    <Card className="card-glass border-card-border hover-scale transition-smooth">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12 border-2 border-neon-blue/30">
              <AvatarImage src={request.otherUser.avatar} alt={request.otherUser.name} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {request.otherUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {request.otherUser.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>⭐ {request.otherUser.rating}</span>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(request.createdAt)}
                </span>
              </div>
            </div>
          </div>
          
          <Badge className={getStatusColor(request.status)}>
            {getStatusIcon(request.status)}
            <span className="ml-1 capitalize">{request.status}</span>
          </Badge>
        </div>

        {/* Skills Exchange */}
        <div className="flex items-center justify-center space-x-4 mb-4 p-4 bg-gradient-card rounded-lg">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">
              {request.type === "sent" ? "You Teach" : "They Teach"}
            </div>
            <Badge className="bg-neon-teal text-black font-medium">
              {request.type === "sent" ? request.mySkill : request.theirSkill}
            </Badge>
          </div>
          
          <ArrowRight className="h-5 w-5 text-neon-blue" />
          
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">
              {request.type === "sent" ? "You Learn" : "They Learn"}
            </div>
            <Badge className="bg-neon-purple text-white font-medium">
              {request.type === "sent" ? request.theirSkill : request.mySkill}
            </Badge>
          </div>
        </div>

        {/* Message */}
        {request.message && (
          <div className="mb-4 p-3 bg-card rounded-lg border border-card-border">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Message:</span>
            </div>
            <p className="text-sm text-foreground">{request.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          {request.type === "received" && request.status === "pending" && (
            <>
              <Button
                onClick={() => handleRejectRequest(request.id)}
                variant="outline"
                size="sm"
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={() => handleAcceptRequest(request.id)}
                variant="neon"
                size="sm"
              >
                <Check className="h-4 w-4 mr-2" />
                Accept
              </Button>
            </>
          )}

          {(request.status === "rejected" || 
            (request.type === "sent" && request.status === "pending")) && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="card-glass border-card-border">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Request</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this swap request? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteRequest(request.id)}
                    className="bg-status-error hover:bg-status-error/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {request.status === "accepted" && (
            <Button variant="neon" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Swap Requests</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your skill exchange requests
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue">{requests.length}</div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                </div>
              </CardContent>
            </Card>
            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-status-pending">
                    {requests.filter(r => r.status === "pending").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-status-success">
                    {requests.filter(r => r.status === "accepted").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                </div>
              </CardContent>
            </Card>
            <Card className="card-glass border-card-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-status-error">
                    {requests.filter(r => r.status === "rejected").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requests Tabs */}
          <Tabs defaultValue="received" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-card border border-card-border">
              <TabsTrigger 
                value="received" 
                className="data-[state=active]:bg-neon-blue data-[state=active]:text-white"
              >
                Received ({receivedRequests.length})
              </TabsTrigger>
              <TabsTrigger 
                value="sent"
                className="data-[state=active]:bg-neon-purple data-[state=active]:text-white"
              >
                Sent ({sentRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="received">
              {receivedRequests.length > 0 ? (
                <div className="space-y-4">
                  {receivedRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              ) : (
                <Card className="card-glass border-card-border">
                  <CardContent className="pt-12 pb-12 text-center">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No received requests
                    </h3>
                    <p className="text-muted-foreground">
                      You haven't received any swap requests yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="sent">
              {sentRequests.length > 0 ? (
                <div className="space-y-4">
                  {sentRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              ) : (
                <Card className="card-glass border-card-border">
                  <CardContent className="pt-12 pb-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No sent requests
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't sent any swap requests yet.
                    </p>
                    <Button variant="neon" onClick={() => window.location.href = "/"}>
                      Browse Skills
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}