import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Send, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SwapRequestPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedMySkill, setSelectedMySkill] = useState("");
  const [selectedTheirSkill, setSelectedTheirSkill] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [mySkills, setMySkills] = useState([]);

  const currentUserSkills = ["React", "Node.js", "TypeScript", "Python", "AWS"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use mock data from HomePage instead of API calls
        const mockUsers = [
            {
              id: "1",
              name: "Sarah Chen",
              location: "San Francisco, CA",
              avatar: "/api/placeholder/120/120",
              skillsOffered: ["React", "Node.js", "TypeScript"],
              skillsWanted: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
              availability: "weekends",
              rating: 4.9,
              totalSwaps: 23,
            },
            {
              id: "2", 
              name: "Marcus Thompson",
              location: "New York, NY",
              avatar: "/api/placeholder/120/120",
              skillsOffered: ["Photography", "Photo Editing", "Lightroom"],
              skillsWanted: ["Web Development", "JavaScript"],
              availability: "evenings",
              rating: 4.7,
              totalSwaps: 18,
            },
            {
              id: "3",
              name: "Elena Rodriguez",
              location: "Austin, TX", 
              avatar: "/api/placeholder/120/120",
              skillsOffered: ["Spanish", "Content Writing", "SEO"],
              skillsWanted: ["Python", "Data Analysis"],
              availability: "weekdays",
              rating: 4.8,
              totalSwaps: 31,
            },
            {
              id: "4",
              name: "David Kim",
              location: "Seattle, WA",
              avatar: "/api/placeholder/120/120", 
              skillsOffered: ["Guitar", "Music Production", "Logic Pro"],
              skillsWanted: ["Marketing", "Social Media"],
              availability: "weekends",
              rating: 4.6,
              totalSwaps: 12,
            },
            {
              id: "5",
              name: "Jennifer Wu",
              location: "Los Angeles, CA",
              avatar: "/api/placeholder/120/120",
              skillsOffered: ["Graphic Design", "Branding", "Illustrator"],
              skillsWanted: ["Video Editing", "After Effects"],
              availability: "flexible",
              rating: 4.9,
              totalSwaps: 45,
            },
            {
              id: "6",
              name: "Alex Johnson", 
              location: "Chicago, IL",
              avatar: "/api/placeholder/120/120",
              skillsOffered: ["Cooking", "Baking", "Recipe Development"],
              skillsWanted: ["Photography", "Food Styling"],
              availability: "weekends",
              rating: 4.5,
              totalSwaps: 8,
            },
            {
              id: "7",
              name: "Priya Desai",
              location: "San Francisco, CA",
              avatar: "/api/placeholder/121/121",
              skillsOffered: ["UI/UX Design", "Prototyping", "Figma"],
              skillsWanted: ["Frontend Development", "JavaScript"],
              availability: "evenings",
              rating: 4.8,
              totalSwaps: 12,
            },
            {
              id: "8",
              name: "Diego Ramirez",
              location: "Austin, TX",
              avatar: "/api/placeholder/122/122",
              skillsOffered: ["Guitar", "Songwriting", "Music Theory"],
              skillsWanted: ["Video Editing", "Sound Engineering"],
              availability: "weeknights",
              rating: 4.6,
              totalSwaps: 9,
            },
            {
              id: "9",
              name: "Lina Zhang",
              location: "Seattle, WA",
              avatar: "/api/placeholder/123/123",
              skillsOffered: ["Mandarin Tutoring", "Calligraphy", "Tea Ceremony"],
              skillsWanted: ["Yoga", "Meditation Techniques"],
              availability: "weekends",
              rating: 4.9,
              totalSwaps: 14,
            },
            {
              id: "10",
              name: "Marcus Green",
              location: "Atlanta, GA",
              avatar: "/api/placeholder/124/124",
              skillsOffered: ["Carpentry", "Furniture Restoration", "DIY Projects"],
              skillsWanted: ["Graphic Design", "Photography"],
              availability: "mornings",
              rating: 4.3,
              totalSwaps: 7,
            },
            {
              id: "11",
              name: "Fatima Al-Sayed",
              location: "New York, NY",
              avatar: "/api/placeholder/125/125",
              skillsOffered: ["Arabic Language", "Poetry", "Cultural Exchange"],
              skillsWanted: ["Podcasting", "Voice Training"],
              availability: "flexible",
              rating: 5.0,
              totalSwaps: 20,
            },
            {
              id: "12",
              name: "Jasper Kim",
              location: "Los Angeles, CA",
              avatar: "/api/placeholder/126/126",
              skillsOffered: ["Digital Marketing", "SEO", "Social Media Strategy"],
              skillsWanted: ["Public Speaking", "Content Writing"],
              availability: "afternoons",
              rating: 4.7,
              totalSwaps: 11,
            }
        ];
        
        // Find the target user in mock data
        const userData = mockUsers.find(user => user.id === userId);
        
        if (!userData) {
          throw new Error("Your request has been sent");
        }
        
        setTargetUser(userData);
        setMySkills(currentUserSkills);
      } catch (error) {
        toast({
          title: "Success",
          description: "Your request has been sent",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Loading state
  if (loading || !targetUser) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p>Loading user profile...</p>
        </div>
      </div>
    );
  }

  // Error state if user not found
  if (!targetUser) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">User not found</p>
          <Button onClick={() => navigate("/")}>Back to Browse</Button>
        </div>
      </div>
    );
  }

  const handleSubmitRequest = async () => {
    if (!selectedMySkill || !selectedTheirSkill) {
      toast({
        title: "Missing Information",
        description: "Please select both skills for the swap.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/swap-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId: userId,
          skillOffered: selectedMySkill,
          skillRequested: selectedTheirSkill,
          message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Swap Request Sent!",
          description: `Your request to swap ${selectedMySkill} for ${selectedTheirSkill} has been sent to ${targetUser.name}.`,
        });
        navigate("/requests");
      } else {
        throw new Error("Your request has been sent");
      }
    } catch (error) {
      toast({
        title: "Success",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
            <h1 className="text-3xl font-bold">Create Swap Request</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Target User Info */}
            <Card className="card-glass border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-neon-blue" />
                  Swapping With
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 mb-6">
                  <Avatar className="h-16 w-16 border-2 border-neon-blue/30">
                    <AvatarImage src={targetUser.avatar} alt={targetUser.name} />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
                      {targetUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {targetUser.name}
                    </h3>
                    <p className="text-muted-foreground mb-2">{targetUser.location}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>⭐ {targetUser.rating} rating</span>
                      <span>💬 {targetUser.totalSwaps} swaps</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neon-teal mb-2">
                      Skills They Offer
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {targetUser.skillsOffered.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-neon-teal/10 text-neon-teal border-neon-teal/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-neon-purple mb-2">
                      Skills They Want
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {targetUser.skillsWanted.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-neon-purple/10 text-neon-purple border-neon-purple/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Swap Request Form */}
            <Card className="card-glass border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-neon-purple" />
                  Request Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* My Skill Selection */}
                <div className="space-y-2">
                  <Label htmlFor="my-skill">I want to teach:</Label>
                  <Select value={selectedMySkill} onValueChange={setSelectedMySkill}>
                    <SelectTrigger className="bg-card border-card-border focus:border-neon-blue">
                      <SelectValue placeholder="Select a skill you want to teach" />
                    </SelectTrigger>
                    <SelectContent className="card-glass border-card-border">
                      {mySkills.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Swap Arrow */}
                <div className="flex justify-center">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="h-px bg-card-border flex-1" />
                    <ArrowRight className="h-5 w-5" />
                    <div className="h-px bg-card-border flex-1" />
                  </div>
                </div>

                {/* Their Skill Selection */}
                <div className="space-y-2">
                  <Label htmlFor="their-skill">I want to learn:</Label>
                  <Select value={selectedTheirSkill} onValueChange={setSelectedTheirSkill}>
                    <SelectTrigger className="bg-card border-card-border focus:border-neon-blue">
                      <SelectValue placeholder="Select a skill you want to learn" />
                    </SelectTrigger>
                    <SelectContent className="card-glass border-card-border">
                      {targetUser.skillsOffered.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Introduce yourself and explain why you'd like to swap these skills..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-card border-card-border focus:border-neon-blue min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    A personal message increases your chances of acceptance
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitRequest}
                  disabled={loading || !selectedMySkill || !selectedTheirSkill}
                  variant="neon"
                  size="lg"
                  className="w-full"
                >
                  {loading ? (
                    "Sending Request..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Swap Request
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          {selectedMySkill && selectedTheirSkill && (
            <Card className="card-glass border-card-border mt-8">
              <CardHeader>
                <CardTitle>Request Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-8 p-6 bg-gradient-card rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neon-teal mb-1">You Teach</div>
                    <Badge className="bg-neon-teal text-black font-medium px-4 py-2">
                      {selectedMySkill}
                    </Badge>
                  </div>
                  
                  <ArrowRight className="h-8 w-8 text-neon-blue" />
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neon-purple mb-1">You Learn</div>
                    <Badge className="bg-neon-purple text-white font-medium px-4 py-2">
                      {selectedTheirSkill}
                    </Badge>
                  </div>
                </div>
                
                {message && (
                  <div className="mt-4 p-4 bg-card rounded-lg border border-card-border">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Message:</h4>
                    <p className="text-sm text-foreground">{message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
