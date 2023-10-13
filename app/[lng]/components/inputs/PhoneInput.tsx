'use client';

import { 
  Control,
  FieldErrors} from "react-hook-form";
import PhoneNumberInput from "react-phone-number-input/react-hook-form-input"
import { isPossiblePhoneNumber } from "react-phone-number-input";


interface PhoneInputProps {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: number) => void;
  control: Control,
  errors: FieldErrors,
}


const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  label,
  value,
  disabled, 
  control,
  onChange,
  required,
  errors,
}) => (
  <div className="w-full relative">
    <PhoneNumberInput
      id={id}
      value={value}
      defaultCountry="IL"
      onChange={onChange}
      name="phoneNumber"
      control={control}
      rules={{ required: true, validate: isPossiblePhoneNumber }}
      disabled={disabled}
      className={`
          peer
          w-full
          p-4
          pt-6 
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
        `} />
    <label
      className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
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
  </div>
)
 
export default PhoneInput;