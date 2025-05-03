
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import InterviewSetupCard from "@/components/interview/InterviewSetupCard";

const NewInterview = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-interview-dark mb-2">
            Schedule AI-Assisted Interviews
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create and schedule automated screening interviews with AI avatars to efficiently 
            evaluate candidates before involving your human recruiting team.
          </p>
        </div>
        
        <div className="flex justify-center">
          <InterviewSetupCard />
        </div>
      </div>
    </Layout>
  );
};

export default NewInterview;
