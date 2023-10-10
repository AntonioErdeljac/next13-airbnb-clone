'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "לא נמצאו התאמות",
  subtitle = "יש לשנות או להסיר חלק מהפילטרים",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="להורדת כל הפילטרים"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;