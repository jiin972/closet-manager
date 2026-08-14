"use client";

import AuthInput from "@/components/auth_input";
import { useActionState } from "react";
import { createAccount } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, formAction, isPending] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen bg-app-gradient ">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the Form below to join!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-2 ">
        <AuthInput
          name="email"
          required
          type="email"
          placeholder="이메일을 입력하세요."
          defaultValue={state?.payload?.email?.toString() ?? ""}
          errors={state?.flattenError?.email}
        />
        <AuthInput
          name="password"
          required
          type="password"
          placeholder="비밀번호를 입력하세요."
          errors={state?.flattenError?.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <AuthInput
          name="confirm_password"
          required
          type="password"
          placeholder="다시 한번 비밀번호를 입력하세요."
          errors={state?.flattenError?.confirm_password}
        />
        <button
          type="submit"
          disabled={isPending}
          className="mt-5 rounded-lg bg-white text-slate-800 px-4 py-2 hover:bg-gray-400 font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? "저장 중.." : "가입완료"}
        </button>
      </form>
    </div>
  );
}
