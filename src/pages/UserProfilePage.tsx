import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  Edit3,
  Plus,
  X,
  Camera,
  Save,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about creating beautiful and functional web applications. I love learning new technologies and sharing knowledge with others.",
    avatar: "/api/placeholder/150/150",
    skillsOffered: ["React", "Node.js", "TypeScript", "Python", "AWS"],
    skillsWanted: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Photography"],
    availability: "weekends",
    timezone: "PST",
    totalSwaps: 15,
    rating: 4.8,
    joinDate: "March 2023",
    isAvailable: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setProfile(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()],
      }));
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setProfile(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()],
      }));
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter(skill => skill !== skillToRemove),
    }));
  };

  const removeSkillWanted = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter(skill => skill !== skillToRemove),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="card-glass border border-card-border rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-neon-blue/30">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="neon"
                    className="absolute -bottom-2 -right-2 h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h1>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-neon-teal text-neon-teal" />
                        <span>{profile.rating} rating</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{profile.totalSwaps} swaps completed</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Joined {profile.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={profile.isAvailable}
                        onCheckedChange={(checked) =>
                          setProfile(prev => ({ ...prev, isAvailable: checked }))
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {profile.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <Button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      variant={isEditing ? "neon" : "outline"}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-card border border-card-border">
              <TabsTrigger value="details" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
                Skills & Availability
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
                Activity & Stats
              </TabsTrigger>
            </TabsList>

            {/* Personal Details Tab */}
            <TabsContent value="details">
              <Card className="card-glass border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-neon-blue" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-card border-card-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-card border-card-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-card border-card-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-card border-card-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-card border-card-border min-h-[100px]"
                      placeholder="Tell others about yourself and your skills..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills & Availability Tab */}
            <TabsContent value="skills">
              <div className="space-y-6">
                {/* Skills Offered */}
                <Card className="card-glass border-card-border">
                  <CardHeader>
                    <CardTitle className="text-neon-teal">Skills I Offer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.skillsOffered.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-neon-teal/10 text-neon-teal border-neon-teal/30 pr-1"
                        >
                          {skill}
                          {isEditing && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-4 w-4 ml-1 hover:bg-status-error/20"
                              onClick={() => removeSkillOffered(skill)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill you can teach"
                          value={newSkillOffered}
                          onChange={(e) => setNewSkillOffered(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addSkillOffered()}
                          className="bg-card border-card-border"
                        />
                        <Button onClick={addSkillOffered} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Skills Wanted */}
                <Card className="card-glass border-card-border">
                  <CardHeader>
                    <CardTitle className="text-neon-purple">Skills I Want to Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.skillsWanted.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-neon-purple/10 text-neon-purple border-neon-purple/30 pr-1"
                        >
                          {skill}
                          {isEditing && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-4 w-4 ml-1 hover:bg-status-error/20"
                              onClick={() => removeSkillWanted(skill)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill you want to learn"
                          value={newSkillWanted}
                          onChange={(e) => setNewSkillWanted(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addSkillWanted()}
                          className="bg-card border-card-border"
                        />
                        <Button onClick={addSkillWanted} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card className="card-glass border-card-border">
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="availability">Preferred Time</Label>
                        <Select
                          value={profile.availability}
                          onValueChange={(value) => 
                            setProfile(prev => ({ ...prev, availability: value }))
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="bg-card border-card-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="card-glass border-card-border">
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                            <SelectItem value="evenings">Evenings</SelectItem>
                            <SelectItem value="mornings">Mornings</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={profile.timezone}
                          onValueChange={(value) => 
                            setProfile(prev => ({ ...prev, timezone: value }))
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="bg-card border-card-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="card-glass border-card-border">
                            <SelectItem value="PST">Pacific (PST)</SelectItem>
                            <SelectItem value="MST">Mountain (MST)</SelectItem>
                            <SelectItem value="CST">Central (CST)</SelectItem>
                            <SelectItem value="EST">Eastern (EST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Activity & Stats Tab */}
            <TabsContent value="activity">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-glass border-card-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neon-teal">{profile.totalSwaps}</div>
                      <p className="text-sm text-muted-foreground">Total Swaps</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-glass border-card-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neon-blue">{profile.rating}</div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-glass border-card-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neon-purple">{profile.skillsOffered.length}</div>
                      <p className="text-sm text-muted-foreground">Skills Offered</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}