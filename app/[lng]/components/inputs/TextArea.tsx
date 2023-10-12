'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  type?: string;
  maxLength?: number
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  maxLength = 500,
  disabled, 
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative pt-1">
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          -mt-3
          z-10 
          origin-[0] 
          right-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        maxLength={maxLength}
        placeholder= " "
        className={`
          peer
          w-full
          p-4
          pt-4 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          pr-4
          ${errors[id] ? 'border-sky-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-sky-500' : 'focus:border-black'}
        `}
      />
    </div>
   );
}
 
export default TextArea;