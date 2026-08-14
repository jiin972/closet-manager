"use client";

import AuthInput from "@/components/auth_input";
import { useActionState } from "react";
import LoginState from "./action";

export default function Login() {
  const [state, formAction, isPending] = useActionState(LoginState, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen bg-app-gradient ">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with Email and Password!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-2 items-center">
        <AuthInput
          name="email"
          required
          type="email"
          placeholder="이메일을 입력하세요."
          errors={state?.flattenError?.email}
          defaultValue={state?.payload?.email?.toString() ?? ""}
        />
        <AuthInput
          name="password"
          required
          type="password"
          placeholder="비밀번호를 입력하세요."
          errors={state?.flattenError?.password}
        />
        <button
          type="submit"
          disabled={isPending}
          className="mt-5 rounded-lg border-none  text-white px-4 py-2 hover:bg-white hover:text-slate-900 font-semibold transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? "로그인 중" : "로그인"}
        </button>
      </form>
    </div>
  );
}
