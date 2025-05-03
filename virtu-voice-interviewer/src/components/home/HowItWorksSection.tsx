
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Schedule an interview",
    description:
      "Select the position type, required experience level, and choose from technical, behavioral, or HR interviews.",
  },
  {
    number: "02",
    title: "Send invitation to candidate",
    description:
      "The candidate receives an email with a personalized link to join the AI-powered interview at the scheduled time.",
  },
  {
    number: "03",
    title: "AI conducts the interview",
    description:
      "Our intelligent AI avatar asks relevant questions and evaluates responses in real-time, creating a natural interview experience.",
  },
  {
    number: "04",
    title: "Review comprehensive results",
    description:
      "Access detailed interview analytics, transcripts, and AI-generated evaluations to make informed hiring decisions.",
  },
];

const HowItWorksSection = () => {
  return (
    <div className="bg-interview-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-interview-dark">
            How VirtuVoice Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Streamline your screening process with automated AI interviews
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg bg-white p-6 shadow-sm"
            >
              <span className="text-3xl font-bold text-interview-primary opacity-50 mb-4">
                {step.number}
              </span>
              <h3 className="mb-2 text-lg font-medium text-interview-dark">
                {step.title}
              </h3>
              <p className="text-gray-600 flex-grow">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/new-interview">
            <Button
              size="lg"
              className="bg-interview-primary hover:bg-interview-secondary text-white"
            >
              Schedule Your First Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
