import React from "react";
import { UserProfile } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfilePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <UserProfile />
        </CardContent>
      </Card>
    </div>
  );
}
