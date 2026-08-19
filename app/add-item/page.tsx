"use client";

import ColorPicker from "@/components/color_picker";
import FormSelect from "@/components/form_select";
import { useActionState } from "react";
import { createItem } from "./action";

export default function AddItems() {
  const [state, formAction, isPending] = useActionState(createItem, null);
  return (
    <div className="flex flex-col gap-1 p-2 min-h-screen bg-app-gradient ">
      <h1>Add your item easily</h1>
      <h2>직접추가</h2>
      <form action={formAction} className="flex flex-col gap-2 mt-5">
        <FormSelect
          name="category"
          options={[
            { value: "top", label: "상의" },
            { value: "bottom", label: "하의" },
            { value: "outer", label: "아우터" },
            { value: "shoes", label: "신발" },
            { value: "accessory", label: "액세서리" },
          ]}
          errors={state?.flattenError.category}
        />
        <FormSelect
          name="season"
          options={[
            { value: "spring", label: "봄" },
            { value: "summer", label: "여름" },
            { value: "autumn", label: "가을" },
            { value: "winter", label: "겨울" },
          ]}
          errors={state?.flattenError.season}
        />
        <ColorPicker
          name="color"
          options={[
            { value: "black", label: "검정", hex: "#000000" },
            { value: "white", label: "흰색", hex: "#FFFFFF" },
            { value: "gray", label: "회색", hex: "#9CA3AF" },
            { value: "beige", label: "베이지", hex: "#D4C4A8" },
            { value: "brown", label: "브라운", hex: "#78350F" },
            { value: "navy", label: "네이비", hex: "#1E3A5F" },
            { value: "red", label: "빨강", hex: "#DC2626" },
          ]}
          errors={state?.flattenError.color}
        />
        <FormSelect
          name="purpose"
          options={[
            { value: "", label: "선택 안 함 (선택사항)" },
            { value: "daily", label: "데일리/일상" },
            { value: "office", label: "출근/오피스" },
            { value: "date", label: "데이트/모임" },
            { value: "formal", label: "경조사/격식" },
            { value: "sports", label: "운동/아웃도어" },
            { value: "travel", label: "여행/휴가" },
            { value: "home", label: "홈웨어/이지웨어" },
          ]}
          errors={state?.flattenError?.purpose}
        />
        <button
          type="submit"
          disabled={isPending}
          className="mt-5 rounded-lg border-none  text-white px-4 py-2 hover:bg-white hover:text-slate-900 font-semibold transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? "등록 중.." : "등록"}
        </button>
      </form>
    </div>
  );
}
