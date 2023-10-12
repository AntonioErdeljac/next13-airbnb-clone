"use client";

import { useEffect } from "react";

import EmptyState from "@/app/[lng]/components/EmptyState";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ErrorStateProps {
  error: Error;
  lng: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, lng }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="אופס/Uh Oh"
      subtitle="משהו השתבש! Something went wrong!"
      showReset
      resetLabel="חזרה לעמוד הראשי / back to main page"
      lng={lng}
    />
  );
};

export default ErrorState;
