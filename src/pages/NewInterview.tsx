import Layout from "@/components/layout/Layout";
import InterviewSetupCard from "@/components/interview/InterviewSetupCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowRight } from "lucide-react";

const NewInterview = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-interview-dark mb-2">
            Schedule AI-Assisted Interviews
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Create and schedule automated screening interviews with AI avatars to efficiently 
            evaluate candidates before involving your human recruiting team.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/turn-based-interview">
              <Button 
                size="lg"
                className="bg-interview-primary hover:bg-interview-secondary"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Turn-based Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center">
          <InterviewSetupCard />
        </div>
      </div>
    </Layout>
  );
};

export default NewInterview;