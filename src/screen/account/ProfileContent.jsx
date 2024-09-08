import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProfileContent = () => {
  return (
    <Card className="m-0 mx-auto w-full rounded-none border-0 p-0">
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="User Name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" type="email" placeholder="yZUeh@example.com" />
        </div>
        <p className="text-sm text-gray-500">We promise not to spam you</p>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Button className="flex items-center justify-end bg-primary px-8">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileContent;
