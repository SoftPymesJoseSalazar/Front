
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProfileData } from "./types";

interface ProfileEditModeProps {
  editedProfile: ProfileData;
  onChange: (field: string, value: string) => void;
}

export const ProfileEditMode = ({ editedProfile, onChange }: ProfileEditModeProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={editedProfile.name} 
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            value={editedProfile.email} 
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Current Role</Label>
          <Input 
            id="role" 
            value={editedProfile.role} 
            onChange={(e) => onChange("role", e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select 
            value={editedProfile.experience} 
            onValueChange={(value) => onChange("experience", value)}
          >
            <SelectTrigger id="experience" className="w-full">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Entry-level (0-2 years)">Entry-level (0-2 years)</SelectItem>
              <SelectItem value="Mid-level (3-5 years)">Mid-level (3-5 years)</SelectItem>
              <SelectItem value="Senior (5+ years)">Senior (5+ years)</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="about">About</Label>
        <Textarea 
          id="about" 
          rows={4} 
          value={editedProfile.about} 
          onChange={(e) => onChange("about", e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};
