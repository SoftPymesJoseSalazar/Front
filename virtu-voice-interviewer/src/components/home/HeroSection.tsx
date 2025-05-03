
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-interview-dark sm:text-5xl md:text-6xl">
              <span className="block">Ace your next</span>
              <span className="block text-interview-primary">interview with AI</span>
            </h1>
            <p className="max-w-lg text-xl text-gray-600">
              Practice interviews with our AI interviewer. Get real-time feedback and improve your skills for your dream job.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/new-interview">
                <Button size="lg" className="bg-interview-primary hover:bg-interview-secondary text-white">
                  Start Interview
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="border-interview-primary text-interview-primary hover:bg-interview-background">
                  How it works
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex flex-col space-y-3 text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-interview-primary" />
                <span>Realistic interview questions</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-interview-primary" />
                <span>AI-powered feedback and evaluation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-interview-primary" />
                <span>Practice at your own pace</span>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-80 w-80 overflow-hidden rounded-2xl bg-interview-primary/10 shadow-xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Mic className="h-16 w-16 text-interview-primary mb-4" />
                <p className="text-lg font-medium text-interview-dark">
                  "Practice makes perfect. Start your interview simulation today."
                </p>
                <div className="mt-6 flex items-center justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="wave-animation animate-wave text-interview-primary"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
