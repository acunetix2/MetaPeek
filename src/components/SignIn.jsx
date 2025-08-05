import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <SignIn routing="path" path="/login" />
        </CardContent>
      </Card>
    </div>
  );
}