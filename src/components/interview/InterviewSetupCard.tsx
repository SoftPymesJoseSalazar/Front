import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Briefcase, Code, MessageSquare, UserPlus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const roleTypes = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "ux-designer", label: "UX Designer" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "customer-support", label: "Customer Support" },
];

const experienceLevels = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (2-5 years)" },
  { value: "senior", label: "Senior Level (5+ years)" },
  { value: "management", label: "Management Level" },
];

const interviewTypes = [
  { value: "technical", label: "Technical", icon: <Code className="h-4 w-4" /> },
  { value: "behavioral", label: "Behavioral", icon: <MessageSquare className="h-4 w-4" /> },
  { value: "hr", label: "HR/Initial", icon: <UserPlus className="h-4 w-4" /> },
  { value: "turn-based", label: "Turn-based", icon: <MessageSquare className="h-4 w-4" /> },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const InterviewSetupCard = () => {
  const [selectedTab, setSelectedTab] = useState("new");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [isReady, setIsReady] = useState(false);

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    checkIfReady();
  };

  const handleExperienceChange = (value: string) => {
    setSelectedExperience(value);
    checkIfReady();
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    checkIfReady();
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    checkIfReady();
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    checkIfReady();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidateEmail(e.target.value);
    checkIfReady();
  };

  const checkIfReady = () => {
    if (
      selectedRole && 
      selectedExperience && 
      selectedType && 
      selectedDate && 
      selectedTime &&
      candidateEmail.includes('@')
    ) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Schedule an Interview</CardTitle>
        <CardDescription>
          Set up AI-assisted interviews for candidate screening
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New Interview</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Interviews</TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Candidate Email
              </label>
              <Input 
                type="email" 
                placeholder="candidate@example.com" 
                value={candidateEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                1. Select Position Type
              </label>
              <Select value={selectedRole} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {roleTypes.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                2. Experience Level Required
              </label>
              <Select value={selectedExperience} onValueChange={handleExperienceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                3. Interview Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {interviewTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? "default" : "outline"}
                    className={`h-auto py-3 ${selectedType === type.value ? "bg-interview-primary" : ""}`}
                    onClick={() => handleTypeChange(type.value)}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      {type.icon}
                      <span className="text-xs">{type.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  4. Schedule Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  5. Schedule Time
                </label>
                <Select value={selectedTime} onValueChange={handleTimeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="scheduled" className="py-4">
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">No interviews scheduled yet</p>
              <p className="text-sm">Schedule an interview to see it here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        {selectedTab === "new" ? (
          selectedType === "turn-based" ? (
            <Link to="/turn-based-interview">
              <Button 
                disabled={!isReady} 
                className="bg-interview-primary hover:bg-interview-secondary"
              >
                Start Turn-based Interview
              </Button>
            </Link>
          ) : (
            <Button 
              disabled={!isReady} 
              className="bg-interview-primary hover:bg-interview-secondary"
            >
              Send Interview Invitation
            </Button>
          )
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default InterviewSetupCard;