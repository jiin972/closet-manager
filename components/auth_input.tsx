"use client";

interface AuthInputProps {
  name: string;
  errors?: string[];
}

/**
 * 재사용이 가능한 Input Components
 * - React 기본 Input속성을 모두 그대로 지원(...rest)
 * - 필드별 에러 메시지를 input 아래에 함께 렌더링
 */
export default function AuthInput({
  name,
  errors = [],
  ...rest
}: AuthInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const hasError = errors.length > 0;
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        name={name}
        {...rest}
        className={`w-full rounded-lg border border-white px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:border-2 transition-transform
          ${hasError ? "border-red-500" : "border-white focus:border-white"}`}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-400 text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
