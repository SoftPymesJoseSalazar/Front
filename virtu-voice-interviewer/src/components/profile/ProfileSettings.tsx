
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export const ProfileSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Interview Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preferences">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="preferences" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatic Feedback</p>
                <p className="text-sm text-gray-500">Send AI-generated feedback to candidates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Interview Recording</p>
                <p className="text-sm text-gray-500">Store interview recordings for review</p>
              </div>
              <Switch defaultChecked />
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Interview Reminders</p>
                <p className="text-sm text-gray-500">Get notified before scheduled interviews</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Candidate Updates</p>
                <p className="text-sm text-gray-500">Receive notifications when candidates complete interviews</p>
              </div>
              <Switch defaultChecked />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
