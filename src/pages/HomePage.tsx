import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "@/components/UserCard";
import SkillFilter from "@/components/SkillFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Quote, Github, Twitter, Instagram, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroBackground from "@/assets/hero-bg.jpg";
import sarahChen from "@/assets/profiles/sarah-chen.jpg";
import marcusThompson from "@/assets/profiles/marcus-thompson.jpg";
import elenaRodriguez from "@/assets/profiles/elena-rodriguez.jpg";

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    location: "San Francisco, CA",
    avatar: sarahChen,
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
    avatar: marcusThompson,
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
    avatar: elenaRodriguez,
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
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Trade Skills,</span>
            <br />
            <span className="text-foreground">Not Money</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Your Skills Are Your Currency. Connect with talented individuals and exchange knowledge. 
            Learn something new while teaching what you know best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-neon hover:shadow-lg hover:scale-105 group">
              Explore Skills Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 transition-all duration-300">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

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

        {/* Success Stories Section */}
        <section className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Success Stories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how our community members have transformed their skills through meaningful exchanges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                trade: "Graphic Design → Spanish Lessons",
                story: "Thanks to this platform, I traded my design skills for Spanish lessons. Now I'm fluent and working with clients across Latin America!",
                rating: 5
              },
              {
                name: "Michael R.",
                trade: "Web Development → Guitar Lessons",
                story: "I built a website for a musician who taught me guitar. It's amazing how skills can create such meaningful connections.",
                rating: 5
              },
              {
                name: "Elena K.",
                trade: "Photography → Cooking Classes",
                story: "Exchanged my photography services for cooking lessons. Now I'm hosting dinner parties and building my food blog!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="card-glass hover-scale border-card-border animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-neon-teal mb-4 opacity-50" />
                  <p className="text-foreground mb-4 italic">"{testimonial.story}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-neon-purple">{testimonial.trade}</p>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-neon-teal text-neon-teal" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-card-glass border-t border-card-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold gradient-text">SkillSwap</span>
              </div>
              <p className="text-muted-foreground">
                Empowering communities through skill exchange. Your knowledge is valuable, share it and grow together.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'How It Works', 'Community Guidelines', 'Help Center'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Safety Guidelines'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Connect</h3>
              <div className="flex space-x-4">
                {[
                  { Icon: Twitter, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Github, href: "#" },
                  { Icon: Mail, href: "mailto:hello@skillswap.com" }
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="p-2 rounded-lg bg-card hover:bg-neon-blue/10 text-muted-foreground hover:text-neon-blue transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join our community of skill-sharers and unlock your potential.
              </p>
            </div>
          </div>

          <div className="border-t border-card-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 SkillSwap. All rights reserved. Built by TOOEZY.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
