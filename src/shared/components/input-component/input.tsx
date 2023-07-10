import React, {
  FC,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";

export type InputSize = "medium" | "large";
export type InputType = "text" | "email" | "number";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  children?: React.ReactNode;
  formState? : any;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

export const Input: FC<any> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      size = "medium",
      className = "",
      placeholder,
      formState,
      ...props
    },
    ref,
  ) => {
    console.log(formState)
    return (
      <div className="sm:col-span-12">
        <label htmlFor="email" className="block mb-2 text-sm text-gray-800">{label}</label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name={name}
            id={name}
            type={type}
            autoComplete={name}
            placeholder={placeholder}
            {...props}
            ref={ref}
          />
        </div>
        
        {
          formState?.type === 'required' ? 
          <span className="text-sm text-red-600"> {label} is required </span> : <></>
        }
      </div>
    );
  }
);
