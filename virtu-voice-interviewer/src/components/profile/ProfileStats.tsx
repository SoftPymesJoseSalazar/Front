
import { Briefcase, User, UserPlus, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InterviewStats {
  completed: number;
  avgScore: number;
  totalHires: number;
  lastInterview: string;
}

interface ProfileStatsProps {
  stats: InterviewStats;
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Interview Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <Briefcase className="h-5 w-5 text-interview-primary" />
            </div>
            <p className="text-2xl font-bold">{stats.completed}</p>
            <p className="text-xs text-gray-500">Interviews Conducted</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <User className="h-5 w-5 text-interview-primary" />
            </div>
            <p className="text-2xl font-bold">{stats.avgScore}</p>
            <p className="text-xs text-gray-500">Avg. Candidate Score</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <UserPlus className="h-5 w-5 text-interview-primary" />
            </div>
            <p className="text-2xl font-bold">{stats.totalHires}</p>
            <p className="text-xs text-gray-500">Total Hires</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <Calendar className="h-5 w-5 text-interview-primary" />
            </div>
            <p className="text-2xl font-bold">{stats.lastInterview}</p>
            <p className="text-xs text-gray-500">Last Interview</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
