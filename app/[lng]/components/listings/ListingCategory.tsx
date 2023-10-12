"use client";

import { useTranslation } from "@/app/i18n/client";
import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType;
  label: string;
  description: string;
  lng: string;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  icon: Icon,
  label,
  description,
  lng,
}) => {
  const { t } = useTranslation(lng);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{t(label)}</div>
          <div className="text-neutral-500 font-light">{t(description)}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
