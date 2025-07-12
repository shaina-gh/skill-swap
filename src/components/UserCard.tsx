import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star, MessageSquare } from "lucide-react";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    location: string;
    avatar: string;
    skillsOffered: string[];
    skillsWanted: string[];
    availability: string;
    rating: number;
    totalSwaps: number;
  };
  onRequestSwap: (userId: string) => void;
}

export default function UserCard({ user, onRequestSwap }: UserCardProps) {
  return (
    <Card className="card-glass hover-scale transition-smooth group border-card-border hover:border-neon-blue/50 overflow-hidden">
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-neon-blue/30 group-hover:border-neon-blue transition-smooth">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 truncate group-hover:text-neon-blue transition-smooth">
              {user.name}
            </h3>
            
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{user.location}</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-3 w-3 mr-1 fill-neon-teal text-neon-teal" />
                <span>{user.rating}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>{user.totalSwaps} swaps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-neon-teal mb-2">Offers</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="skill-tag bg-neon-teal/10 text-neon-teal border-neon-teal/30 hover:bg-neon-teal/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-neon-purple mb-2">Seeks</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="skill-tag bg-neon-purple/10 text-neon-purple border-neon-purple/30 hover:bg-neon-purple/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>Available {user.availability}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onRequestSwap(user.id)}
          className="w-full"
          variant="neon"
          size="lg"
        >
          Request Swap
        </Button>
      </CardContent>
    </Card>
  );
}