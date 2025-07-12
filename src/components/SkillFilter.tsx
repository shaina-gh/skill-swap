import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface SkillFilterProps {
  onFiltersChange: (filters: {
    search: string;
    skillCategory: string;
    availability: string;
    location: string;
  }) => void;
}

export default function SkillFilter({ onFiltersChange }: SkillFilterProps) {
  const [search, setSearch] = useState("");
  const [skillCategory, setSkillCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [location, setLocation] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const skillCategories = [
    "All Categories",
    "Programming",
    "Design",
    "Marketing",
    "Writing",
    "Music",
    "Languages",
    "Photography",
    "Cooking",
    "Fitness",
  ];

  const availabilityOptions = [
    "All Times",
    "Weekdays",
    "Weekends",
    "Evenings",
    "Mornings",
  ];

  const locationOptions = [
    "All Locations",
    "New York",
    "Seattle",
    "Austin",
    "Los Angeles", 
    "Chicago",
    "Houston",
    "Phoenix",
    "Remote",
  ];

  const handleFilterChange = () => {
    onFiltersChange({
      search,
      skillCategory: skillCategory === "all" ? "" : skillCategory,
      availability: availability === "all" ? "" : availability,
      location: location === "all" ? "" : location,
    });

    // Update active filters
    const filters: string[] = [];
    if (skillCategory !== "all") filters.push(skillCategory);
    if (availability !== "all") filters.push(availability);
    if (location !== "all") filters.push(location);
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setSearch("");
    setSkillCategory("all");
    setAvailability("all");
    setLocation("all");
    setActiveFilters([]);
    onFiltersChange({
      search: "",
      skillCategory: "",
      availability: "",
      location: "",
    });
  };

  const removeFilter = (filterToRemove: string) => {
    if (skillCategories.includes(filterToRemove)) setSkillCategory("all");
    if (availabilityOptions.includes(filterToRemove)) setAvailability("all");
    if (locationOptions.includes(filterToRemove)) setLocation("all");
    handleFilterChange();
  };

  return (
    <div className="card-glass p-6 border border-card-border rounded-xl mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, skill, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFilterChange()}
          className="pl-10 bg-card border-card-border focus:border-neon-blue h-12"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <Select value={skillCategory} onValueChange={setSkillCategory}>
          <SelectTrigger className="bg-card border-card-border focus:border-neon-blue">
            <SelectValue placeholder="Skill Category" />
          </SelectTrigger>
          <SelectContent className="card-glass border-card-border">
            {skillCategories.map((category, index) => (
              <SelectItem key={index} value={index === 0 ? "all" : category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger className="bg-card border-card-border focus:border-neon-blue">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent className="card-glass border-card-border">
            {availabilityOptions.map((option, index) => (
              <SelectItem key={index} value={index === 0 ? "all" : option.toLowerCase()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="bg-card border-card-border focus:border-neon-blue">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="card-glass border-card-border">
            {locationOptions.map((loc, index) => (
              <SelectItem key={index} value={index === 0 ? "all" : loc.toLowerCase()}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex space-x-2">
          <Button onClick={handleFilterChange} variant="neon" className="flex-1">
            <Filter className="h-4 w-4 mr-2" />
            Apply
          </Button>
          {activeFilters.length > 0 && (
            <Button onClick={clearFilters} variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="bg-neon-blue/10 text-neon-blue border-neon-blue/30 cursor-pointer hover:bg-neon-blue/20"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}