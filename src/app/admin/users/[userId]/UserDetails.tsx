import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getUserOne } from "../actions";

export default async function UserDetails({ userId }: { userId: string }) {
  const [user, error] = await getUserOne(userId);

  if (!user) {
    return (
      <div className="p-4">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="text-center text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className=" space-y-4">
      <Card className="shadow-sm bg-white border-0">
        <CardHeader className="bg-blue-50 border-b px-6 py-5">
          <CardTitle className="text-xl text-blue-900">User Details </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Name</h3>
              <p className="text-gray-900">{user.name || "No name"}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Email</h3>
              <p className="text-gray-900">{user.email}</p>
            </div>
             
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
