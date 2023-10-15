"use client";

import { useTranslation } from "@/app/i18n/client";
import { ICategory } from "../types";
import styled from "@emotion/styled";

interface CategoryViewProps extends ICategory {
  lng: string;
}

const StyledIcon = styled.div`
  transform: scale(1.6);
`;

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
        <StyledIcon className="text-neutral-600">
          {Icon}
        </StyledIcon>
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{t(label)}</div>
          <div className="text-neutral-500 font-light">{t(description)}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
