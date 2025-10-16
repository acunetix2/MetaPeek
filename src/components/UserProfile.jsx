import React from "react";
import { UserProfile } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border border-gray-700 bg-gray-900/70 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]">
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold text-center text-white mb-6">
            Manage Your Profile
          </h1>
          <div className="rounded-xl overflow-hidden">
            <UserProfile
              appearance={{
                elements: {
                  rootBox: "w-full text-white",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-white text-lg font-medium",
                  headerSubtitle: "text-gray-400",
                  formFieldInput:
                    "bg-gray-800 text-white border-gray-700 focus:border-orange-500 focus:ring-orange-500",
                  buttonPrimary:
                    "bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium",
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
