import React from "react";
import { Controller } from "react-hook-form";

function FormInputComponent({
  label,
  labelStrong,
  type,
  accept,
  name,
  control,
  required,
  ...props
}) {
  return (
    <div className="mt-2">
      <label htmlFor={name} className="flex gap-2">
        <h4 className="text-gray-500 text-sm">{label}</h4>
        {required && <h6 className="text-red text-sm">*</h6>}
      </label>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              accept={props?.accept}
              value={props?.value}
              placeholder={props?.placeholder}
              className="w-full border-[.5px] text-sm bg-white border-gray rounded-lg shadow-sm p-3"
            />
          )}
        />
        {props?.error && <h6 className="text-red text-sm">{props?.error}</h6>}
      </div>
    </div>
  );
}

export default FormInputComponent;
