"use client";

import { UpdatePassWord } from "@/app/actions/update_password";
import { useActionState, useState } from "react";

export default function PasswordModla() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(UpdatePassWord, null);

  return (
    <div>
      {isOpen ? (
        <div className="fixed inset-0  bg-black/70 flex items-center justify-center backdrop-blur-sm p-4 z-50">
          <div className=" bg-white rounded-lg p-6 w-full max-w-lg shadow-xl ">
            <form action={formAction} className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">비밀번호 변경</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                >
                  ×
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  현재 비밀번호 입력
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="비밀번호 입력"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  새로운 비밀번호 입력
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="비밀번호 입력"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  새로운 비밀번호 확인
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="다시 한번 더 입력"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition"
                />
              </div>
              {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}
              {state?.success && (
                <p className="text-sm text-blue-500">
                  비밀번호가 성공적으로 변경되었습니다.
                </p>
              )}
              <div className="flex justify-end gap-5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-sm text-gray-500"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm bg-neutral-900 text-white rounded-md"
                  disabled={isPending}
                >
                  {isPending ? "저장중.." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between py-1">
          <p className="text-sm text-gray-500">비밀번호</p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-sm text-neutral-900 font-medium hover:underline underline-offset-2"
          >
            비밀번호 변경
          </button>
        </div>
      )}
      {isPending && <p>로딩 중..</p>}
    </div>
  );
}
