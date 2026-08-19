"use client";

interface FromSelectProps {
  name: string;
  options: { value: string; label: string }[];
  errors?: string[];
}

export default function FormSelect({
  name,
  options,
  errors = [],
  ...rest
}: FromSelectProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const hasError = errors.length > 0;
  return (
    <div className="flex flex-col gap-1 w-full">
      <select
        name={name}
        {...rest}
        className={`w-full rounded-lg border border-white px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:border-2 transition-transform
      ${hasError ? "border-red-500" : "border-white focus:border-white"}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-400 text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
