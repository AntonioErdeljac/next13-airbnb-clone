'use client';

import { useEffect } from "react";

import EmptyState from "@/app/[lng]/components/EmptyState";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
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
    />
   );
}
 
export default ErrorState;
