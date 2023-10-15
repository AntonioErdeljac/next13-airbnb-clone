'use client';

interface MenuItemProps {
  onClick?: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return ( 
    <div 
      onClick={onClick} 
      className="
        px-4 
        py-3 
        hover:bg-slate-100 
        transition
        font-base
      "
    >
      {label}
    </div>
   );
}
 
export default MenuItem;