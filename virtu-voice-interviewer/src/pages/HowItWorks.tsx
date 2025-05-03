
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-interview-dark mb-4">
            How VirtuVoice Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered interview platform helps you practice and improve your interview skills through realistic simulations and feedback.
          </p>
        </div>

        <Tabs defaultValue="process" className="max-w-4xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="process">The Process</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="process" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {[
                    {
                      step: "1",
                      title: "Choose Your Interview Type",
                      description: "Select from various interview types including technical, behavioral, or role-specific interviews based on your target position.",
                      image: "https://placehold.co/600x400/e6f7ff/0369a1?text=Choose+Interview+Type&font=roboto",
                    },
                    {
                      step: "2",
                      title: "Complete the Interview",
                      description: "Interact with our AI interviewer through voice. Answer questions naturally as you would in a real interview setting.",
                      image: "https://placehold.co/600x400/e6f7ff/0369a1?text=Interview+Process&font=roboto",
                    },
                    {
                      step: "3",
                      title: "Receive Detailed Feedback",
                      description: "After the interview, get comprehensive feedback on your responses, communication skills, and areas for improvement.",
                      image: "https://placehold.co/600x400/e6f7ff/0369a1?text=Interview+Feedback&font=roboto",
                    },
                    {
                      step: "4",
                      title: "Track Your Progress",
                      description: "Monitor your improvement over time through our analytics dashboard and focus your practice on areas that need attention.",
                      image: "https://placehold.co/600x400/e6f7ff/0369a1?text=Track+Progress&font=roboto",
                    },
                  ].map((item, index) => (
                    <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
                      <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-interview-primary text-white flex items-center justify-center font-bold text-xl mr-4">
                            {item.step}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-interview-dark mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className={`rounded-lg overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technology" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-interview-dark mb-4">Voice Recognition</h3>
                    <p className="text-gray-600 mb-4">
                      Our platform uses advanced speech-to-text technology to accurately transcribe your responses in real-time, allowing for a natural conversation flow.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Real-time speech processing",
                        "Multiple language support",
                        "Noise cancellation for clear audio",
                        "Accent recognition capabilities"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-interview-dark mb-4">AI Response Analysis</h3>
                    <p className="text-gray-600 mb-4">
                      Powered by large language models, our platform evaluates your responses based on content, relevance, clarity, and other key factors.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Content quality assessment",
                        "Relevance to question evaluation",
                        "Communication style analysis",
                        "Industry-specific terminology recognition"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-interview-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-interview-dark mb-3">Our Technology Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "Speech Recognition API", "Large Language Models", 
                      "React", "TypeScript", "Tailwind CSS", "Real-time Analytics"
                    ].map((tech, index) => (
                      <div key={index} className="bg-white p-3 rounded shadow-sm text-center">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="benefits" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Practice Anytime",
                      description: "No need to coordinate with friends or mentors. Practice interviewing on your own schedule, day or night.",
                      icon: "🕒",
                    },
                    {
                      title: "Realistic Experience",
                      description: "Our AI interviewer creates an authentic interview environment to help reduce nervousness during real interviews.",
                      icon: "🤝",
                    },
                    {
                      title: "Immediate Feedback",
                      description: "Get instant, objective feedback on your responses rather than waiting days or weeks.",
                      icon: "📊",
                    },
                    {
                      title: "Track Improvement",
                      description: "See your progress over time with detailed analytics and performance metrics.",
                      icon: "📈",
                    },
                    {
                      title: "Industry Specific",
                      description: "Practice with questions tailored to your specific industry and role requirements.",
                      icon: "🏢",
                    },
                    {
                      title: "Confidence Building",
                      description: "Regular practice leads to increased confidence when facing real interviewers.",
                      icon: "💪",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-4xl mb-3">{benefit.icon}</div>
                      <h3 className="text-lg font-semibold text-interview-dark mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-lg text-gray-700 mb-6">
                    Ready to improve your interview skills and land your dream job?
                  </p>
                  <Link to="/new-interview">
                    <Button size="lg" className="bg-interview-primary hover:bg-interview-secondary">
                      Start Practicing Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HowItWorks;
