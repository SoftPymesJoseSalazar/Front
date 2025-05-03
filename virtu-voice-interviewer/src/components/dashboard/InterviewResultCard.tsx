
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Calendar, Clock, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface InterviewResultCardProps {
  id: string;
  title: string;
  date: string;
  duration: string;
  score: number;
  questionCount: number;
}

const InterviewResultCard = ({
  id,
  title,
  date,
  duration,
  score,
  questionCount,
}: InterviewResultCardProps) => {
  // Function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="bg-interview-background pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BarChart className="mr-1 h-4 w-4" />
            <span>{questionCount} questions</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Overall Score</p>
            <p className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score}/100
            </p>
          </div>
          <div className="h-12 w-12 rounded-full border-4 flex items-center justify-center"
            style={{
              borderColor: score >= 80 ? '#16a34a' : score >= 60 ? '#ca8a04' : '#dc2626',
            }}
          >
            <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
          </div>
        </div>

        <div className="flex space-x-2 mt-4 justify-between">
          <Link to={`/results/${id}`}>
            <Button variant="outline" size="sm" className="flex items-center">
              <ExternalLink className="mr-1 h-4 w-4" />
              <span>View Details</span>
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="mr-1 h-4 w-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewResultCard;
