
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProfileViewMode } from "./ProfileViewMode";
import { ProfileEditMode } from "./ProfileEditMode";
import type { ProfileData } from "./types";

interface ProfileFormProps {
  profile: ProfileData;
  isEditing: boolean;
  editedProfile: ProfileData;
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
}

export const ProfileForm = ({
  profile,
  isEditing,
  editedProfile,
  onSave,
  onCancel,
  onChange,
}: ProfileFormProps) => {
  return (
    <Card className="lg:col-span-2 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Profile Information</CardTitle>
            <CardDescription className="mt-1">
              Your personal information and preferences
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          <ProfileEditMode editedProfile={editedProfile} onChange={onChange} />
        ) : (
          <ProfileViewMode profile={profile} />
        )}
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-interview-primary hover:bg-interview-secondary">
            Save Changes
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
