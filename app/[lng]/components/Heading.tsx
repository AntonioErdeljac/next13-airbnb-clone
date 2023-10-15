"use client";

import { IconType } from "react-icons";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  icon?: IconType;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  icon: Icon,
}) => {
  return (
    <div
      className={center ? "text-center" : "text-start"}
    >
      <div className="text-2xl font-bold flex flex-row">
        {Icon && <Icon size={30} />}
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
