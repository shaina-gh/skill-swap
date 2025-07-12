import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "@/components/UserCard";
import SkillFilter from "@/components/SkillFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data
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

export default function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const usersPerPage = 3;

  const handleFiltersChange = (filters: {
    search: string;
    skillCategory: string;
    availability: string;
    location: string;
  }) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = users;

      if (filters.search) {
        filtered = filtered.filter(user =>
          user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.skillsOffered.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase())) ||
          user.skillsWanted.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
        );
      }

      if (filters.availability) {
        filtered = filtered.filter(user =>
          user.availability.toLowerCase().includes(filters.availability.toLowerCase())
        );
      }

      if (filters.location) {
        filtered = filtered.filter(user =>
          user.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      setFilteredUsers(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  };

  const handleRequestSwap = (userId: string) => {
    navigate(`/swap-request/${userId}`);
  };
  

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Swap Skills,</span>
            <br />
            <span className="text-foreground">Grow Together</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with talented individuals and exchange skills. Learn something new while teaching what you know best.
          </p>
        </div>

        {/* Filters */}
        <SkillFilter onFiltersChange={handleFiltersChange} />

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {loading ? "Searching..." : `Showing ${filteredUsers.length} skill swappers`}
          </p>
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* User Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-glass h-96 animate-pulse border border-card-border rounded-xl" />
            ))}
          </div>
        ) : currentUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentUsers.map((user, index) => (
              <div key={user.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <UserCard user={user} onRequestSwap={handleRequestSwap} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No users found matching your criteria</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 sticky bottom-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Show limited page numbers with ellipsis */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "neon" : "outline"}
                  onClick={() => goToPage(pageNum)}
                  className="shadow-md"
                >
                  {pageNum}
                </Button>
              );
            })}
    
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="mx-1">...</span>
            )}
    
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <Button
                variant={currentPage === totalPages ? "neon" : "outline"}
                onClick={() => goToPage(totalPages)}
                className="shadow-md"
              >
                {totalPages}
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}