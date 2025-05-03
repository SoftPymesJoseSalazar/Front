
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  onEdit: () => void;
  isEditing: boolean;
}

export const ProfileHeader = ({ onEdit, isEditing }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-interview-dark">Recruiter Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your recruiter profile and interview preferences
        </p>
      </div>
      {!isEditing && (
        <Button variant="outline" onClick={onEdit}>
          Edit Profile
        </Button>
      )}
    </div>
  );
};
