
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineering Recruiter",
    text: "VirtuVoice dramatically reduced our initial screening time, allowing us to quickly identify top talent using AI-powered interviews.",
  },
  {
    name: "Michael Chen",
    role: "HR Tech Manager",
    text: "The AI interviewer provides consistent and objective candidate evaluations, helping us make more informed hiring decisions.",
  },
  {
    name: "Jessica Williams",
    role: "Talent Acquisition Specialist",
    text: "With VirtuVoice, we've streamlined our recruitment process and can screen more candidates efficiently than ever before.",
  },
];

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-interview-dark">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Hear how VirtuVoice is transforming recruitment screening
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-interview-background border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-interview-primary py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Revolutionize Your Hiring Process
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mb-8">
              Start screening candidates with AI-powered interviews and transform your recruitment workflow.
            </p>
            <Link to="/new-interview">
              <Button size="lg" variant="secondary" className="text-interview-primary bg-white hover:bg-gray-100">
                Schedule First AI Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
