import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <SignUp routing="path" path="/register" />
        </CardContent>
      </Card>
    </div>
  );
}
