
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/components/ui/use-toast";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileSettings } from "@/components/profile/ProfileSettings";

// Mock user profile data
const profileData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Technical Recruiter",
  experience: "Mid-level (3-5 years)",
  about: "Experienced technical recruiter specializing in screening software engineering candidates. Using AI-powered interviews to streamline the hiring process and identify top talent efficiently.",
  targetRoles: ["Software Engineer", "Frontend Developer", "Full Stack Developer", "Backend Developer"],
  skills: ["Technical Screening", "AI Interview Management", "Candidate Assessment", "Engineering Recruitment"],
  interviewStats: {
    completed: 48,
    avgScore: 85,
    totalHires: 12,
    lastInterview: "2 hours ago",
  },
};

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({...profile});
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({...profile});
  };

  const handleChange = (field: string, value: string) => {
    setEditedProfile({...editedProfile, [field]: value});
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <ProfileHeader onEdit={handleEdit} isEditing={isEditing} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileForm
            profile={profile}
            isEditing={isEditing}
            editedProfile={editedProfile}
            onSave={handleSave}
            onCancel={handleCancel}
            onChange={handleChange}
          />
          
          <div className="space-y-6">
            <ProfileStats stats={profile.interviewStats} />
            <ProfileSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
