"use client";

import { useState, useEffect } from "react";
import { getUserWithAuth } from "./actions";
import { toast } from "sonner";
import { User } from "../types";
import { AuthCard, LoadingState, ErrorState } from "./AuthCard";
import { CreateAuthForm } from "./CreateAuthForm";
import { UpdateAuthForm } from "./UpdateAuthForm";
import { ViewAuthDetails } from "./ViewAuthDetails";

// Client component
export function AuthManage({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(true);

  // Fetch user data with auth
  useEffect(() => {
    async function fetchUser() {
      try {
        const [userData, error] = await getUserWithAuth(userId);
        if (error) {
          console.error("Error fetching user:", error);
          toast.error(typeof error === 'string' ? error : 'Failed to load user data');
          return;
        }
        if (userData) {
          setUser(userData);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  // Toggle between view and edit modes
  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return <ErrorState />;
  }

  return (
    <AuthCard>
      {user.auth ? (
        viewMode ? (
          <ViewAuthDetails auth={user.auth} onEditModeToggle={toggleViewMode} />
        ) : (
          <UpdateAuthForm auth={user.auth} onViewModeToggle={toggleViewMode} />
        )
      ) : (
        <CreateAuthForm userId={userId} initialEmail={user.email} />
      )}
    </AuthCard>
  );
}
