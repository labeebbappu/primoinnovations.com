import { ChevronLeft } from "lucide-react";
import { getUserOne } from "../actions";
import Link from "next/link";
import { UserEditForm } from "./UserEditForm";

export default async function UserDetails({ userId }: { userId: string }) {
  const [user, error] = await getUserOne(userId);

  if (!user) {
    return (
      <div className="p-4">
        <Link href="/admin/users" className="btn btn-ghost mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Link>
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>User not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-header bg-primary/10 border-b px-6 py-5">
          <h2 className="card-title text-xl text-primary">User Details</h2>
        </div>
        <div className="card-body p-6 space-y-4">
          {error && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error instanceof Error ? error.message : 'An error occurred'}</span>
            </div>
          )}

          <UserEditForm user={user} />
        </div>
      </div>
    </div>
  );
}
