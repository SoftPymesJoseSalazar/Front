
import { Badge } from "@/components/ui/badge";
import type { ProfileData } from "./types";

interface ProfileViewModeProps {
  profile: ProfileData;
}

export const ProfileViewMode = ({ profile }: ProfileViewModeProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-medium mt-1">{profile.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium mt-1">{profile.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Role</p>
          <p className="font-medium mt-1">{profile.role}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Experience Level</p>
          <p className="font-medium mt-1">{profile.experience}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">About</p>
        <p className="mt-1 text-gray-700">{profile.about}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Target Roles</p>
        <div className="flex flex-wrap gap-2">
          {profile.targetRoles.map((role, index) => (
            <Badge key={index} variant="secondary">{role}</Badge>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Skills</p>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <Badge key={index} variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
