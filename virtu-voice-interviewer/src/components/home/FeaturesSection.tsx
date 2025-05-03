
import { Bot, Calendar, BarChart, Shield } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-6 w-6 text-interview-primary" />,
    title: "AI-Powered Interviews",
    description:
      "Let our intelligent AI avatars conduct initial candidate screenings for technical, behavioral, and HR interviews.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-interview-primary" />,
    title: "Simple Scheduling",
    description:
      "Easily schedule interviews and send automated invitations to candidates with personalized interview links.",
  },
  {
    icon: <BarChart className="h-6 w-6 text-interview-primary" />,
    title: "Comprehensive Analytics",
    description:
      "Review detailed performance metrics, transcripts and AI evaluations of candidates to make informed hiring decisions.",
  },
  {
    icon: <Shield className="h-6 w-6 text-interview-primary" />,
    title: "Bias Reduction",
    description:
      "Our AI avatars are designed to provide consistent, objective screening experiences for all candidates.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-interview-dark">
            Revolutionize Your Hiring Process
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Save time and resources with AI-powered candidate screening
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 rounded-full bg-interview-background p-2 w-12 h-12 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-medium text-interview-dark">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
